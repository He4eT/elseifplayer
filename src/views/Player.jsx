import { h } from 'preact'

import { getFileExtension } from '~/src/utils/utils.routing'

export default function ({setTheme, theme, encodedUrl}) {
  setTheme(theme)

  const url = decodeURIComponent(encodedUrl)
  const type = getFileExtension(url)

  const fetchGameFile = fetch(url)
    .then(response => (console.log(response), response))
    .then(response => response.blob())
    .then(console.log)
    .catch(console.log)

  return (
    <div>
      {theme} <br/>
      {type} <br/>
      {url}
    </div>)
}
