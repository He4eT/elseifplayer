import { useState } from 'preact/hooks'

import '~/src/style/themes.css'

const themes = [
  'light',
  'dim',
  'dark',
  'solarized-light',
  'solarized-dark',
  'emo',
  'nord',
  'redrum',
  'toxin',
  'valve',
  'wasp'
]

const DEFAULT_THEME = themes[0]

const assertTheme = theme =>
  themes.includes(theme)
    ? theme
    : DEFAULT_THEME

export const useThemeEngine = (initialTheme = DEFAULT_THEME) => {
  const [currentTheme, setCurrentTheme] =
    useState(initialTheme)

  const setTheme = theme => {
    setCurrentTheme(assertTheme(theme))
  }

  return { currentTheme, setTheme, themes }
}
