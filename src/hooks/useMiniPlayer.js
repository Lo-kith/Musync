import { useState, useEffect } from 'react'

export function useMiniPlayer(currentSong) {
  const [showMini, setShowMini] = useState(false)

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && currentSong) {
        setShowMini(true)
      } else {
        setShowMini(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [currentSong])

  // Also show mini player when user scrolls past the main player bar
  useEffect(() => {
    if (!currentSong) {
      setShowMini(false)
    }
  }, [currentSong])

  const dismissMini = () => setShowMini(false)
  const openMini = () => currentSong && setShowMini(true)

  return { showMini, dismissMini, openMini }
}