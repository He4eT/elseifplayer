import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Link } from 'wouter-preact'

import GameEntry from
  '~/src/components/GameEntry/GameEntry'

import './GamesView.css'

const tutorialGame = {
  name: 'The Dreamhold',
  ifdb: 'https://ifdb.org/viewgame?id=3myqnrs64nbtwdaz',
  url: 'http://mirror.ifarchive.org/if-archive/games/zcode/dreamhold.z8'
}

const top2019 = [
  [
    'Counterfeit Monkey',
    'https://ifdb.org/viewgame?id=aearuuxv83plclpl',
    'Check with cheap-glk',
    'http://mirror.ifarchive.org/if-archive/games/glulx/CounterfeitMonkey.gblorb'
  ],
  [
    'Lost Pig',
    'https://ifdb.org/viewgame?id=mohwfk47yjzii14w',
    'http://mirror.ifarchive.org/if-archive/games/zcode/LostPig.z8'
  ],
  [
    /* Works. Check inputs */
    'Anchorhead',
    'https://ifdb.org/viewgame?id=op0uw1gn1tjqmjt7',
    'http://ifarchive.org/if-archive/games/zcode/anchor.z8'
  ],
  /*[
    '80 DAYS',
    'https://ifdb.org/viewgame?id=du51t0qrhjqlnbij',
    'INKLEWRITER'
  ],*/
  [
    'Galatea',
    'https://ifdb.org/viewgame?id=urxrv27t7qtu52lb',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Galatea.zblorb'
  ],
  [
    /* Works. Check inputs */
    'Photopia',
    'https://ifdb.org/viewgame?id=ju778uv5xaswnlpl',
    'http://mirror.ifarchive.org/if-archive/games/zcode/photopia.z5'
  ],
  [
    'Spider and Web',
    'https://ifdb.org/viewgame?id=2xyccw3pe0uovfad',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Tangle.z5'
  ],
  /*[
    'Trinity',
    'https://ifdb.org/viewgame?id=j18kjz80hxjtyayw',
    'ZIP'
  ],*/
  /*[
    'Hadean Lands',
    'https://ifdb.org/viewgame?id=u58d0mlbfwcorfi',
    'COMMERCIAL'
  ],*/
  /*[
    'Superluminal Vagrant Twin',
    'https://ifdb.org/viewgame?id=5xzoz5wimz4xxha',
    'CORS https://v6p9d9t4.ssl.hwcdn.net/html/177384/Superluminal%20Vagrant%20Twin%20Webpage/files/Superluminal%20Vagrant%20Twin.gblorb'
  ],*/
  /*[
    'Birdland',
    'https://ifdb.org/viewgame?id=ap1651hvjldbuugj',
    'TWINE'
  ],*/
  [
    'Slouching Towards Bedlam',
    'https://ifdb.org/viewgame?id=032krqe6bjn5au78',
    'http://mirror.ifarchive.org/if-archive/games/competition2003/zcode/slouch/slouch.z5'
  ],
  [
    'Curses!',
    'https://ifdb.org/viewgame?id=plvzam05bmz3enh8',
    'http://mirror.ifarchive.org/if-archive/games/zcode/curses.z5'
  ],
  /*[
    'howling dogs',
    'https://ifdb.org/viewgame?id=mxj7xp4nffia9rbj',
    'TWINE'
  ],*/
  [
    'Violet',
    'https://ifdb.org/viewgame?id=4glrrfh7wrp9zz7b',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Violet.zblorb'
  ],
  [
    'The Wizard Sniffer',
    'https://ifdb.org/viewgame?id=uq18rw9gt8j58da',
    'http://ifarchive.org/if-archive/games/competition2017/The%20Wizard%20Sniffer/The_Wizard_Sniffer.gblorb'
  ],
  /*[
    'Eat Me',
    'https://ifdb.org/viewgame?id=yutkd9u0oeog4br1',
    'ZIP http://ifarchive.org/if-archive/games/competition2017/Eat%20Me/Eat%20Me/Gblorb.zip'
  ],*/
  /*[
    'Horse Master',
    'https://ifdb.org/viewgame?id=ogkcvv9l1q0aatpd',
    'TWINE'
  ],*/
  /*[
    'Mentula Macanus: Apocolocyntosis',
    'https://ifdb.org/viewgame?id=etul31tqgl3n22nl'
    'ZIP'
  ],*/
  [
    'Shade',
    'https://ifdb.org/viewgame?id=hsfc7fnl40k4a30q',
    'http://mirror.ifarchive.org/if-archive/games/zcode/shade.z5'
  ],
  [
    'Vespers',
    'https://ifdb.org/viewgame?id=6dj2vguyiagrhvc2',
    'http://mirror.ifarchive.org/if-archive/games/zcode/vespers.z8'
  ],
  /*[
    'Will Not Let Me Go',
    'https://ifdb.org/viewgame?id=67r2qc21m5nzexv1',
    'TWINE'
  ],*/
  /*[
    'Bee',
    'https://ifdb.org/viewgame?id=8pe83e92v4nvabic',
    'VARYTALE'
  ],*/
  /*[
    'Creatures Such As We',
    'https://ifdb.org/viewgame?id=8l9cdcd1tbt77hfl',
    'TWINE'
  ],*/
  /*[
    'Kerkerkruip',
    'https://ifdb.org/viewgame?id=f7zdhxmiraht53d1',
    'CORS http://downloads.kerkerkruip.org/Kerkerkruip-latest.gblorb'
  ],*/
  /*[
    'Midnight. Swordfight.',
    'https://ifdb.org/viewgame?id=2cuwjlvpybg8oaf0',
    'CORS http://www.castleprincessdragon.com/InteractiveFiction/MS/MidnightSwordfight.gblorb'
  ],*/
  [
    'Savoir-Faire',
    'https://ifdb.org/viewgame?id=p0cizeb3kiwzlm2p',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Savoir-Faire.zblorb'
  ],
  /*[
    'With Those We Love Alive',
    'https://ifdb.org/viewgame?id=445d989vuwlh4cvz',
    'TWINE'
  ],*/
  [
    'Aisle',
    'https://ifdb.org/viewgame?id=j49crlvd62mhwuzu',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Aisle.z5'
  ],
  /*[
    'Blue Lacuna',
    'https://ifdb.org/viewgame?id=ez2mcyx4zi98qlkh',
    'ZIP'
  ],*/
  [
    'Gun Mute',
    'https://ifdb.org/viewgame?id=xwedbibfksczn7eq',
    'http://mirror.ifarchive.org/if-archive/games/tads/GunMute.t3'
  ],
  /*[
    'The King of Shreds and Patches',
    'https://ifdb.org/viewgame?id=9ntef9expou18abv',
    'ZIP'
  ],*/
  /*[
    'A Mind Forever Voyaging',
    'https://ifdb.org/viewgame?id=4h62dvooeg9ajtfa',
    'CORS'
  ],*/
  /*[
    'SPY INTRIGUE',
    'https://ifdb.org/viewgame?id=zz6i7irfr70nvp7a',
    'TWINE'
  ],*/
  /*[
    'Wishbringer',
    'https://ifdb.org/viewgame?id=z02joykzh66wfhcl',
    'CORS'
  ],*/
  [
    'A Beauty Cold and Austere',
    'https://ifdb.org/viewgame?id=y9y7jozi0l76bb82',
    'http://ifarchive.org/if-archive/games/competition2017/A%20Beauty%20Cold%20and%20Austere/A_Beauty_Cold_and_Austere.gblorb'
  ],
  /*[
    'Cactus Blue Motel',
    'https://ifdb.org/viewgame?id=7e699ifb6u3767yr',
    'TWINE'
  ],*/
  [
    'Coloratura',
    'https://ifdb.org/viewgame?id=g0fl99ovcrq2sqzk',
    'http://mirror.ifarchive.org/if-archive/games/competition2013/glulx/coloratura/Coloratura.gblorb'
  ],
  /*[
    'Harmonia',
    'https://ifdb.org/viewgame?id=bkyia4k48od1ila',
    'TWINE'
  ],*/
  [
    'Lime Ergot',
    'https://ifdb.org/viewgame?id=b8mb4fcwmf1hrxl',
    'http://mirror.ifarchive.org/if-archive/games/glulx/Lime_Ergot.gblorb'
  ],
  [
    'Rameses',
    'https://ifdb.org/viewgame?id=0stz0hr7a98bp9mp',
    'http://mirror.ifarchive.org/if-archive/games/zcode/rameses.zblorb'
  ],
  /*[
    'Spellbreaker',
    'https://ifdb.org/viewgame?id=wqsmrahzozosu3r',
    'CORS'
  ],*/
  /*[
    'Suspended',
    'https://ifdb.org/viewgame?id=t47hei9uq10xoar8',
    'CORS'
  ],*/
  [
    'The Wand',
    'https://ifdb.org/viewgame?id=2jil5vbxmbv8riv1',
    'http://ifarchive.org/if-archive/games/glulx/Wand.ulx'
  ],
  /*[
    'Zork I',
    'https://ifdb.org/viewgame?id=0dbnusxunq7fw5ro',
    'ZIP'
  ],*/
  [
    '1893: A World\'s Fair Mystery',
    'https://ifdb.org/viewgame?id=00e0t7swrris5pg6',
    'http://mirror.ifarchive.org/if-archive/games/tads/1893.gam'
  ],
  [
    'Adventure',
    'https://ifdb.org/viewgame?id=fft6pu91j85y4acv',
    'http://mirror.ifarchive.org/if-archive/games/zcode/Advent.z5'
  ],
  [
    'Alias \'The Magpie\'',
    'https://ifdb.org/viewgame?id=yspn49v69hzc8rtb',
    'http://ifarchive.org/if-archive/games/competition2018/Alias%20The%20Magpie/Alias%20%27The%20Magpie%27.gblorb'
  ],
  /*[
    'De Baron',
    'https://ifdb.org/viewgame?id=weac28l51hiqfzxz',
    'ZIP'
  ],*/
  /*[
    'Bogeyman',
    'https://ifdb.org/viewgame?id=ltwvgb2lubkx82yi',
    'TWINE'
  ],*/
  [
    'Cragne Manor',
    'https://ifdb.org/viewgame?id=4x7nltu8p851tn4x',
    'http://mirror.ifarchive.org/if-archive/games/glulx/cragne.gblorb'
  ],
  [
    'The Edifice',
    'https://ifdb.org/viewgame?id=4tb9soabrb4apqzd',
    'http://mirror.ifarchive.org/if-archive/games/zcode/edifice.z5'
  ],
  [
    'Endless, Nameless',
    'https://ifdb.org/viewgame?id=7vtm1rq16hh3xch',
    'http://ifarchive.org/if-archive/games/zcode/nameless.z8'
  ],
  [
    'Everybody Dies',
    'https://ifdb.org/viewgame?id=lyblvftb8xtlo0a1',
    'http://mirror.ifarchive.org/if-archive/games/competition2008/glulx/everybodydies/EverybodyDies.gblorb'
  ],
  /*[
    'Fallen London',
    'https://ifdb.org/viewgame?id=y9m60ythcj2xn9r',
    'STORYNEXUS'
  ],*/
  [
    'Foo Foo',
    'https://ifdb.org/viewgame?id=ec6x9y8qcmsrxob9',
    'http://ifarchive.org/if-archive/games/springthing/2016/FooFoo.gblorb'
  ],
  [
    'The Gostak',
    'https://ifdb.org/viewgame?id=w5s3sv43s3p98v45',
    'http://mirror.ifarchive.org/if-archive/games/zcode/gostak.z5'
  ],
  /*[
    'The Hitchhiker\'s Guide to the Galaxy',
    'https://ifdb.org/viewgame?id=ouv80gvsl32xlion',
    'CORS http://www.douglasadams.com/creations/hhgg.z3'
  ],*/
  /*[
    'Hoist Sail for the Heliopause and Home',
    'https://ifdb.org/viewgame?id=ykccumi5xc5rltev',
    'CORS http://eblong.com/zarf/ftp/Heliopause.zblorb'
  ],*/
  /*[
    'Human Errors',
    'https://ifdb.org/viewgame?id=14oexa2wyym73glu',
    'TWINE'
  ],*/
  [
    'Inside the Facility',
    'https://ifdb.org/viewgame?id=stsdri5zh7a4i5my',
    'http://ifarchive.org/if-archive/games/competition2016/Inside%20the%20Facility/Facility.z8'
  ],
  [
    'Junior Arithmancer',
    'https://ifdb.org/viewgame?id=pw1rbjt1t4n4n87s',
    'http://ifarchive.org/if-archive/games/competition2018/Junior%20Arithmancer/Junior_Arithmancer.gblorb'
  ],
  [
    'Make It Good',
    'https://ifdb.org/viewgame?id=jdrbw1htq4ah8q57',
    'http://mirror.ifarchive.org/if-archive/games/zcode/MakeItGood.zblorb'
  ],
  [
    'Sub Rosa',
    'https://ifdb.org/viewgame?id=73nvz9yui87ub3sd',
    'http://mirror.ifarchive.org/if-archive/games/glulx/Sub_Rosa.gblorb'
  ],
  [
    'Suveh Nux',
    'https://ifdb.org/viewgame?id=xkai23ry99qdxce3',
    'http://mirror.ifarchive.org/if-archive/games/zcode/suvehnux.z5'
  ],
  /*[
    'their angelical understanding',
    'https://ifdb.org/viewgame?id=zpmfvbgolvfwbid',
    'TWINE'
  ],*/
  /*[
    'Toby\'s Nose',
    'https://ifdb.org/viewgame?id=xf5y04yekcrqtnc',
    'CORS http://www.castleprincessdragon.com/InteractiveFiction/TobysNose/Toby\'s%20Nose.gblorb'
  ],*/
  [
    'Varicella',
    'https://ifdb.org/viewgame?id=ywwlr3tpxnktjasd',
    'http://mirror.ifarchive.org/if-archive/games/zcode/vgame.z8'
  ]
].map(([name, ifdb, url]) => ({name, ifdb, url}))

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
            ...tutorialGame,
            theme
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
          Every four years
        </a>, Victor Gijsbers puts
        together a list of the top 50 IF games of all time.

        Here is an almost complete version of the <a
          target='_blank'
          href='https://ifdb.org/viewcomp?id=1lv599reviaxvwo7'>
          list for 2019
        </a>:
      </p>

      <ol>
        {top2019.map(game => (
          <li>
            <GameEntry {...{
              ...game,
              theme
            }} />
          </li>
        ))}
      </ol>

    </main>
  )
}
