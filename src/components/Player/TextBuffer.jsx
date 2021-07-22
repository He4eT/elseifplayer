import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import TextMessage from './TextMessage'

const isFakeStatus = w =>
  w.height < 5

const trimInputPrompt = messages =>
  messages.length < 1
    ? messages
    : messages.slice(-1)[0].text === '>'
      ? messages.slice(0, messages.length - 1)
      : messages

const parseInbox = (inbox, currentWindow) => {
  const currentInbox =
    inbox.find(({ id }) =>
      id === currentWindow.id)

  if (!currentInbox) {
    return {
      clear: false,
      incoming: []
    }
  }

  const { text: inboxMessagesRaw } =
    currentInbox

  const eol = { style: 'endOfLine' }

  const incoming =
    inboxMessagesRaw
      /* Normalize. */
      .map(({ content }) =>
        content
          ? [...trimInputPrompt(content), eol]
          : [eol])
      /* Flatten. */
      .reduce((acc, x) =>
        acc.concat(x), [])

  return {
    incoming,
    clear: isFakeStatus(currentWindow)
      ? true
      : currentInbox.clear
  }
}

export default function ({ inbox, currentWindow }) {
  const [messages, setMessages] = useState([])
  const textBufferEl = useRef(null)

  useEffect(() => {
    const { incoming, clear } =
      parseInbox(inbox, currentWindow)

    setMessages(messages => clear
      ? incoming
      : messages.concat(incoming))

    setTimeout(() => {
      const inputs =
        textBufferEl.current.querySelectorAll('.message.input')
      const lastInput =
        inputs[inputs.length - 1]

      textBufferEl.current.scrollTop =
        lastInput
          ? lastInput.offsetTop
          : textBufferEl.current.scrollHeight * 2
    }, 0)
  }, [currentWindow, inbox])

  const classes = [
    isFakeStatus(currentWindow)
      ? 'gridBuffer'
      : 'textBuffer',
    'buffer'].join(' ')

  return (
    <section
      tabindex='0'
      ref={textBufferEl}
      className={classes}>
        {messages.map(TextMessage)}
    </section>
  )
}
