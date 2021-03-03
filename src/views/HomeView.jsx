import { h } from 'preact'
import { Link } from 'wouter-preact'

import {
  useHashLocation,
  buildPlayLinkHref
} from '~/src/utils/utils.routing'

import LocalFileSelector from
  '~/src/components/FileSelector/LocalFileSelector'
import TargetURLSelector from
  '~/src/components/FileSelector/TargetURLSelector'
import ThemeSelector from
  '~/src/components/ThemeSelector/ThemeSelector'

import '~/src/style/views/HomeView.css'

export default function ({ themeEngine }) {
  const setLocation = useHashLocation()[1]

  return (
    <main className='view home'>
      <h1>
        ifplayer
      </h1>

      <section>
        <p>
          Interactive Fiction interpreter
          that runs right in your browser.
          <br />
          Source code can be found in this <a
            target='_blank'
            href='https://github.com/He4eT/ifplayer'>
            repository
          </a>.
        </p>
      </section>

      <hr />

      <section>
        <h3>
          Interface theme
        </h3>

        <ThemeSelector {...{
          themeEngine
        }} />

        <p>
          <small>
            Double-click the input field during the game
            to enter full-screen mode.
          </small>
        </p>
      </section>

      <hr />

      <section>
        <h3>
          Play a game from the list
        </h3>

        <p>
          <Link href='/top100'>
            IFDB Top 100 games
          </Link>
        </p>
      </section>

      <hr />

      <section>
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

        <p>
          <label>
            Local file: <br />
            <LocalFileSelector {...{
              setLocation,
              buildLink: buildPlayLinkHref,
              theme: themeEngine.currentTheme
            }} />
          </label>
        </p>

        <p>
          <label>
            Direct link: <br />
            <TargetURLSelector {...{
              setLocation,
              buildLink: buildPlayLinkHref,
              theme: themeEngine.currentTheme
            }} />
          </label>
        </p>
      </section>
    </main>)
}
