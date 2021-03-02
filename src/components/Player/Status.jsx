import { h } from 'preact'

const INITIAL_STATUS = {
  stage: 'loading',
  details: 'Loading...'
}

const fail = details => (
  <div class="status fail">
    <h1>Error</h1>
    {details.map(x => (<p>{x}</p>))}
    <hr />
  </div>
)

const loading = details => (
  <div class="status loading">
    {details.map(x => (<div>{x}</div>))}
  </div>
)

export default ({ stage, details }) =>
  ({fail, loading})[stage](details)
