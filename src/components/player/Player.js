import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import CheapGlkOte from 'cheap-glkote'

import TextBuffer from './TextBuffer'
import InputBox from './InputBox'

const INITIAL_STATUS = {
  stage: 'loading',
  details: 'Preparing...'
}

const runMachine = ({ Engine, file, handlers }) => {
  console.log('runMachine')

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
    setFileName({ filename: 'filename', usage })
  },
  onFileRead: filename => {
    return 'content'
  },
  onFileWrite: (filename, content) => {},
  /* */
  onExit: _ => setInputType(null)
})

export default function ({ vmParts: { file, engine } }) {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [currentWindow, setCurrentWindow] = useState(null)
  const [inputType, setInputType] = useState(null)
  const [inbox, setInbox] = useState([])

  const [messages, setMessages] = useState([])

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

  useEffect(() => {
    window.send = x => sendMessage(x, currentWindow)
  }, [sendMessage, currentWindow])

  return status.stage !== 'ready'
    ? (<div>{status.details}</div>)
    : (<section>
        <TextBuffer {...{
          inbox,
          currentWindow
        }}/>
        <InputBox/>
      </section>)
}
