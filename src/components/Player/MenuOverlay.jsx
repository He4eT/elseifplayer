import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter-preact'

import ThemeSelector from
  '~/src/components/ThemeSelector/ThemeSelector'

import './MenuOverlay.css'

export default function MenuOverlay ({ themeEngine }) {
  const dialog = useRef(null)

  useEffect(() => {
    const closeHandler = () => {
      console.log('dialog closed')
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
          <button>Request fullscreen</button>
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
