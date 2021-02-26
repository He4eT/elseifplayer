import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

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

  const incoming =
    inboxMessagesRaw
      /* Normalize. */
      .map(({ content }) =>
        content || [{ style: 'emptyLine' }])
      /* Flatten. */
      .reduce((acc, x) =>
        acc.concat(x), [])
      /* Collapse empty lines. */
      .reduce((acc, x, i, xs) => {
        if (x.style !== 'emptyLine') return [...acc, x]

        const prev = xs[i - 1] || {}
        return prev.style === 'emptyLine'
          ? acc
          : [...acc, x]
      }, [])

  return { clear, incoming }
}

export default function ({ inbox, currentWindow }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const { incoming, clear } =
      parseInbox(inbox, currentWindow)

    setMessages(clear
      ? incoming
      : messages.concat(incoming))
  }, [inbox])

  return (
    <div>
      {messages.map(({ text }) =>
        (<div>{text}</div>))}
    </div>
  )
}
