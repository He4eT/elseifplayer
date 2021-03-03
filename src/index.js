import { h, render } from 'preact'
import { Route, Router, Redirect, Switch } from 'wouter-preact'

import {
  useHashLocation,
  extractView
} from '~/src/utils/utils.routing'
import {
  useThemeEngine
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView'
import GamesView from '~/src/views/GamesView'
import PlayerView from '~/src/views/PlayerView'
import NotFoundView from '~/src/views/NotFoundView'

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
          <Route path='/games/:theme'>
            {params => <GamesView {...{
              ...themeEngine,
              ...params
            }} />}
          </Route>
          <Route path='/games'>
            <Redirect
              to={`/games/${themeEngine.currentTheme}/`} />
          </Route>
          <Route path='/play/:theme/:encodedUrl'>
            {params => <PlayerView {...{
              ...themeEngine,
              ...params
            }} />}
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
