import { h, render } from 'preact'
import { Route, Router, Switch } from 'wouter-preact'

import {
  useHashLocation,
  extractView
} from '~/src/utils/utils.routing'
import {
  useThemeEngine
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView/HomeView'
import GamesView from '~/src/views/GamesView/GamesView'
import PlayerView from '~/src/views/PlayerView/PlayerView'
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
          <Route path='/games/'>
            <GamesView />
          </Route>
          <Route path='/play/:encodedUrl'>
            {params => <PlayerView {...{
              ...themeEngine,
              ...params
            }} />}
          </Route>
          <Route path='/play/:encodedUrl/:theme'>
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
