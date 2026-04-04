const API_BASE = 'http://localhost:3000/api'

export async function searchSongs(query, limit = 8) {
  const url = `${API_BASE}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`
  const res = await fetch(url)
  const data = await res.json()
  return { data, url }
}

export async function fetchSuggestions(songId, limit = 5) {
  const res = await fetch(`${API_BASE}/songs/${songId}/suggestions?limit=${limit}`)
  const data = await res.json()
  return data.data || []
}