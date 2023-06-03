import { h } from 'preact'

import s from './MenuButton.module.scss'

export default MenuButton = ({ onClick }) => {
  return (
    <button
      aria-label='Menu'
      className={s.menuButton}
      onClick={onClick}
    >
      <svg
        class={s.menuIcon}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 10h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z'/>
      </svg>
    </button>
  )
}
