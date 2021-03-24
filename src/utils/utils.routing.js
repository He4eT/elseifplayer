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
    handler()
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = useCallback(to =>
    (window.location.hash = to.replace('#/', '')), [])
  return [loc, navigate]
}

export const buildPlayLinkHref = ({ url }) =>
  `/#/play/${encodeURIComponent(url)}`

export const extractView = location => {
  const currentView = location.split('/').filter(Boolean)[0]
  return currentView || ''
}
