import { useEffect, useRef, useState } from 'preact/hooks'

import TextMessage from '../TextMessage/TextMessage'

import * as s from '../../Player.module.scss'

const isFakeStatus = (w) =>
  w.height < 5

const trimInputPrompt = (messages) =>
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
      incoming: [],
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
      : currentInbox.clear,
  }
}

export default function TextBuffer ({ inbox, currentWindow }) {
  const [messages, setMessages] = useState([])
  const textBufferEl = useRef(null)

  useEffect(() => {
    const { incoming, clear } =
      parseInbox(inbox, currentWindow)

    setMessages((messages) => clear
      ? incoming
      : messages.concat(incoming))

    setTimeout(() => {
      const inputs =
        textBufferEl.current.querySelectorAll('.message.input')
      const lastInput =
        inputs[inputs.length - 1]

      lastInput
        ? lastInput.scrollIntoView()
        : textBufferEl.current.scrollTo({
          top: textBufferEl.current.scrollHeight,
          behavior: 'smooth',
        })
    }, 0)
  }, [currentWindow, inbox])

  const classes = () => [
    s.buffer,
    isFakeStatus(currentWindow)
      ? s.gridBuffer
      : s.textBuffer,
  ].join(' ')

  return (
    <section
      tabindex='0'
      ref={textBufferEl}
      className={classes()}
    >
      {messages.map(TextMessage)}
    </section>
  )
}
