import bocfel from 'emglken/src/bocfel.js'
import glulxe from 'emglken/src/glulxe.js'
import git from 'emglken/src/git.js'
import hugo from 'emglken/src/hugo.js'
import tads from 'emglken/src/tads.js'

const formats = [
  {
    id: 'bocfel',
    extensions: /z([3458]|blorb)$/,
    engine: bocfel
  },
  {
    id: 'glulxe',
    extensions: /(gblorb|ulx)$/,
    engine: glulxe
  },
  {
    id: 'git',
    extensions: /(gblorb|ulx)$/,
    engine: git
  },
  {
    id: 'hugo',
    extensions: /hex$/,
    engine: hugo
  },
  {
    id: 'tads',
    extensions: /(gam|t3)$/,
    engine: tads
  }
]

export const engineByFilename = filename => {
  const format = formats.find(x =>
    x.extensions.test(filename))

  if (format) {
    return format.engine
  } else {
    throw new Error(`Unsupported file type: ${filename}`)
  }
}
