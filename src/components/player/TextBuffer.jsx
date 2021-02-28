import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import TextMessage from './TextMessage'

const trimImputPrompt = messages =>
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

  const { clear, text: inboxMessagesRaw } =
    currentInbox

  const eol = { style: 'endOfLine' }

  const incoming =
    inboxMessagesRaw
      /* Normalize. */
      .map(({ content }) =>
        content
          ? [...trimImputPrompt(content), eol]
          : [eol])
      /* Flatten. */
      .reduce((acc, x) =>
        acc.concat(x), [])

  return { clear, incoming }
}

export default function ({ inbox, currentWindow }) {
  const [messages, setMessages] = useState([])
  const textBufferEl = useRef(null)

  useEffect(() => {
    const { incoming, clear } =
      parseInbox(inbox, currentWindow)

    setMessages(clear
      ? incoming
      : messages.concat(incoming))

    setTimeout(() => {
      textBufferEl.current.scrollTop =
        textBufferEl.current.scrollHeight * 2
    }, 0)
  }, [inbox])

  return (
    <section
      ref={textBufferEl}
      className='textBuffer'>
      {messages.map(TextMessage)}
    </section>
  )
}
