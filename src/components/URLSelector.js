import { h } from 'preact'

export default function ({ setTargetName, setTargetUrl }) {
  const urlRE = /^(http|https):\/\/[^ "]+$/

  const emit = url => {
    setTargetName(url)
    setTargetUrl(url)
  }

  const urlInputHandler = ({ target }) => {
    const url = target.value
    emit(urlRE.test(url)
      ? url
      : null)
  }

  return (
    <input
      type='text'
      placeholder='https://...'
      onInput={urlInputHandler} />)
}
