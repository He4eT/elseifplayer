import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { Route, Router, Switch } from 'wouter-preact'

import { useHashLocation } from '~/src/utils/utils.routing'
import {
  DEFAULT_THEME,
  themeList,
  assertTheme
} from '~/src/themes/themes'

import HomeView from '~/src/views/HomeView'
import PlayerView from '~/src/views/PlayerView'

import '~/src/style/base.css'

function App () {
  const [currentTheme, setCurrentTheme] =
    useState(DEFAULT_THEME)

  const setTheme = theme =>
    setCurrentTheme(assertTheme(theme))

  return (
    <Router hook={useHashLocation}>
      <div className={['app', currentTheme].join(' ')}>
        <Switch>
          <Route path='/'>
            <HomeView {...{
              setTheme,
              themeList,
              currentTheme
            }} />
          </Route>
          <Route path='/play/:theme/:encodedUrl'>
            {params => <PlayerView {...{
              setTheme,
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
