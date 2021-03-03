import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Link } from 'wouter-preact'

import GameEntry from
  '~/src/components/GameEntry/GameEntry'

import './style/GamesView.css'

const tutorialGame = {
  name: 'The Dreamhold',
  ifdb: 'https://ifdb.org/viewgame?id=3myqnrs64nbtwdaz',
  url: 'http://mirror.ifarchive.org/if-archive/games/zcode/dreamhold.z8'
}

export default function ({ setTheme, theme }) {
  useEffect(() => setTheme(theme), [theme])

  return (
    <main className='view games'>

      <h1>
        <a
          target='_blank'
          href='https://ifdb.org/'
          title='The Interactive Fiction Database'>
          IFDB
        </a> games
      </h1>

      <p>
        Choose one or <Link href='/'>
          go back
        </Link>.
      </p>

      <h2>
        Tutorial
      </h2>

      <p>
        If you are not familiar with Interactive Fiction,
        you should start with this tutorial game
        by&nbsp;Andrew&nbsp;Plotkin.
      </p>

      <ul>
        <li>
          <GameEntry {...{
            ...tutorialGame,
            theme
          }} />
        </li>
      </ul>

    </main>
  )
}
