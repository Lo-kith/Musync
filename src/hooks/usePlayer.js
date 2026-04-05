import { useState, useRef, useEffect } from 'react'

export function usePlayer({ onSongEnd, onSongChange } = {}) {
  const audioRef = useRef(null)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const getBestUrl = (song) =>
    song.downloadUrl?.find((d) => d.quality === '320kbps')?.url ||
    song.downloadUrl?.find((d) => d.quality === '160kbps')?.url ||
    song.downloadUrl?.[song.downloadUrl.length - 1]?.url

  const playSong = (song, songList = []) => {
    if (audioRef.current) audioRef.current.pause()
    setCurrentSong(song)
    setIsPlaying(true)
    setProgress(0)

    if (songList.length > 0) {
      setQueue(songList)
      setCurrentIndex(songList.findIndex((s) => s.id === song.id))
    }

    onSongChange?.(song)
  }

  useEffect(() => {
    if (currentSong && audioRef.current) {
      const url = getBestUrl(currentSong)
      if (url) {
        audioRef.current.src = url
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
      setCurrentTime(audio.currentTime)
    }
    const onLoaded = () => setAudioDuration(audio.duration)
    const onEnded = () => {
      setIsPlaying(false)
      onSongEnd?.()
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [onSongEnd])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seek = (e) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (audioRef.current) {
      audioRef.current.currentTime = pct * audioRef.current.duration
    }
  }

  const nextSong = (suggestions = []) => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      playSong(queue[nextIndex], queue)
    } else if (suggestions.length > 0) {
      playSong(suggestions[0], suggestions)
    }
  }

  const prevSong = () => {
    if (queue.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      playSong(queue[prevIndex], queue)
    }
  }

  return {
    audioRef,
    currentSong,
    isPlaying,
    progress,
    currentTime,
    audioDuration,
    queue,
    currentIndex,
    playSong,
    togglePlay,
    seek,
    nextSong,
    prevSong,
  }
}