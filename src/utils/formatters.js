export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function formatCount(num) {
  if (!num) return '0'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

export function getImage(song, quality = '150x150') {
  return (
    song.image?.find((i) => i.quality === quality)?.url ||
    song.image?.[song.image.length - 1]?.url ||
    ''
  )
}

export function getArtists(song) {
  return (
    song.artists?.primary?.map((a) => a.name).join(', ') ||
    song.artists?.all?.map((a) => a.name).join(', ') ||
    'Unknown'
  )
}