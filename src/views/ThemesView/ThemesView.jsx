import { Link } from 'wouter-preact'

import './ThemesView.css'

const Preview = (themeEngine, theme) =>
  <section key={theme} className={`themePreview ${theme}`}>
    <div className='output'>
      <div className='message input'>
        &gt; look
      </div>
      <div><br /></div>
      <div className='message subheader'>
        {theme}
      </div>
      <div>
        Observe a vibrant demonstration of colors at work,
        showcasing their versatile usage right before your eyes.
      </div>
      <div><br /></div>
    </div>
    <button onClick={() => themeEngine.setTheme(theme)}>
      Apply this colors
    </button>
  </section>

export default function ThemesView ({ themeEngine }) {
  const themes = themeEngine
    .themes
    .map((theme) => Preview(themeEngine, theme))

  return (
    <main className='view themes'>
      <h1>
        Themes Page
      </h1>

      <p>
        Choose one or <Link href='/'>
          go back</Link>.
      </p>

      <h2>
        Current Theme
      </h2>

      <section className={'themePreview current'}>
        <div className='output'>
          <div className='message input'>
            &gt; look
          </div>
          <div><br /></div>
          <div className='message subheader'>
            Selected: {themeEngine.currentTheme}
          </div>
          <div>
            You can set random one with the button below
            or choose any theme from the list.
          </div>
          <div><br /></div>
        </div>
        <button onClick={() => themeEngine.setRandomTheme()}>
          Set a random theme
        </button>
      </section>

      <h2>
        Theme List
      </h2>
      <section>
        {themes}
      </section>
    </main>
  )
}
