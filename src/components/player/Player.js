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
  onUpdateWindows: windows => {
    setCurrentWindow(windows
      .filter(x => x.type === 'buffer')
      .slice(-1)[0])
  },
  onUpdateInputs: setInputType,
  onUpdateContent: messagesByWindow => {
    const inbox =
      messagesByWindow
        .reduce((acc, {id, text}) => {
          acc[id] = text
            .map(({content}) => content || [null])
            .reduce((xs, x) => [...xs, ...x], [])
          return acc
        }, {})
    console.log(JSON.stringify(inbox, null, 1))
    setInbox(inbox)
  },
  onDisable: () => setInputType(null),
  onFileNameRequest: (tosave, usage, _, setFileName) => {
    setFileName({ filename: 'filename', usage })
  },
  onFileRead: filename => {
    return 'content'
  },
  onFileWrite: (filename, content) => {},
  onExit: () => setInputType(null)
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
    window.send = x => sendMessage(x, currentWindow)
  }, [sendMessage, currentWindow])

  return (
    <div>
      Player
    </div>
  )
}
