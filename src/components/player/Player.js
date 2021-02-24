import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import CheapGlkOte from 'cheap-glkote'

const runMachine = ({ Engine, file, handlers }) => {
  console.log('runMachine')

  const vm = new Engine()
  const { glkInterface, sendFn } = CheapGlkOte(handlers)

  vm.prepare(file, glkInterface)
  vm.start()

  return { sendFn, instance: vm }
}

const Handlers = ({
  setCurrentWindow,
  setInputType,
  setInbox
}) => ({
  onInit: () => {},
  onUpdateWindows: windows => {},
  onUpdateInputs: type => {},
  onUpdateContent: messages => {
    console.log(messages)
  },
  onDisable: () => {},
  onFileNameRequest: (tosave, usage, _, setFileName) => {
    setFileName({ filename: 'filename', usage })
  },
  onFileRead: filename => {
    return 'content'
  },
  onFileWrite: (filename, content) => {},
  onExit: () => {}
})

export default function ({ vmParts: { file, engine } }) {
  const [currentWindow, setCurrentWindow] = useState(null)
  const [inputType, setInputType] = useState(null)
  const [inbox, setInbox] = useState([])

  const [messages, setMessages] = useState([])

  const [vm, setVm] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)

  useEffect(() => {
    const handlers = Handlers({
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
    window.send = sendMessage
  }, [sendMessage])

  return (
    <div>
      Player
    </div>
  )
}
