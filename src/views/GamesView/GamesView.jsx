import { Link } from 'wouter-preact'

import GameEntry from
  '~/src/components/GameEntry/GameEntry'

import top2019 from './top2019'

import * as s from './GamesView.module.scss'

const tutorialGame = {
  name: 'The Dreamhold',
  ifdb: 'https://ifdb.org/viewgame?id=3myqnrs64nbtwdaz',
  url: 'https://mirror.ifarchive.org/if-archive/games/zcode/dreamhold.z8',
}

export default function GamesView () {
  return (
    <main className={s.games}>
      <h1>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://ifdb.org/'
          title='The Interactive Fiction Database'>
          IFDB
        </a> Games
      </h1>

      <p>
        Choose one or <Link href='/'>
          go back</Link>.
      </p>

      <section className={s.tutorial}>
        <h2>
          Tutorial
        </h2>

        <p>
          If you are not familiar with Interactive Fiction,
          you should start with this tutorial game
          by&nbsp;Andrew&nbsp;Plotkin:
        </p>

        <ul>
          <li>
            <GameEntry {...{
              ...tutorialGame,
            }} />
          </li>
        </ul>
      </section>

      <h2>
        Interactive Fiction Top 50 of All Time
      </h2>

      <p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://ifdb.org/search?comp&sortby=awn&searchfor=series%3AInteractive+Fiction+Top+50+of+All+Time'>
          Every four years </a>, Victor Gijsbers puts
        together a list of the top 50 IF games of all time.

        Here is an almost complete and slightly rearranged version of the <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://ifdb.org/viewcomp?id=1lv599reviaxvwo7'>
          list from 2019</a>:
      </p>

      <ol>
        {top2019.map((game) => (
          <li key={game.name}>
            <GameEntry {...{
              ...game,
            }} />
          </li>
        ))}
      </ol>

    </main>
  )
}
