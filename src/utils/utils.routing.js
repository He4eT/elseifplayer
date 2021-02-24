import {
  useState, useEffect, useCallback
} from 'preact/hooks'

export const useHashLocation = () => {
  const currentLoc = () =>
    window.location.hash.replace('#', '') || '/'

  const [loc, setLoc] = useState(currentLoc())

  useEffect(() => {
    const handler = () => setLoc(currentLoc())

    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = useCallback(to =>
    (window.location.hash = to.replace('#/', '')), [])
  return [loc, navigate]
}

export const buildPlayLinkHref = (url, theme) =>
  `/#/play/${theme}/${encodeURIComponent(url)}`
