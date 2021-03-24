import { h } from 'preact'
import { Link } from 'wouter-preact'

import GameEntry from
  '~/src/components/GameEntry/GameEntry'

import top2019 from './top2019'

import './GamesView.css'

const tutorialGame = {
  name: 'The Dreamhold',
  ifdb: 'https://ifdb.org/viewgame?id=3myqnrs64nbtwdaz',
  url: 'http://mirror.ifarchive.org/if-archive/games/zcode/dreamhold.z8'
}

export default function () {
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
          go back</Link>.
      </p>

      <h3>
        Tutorial
      </h3>

      <p>
        If you are not familiar with Interactive Fiction,
        you should start with this tutorial game
        by&nbsp;Andrew&nbsp;Plotkin:
      </p>

      <ul>
        <li>
          <GameEntry {...{
            ...tutorialGame
          }} />
        </li>
      </ul>

      <br />

      <h3>
        Interactive Fiction Top 50 of All Time
      </h3>

      <p>
        <a
          target='_blank'
          href='https://ifdb.org/search?comp&sortby=awn&searchfor=series%3AInteractive+Fiction+Top+50+of+All+Time'>
          Every four years </a>, Victor Gijsbers puts
        together a list of the top 50 IF games of all time.

        Here is an almost complete version of the <a
          target='_blank'
          href='https://ifdb.org/viewcomp?id=1lv599reviaxvwo7'>
          list for 2019</a>:
      </p>

      <ol>
        {top2019.map(game => (
          <li>
            <GameEntry {...{
              ...game
            }} />
          </li>
        ))}
      </ol>

    </main>
  )
}
