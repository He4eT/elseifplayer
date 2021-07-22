import { h } from 'preact'
import { Link } from 'wouter-preact'

import {
  buildPlayLinkHref
} from '~/src/utils/utils.routing'

export default ({ name, ifdb, url }) => (
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
