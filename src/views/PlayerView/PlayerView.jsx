import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/Player/UrlPlayer'

import './PlayerView.css'

const decode = encodedUrl => decodeURIComponent(encodedUrl)

export default function ({
  setTheme, theme, encodedUrl, singleWindow
}) {
  useEffect(() => setTheme(theme), [setTheme, theme])

  const [targetUrl, setTargetUrl] = useState(decode(encodedUrl))

  useEffect(() => {
    setTargetUrl(decode(encodedUrl))
  }, [encodedUrl])

  return (
    <main>
      <UrlPlayer {...{
        url: targetUrl,
        singleWindow
      }} />
    </main>
  )
}
