import { encode, decode } from 'base32768'

export const Handlers = ({
  setStatus,
  setWindows,
  setCurrentWindowId,
  setInputType,
  setInbox,
}) => ({
  onInit: () => {
    setStatus({ stage: 'ready' })
  },
  /* */
  onUpdateWindows: (windows) => {
    setWindows(windows)
  },
  onUpdateInputs: (data) => {
    if (data.length === 0) return null

    const { type, id } = data[0]
    setCurrentWindowId(id)
    setInputType(type)
  },
  onUpdateContent: (inbox) => {
    setInbox(inbox)
  },
  onDisable: () => {
    setInputType(null)
  },
  /* */
  onFileNameRequest: (_tosave, usage, _gameId, setFileName) => {
    setFileName({
      usage,
      filename: prompt('Enter the filename'),
    })
  },
  onFileRead: ({ filename }) => {
    const content = localStorage.getItem(`fake-fs/${filename}`)
    return decode(content)
  },
  onFileWrite: ({ filename }, content) => {
    localStorage.setItem(`fake-fs/${filename}`, encode(content))
  },
  /* */
  onExit: () => {
    setInputType('finished')
  },
})

export const unhandledRejectionHandler = (onExit) => (event) => {
  if (event.reason.name === 'ExitStatus' || event.reason.message === 'Program terminated with exit(0)') {
    onExit()
  } else {
    console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').')
  }
  event.preventDefault()
}
