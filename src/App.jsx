import { Route, Router, Switch } from 'wouter-preact'

import {
  useHashLocation,
  extractView,
} from './routing'
import {
  useThemeEngine,
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView/HomeView'
import GamesView from '~/src/views/GamesView/GamesView'
import ThemesView from '~/src/views/ThemesView/ThemesView'
import PlayerView from '~/src/views/PlayerView/PlayerView'
import NotFoundView from '~/src/views/NotFoundView'

export default function App () {
  const themeEngine = useThemeEngine()
  const [currentLocation] = useHashLocation()

  const playerView = (themeEngine, singleWindow) =>
    function view (params) {
      return (<PlayerView {...{
        themeEngine,
        singleWindow,
        ...params,
      }} />)
    }

  return (
    <Router hook={useHashLocation}>
      <div className={[
        'app',
        extractView(currentLocation),
        themeEngine.currentTheme].join(' ')}>

        <Switch>
          <Route path='/'>
            <HomeView {...{
              themeEngine,
            }} />
          </Route>
          <Route path='/games/'>
            <GamesView />
          </Route>
          <Route path='/themes/'>
            <ThemesView {...{
              themeEngine,
            }} />
          </Route>

          <Route path='/play/:encodedUrl'>
            { playerView(themeEngine, false) }
          </Route>
          <Route path='/play/:encodedUrl/:theme'>
            { playerView(themeEngine, false) }
          </Route>
          <Route path='/focus/:encodedUrl'>
            { playerView(themeEngine, true) }
          </Route>
          <Route path='/focus/:encodedUrl/:theme'>
            { playerView(themeEngine, true) }
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}
