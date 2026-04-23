const API_URL = "https://musyncbackend-7.onrender.com"

export async function searchSongs(query, limit = 8) {
  const url = `${API_URL}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`
  const res = await fetch(url)
  const data = await res.json()
  return { data, url }
}

export async function fetchSuggestions(songId, limit = 5) {
  const res = await fetch(`${API_URL}/songs/${songId}/suggestions?limit=${limit}`)
  const data = await res.json()
  return data.data || []
}