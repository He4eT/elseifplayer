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
    const closeHandler = () => {
      setMenuOpen(false)
    }

    dialog.current.addEventListener('close', closeHandler)
    return () => dialog.current.removeEventListener('close', closeHandler)
  }, [dialog])


  return (
    <dialog ref={dialog} className='menu'>
      <section>
        <div className='navigation'>
          <Link href="/">
            ElseIfPlayer
          </Link>
        </div>

        <div className='appearance'>
          <button
            onClick={() => {
              dialog.current.close()
              onFullscreenRequest()
            }}
          >
            Request fullscreen
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

        <div>
          <button
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
        </div>
      </section>
    </dialog>
  )
}
