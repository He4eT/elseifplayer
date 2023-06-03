import { h } from 'preact'

import s from './MenuButton.module.scss'

export default MenuButton = ({ onClick }) => {
  return (
    <button
      aria-label='Menu'
      className={s.menuButton}
      onClick={() => setMenuOpen(true)}
    >
      =
    </button>
  )
}
