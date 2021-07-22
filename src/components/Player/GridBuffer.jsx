import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import TextMessage from './TextMessage'

export default function ({ inbox, currentWindow }) {
  const [prevMessages, setPrevMessages] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const currentInboxObj =
      inbox.find(({ id }) =>
        id === currentWindow.id)

    const currentInbox = currentInboxObj?.lines ?? []

    const newOrPrev = (cur, prev) => i => {
      const byId = (list, i) =>
        list.find(({ line }) => line === i)

      return byId(cur, i) || byId(prev, i)
    }

    const rawMessages =
      Array(currentWindow.gridheight)
        .fill(null)
        .map((_, i) => i)
        .map(newOrPrev(currentInbox, prevMessages))

    setPrevMessages(rawMessages)

    const rawMessagesContent =
      rawMessages
        .map(x => x.content)
        .map(([x]) => x)
        .map(({ text }) => text)
        .map(text => text.trim())

    const isEmpty =
      rawMessagesContent
        .map(text => text.length)
        .every(l => l === 0)

    const messages =
      rawMessagesContent
        .map(text =>
          text.replace('   ', ' / '))
        .map(text => ({
          style: 'grid',
          text
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
