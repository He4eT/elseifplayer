import { Link } from 'wouter-preact'

import * as s from './ThemesView.module.scss'

const Preview = (themeEngine, theme) =>
  <section key={theme} className={[s.themePreview, theme].join(' ')}>
    <div className={s.output}>
      <div className={[s.message, s.input].join(' ')}>
        &gt; look
      </div>
      <div><br /></div>
      <div className={[s.message, s.subheader].join(' ')}>
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
    <main className={s.themes}>
      <h1>
        Themes Page
      </h1>

      <p>
        Choose one or <Link href='/'>
          go back</Link>.
      </p>

      <section className={[s.themePreview, s.current].join(' ')}>
        <h2>
          Current Theme
        </h2>
        <div className={s.output}>
          <div className={[s.message, s.input].join(' ')}>
            &gt; look
          </div>
          <div><br /></div>
          <div className={[s.message, s.subheader].join(' ')}>
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
