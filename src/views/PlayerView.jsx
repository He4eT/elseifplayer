import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/player/UrlPlayer'

const decode = encodedUrl => decodeURIComponent(encodedUrl)

export default function ({setTheme, theme, encodedUrl}) {
  useEffect(() => setTheme(theme), [theme])

  const [url, setUrl] = useState(decode(encodedUrl))

  useEffect(() => {
    setUrl(decode(encodedUrl))
  }, [encodedUrl])

  return (
    <main>
      <UrlPlayer url={url} />
    </main>)
}
