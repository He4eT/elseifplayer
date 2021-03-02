import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import {
  compressToUTF16 as encode,
  decompressFromUTF16 as decode
} from 'lz-string'

import CheapGlkOte from 'cheap-glkote'

import TextBuffer from './TextBuffer'
import InputBox from './InputBox'
import Status from './Status'

import './player.css'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Preparing']
}

const runMachine = ({ Engine, file, handlers }) => {
  const vm = new Engine()
  const { glkInterface, sendFn } = CheapGlkOte(handlers)

  vm.prepare(file, glkInterface)
  vm.start()

  return { sendFn, instance: vm }
}

const Handlers = ({
  setStatus,
  setCurrentWindow,
  setInputType,
  setInbox
}) => ({
  onInit: _ => setStatus({ stage: 'ready' }),
  /* */
  onUpdateWindows: windows => {
    setCurrentWindow(windows
      .filter(x => x.type === 'buffer')
      .slice(-1)[0])
  },
  onUpdateInputs: setInputType,
  onUpdateContent: setInbox,
  onDisable: _ => setInputType(null),
  /* */
  onFileNameRequest: (tosave, usage, _, setFileName) => {
    setFileName({
      usage,
      filename: tosave ? 'save' : 'load'
    })
  },
  onFileRead: ({ filename }) => {
    if (filename === 'save') return null

    const lsName = prompt('Enter the name of the saved file:')

    const record = localStorage.getItem(`save-${lsName}`)
    return decode(record)
  },
  onFileWrite: ({ filename }, content) => {
    const lsName = prompt('Select a name for the saved file:')
    const record = encode(content)

    localStorage.setItem(`save-${lsName}`, record)
  },
  /* */
  onExit: _ => setInputType(null)
})

export default function ({ vmParts: { file, engine } }) {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [currentWindow, setCurrentWindow] = useState(null)
  const [inputType, setInputType] = useState(null)
  const [inbox, setInbox] = useState([])

  const [vm, setVm] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)

  useEffect(() => {
    const handlers = Handlers({
      setStatus,
      setCurrentWindow,
      setInputType,
      setInbox
    })

    const vm = runMachine({
      Engine: engine,
      file,
      handlers
    })

    setVm(vm)
  }, [file, engine])

  useEffect(() => {
    setSendMessage(_ => vm
      ? vm.sendFn
      : null)
  }, [vm])

  return status.stage !== 'ready'
    ? (<Status {...status} />)
    : (
      <section className='ifplayer'>
        <TextBuffer {...{
          inbox,
          currentWindow
        }} />
        <InputBox {...{
          currentWindow,
          inputType,
          sendMessage
        }} />
      </section>
      )
}
