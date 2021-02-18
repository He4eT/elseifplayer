import { h } from 'preact'
import { useState } from 'preact/hooks'

import { Link } from 'wouter-preact'

import FileSelector from '~/src/components/FileSelector'
import URLSelector from '~/src/components/URLSelector'

import { buildPlayLinkHref } from '~/src/utils/utils.routing'

export default function () {
  const [targetName, setTargetName] = useState(null)
  const [targetURL, setTargetURL] = useState(null)

  const playButton = (
    <Link href={buildPlayLinkHref(targetURL)}>
      Play "{targetName}"
    </Link>)

  return (
    <main>
      <p>
        You can browse some <Link href='/top100'>
          games from IFDB
        </Link> or play a game from a file.
      </p>
      <ul>
        <li>
          <FileSelector
            emitName={setTargetName}
            emitURL={setTargetURL} />
        </li>
        <li>
          <URLSelector
            emitName={setTargetName}
            emitURL={setTargetURL} />
        </li>
      </ul>
      { targetURL ? playButton : null }
    </main>)
}
