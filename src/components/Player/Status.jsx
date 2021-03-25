import { h } from 'preact'
import { Link } from 'wouter-preact'

const fail = details => (
  <div class='status fail'>
    <h1>
      Error
    </h1>
    {details.map(x => (<p>{x}</p>))}
    <hr />
    <Link href='/'>
      Home
    </Link>
    |
    <a
      target='_blank'
      rel='noopener'
      href='https://github.com/He4eT/ifplayer/issues'>
      Report bug
    </a>
  </div>
)

const loading = details => (
  <div class='status loading'>
    {details.map(x => (<div>{x}</div>))}
  </div>
)

export default ({ stage, details }) =>
  ({ fail, loading })[stage](details)
