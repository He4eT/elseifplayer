import { h } from 'preact'

import * as s from './MenuButton.module.scss'

export default function MenuButton ({ onClick }) {
  return (
    <button
      aria-label='Menu'
      className={s.menuButton}
      onClick={onClick}
    >
      <svg
        class={s.menuIcon}
        viewBox='0 0 28 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='12' y='4' width='4' height='4' />
        <rect x='12' y='14' width='4' height='4' />
        <rect x='12' y='24' width='4' height='4' />
      </svg>
    </button>
  )
}
