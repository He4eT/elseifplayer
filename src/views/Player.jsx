import { h } from 'preact'

import { getFileExtension } from '~/src/utils/utils.routing'

import CheapGlkOte from 'cheap-glkote'
import engine from 'emglken/src/tads.js'

const blobToFile = fileName => theBlob =>{
  return new File([theBlob], fileName)
}

export default function ({setTheme, theme, encodedUrl}) {
  setTheme(theme)

  const url = decodeURIComponent(encodedUrl)
  const type = getFileExtension(url)

  const fetchGameFile = fetch(url)
    .then(response => (console.log(response), response))
    .then(response => response.blob())
    .then(blob => new Response(blob).arrayBuffer())
    .then(buffer => new Uint8Array(buffer))
    .then(file => {
      console.log(file)
      const {glkInterface, sendFn} = CheapGlkOte({
        onUpdateContent: messages => console.log(messages)
      })
      window.send = sendFn

      const vm = new engine()
      vm.prepare(file, glkInterface)
      vm.start()
    })
    .catch(console.log)

  return (
    <div>
      {theme} <br/>
      {type} <br/>
      {url}
    </div>)
}
