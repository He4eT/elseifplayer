import { h } from 'preact'

export default function ({ themeList, currentTheme, setTheme }) {
  const options = themeList.map(theme => (
    <option value={theme}>
      {theme}
    </option>))

  return (
    <select
      value={currentTheme}
      onChange={({ target }) => setTheme(target.value)}>
      {options}
    </select>)
}
