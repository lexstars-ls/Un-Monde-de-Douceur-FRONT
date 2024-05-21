import React, { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/HomePage.scss";
import img1 from "../../assets/img/222.png";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <Header />

      <main className="home-page-main">
        <section id="logo">
          <div className="imgContainer">
            <h1>Un Monde de Douceur</h1>
            <img src={img1} alt="bébé" />
          </div>
        </section>

        <section id="diaporama">
          <div id="diaporamaContainer">
            <button onClick={showPrevImage} id="imageBtnPrev">
              prev
            </button>
            {images.length > 0 ? (
              <div
                id="diaporamaImage"
                style={{
                  backgroundImage: `url(${images[currentIndex].imageUrl})`,
                }}
              />
            ) : (
              <div id="diaporamaImage">No images available</div>
            )}
            <button onClick={showNextImage} id="imageBtnNext">
              next
            </button>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
