import { h } from 'preact'
import { useState } from 'preact/hooks'

import { Link } from 'wouter-preact'

import FileSelector from '~/src/components/FileSelector'
import URLSelector from '~/src/components/URLSelector'
import ThemeSelector from '~/src/components/ThemeSelector'

import { buildPlayLinkHref } from '~/src/utils/utils.routing'

const playButton = (name, url, theme) => (
  <Link href={buildPlayLinkHref(url, theme)}>
    Play "{name}"
  </Link>)

export default function ({ themeEngine }) {
  const [targetName, setTargetName] = useState(null)
  const [targetUrl, setTargetUrl] = useState(null)

  return (
    <main>
      <p>
        You can browse some <Link href='/top100'>
          games from IFDB
        </Link> or play a game from a file.
      </p>
      <ul>
        <li>
          <ThemeSelector {...{
            themeEngine
          }} />
        </li>
        <li>
          <FileSelector {...{
            setTargetName,
            setTargetUrl
          }} />
        </li>
        <li>
          <URLSelector {...{
            setTargetName,
            setTargetUrl
          }} />
        </li>
      </ul>
      { targetUrl
        ? playButton(targetName, targetUrl, themeEngine.currentTheme)
        : null }
    </main>)
}
