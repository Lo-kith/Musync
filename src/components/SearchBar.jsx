function SearchBar({ query, setQuery, onSubmit, loading }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-box">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Search'}
        </button>
      </div>
    </form>
  )
}
export default SearchBar