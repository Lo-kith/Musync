import { useState } from 'react'
import { getImage, getArtists, formatDuration } from '../utils/formatters'

function SongRow({ song, onPlay, onRemove, removeLabel = '✕' }) {
  return (
    <div className="lib-song-row">
      <img src={getImage(song)} alt="" className="lib-song-art" onClick={() => onPlay(song)} />
      <div className="lib-song-info" onClick={() => onPlay(song)}>
        <span className="lib-song-name">{song.name}</span>
        <span className="lib-song-artist">{getArtists(song)}</span>
      </div>
      <span className="lib-song-dur">{formatDuration(song.duration)}</span>
      <button className="lib-remove-btn" onClick={() => onRemove(song.id)} title={removeLabel}>✕</button>
    </div>
  )
}

export default function LibrarySidebar({
  isOpen,
  onClose,
  favorites,
  playlists,
  onPlay,
  onToggleFavorite,
  onCreatePlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
  onRemoveFromPlaylist,
}) {
  const [tab, setTab] = useState('favorites') // 'favorites' | 'playlists'
  const [openPlaylistId, setOpenPlaylistId] = useState(null)
  const [renaming, setRenaming] = useState(null) // playlistId
  const [renameVal, setRenameVal] = useState('')
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [creatingPL, setCreatingPL] = useState(false)

  const handleRename = (pl) => {
    setRenaming(pl.id)
    setRenameVal(pl.name)
  }

  const submitRename = (e) => {
    e.preventDefault()
    if (renameVal.trim()) onRenamePlaylist(renaming, renameVal.trim())
    setRenaming(null)
  }

  const handleCreatePL = (e) => {
    e.preventDefault()
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim())
      setNewPlaylistName('')
      setCreatingPL(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`library-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title"> Your Library</h2>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="sidebar-tabs">
          <button
            className={`sidebar-tab ${tab === 'favorites' ? 'active' : ''}`}
            onClick={() => setTab('favorites')}
          >
            ♥ Favorites
            <span className="tab-count">{favorites.length}</span>
          </button>
          <button
            className={`sidebar-tab ${tab === 'playlists' ? 'active' : ''}`}
            onClick={() => setTab('playlists')}
          >
            🎵 Playlists
            <span className="tab-count">{playlists.length}</span>
          </button>
        </div>

        <div className="sidebar-content">
          {/* ── FAVORITES ── */}
          {tab === 'favorites' && (
            <div className="sidebar-section">
              {favorites.length === 0 ? (
                <div className="sidebar-empty">
                  <span>💔</span>
                  <p>No favorites yet. Heart a song to save it here.</p>
                </div>
              ) : (
                favorites.map((song) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    onPlay={onPlay}
                    onRemove={() => onToggleFavorite(song)}
                    removeLabel="Remove from favorites"
                  />
                ))
              )}
            </div>
          )}

          {/* ── PLAYLISTS ── */}
          {tab === 'playlists' && (
            <div className="sidebar-section">
              {/* Create playlist */}
              {creatingPL ? (
                <form className="pl-inline-form" onSubmit={handleCreatePL}>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Playlist name..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="pl-name-input"
                  />
                  <div className="pl-create-actions">
                    <button type="submit" className="pl-create-btn">Create</button>
                    <button type="button" className="pl-cancel-btn" onClick={() => setCreatingPL(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <button className="pl-new-btn" onClick={() => setCreatingPL(true)}>
                  + New Playlist
                </button>
              )}

              {playlists.length === 0 && (
                <div className="sidebar-empty">
                  <span>🎵</span>
                  <p>No playlists yet. Create one above.</p>
                </div>
              )}

              {playlists.map((pl) => (
                <div key={pl.id} className="pl-item">
                  <div
                    className="pl-item-header"
                    onClick={() => setOpenPlaylistId(openPlaylistId === pl.id ? null : pl.id)}
                  >
                    <div className="pl-item-left">
                      <span className="pl-chevron">{openPlaylistId === pl.id ? '▾' : '▸'}</span>
                      {renaming === pl.id ? (
                        <form onSubmit={submitRename} onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            value={renameVal}
                            onChange={(e) => setRenameVal(e.target.value)}
                            className="pl-rename-input"
                          />
                          <button type="submit" className="pl-rename-ok">✓</button>
                        </form>
                      ) : (
                        <span className="pl-item-name">{pl.name}</span>
                      )}
                    </div>
                    <div className="pl-item-actions" onClick={(e) => e.stopPropagation()}>
                      <span className="pl-song-count">{pl.songs.length}</span>
                      <button
                        className="pl-action-btn"
                        onClick={() => handleRename(pl)}
                        title="Rename"
                      >✎</button>
                      <button
                        className="pl-action-btn danger"
                        onClick={() => onDeletePlaylist(pl.id)}
                        title="Delete playlist"
                      >🗑</button>
                    </div>
                  </div>

                  {openPlaylistId === pl.id && (
                    <div className="pl-songs">
                      {pl.songs.length === 0 ? (
                        <p className="pl-empty-msg">No songs yet. Add songs from search.</p>
                      ) : (
                        pl.songs.map((song) => (
                          <SongRow
                            key={song.id}
                            song={song}
                            onPlay={onPlay}
                            onRemove={(id) => onRemoveFromPlaylist(pl.id, id)}
                            removeLabel="Remove from playlist"
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}