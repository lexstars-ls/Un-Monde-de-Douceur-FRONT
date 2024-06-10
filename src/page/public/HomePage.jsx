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

  // Effet pour appliquer l'effet de transition après avoir scrollé de 10
// Effet pour appliquer l'effet de transition après avoir scrollé de 10
window.addEventListener("scroll", () => {
  const elements = document.getElementsByClassName("imgContainer");
  const pElement1 = document.getElementById("paragraphe1");
  const pElement2 = document.getElementById("paragraphe2");
  const diaporama = document.getElementById("diaporama");

  // logo et titre
  Array.from(elements).forEach((element) => {
    if (window.scrollY > 10) {
      element.classList.add("hover-effect-on-scroll");
    } else {
      element.classList.remove("hover-effect-on-scroll");
    }
  });

  // texte 1
  if (pElement1) {
    // Vérifiez si l'élément existe avant de le traiter
    if (window.scrollY > 100) {
      pElement1.classList.add("hover-effect-paragraphe1");
    } else {
      pElement1.classList.remove("hover-effect-paragraphe1");
    }
  }

  // texte 2
  if (pElement2) {
    if (window.scrollY > 150) {
      pElement2.classList.add("hover-effect-paragraphe2");
    } else {
      pElement2.classList.remove("hover-effect-paragraphe2");
    }
  }

  // diaporama
  if (diaporama) {
    if (window.scrollY > 200) {
      diaporama.classList.add("hover-effect-diaporama");
    } else {
      diaporama.classList.remove("hover-effect-diaporama");
    }
  }
});

  // test 2

  //TEST
  window.addEventListener("scroll", () => {
    const element = document.getElementById("contact-container");
    // const pElement = document.getElementById("test");

    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        element.classList.add("visible"); // Ajoutez la classe visible
      } else {
        element.classList.remove("visible"); // Retirez la classe visible
      }
    }

    // if (pElement) {
    //   const rect = pElement.getBoundingClientRect();
    //   const windowHeight =
    //     window.innerHeight || document.documentElement.clientHeight;

    //   if (rect.top <= windowHeight && rect.bottom >= 0) {
    //     pElement.classList.add("hover-effect-test"); // Ajoutez la classe visible
    //   } else {
    //     pElement.classList.remove("hover-effect-test"); // Retirez la classe visible
    //   }
    // }
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

          <div id="paragraphe1">
            <p>
              Bienvenue sur notre site spécialisé pour le bien-être de bébé, où
              nous accordons une grande importance à son épanouissement.
            </p>
          </div>

          <div id="paragraphe2">
            <p>
              Découvrez nos prestations personnalisées, telles que le moment de
              tendresse offert par notre bain des merveilles.
            </p>
          </div>

          <div className="background">
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

          {/* Section du diaporama */}

          <section id="diaporama">
          
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
            <h2>
              N'oubliez pas de réserver votre séance avant la fin du dernier
              mois de grossesse.
            </h2>
          </section>
          
        </section>

        {/* Section des avis */}
        <section id="container-review">
          <h2 id="title-review">Faites-nous confiance, tout comme eux.</h2>
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
