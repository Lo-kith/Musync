import { getImage, getArtists, formatDuration } from '../utils/formatters'

function SuggestionItem({ song, isActive, onClick }) {
  return (
    <div
      className={`suggestion-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img src={getImage(song)} alt={song.name} className="suggestion-art" />
      <div className="suggestion-info">
        <span className="suggestion-name">{song.name}</span>
        <span className="suggestion-artist">{getArtists(song)}</span>
      </div>
      <span className="suggestion-duration">{formatDuration(song.duration)}</span>
    </div>
  )
}

function SuggestionList({ suggestions, currentSong, onPlay }) {
  if (!suggestions.length || !currentSong) return null

  return (
    <div className="results-section suggestions-section">
      <h2 className="results-title">
        Similar to "{currentSong.name}"
        <span className="results-count">
          {/* <code className="endpoint-badge">
            GET /songs/{currentSong.id}/suggestions
          </code> */}
        </span>
      </h2>
      <div className="suggestion-list">
        {suggestions.map((song) => (
          <SuggestionItem
            key={song.id}
            song={song}
            isActive={currentSong?.id === song.id}
            onClick={() => onPlay(song, suggestions)}
          />
        ))}
      </div>
    </div>
  )
}
export default SuggestionList