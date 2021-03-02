import { h } from 'preact'
import { Link } from 'wouter-preact'

export default () => (
  <main>
    <div class='status'>
      <h1>
        404
      </h1>
      <p>
        Page not found
      </p>
      <hr />
      <Link href='/'>
        Home
      </Link>
      |
      <a
        target='_blank'
        href='https://github.com/He4eT/ifplayer/issues'>
        Report bug
      </a>
    </div>
  </main>
)
