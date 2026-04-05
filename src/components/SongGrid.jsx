import SongCard from './SongCard'
import { formatCount } from '../utils/formatters'

function SongGrid({
  songs,
  searchTotal,
  currentSong,
  isPlaying,
  onPlay,
  isFavorite,
  onToggleFavorite,
  onAddToPlaylist,
  isLoggedIn,
}) {
  if (!songs.length) return null

  return (
    <div className="results-section">
      <h2 className="results-title">
        Results <span className="results-count">{formatCount(searchTotal)} found</span>
      </h2>
      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isActive={currentSong?.id === song.id}
            isPlaying={isPlaying}
            onClick={() => onPlay(song, songs)}
            isFavorite={isFavorite(song.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToPlaylist={onAddToPlaylist}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  )
}
export default SongGrid