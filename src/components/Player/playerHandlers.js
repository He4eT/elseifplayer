import {
  compressToUTF16 as encode,
  decompressFromUTF16 as decode
} from 'lz-string'

export const Handlers = ({
  setStatus,
  setWindows,
  setCurrentWindowId,
  setInputType,
  setInbox
}) => ({
  onInit: _ => {
    setStatus({ stage: 'ready' })
  },
  /* */
  onUpdateWindows: windows => {
    setWindows(windows)
  },
  onUpdateInputs: data => {
    if (data.length === 0) return null

    const { type, id } = data[0]
    setCurrentWindowId(id)
    setInputType(type)
  },
  onUpdateContent: inbox => {
    setInbox(inbox)
  },
  onDisable: _ => {
    setInputType(null)
  },
  /* */
  onFileNameRequest: (tosave, usage, _, setFileName) => {
    setFileName({
      usage,
      filename: prompt('Enter the filename')
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
  onExit: _ => {
    setInputType(null)
  }
})
