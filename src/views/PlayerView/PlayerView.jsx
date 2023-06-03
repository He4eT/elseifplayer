import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/Player/UrlPlayer'
import MenuOverlay from '~/src/components/Player/MenuOverlay/MenuOverlay'

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

  const [menuOpen, setMenuOpen] = useState(false)

  const onFullscreenRequest = () => {
    document.documentElement.requestFullscreen()
  }

  return (
    <main>
      <MenuOverlay {...{
        themeEngine,
        onFullscreenRequest,
        menuOpen,
        setMenuOpen,
      }}/>
      <UrlPlayer {...{
        url: targetUrl,
        onFullscreenRequest,
        setMenuOpen,
        singleWindow,
      }} />
    </main>
  )
}
