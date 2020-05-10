import React from 'react';
import Photo from './Photo';

export default function PhotoList({ images }) {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <Photo image={image} index={index} />
      ))}
    </div>
  );
}
