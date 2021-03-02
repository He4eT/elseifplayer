import { h } from 'preact'

const fail = details => (
  <div class='status fail'>
    <h1>Error</h1>
    {details.map(x => (<p>{x}</p>))}
    <hr />
    <a href='/'>
      Home
    </a>
    |
    <a href='https://github.com/He4eT/ifplayer/issues'>
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
