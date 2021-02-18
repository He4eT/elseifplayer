import { h } from 'preact'

export default function ({ emitName, emitURL }) {
  const reURL = /^(http|https):\/\/[^ "]+$/

  const emit = url => {
    emitName(url)
    emitURL(url)
  }

  const urlInputHandler = ({ target }) => {
    const url = target.value
    emit(reURL.test(url)
      ? url
      : null)
  }

  return (
    <input
      type='text'
      placeholder='https://...'
      onInput={urlInputHandler} />)
}
