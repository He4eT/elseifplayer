import { h, render } from 'preact'
import { Link, Route, Router, Switch } from 'wouter-preact'

import { useHashLocation } from '~/src/utils/utils.routing'

import Home from '~/src/views/Home'
import Player from '~/src/views/Player'

function App () {
  return (
    <Router hook={useHashLocation}>
      <div className='App'>
        <nav>
          <Link href='/'>Root</Link>
        </nav>

        <main>
          <Switch>
            <Route
              path='/'
              component={Home} />
            <Route
              path='/play/:theme/:encodedUrl'
              component={Player} />
            <Route path='/top100'>
              top100
            </Route>
            <Route>
              404
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
