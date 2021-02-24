import { h } from 'preact'

import { useState, useEffect } from 'preact/hooks'
import { prepareVM } from '~/src/common/if'

const INITIAL_STATUS = {
  level: 'loading',
  details: 'Loading...'
}

export default function ({setTheme, theme, encodedUrl}) {
  const [url] = useState(decodeURIComponent(encodedUrl))
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [vm, setVM] = useState(null)

  useEffect(() => setTheme(theme), [theme])
  useEffect(prepareVM({
    url,
    setStatus,
    setVM
  }), [url])

  useEffect(() => {
    if (vm) console.log('success', vm)
  }, [vm])
  return (
    <main>
      {status.details}
    </main>)
}
