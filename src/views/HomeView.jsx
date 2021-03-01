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
    <main className='view home'>
      <h1>
        ifplayer
      </h1>

      <p>
        Interactive Fiction interpreter
        that runs right in your browser.
        <br />
        Powered by <a
          target="_blank"
          href="https://github.com/He4eT/emglken">
          Emglken
        </a> and <a
          target="_blank"
          href="https://github.com/He4eT/cheap-glkote">
          cheap-glkote
        </a>.
      </p>
      <p>
        Source code can be found here: <a
          target="_blank"
          href="https://github.com/He4eT/ifplayer">
          ifplayer
        </a>.
      </p>
      <hr />
      <h3>
        Interface theme
      </h3>
      <p>
        <ThemeSelector {...{
          themeEngine
        }} />
        <br /><br />
        <small>
          Themes without borders
          are better suited for small screens.
        </small><br />
        <small>
          Double-click on the input field during the game
          to enter full-screen mode.
        </small>
      </p>
      <hr />
      <h3>
        Play a game from the list
      </h3>
      <p>
        <Link href='/top100'>IFDB Top 100 games</Link>
      </p>
      <hr />
      <h3>
        Play the game from a file
      </h3>
      <p>
        <details>
          <summary>Supported formats</summary>
          <ul>
            <li>TADS games (.t3, .gam);</li>
            <li>Z-machine games (.z3, .z4, .z5, .z8, .blorb);</li>
            <li>Glulx VM games (.gblorb, .ulx);</li>
            <li>Hugo games (.hex);</li>
            <li>Text-only games are supported;</li>
          </ul>
        </details>
      </p>
      <p className='play'>
        <label>
          <div>
            Local file:
          </div>
          <FileSelector {...{
            setTargetName,
            setTargetUrl
          }} />
        </label>
        <label>
          <div>
            Direct link:
          </div>
          <URLSelector {...{
            setTargetName,
            setTargetUrl
          }} />
        </label>
      </p>
      { targetUrl
        ? playButton(targetName, targetUrl, themeEngine.currentTheme)
        : null }
    </main>)
}
