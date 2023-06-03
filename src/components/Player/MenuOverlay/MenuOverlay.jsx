import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter-preact'

import ThemeSelector from
  '~/src/components/ThemeSelector/ThemeSelector'

import './MenuOverlay.css'

export default function MenuOverlay ({
  themeEngine, onFullscreenRequest, menuOpen, setMenuOpen,
}) {
  const dialog = useRef(null)

  useEffect(() => {
    const dialogOpen = dialog.current.open

    if (menuOpen && !dialogOpen) {
      dialog.current.showModal()
    }

    if (!menuOpen && dialogOpen) {
      dialog.current.close()
    }
  }, [menuOpen])

  useEffect(() => {
    const currentDialog = dialog.current
    const closeHandler = () => {
      setMenuOpen(false)
    }

    currentDialog.addEventListener('close', closeHandler)
    return () => currentDialog.removeEventListener('close', closeHandler)
  }, [dialog, setMenuOpen])


  return (
    <dialog ref={dialog} className='menu'>
      <section>
        <div>
          <button
            tabIndex={0}
            onClick={() => dialog.current.close()}
          >
            Close this menu
          </button>
        </div>

        <div className='appearance'>
          <button
            onClick={() => {
              dialog.current.close()
              onFullscreenRequest()
            }}
          >
            Full screen
          </button>
          <button
            onClick={() => themeEngine.setRandomTheme()}
          >
            Set a random theme
          </button>
          <label>
            Current theme:
            <ThemeSelector {...{
              themeEngine,
            }} />
          </label>
        </div>

        <div className='navigation'>
          <Link href="/" tabIndex={0}>
            ElseIfPlayer
          </Link>
        </div>
      </section>
    </dialog>
  )
}
