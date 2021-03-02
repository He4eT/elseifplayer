import { h, render } from 'preact'
import { Route, Router, Switch } from 'wouter-preact'

import {
  useHashLocation,
  extractView
} from '~/src/utils/utils.routing'
import {
  useThemeEngine
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView'
import PlayerView from '~/src/views/PlayerView'

import '@fontsource/open-sans'
import '~/src/style/base.css'

function App () {
  const themeEngine = useThemeEngine()
  const [location] = useHashLocation()

  return (
    <Router hook={useHashLocation}>
      <div className={[
        'app',
        extractView(location),
        themeEngine.currentTheme].join(' ')}>

        <Switch>
          <Route path='/'>
            <HomeView {...{
              themeEngine
            }} />
          </Route>
          <Route path='/play/:theme/:encodedUrl'>
            {params => <PlayerView {...{
              setTheme: themeEngine.setTheme,
              ...params
            }} />}
          </Route>
          <Route path='/top100'>
            top100
          </Route>
          <Route>
            <div>
              <h1>404</h1>
              <a href='/'>
                Home
              </a>
              |
              <a href='https://github.com/He4eT/ifplayer/issues'>
                Report bug
              </a>
            </div>
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
