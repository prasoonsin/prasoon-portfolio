function BlogSearch({ search, setSearch }) {
  return (
    <div className="blog-search">

      <input
        type="search"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search articles"
      />

      <span
        className="blog-search-icon"
        aria-hidden="true"
      >
        ⌕
      </span>

    </div>
  );
}

export default BlogSearch;