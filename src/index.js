import { h, render } from 'preact'
import {
  Redirect, Switch, Route, Link, Router
} from 'wouter-preact'

import { useHashLocation } from '/src/utils/utils.routing'

function App () {
  return (
    <Router hook={useHashLocation}>
      <div className='App'>
        <nav>
          <Link href='/'>Root</Link>
          <Link href='/#/about'>About</Link>
          <Link href='/#/info'>Redirect</Link>
          <Link href='/#/404'>404</Link>
        </nav>

        <main>
          <Switch>
            <Route path='/'>
              Root
            </Route>
            <Route path='/about'>
              About
            </Route>
            <Route path='/info'>
              <Redirect to='/about' />
            </Route>
            <Route path='/:anything*'>
              404
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
