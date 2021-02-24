import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import UrlPlayer from '~/src/components/player/UrlPlayer'

export default function ({setTheme, theme, encodedUrl}) {
  const [url] = useState(decodeURIComponent(encodedUrl))

  useEffect(() => setTheme(theme), [theme])

  return (
    <main>
      <UrlPlayer url={url} />
    </main>)
}
