import React from 'react';

export default function Photo({ index, image }) {
  return (
    <a
      className="image"
      key={index}
      href={image.links.html}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={image.urls.regular} alt={image.alt_description} />
    </a>
  );
}
