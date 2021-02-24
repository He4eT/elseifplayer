import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { prepareVM } from './common/if'

const INITIAL_STATUS = {
  stage: 'loading',
  details: 'Loading...'
}

export default function ({ url }) {
  const [status, setStatus] = useState(INITIAL_STATUS)

  const [vm, setVM] = useState(null)

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
