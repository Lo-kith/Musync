import { getImage, getArtists, formatDuration } from '../utils/formatters'

 function PlayerBar({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  audioDuration,
  queue,
  currentIndex,
  suggestions,
  onTogglePlay,
  onSeek,
  onNext,
  onPrev,
  // Library actions
  isLoggedIn,
  isFavorite,
  onToggleFavorite,
  onAddToPlaylist,
}) {
  if (!currentSong) return null

  const favorited = isFavorite?.(currentSong.id)

  return (
    <div className="player-bar">

      {/* Track Info + Library buttons */}
      <div className="player-track">
        <img src={getImage(currentSong)} alt="" className="player-art" />
        <div className="player-info">
          <span className="player-name">{currentSong.name}</span>
          <span className="player-artist">{getArtists(currentSong)}</span>
        </div>

        {/* ♥  +  — only visible when logged in */}
        {isLoggedIn && (
          <div className="player-lib-actions">
            <button
              className={`player-lib-btn heart ${favorited ? 'hearted' : ''}`}
              onClick={() => onToggleFavorite?.(currentSong)}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorited ? '♥' : '♡'}
            </button>
            <button
              className="player-lib-btn add"
              onClick={() => onAddToPlaylist?.(currentSong)}
              title="Add to playlist"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="player-controls">
        <button
          className="ctrl-btn"
          onClick={onPrev}
          disabled={queue.length === 0 || currentIndex === 0}
        >
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <polygon points="19 5 9 12 19 19 19 5" />
            <rect x="5" y="5" width="2" height="14" />
          </svg>
        </button>

        <button className="ctrl-btn" onClick={onTogglePlay}>
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            {isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" />
            )}
          </svg>
        </button>

        <button
          className="ctrl-btn"
          onClick={onNext}
          disabled={queue.length === 0 && suggestions.length === 0}
        >
          <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
            <polygon points="5 5 15 12 5 19 5 5" />
            <rect x="17" y="5" width="2" height="14" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="player-progress-area">
        <span className="time-label">{formatDuration(currentTime)}</span>
        <div className="progress-bar" onClick={onSeek}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-thumb" style={{ left: `${progress}%` }} />
        </div>
        <span className="time-label">{formatDuration(audioDuration)}</span>
      </div>

      {/* Quality Badges */}
      <div className="player-quality">
        {currentSong.downloadUrl?.map((d) => (
          <span
            key={d.quality}
            className={`quality-badge ${d.quality === '320kbps' ? 'hq' : ''}`}
          > 
            {d.quality}
          </span>
        ))}
      </div>

    </div>
  )
}

export default PlayerBar
