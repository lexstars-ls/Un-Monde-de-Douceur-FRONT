import React, { useState, useEffect } from "react";

const Galerie = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/image/1");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des images");
      }
      const data = await response.json();
      setImages(data); // L'ensemble des données est retourné directement par l'API
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Galerie d'images</h1>
      <div className="images-container">
        {images.map((image) => (
          <img key={image.id} src={image.imageUrl} alt={`Image ${image.id}`} />
        ))}
      </div>
    </div>
  );
};

export default Galerie;
