import { useState } from 'react'
import { fetchSuggestions } from '../api/musicApi'

export function useSuggestions() {
  const [suggestions, setSuggestions] = useState([])

  const loadSuggestions = async (songId) => {
    try {
      const data = await fetchSuggestions(songId)
      setSuggestions(data)
    } catch {
      setSuggestions([])
    }
  }

  const clearSuggestions = () => setSuggestions([])

  return { suggestions, loadSuggestions, clearSuggestions }
}