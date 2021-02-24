import { h, render } from 'preact'
import { Route, Router, Switch } from 'wouter-preact'

import { useHashLocation } from '~/src/utils/utils.routing'
import {
  useThemeEngine
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView'
import PlayerView from '~/src/views/PlayerView'

import '~/src/style/base.css'

function App () {
  const themeEngine = useThemeEngine()

  return (
    <Router hook={useHashLocation}>
      <div className={['app', themeEngine.currentTheme].join(' ')}>
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
            404
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
