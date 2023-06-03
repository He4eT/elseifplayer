import { h } from 'preact'
import { Link } from 'wouter-preact'

import {
  useHashLocation,
  buildPlayLinkHref,
} from '~/src/routing'

import LocalFileSelector from
  '~/src/components/FileSelector/LocalFileSelector'
import TargetURLSelector from
  '~/src/components/FileSelector/TargetURLSelector'
import ThemeSelector from
  '~/src/components/ThemeSelector/ThemeSelector'

import './HomeView.css'

export default function HomeView ({ themeEngine }) {
  const setLocation = useHashLocation()[1]

  return (
    <main className='view home'>
      <h1>
        ElseIFPlayer
      </h1>

      <section>
        <p>
          Interactive Fiction interpreter
          that runs right in your browser.
          <br />
          Source code can be found in this <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/He4eT/elseifplayer'>
            repository
          </a>.
        </p>
      </section>

      <hr />

      <section>
        <h2>
          Interface Theme
        </h2>

        <ThemeSelector {...{
          themeEngine,
        }} />

        <p>
          Preview and choose from available themes on the <Link href={'/#/themes/'}>
            themes page
          </Link>.
        </p>
        <p>
          <small>
            Double-click the input field during the game
            to enter full-screen mode.
          </small>
        </p>
      </section>

      <hr />

      <section>
        <h2>
          Play a Game from the List
        </h2>

        <p>
          <Link href={'/#/games/'}>
            IFDB games
          </Link>
        </p>
      </section>

      <hr />

      <section>
        <h2>
          Play the Game from a File
        </h2>

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
              theme: themeEngine.currentTheme,
            }} />
          </label>
        </p>

        <p>
          <label>
            Direct link: <br />
            <TargetURLSelector {...{
              setLocation,
              buildLink: buildPlayLinkHref,
              theme: themeEngine.currentTheme,
            }} />
          </label>
        </p>
      </section>
    </main>)
}
