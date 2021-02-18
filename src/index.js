import { h, render } from 'preact'
import { Link, Route, Router, Switch } from 'wouter-preact'

import { useHashLocation } from '~/src/utils/utils.routing'

import Index from '~/src/views/Index'
import Player from '~/src/views/Player'

function App () {
  return (
    <Router hook={useHashLocation}>
      <div className='App'>
        <nav>
          <Link href='/'>Root</Link>
          <Link href='/#/about'>About</Link>
          <Link href='/#/404'>404</Link>
        </nav>

        <main>
          <Switch>
            <Route
              path='/'
              component={Index} />
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
