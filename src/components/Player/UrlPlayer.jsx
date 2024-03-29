import { useState, useEffect } from 'preact/hooks'

import { engineByFilename } from './common/engines'

import Player from './Player'
import Status from './Status/Status'

const INITIAL_STATUS = {
  stage: 'loading',
  details: ['Loading'],
}

const prepareVM = ({ url, setStatus, setParts }) => {
  const st = (stage, details) => (args) => {
    setStatus({ stage, details: [details] })
    return args
  }

  const cleanUrl = (url) =>
    url.startsWith('blob:')
      ? url.replace(/#(.*)$/g, '')
      : url

  const fetchWasm = (wasmBinaryName) =>
    fetch(wasmBinaryName)
      .then((response) => response.arrayBuffer())

  const checkResponse = (response) => {
    if (response.ok) return response
    throw new Error(response.statusText)
  }

  return Promise.resolve(url)
    .then(st('loading', 'Downloading file'))
    .then(cleanUrl)
    .then(fetch)
    .then(checkResponse)
    .then(st('loading', 'Processing file'))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => new Uint8Array(arrayBuffer))
    .then(st('loading', 'Downloading engine'))
    .then((storyfile) => {
      let parts = engineByFilename(url)
      return [storyfile, parts.engine, parts.wasmBinaryName]
    })
    .then(([storyfile, engine, wasmBinaryName]) => Promise.all([
      storyfile, engine, fetchWasm(wasmBinaryName),
    ]))
    .then(([storyfile, engine, wasmBinary]) => setParts({
      storyfile, engine, wasmBinary,
    }))
    .then(st('loading', 'Running'))
    .catch((e) => {
      console.error(e)
      setStatus({ stage: 'fail', details: [e.message, url] })
    })
}

export default function UrlPlayer ({
  url, singleWindow, onFullscreenRequest, setMenuOpen,
}) {
  const [status, setStatus] = useState(INITIAL_STATUS)
  const [vmParts, setParts] = useState(null)

  useEffect(() => {
    setStatus(INITIAL_STATUS)
    setParts(null)

    prepareVM({ url, setStatus, setParts })

    return () => setParts(null)
  }, [url])

  return vmParts
    ? (<Player {...{
      vmParts,
      onFullscreenRequest,
      setMenuOpen,
      singleWindow,
    }} />)
    : (<Status {...status} />)
}
