import { h } from 'preact'

export default function ({ emitName, emitURL }) {
  const fileInputHandler = ({ target }) => {
    const file = target.files[0]
    emitName(file.name)
    emitURL(`${URL.createObjectURL(file)}#${file.name}`)
    target.value = null
  }

  return (
    <input
      type='file'
      onChange={fileInputHandler} />)
}
