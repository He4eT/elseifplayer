import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import CheapGlkOte from 'cheap-glkote'

import TextBuffer from './TextBuffer'
import GridBuffer from './GridBuffer'

import InputBox from './InputBox'
import Status from './Status'

import { Handlers } from './playerHandlers'

import './player.css'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Preparing']
}

const runMachine = ({ engine: Engine, file, handlers }) => {
  const vm = new Engine()
  const { glkInterface, sendFn } = CheapGlkOte(handlers)

  vm.prepare(file, glkInterface)
  vm.start()

  return { sendFn, instance: vm }
}

export default function ({
  vmParts: { file, engine }, singleWindow
}) {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [windows, setWindows] = useState([])
  const [currentWindowId, setCurrentWindowId] = useState(null)
  const [inputType, setInputType] = useState(null)
  const [inbox, setInbox] = useState([])

  const [vm, setVm] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)

  useEffect(() => {
    const vm = runMachine({
      engine,
      file,
      handlers: Handlers({
        setStatus,
        setWindows,
        setCurrentWindowId,
        setInputType,
        setInbox
      })
    })

    setVm(vm)
  }, [file, engine])

  useEffect(() => {
    setSendMessage(_ => vm
      ? vm.sendFn
      : null)
  }, [vm])

  const textWindow = inbox => currentWindow => {
    const props = {
      inbox,
      currentWindow
    }

    return ({
      buffer: <TextBuffer {...props} />,
      grid: <GridBuffer {...props} />
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
              : _ => true)
            .map(textWindow(inbox))}
      </section>
      <InputBox {...{
        inputType,
        windows,
        currentWindowId,
        sendMessage
      }} />
    </section>)
}
