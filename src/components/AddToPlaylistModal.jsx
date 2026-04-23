import { useState } from 'react'

 function AddToPlaylistModal({ song, playlists, onAdd, onCreate, onClose }) {
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    onCreate(newName.trim(), song)
    setNewName('')
    setCreating(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 className="playlist-modal-title">Add to Playlist</h3>
        <p className="playlist-modal-song">"{song?.name}"</p>

        {playlists.length === 0 && !creating && (
          <p className="playlist-empty">No playlists yet. Create one below.</p>
        )}

        <div className="playlist-list">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              className="playlist-pick-btn"
              onClick={() => { onAdd(pl.id, song); onClose() }}
            >
              <span className="pl-icon">🎵</span>
              <span className="pl-name">{pl.name}</span>
              <span className="pl-count">{pl.songs.length} songs</span>
            </button>
          ))}
        </div>

        {creating ? (
          <form className="pl-create-form" onSubmit={handleCreate}>
            <input
              autoFocus
              type="text"
              placeholder="Playlist name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="pl-name-input"
            />
            <div className="pl-create-actions">
              <button type="submit" className="pl-create-btn">Create & Add</button>
              <button type="button" className="pl-cancel-btn" onClick={() => setCreating(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button className="pl-new-btn" onClick={() => setCreating(true)}>
            + New Playlist
          </button>
        )}
      </div>
    </div>
  )
}
export default AddToPlaylistModal
