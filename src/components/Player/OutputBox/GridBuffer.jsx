import { useEffect, useState } from 'preact/hooks'

import TextMessage from './TextMessage'

export default function GridBuffer ({ inbox, currentWindow }) {
  const [prevMessages, setPrevMessages] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const currentInboxObj =
      inbox.find(({ id }) =>
        id === currentWindow.id)

    const currentInbox = currentInboxObj?.lines ?? []

    const newOrPrev = (cur, prev) => (i) => {
      const byId = (list, i) =>
        list.find(({ line }) => line === i)

      return byId(cur, i) || byId(prev, i)
    }

    const rawMessages =
      Array(currentWindow.gridheight)
        .fill(null)
        .map((_, i) => i)
        .map(newOrPrev(currentInbox, prevMessages))

    /* */

    const shouldUpdatePrev = (rawMessages, prevMessages) => {
      const serialize = JSON.stringify
      return serialize(rawMessages) !== serialize(prevMessages)
    }

    if (shouldUpdatePrev(rawMessages, prevMessages)) {
      setPrevMessages(rawMessages)
    }

    /* */


    const rawMessagesContent =
      rawMessages
        .map((x) => x.content)
        .flat()
        .map((message) => ({
          ...message,
          text: message.text.trim(),
        }))

    const isEmpty =
      rawMessagesContent
        .map(({ text }) => text.length)
        .every((l) => l === 0)

    const getGridStyle = ({ style }) => {
      if (['alert', 'normal'].includes(style)) return 'grid'
      return style || 'grid'
    }

    const messages =
      rawMessagesContent
        .map((message) => ({
          style: getGridStyle(message),
          text: message.text.replace('   ', ' / '),
        }))

    setMessages(isEmpty ? [] : messages)
  }, [inbox, currentWindow, prevMessages])

  return (
    <section
      className='buffer gridBuffer'>
      {messages.map(TextMessage)}
    </section>
  )
}
