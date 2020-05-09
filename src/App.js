import React, { useState, useEffect } from 'react';
import './App.css';
require('dotenv').config();

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
      .then((response) => response.json())
      .then(setImages);
  }, []);

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

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}
