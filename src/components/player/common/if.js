// import CheapGlkOte from 'cheap-glkote'
// import engine from 'emglken/src/tads.js'

import { engineByFilename } from './engines'

export const prepareVM = ({ url, setStatus, setVM }) => _ => {
  const st = (stage, details) => args => {
    setStatus({ stage, details })
    return args
  }

  return Promise.resolve()
    .then(st('loading', 'Downloading file...'))
    .then(_ => fetch(url))
    .then(st('loading', 'Processing file...'))
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => new Uint8Array(arrayBuffer))
    .then(st('loading', 'Downloading engine...'))
    .then(file => setVM({
      file,
      engine: engineByFilename(url)
    }))
    .then(st('loading', 'Running...'))
    .catch(e => {
      console.error(e)
      setStatus({ stage: 'fail', details: e.message })
    })
}

// export const fetchGameFile = url => fetch(url)
//   .then(response => (console.log(response), response))
//   .then(response => response.blob())
//   .then(blob => new Response(blob).arrayBuffer())
//   .then(buffer => new Uint8Array(buffer))
//   .then(file => {
//     const { glkInterface, sendFn } = CheapGlkOte({
//       onUpdateContent: messages => console.log(messages)
//     })
//     window.send = sendFn

//     const vm = new engine()
//     vm.prepare(file, glkInterface)
//     vm.start()
//   })
//   .catch(console.log)
