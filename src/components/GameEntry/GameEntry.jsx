import { h } from 'preact'
import { Link } from 'wouter-preact'

import {
  buildPlayLinkHref
} from '~/src/utils/utils.routing'

export default ({ name, ifdb, url, theme }) => (
  <div>
    <h4>{name}</h4>
    <a
      target='_blank'
      href={ifdb}>
      IFDB page
    </a>
    <span> | </span>
    <Link
      href={buildPlayLinkHref({ url, theme })}>
      Play
    </Link>
  </div>
)
