import React, { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/HomePage.scss";
import img1 from "../../assets/img/222.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
    }, 9000); // Changement d'image toutes les 5 secondes

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
          <div class="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>

        {/* Section du diaporama */}

        <section id="diaporama">
          <h2>
            N'oubliez pas de réserver votre séance avant la fin du dernier mois
            de grossesse.
          </h2>
          <div id="diaporamaContainer">
            <button onClick={showPrevImage} id="imageBtnPrev">
              <FontAwesomeIcon icon={faChevronLeft} />
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
              <p>pas d'image trouvé</p>
            )}
            <button onClick={showNextImage} id="imageBtnNext">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        {/* Section des avis */}
        <section id="container-review">
          <h2 id="title-review">Derniers commentaires:</h2>
          <section id="sectionReviews">
            {/* Affichage des avis en fonction de l'état showAllReviews */}
            {showAllReviews
              ? review.map((review) => (
                  <article className="reviewArticle" key={review.id}>
                    <section>
                      <div id="circle"></div>
                      <h4>Par {review.User.username}</h4>

                      <p>
                        {review.content}. , publié le{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </section>
                  </article>
                ))
              : last4review.map((review) => (
                  <article className="reviewArticle" key={review.id}>
                    <section>
                      <h4>Par {review.User.username}</h4>
                      <p>
                        {review.content}. , publié le{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </section>
                  </article>
                ))}
          </section>
          {/* Bouton pour basculer entre l'affichage de tous les avis et seulement les 4 derniers */}
          <button id="button-review" onClick={toggleShowAllReviews}>
            {showAllReviews
              ? "Afficher moins de commentaires"
              : "Afficher tous les commentaires"}
          </button>
        </section>

        <section id="contact-container">
          <h2>Contactez-moi</h2>
          <div className="contact-page">
            <div className="contact-details">
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div>
                  <h4>Localisation où j'interviens</h4>
                  <p>Essonne, Seine et Marne, Paris alentours</p>
                </div>
              </div>

              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} />
                <div>
                  <h4>Téléphone</h4>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <div>
                  <h4>Adresse electronique</h4>
                  <p>contact@mondededouceur.com</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
