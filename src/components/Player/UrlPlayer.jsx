import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { engineByFilename } from './common/engines'

import Player from './Player'
import Status from './Status'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Loading']
}

const prepareVM = ({ url, setStatus, setParts }) => {
  const st = (stage, details) => args => {
    setStatus({ stage, details: [details] })
    return args
  }

  const cleanUrl = url => _ =>
    url.startsWith('blob:')
      ? url.replace(/#(.*)$/g, '')
      : url

  return Promise.resolve()
    .then(st('loading', 'Downloading file'))
    .then(cleanUrl(url))
    .then(fetch)
    .then(st('loading', 'Processing file'))
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => new Uint8Array(arrayBuffer))
    .then(st('loading', 'Downloading engine'))
    .then(file => setParts({
      file,
      engine: engineByFilename(url)
    }))
    .then(st('loading', 'Running'))
    .catch(e => {
      console.error(e)
      setStatus({ stage: 'fail', details: [e.message, url] })
    })
}

export default function ({ url, singleWindow }) {
  const [status, setStatus] = useState(INITIAL_STATUS)
  const [vmParts, setParts] = useState(null)

  useEffect(() => {
    setStatus(INITIAL_STATUS)
    setParts(null)

    prepareVM({ url, setStatus, setParts })
  }, [url])

  return vmParts
    ? (<Player {...{
        vmParts,
        singleWindow
      }} />)
    : (<Status {...status} />)
}
