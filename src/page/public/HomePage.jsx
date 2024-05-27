import React, { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/HomePage.scss";
import img1 from "../../assets/img/222.png";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [review, setReview] = useState([]);
  const [last4review, setLast4Review] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    // Récupérer les images depuis l'API au chargement du composant
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/image/2");
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          throw new Error("Erreur lors de la récupération des images");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  // Fonction pour afficher l'image précédente dans le diaporama
  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  // Fonction pour afficher l'image suivante dans le diaporama
  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    // Récupérer les avis depuis l'API au chargement du composant
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/reviews");
        if (response.ok) {
          const data = await response.json();
          setReview(data);

          // Récupérer les 4 derniers avis
          const lastFourReviews = data.slice(Math.max(data.length - 4, 0));
          setLast4Review(lastFourReviews);
        } else {
          throw new Error("Erreur lors de la récupération des reviews");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  // Fonction pour basculer entre l'affichage de tous les avis et seulement les 4 derniers
  const toggleShowAllReviews = () => {
    setShowAllReviews((prevShowAll) => !prevShowAll);
  };

  // Effet pour le défilement automatique du diaporama
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Changement d'image toutes les 5 secondes

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [images.length]); // Exécuté à chaque changement du nombre d'images

  // Effet pour appliquer l'effet de défilement au survol
  window.addEventListener("scroll", () => {
    const elements = document.getElementsByClassName("imgContainer");

    Array.from(elements).forEach((element) => {
      if (window.scrollY > 100) {
        element.classList.add("hover-effect-on-scroll");
      } else {
        element.classList.remove("hover-effect-on-scroll");
      }
    });
  });

  return (
    <>
      <Header />

      <main className="home-page-main">
        {/* Section du logo */}
        <section id="logo">
          <div className="imgContainer">
            <h1>Un Monde de Douceur</h1>
            <img src={img1} alt="bébé" />
          </div>
        </section>

        {/* Section du diaporama */}
        <section id="diaporama">
          <div id="diaporamaContainer">
            <button onClick={showPrevImage} id="imageBtnPrev">
              prev
            </button>
            {/* Affichage de l'image actuelle du diaporama */}
            {images.length > 0 ? (
              <div
                id="diaporamaImage"
                style={{
                  backgroundImage: `url(${images[currentIndex].imageUrl})`,
                }}
              />
            ) : (
              <div id="diaporamaImage">pas d'image trouvé</div>
            )}
            <button onClick={showNextImage} id="imageBtnNext">
              next
            </button>
          </div>
        </section>

        {/* Section des avis */}
        <h3>Derniers commentaires:</h3>
        <section id="sectionReviews">
          {/* Affichage des avis en fonction de l'état showAllReviews */}
          {showAllReviews ? review.map((review) => (
            <article id="reviewArticle" key={review.id}>
              <section>
                <div id="circle"></div>
                Par {review.User.username}
                <p>
                  {review.content}. , publié le{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </section>
            </article>
          )) : last4review.map((review) => (
            <article id="reviewArticle" key={review.id}>
              <section>
                <div id="circle"></div>
                Par {review.User.username}
                <p>
                  {review.content}. , publié le{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </section>
            </article>
          ))}
           {/* Bouton pour basculer entre l'affichage de tous les avis et seulement les 4 derniers */}
           <button onClick={toggleShowAllReviews}>
            {showAllReviews ? "Afficher moins de commentaires" : "Afficher tous les commentaires"}
          </button>
         
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
