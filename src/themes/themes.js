import { useState } from 'preact/hooks'

import {themes} from './themeList.js'
import './themes.css'

const LS_THEME_KEY = 'elseifplayer/theme'
const DEFAULT_THEME = themes[0]

const getSavedTheme = () => {
  const savedTheme = localStorage.getItem(LS_THEME_KEY)
  return savedTheme || DEFAULT_THEME
}

const assertTheme = (theme) =>
  themes.includes(theme)
    ? theme
    : getSavedTheme()

export const useThemeEngine = (initialTheme = getSavedTheme()) => {
  const [currentTheme, setCurrentTheme] =
    useState(initialTheme)

  const setTheme = (theme) => {
    const newTheme = assertTheme(theme)

    setCurrentTheme(newTheme)
    localStorage.setItem(LS_THEME_KEY, newTheme)
  }

  return { currentTheme, setTheme, themes }
}
