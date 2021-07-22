import { h } from 'preact'

export default function ({ themeEngine }) {
  const options = themeEngine.themes.map(theme => (
    <option
      key={theme}
      value={theme}>
        {theme}
    </option>))

  return (
    <select
      value={themeEngine.currentTheme}
      onChange={({ target }) =>
        themeEngine.setTheme(target.value)}>
      {options}
    </select>
  )
}
