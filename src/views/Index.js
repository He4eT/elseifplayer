import { h } from 'preact'
import { useState } from 'preact/hooks'

import { Link } from 'wouter-preact'

import FileSelector from '~/src/components/FileSelector'
import URLSelector from '~/src/components/URLSelector'

export default function () {
  const [targetName, setTargetName] = useState(null)
  const [targetURL, setTargetURL] = useState(null)

  const playButton = (
    <Link href={`/#/play/default/${encodeURIComponent(targetURL)}`}>
      Play "{targetName}"
    </Link>)

  return (
    <main>
      <ul>
        <li>
          <URLSelector
            emitName={setTargetName}
            emitURL={setTargetURL} />
        </li>
        <li>
          <FileSelector
            emitName={setTargetName}
            emitURL={setTargetURL} />
        </li>
      </ul>
      { targetURL ? playButton : null }
    </main>)
}
