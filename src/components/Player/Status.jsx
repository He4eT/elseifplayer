import { h } from 'preact'
import { Link } from 'wouter-preact'

const fail = details => (
  <div class='status fail'>
    <h1>
      Error
    </h1>
    {details.map(x => (<p key={x}>{x}</p>))}
    <hr />
    <Link href='/'>
      Home
    </Link>
    |
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/He4eT/elseifplayer/issues'>
      Report bug
    </a>
  </div>
)

const loading = details => (
  <div class='status loading'>
    {details.map(x => (<div key={x}>{x}</div>))}
  </div>
)

export default ({ stage, details }) =>
  ({ fail, loading })[stage](details)
