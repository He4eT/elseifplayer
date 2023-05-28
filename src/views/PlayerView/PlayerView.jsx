import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/Player/UrlPlayer'
import MenuOverlay from '~/src/components/Player/MenuOverlay'

import './PlayerView.css'

const decode = (encodedUrl) => decodeURIComponent(encodedUrl)

export default function PlayerView ({
  theme, themeEngine, encodedUrl, singleWindow,
}) {
  useEffect(() => {
    themeEngine.setTheme(theme)
  }, [theme, themeEngine])

  const [targetUrl, setTargetUrl] = useState(decode(encodedUrl))

  useEffect(() => {
    setTargetUrl(decode(encodedUrl))
  }, [encodedUrl])

  return (
    <main>
      <MenuOverlay {...{
        themeEngine,
      }}/>
      <UrlPlayer {...{
        url: targetUrl,
        singleWindow,
      }} />
    </main>
  )
}
