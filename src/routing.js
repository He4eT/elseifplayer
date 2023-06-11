import {
  useCallback, useEffect, useState,
} from 'preact/hooks'

const windowLocation = () =>
  window.location.hash.replace('#', '') || '/'

export const buildPlayLinkHref = ({ url }) =>
  `/#/play/${encodeURIComponent(url)}`

export const extractView = (location) => {
  if (location === '/') return 'home'

  const currentView = location.split('/').filter(Boolean)[0]

  return currentView || ''
}

export const useHashLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState(windowLocation())

  useEffect(() => {
    const onHashChange = () => {
      let newLocation = windowLocation()
      if (newLocation !== currentLocation) {
        setCurrentLocation(newLocation)
        window.scrollTo(0, 0)
      }
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [currentLocation, setCurrentLocation])

  const navigate = useCallback((to) => {
    window.location.hash = to.replace('#/', '')
  }, [])

  return [currentLocation, navigate]
}
