import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

export function useLibrary() {
  const { user, getUserData, saveUserData } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [playlists, setPlaylists] = useState([])

  // Load from storage when user changes
  useEffect(() => {
    if (user) {
      const data = getUserData()
      setFavorites(data.favorites || [])
      setPlaylists(data.playlists || [])
    } else {
      setFavorites([])
      setPlaylists([])
    }
  }, [user])

  const persist = useCallback(
    (newFavs, newPlaylists) => {
      saveUserData({ favorites: newFavs, playlists: newPlaylists })
    },
    [saveUserData]
  )

  // ── Favorites ──────────────────────────────────────────────
  const isFavorite = (songId) => favorites.some((s) => s.id === songId)

  const toggleFavorite = (song) => {
    let updated
    if (isFavorite(song.id)) {
      updated = favorites.filter((s) => s.id !== song.id)
    } else {
      updated = [...favorites, song]
    }
    setFavorites(updated)
    persist(updated, playlists)
  }

  // ── Playlists ──────────────────────────────────────────────
  const createPlaylist = (name) => {
    const newPL = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date().toISOString(),
    }
    const updated = [...playlists, newPL]
    setPlaylists(updated)
    persist(favorites, updated)
    return newPL.id
  }

  const deletePlaylist = (playlistId) => {
    const updated = playlists.filter((p) => p.id !== playlistId)
    setPlaylists(updated)
    persist(favorites, updated)
  }

  const renamePlaylist = (playlistId, name) => {
    const updated = playlists.map((p) => (p.id === playlistId ? { ...p, name } : p))
    setPlaylists(updated)
    persist(favorites, updated)
  }

  const addToPlaylist = (playlistId, song) => {
    const updated = playlists.map((p) => {
      if (p.id !== playlistId) return p
      if (p.songs.some((s) => s.id === song.id)) return p // already in
      return { ...p, songs: [...p.songs, song] }
    })
    setPlaylists(updated)
    persist(favorites, updated)
  }

  const removeFromPlaylist = (playlistId, songId) => {
    const updated = playlists.map((p) =>
      p.id === playlistId ? { ...p, songs: p.songs.filter((s) => s.id !== songId) } : p
    )
    setPlaylists(updated)
    persist(favorites, updated)
  }

  return {
    favorites,
    playlists,
    isFavorite,
    toggleFavorite,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    addToPlaylist,
    removeFromPlaylist,
  }
}