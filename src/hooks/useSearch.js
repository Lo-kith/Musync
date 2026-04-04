import { useState } from 'react'
import { searchSongs } from '../api/musicApi'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTotal, setSearchTotal] = useState(0)
  const [rawResponse, setRawResponse] = useState(null)
  const [requestUrl, setRequestUrl] = useState('')

  const handleSearch = async (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const { data, url } = await searchSongs(query)
      setRequestUrl(url)
      setSongs(data.data?.results || [])
      setSearchTotal(data.data?.total || 0)
      setRawResponse(data)
    } catch (err) {
      console.error(err)
      setSongs([])
      setRawResponse({ error: err.message })
    }
    setLoading(false)
  }

  return {
    query,
    setQuery,
    songs,
    loading,
    searchTotal,
    rawResponse,
    requestUrl,
    handleSearch,
  }
}