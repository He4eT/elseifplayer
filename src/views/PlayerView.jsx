import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/Player/UrlPlayer'

import './style/PlayerView.css'

const decode = encodedUrl => decodeURIComponent(encodedUrl)

export default function ({ setTheme, theme, encodedUrl }) {
  useEffect(() => setTheme(theme), [theme])

  const [targetUrl, setTargetUrl] = useState(decode(encodedUrl))

  useEffect(() => {
    setTargetUrl(decode(encodedUrl))
  }, [encodedUrl])

  return (
    <main>
      <UrlPlayer url={targetUrl} />
    </main>
  )
}
