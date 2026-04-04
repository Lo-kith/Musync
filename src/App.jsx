import { useState } from 'react'
import './App.css'
import './features.css'

// Context
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'

// Hooks
import { useSearch } from './hooks/useSearch'
import { usePlayer } from './hooks/usePlayer'
import { useSuggestions } from './hooks/useSuggestions'
import { useLibrary } from './hooks/useLibrary'
import { useMiniPlayer } from './hooks/useMiniPlayer'

// Components
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ApiDebugPanel from './components/ApiDebugPanel'
import SongGrid from './components/SongGrid'
import SuggestionList from './components/SuggestionList'
import PlayerBar from './components/PlayerBar'
import MiniPlayer from './components/MiniPlayer'
import AuthModal from './components/AuthModal'
import LibrarySidebar from './components/LibrarySidebar'
import AddToPlaylistModal from './components/AddToPlaylistModal'

// Inner app (needs auth context)
function AppInner() {
  const { user } = useAuth()

  // UI state
  const [showAuth, setShowAuth] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [playlistTargetSong, setPlaylistTargetSong] = useState(null) // song being added to playlist

  // Feature hooks
  const { query, setQuery, songs, loading, searchTotal, rawResponse, requestUrl, handleSearch } =
    useSearch()

  const { suggestions, loadSuggestions } = useSuggestions()

  const {
    favorites,
    playlists,
    isFavorite,
    toggleFavorite,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    addToPlaylist,
    removeFromPlaylist,
  } = useLibrary()

  const {
    audioRef,
    currentSong,
    isPlaying,
    progress,
    currentTime,
    audioDuration,
    queue,
    currentIndex,
    playSong,
    togglePlay,
    seek,
    nextSong,
    prevSong,
  } = usePlayer({
    onSongEnd: () => nextSong(suggestions),
    onSongChange: (song) => loadSuggestions(song.id),
  })

  const { showMini, dismissMini } = useMiniPlayer(currentSong)

  // Handlers
  const handlePlay = (song, songList) => playSong(song, songList)

  const handleLibraryOpen = () => {
    if (!user) { setShowAuth(true); return }
    setShowLibrary(true)
  }

  const handleAddToPlaylist = (song) => {
    if (!user) { setShowAuth(true); return }
    setPlaylistTargetSong(song)
  }

  const handleToggleFavorite = (song) => {
    if (!user) { setShowAuth(true); return }
    toggleFavorite(song)
  }

  // Create playlist from AddToPlaylistModal
  const handleCreateAndAdd = (name, song) => {
    const id = createPlaylist(name)
    addToPlaylist(id, song)
  }

  return (
    <div className="app">
      <audio ref={audioRef} />

      <Header
        onLoginClick={() => setShowAuth(true)}
        onLibraryClick={handleLibraryOpen}
      />

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSubmit={handleSearch}
        loading={loading}
      />

      {/* <ApiDebugPanel requestUrl={requestUrl} rawResponse={rawResponse} /> */}

      <SongGrid
        songs={songs}
        searchTotal={searchTotal}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onAddToPlaylist={handleAddToPlaylist}
        isLoggedIn={!!user}
      />

      <SuggestionList
        suggestions={suggestions}
        currentSong={currentSong}
        onPlay={handlePlay}
      />

    <PlayerBar
  currentSong={currentSong}
  isPlaying={isPlaying}
  progress={progress}
  currentTime={currentTime}
  audioDuration={audioDuration}
  queue={queue}
  currentIndex={currentIndex}
  suggestions={suggestions}
  onTogglePlay={togglePlay}
  onSeek={seek}
  onNext={() => nextSong(suggestions)}
  onPrev={prevSong}
  isLoggedIn={!!user}
  isFavorite={isFavorite}
  onToggleFavorite={handleToggleFavorite}
  onAddToPlaylist={handleAddToPlaylist}
/>


      {/* Mini Player popup (tab hidden / background play) */}
      {showMini && (
        <MiniPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          audioDuration={audioDuration}
          onTogglePlay={togglePlay}
          onNext={() => nextSong(suggestions)}
          onPrev={prevSong}
          onClose={dismissMini}
          onExpand={dismissMini}
        />
      )}

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Library Sidebar */}
      <LibrarySidebar
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        favorites={favorites}
        playlists={playlists}
        onPlay={(song) => handlePlay(song, [])}
        onToggleFavorite={toggleFavorite}
        onCreatePlaylist={createPlaylist}
        onDeletePlaylist={deletePlaylist}
        onRenamePlaylist={renamePlaylist}
        onRemoveFromPlaylist={removeFromPlaylist}
      />

      {/* Add to Playlist Modal */}
      {playlistTargetSong && (
        <AddToPlaylistModal
          song={playlistTargetSong}
          playlists={playlists}
          onAdd={addToPlaylist}
          onCreate={handleCreateAndAdd}
          onClose={() => setPlaylistTargetSong(null)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}