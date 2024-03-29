import { useState, useEffect } from 'preact/hooks'

import CheapGlkOte from 'cheap-glkote'

import TextBuffer from './OutputBox/TextBuffer/TextBuffer'
import GridBuffer from './OutputBox/GridBuffer/GridBuffer'

import InputBox from './InputBox/InputBox'
import Status from './Status/Status'

import {
  Handlers,
  unhandledRejectionHandler,
} from './common/playerHandlers'

import * as s from './Player.module.scss'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Preparing'],
}

const runMachine = ({ engine: Engine, wasmBinary, storyfile, handlers }) => {
  const { Dialog, GlkOte, send } = CheapGlkOte(handlers)
  const instance = new Engine()

  instance.init(storyfile, {
    Dialog,
    GlkOte,
    Glk: {},
    wasmBinary,
    arguments: ['storyfile'],
  })
  instance.start()

  return { send, instance }
}

export default function Player ({
  vmParts: { storyfile, engine, wasmBinary },
  onFullscreenRequest,
  setMenuOpen,
  singleWindow,
}) {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [windows, setWindows] = useState([])
  const [currentWindowId, setCurrentWindowId] = useState(null)
  const [inputType, setInputType] = useState(null)
  const [inbox, setInbox] = useState([])

  const [vm, setVm] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)

  useEffect(() => {
    const handlers = Handlers({
      setStatus,
      setWindows,
      setCurrentWindowId,
      setInputType,
      setInbox,
    })

    setVm(runMachine({
      engine,
      wasmBinary,
      storyfile,
      handlers,
    }))

    const rejectionHandler =
      unhandledRejectionHandler(handlers.onExit)

    window.addEventListener('unhandledrejection', rejectionHandler)

    return () => {
      setVm(null)
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [storyfile, engine, wasmBinary])

  useEffect(() => {
    setSendMessage(() => vm
      ? vm.send
      : null)

    return () => setSendMessage(null)
  }, [vm])

  const textWindow = (inbox) => (currentWindow) => {
    const props = {
      inbox,
      currentWindow,
    }

    return ({
      buffer: <TextBuffer {...props} />,
      grid: <GridBuffer {...props} />,
    })[currentWindow.type]
  }

  const byTop = (a, b) =>
    a.top - b.top

  return status.stage !== 'ready'
    ? (<Status {...status} />)
    : (<section className={s.elseifplayer}>
      <section className={s.output}>
        {
          windows
            .sort(byTop)
            .filter(singleWindow
              ? ({ id }) => id === currentWindowId
              : () => true)
            .map(textWindow(inbox))
        }
      </section>
      <InputBox {...{
        inputType,
        windows,
        currentWindowId,
        sendMessage,
        onFullscreenRequest,
        setMenuOpen,
      }} />
    </section>)
}
