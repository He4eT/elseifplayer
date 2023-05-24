import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import CheapGlkOte from 'cheap-glkote'

import TextBuffer from './TextBuffer'
import GridBuffer from './GridBuffer'

import InputBox from './InputBox'
import Status from './Status'

import { Handlers, unhandledRejectionHandler } from './playerHandlers'

import './player.css'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Preparing'],
}

const runMachine = ({ engine: Engine, wasmBinary, storyfile, handlers }) => {
  const { Dialog, GlkOte, send } = CheapGlkOte(handlers)
  const vm = new Engine()

  vm.init(storyfile, {
    Dialog,
    GlkOte,
    Glk: {},
    wasmBinary,
  })
  vm.start()

  return { send, instance: vm }
}

export default function Player ({
  vmParts: { storyfile, engine, wasmBinary }, singleWindow,
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
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [storyfile, engine, wasmBinary])

  useEffect(() => {
    setSendMessage(() => vm
      ? vm.send
      : null)
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
    : (<section className='ifplayer'>
      <section className='output'>{
        windows
          .sort(byTop)
          .filter(singleWindow
            ? ({ id }) => id === currentWindowId
            : () => true)
          .map(textWindow(inbox))}
      </section>
      <InputBox {...{
        inputType,
        windows,
        currentWindowId,
        sendMessage,
      }} />
    </section>)
}
