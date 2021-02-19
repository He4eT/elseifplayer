export const themeList = [
  'default',
  'default-dark',
  'nord',
  'solarized-dark',
  'solarized-light',
  '_raw'
]

export const DEFAULT_THEME = themeList[0]

export const assertTheme = theme =>
  themeList.includes(theme)
    ? theme
    : DEFAULT_THEME
