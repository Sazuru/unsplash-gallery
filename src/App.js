import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.scss';
import Search from './components/Search';
import PhotoList from './components/PhotoList';
require('dotenv').config();

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getPhotos = useCallback(() => {
    let apiUrl = `https://api.unsplash.com/photos?`;
    if (query)
      apiUrl = `https://api.unsplash.com/search/photos?&query=${query}`;

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;
        if (page === 1) setImages(imagesFromApi);
        setImages((images) => [...images, ...imagesFromApi]);
      });
  }, [page, query]);

  useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };

  if (!accessKey) {
    return (
      <a href="https://unsplash.com/developers" className="error">
        Grab Your Key Here!
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>
      <Search searchPhotos={searchPhotos} query={query} setQuery={setQuery} />
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <PhotoList images={images} />
      </InfiniteScroll>
    </div>
  );
}
