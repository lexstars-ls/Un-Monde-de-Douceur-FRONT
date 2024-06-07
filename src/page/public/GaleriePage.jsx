import React, { useState, useEffect } from "react";
import "../../assets/style/GaleriePage.scss";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";

const Galerie = () => {
  const [galeries, setGaleries] = useState([]);

  useEffect(() => {
    const fetchGaleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery"); // route pour récupérer les galeries + leurs images
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des galeries");
        }
        const data = await response.json();
        setGaleries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGaleries();
  }, []);

  return (
    <>
    <Header />
    <main id="galerieMain">
      <div id="container-gallery">
        <h1>Galerie d'images</h1>
        {galeries.map((galerie) => (
          <div key={galerie.id}>
            <h2>{galerie.name}</h2>
            <p>Année: {galerie.year}</p>
            <div className="images-container">
              {galerie.Images.length > 0 ? (
                galerie.Images.map((image) => (
                  <img key={image.id} src={image.imageUrl} alt={`${image.id}`} />
                ))
              ) : (
                <h4>Cette galerie est vide pour le moment</h4>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </>
  
    
  );
};

export default Galerie;
