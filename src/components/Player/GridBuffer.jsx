import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import TextMessage from './TextMessage'

export default function ({ inbox, currentWindow }) {
  const [prevMessages, setPrevMessages] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const currentInbox =
      inbox.find(({ id }) =>
        id === currentWindow.id).lines

    const newOrPrev = (cur, prev) => i => {
      const byId = (list, i) =>
        list.find(({line}) => line === i)

      return byId(cur, i) || byId(prev, i)
    }

    const rawMessages =
      Array(currentWindow.gridheight)
        .fill(null)
        .map((_, i) => i)
        .map(newOrPrev(currentInbox, prevMessages))

    setPrevMessages(rawMessages)
    setMessages(rawMessages
      .map(x => x.content)
      .map(([x]) => x)
      .map(({text}) => text)
      .map(text => text.trim())
      .map(text =>
        text.replace('   ', ' / '))
      .map(text => ({
        style: 'grid',
        text}))
    )
  }, [inbox, currentWindow])

  return (
    <section
      className='buffer gridBuffer'>
        {messages.map(TextMessage)}
    </section>
  )
}
