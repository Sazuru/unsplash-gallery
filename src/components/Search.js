import React from 'react';

export default function Search({ searchPhotos, query, setQuery }) {
  return (
    <form onSubmit={searchPhotos}>
      <input
        type="text"
        placeholder="Search Unsplash..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button>Search</button>
    </form>
  );
}
