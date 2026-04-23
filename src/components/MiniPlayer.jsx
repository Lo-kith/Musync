import { getImage, getArtists, formatDuration } from '../utils/formatters'

function MiniPlayer({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  audioDuration,
  onTogglePlay,
  onNext,
  onPrev,
  onClose,
  onExpand,
}) {
  if (!currentSong) return null

  return (
    <div className="mini-player">
      {/* Album art with animated ring */}
      <div className={`mini-art-wrap ${isPlaying ? 'spinning' : ''}`}>
        <img src={getImage(currentSong, '150x150')} alt="" className="mini-art" />
      </div>

      <div className="mini-body">
        <div className="mini-info" onClick={onExpand}>
          <span className="mini-name">{currentSong.name}</span>
          <span className="mini-artist">{getArtists(currentSong)}</span>
        </div>

        {/* Progress bar */}
        <div className="mini-progress">
          <div
            className="mini-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mini-times">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(audioDuration)}</span>
        </div>

        {/* Controls */}
        <div className="mini-controls">
          <button className="mini-btn" onClick={onPrev} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <polygon points="19 5 9 12 19 19 19 5" />
              <rect x="5" y="5" width="2" height="14" />
            </svg>
          </button>
          <button className="mini-btn play" onClick={onTogglePlay}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
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
          <button className="mini-btn" onClick={onNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <polygon points="5 5 15 12 5 19 5 5" />
              <rect x="17" y="5" width="2" height="14" />
            </svg>
          </button>
        </div>
      </div>

      <button className="mini-close" onClick={onClose} title="Dismiss">✕</button>

      {/* Playing indicator */}
      {isPlaying && (
        <div className="mini-playing-dot">
          <span /><span /><span />
        </div>
      )}
    </div>
  )
}
export default MiniPlayer