import { h } from 'preact'

export default function ({ setTargetName, setTargetUrl }) {
  const fileInputHandler = ({ target }) => {
    const file = target.files[0]
    setTargetName(file.name)
    setTargetUrl(`${URL.createObjectURL(file)}#${file.name}`)
    target.value = null
  }

  return (
    <input
      type='file'
      onChange={fileInputHandler} />)
}
