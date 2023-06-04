import { render } from 'preact'

import '@fontsource/open-sans'

import './style/base.scss'
import './style/components.scss'

import App from './App'

render(<App />, document.getElementById('root'))
