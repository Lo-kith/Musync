import { getImage, getArtists, formatDuration, formatCount } from '../utils/formatters'

export default function SongCard({
  song,
  isActive,
  isPlaying,
  onClick,
  isFavorite,
  onToggleFavorite,
  onAddToPlaylist,
  isLoggedIn,
}) {
  return (
    <div
      className={`song-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="song-art-wrap">
        <img src={getImage(song, '500x500')} alt={song.name} className="song-art" />
        <div className="song-art-overlay">
          <svg viewBox="0 0 24 24" fill="white" className="play-icon">
            {isActive && isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" />
            )}
          </svg>
        </div>
        {isActive && isPlaying && (
          <div className="now-playing-bars">
            <span /><span /><span /><span />
          </div>
        )}
      </div>

      <div className="song-info">
        <h3 className="song-name">{song.name}</h3>
        <p className="song-artist">{getArtists(song)}</p>
        <div className="song-meta">
          <span className="song-duration">{formatDuration(song.duration)}</span>
          <span className="song-plays">▶ {formatCount(song.playCount)}</span>
        </div>

        {/* Action buttons — only shown when logged in */}
        {isLoggedIn && (
          <div className="song-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className={`song-action-btn heart ${isFavorite ? 'hearted' : ''}`}
              onClick={() => onToggleFavorite(song)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
            <button
              className="song-action-btn add-pl"
              onClick={() => onAddToPlaylist(song)}
              title="Add to playlist"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}