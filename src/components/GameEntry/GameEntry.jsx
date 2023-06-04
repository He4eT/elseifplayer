import { Link } from 'wouter-preact'

import {
  buildPlayLinkHref,
} from '~/src/routing'

export default function GameEntry ({ name, ifdb, url }) {
  return (
    <div>
      <h4>{name}</h4>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={ifdb}>
        IFDB page
      </a>
      <span> | </span>
      <Link
        href={buildPlayLinkHref({ url })}>
        Play
      </Link>
    </div>
  )
}
