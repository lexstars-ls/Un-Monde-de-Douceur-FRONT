import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useState, useEffect } from "react";
import "../../assets/style/AdminReview.scss";

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null); // État pour stocker les messages (succès ou erreur)

  // Récupérer les avis depuis l'API au chargement du composant
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        throw new Error("Erreur lors de la récupération des reviews");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // useEffect pour récupérer les avis lors du premier rendu du composant
  useEffect(() => {
    fetchReviews(); // Appeler la fonction pour récupérer les avis
  }, []);

  // Fonction pour supprimer un avis
  const deleteReview = async (reviewId) => {
    try {
      const storedToken = localStorage.getItem("jwt"); // Récupérer le token JWT depuis le stockage local
      const response = await fetch(
        `http://localhost:3001/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête
          },
        }
      );
      if (response.ok) {
        setMessage("Avis supprimé avec succès");
        fetchReviews(); // Récupérer à nouveau les avis pour mettre à jour la liste
      } else {
        throw new Error("Erreur lors de la suppression de l'avis");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // useEffect pour faire disparaître le message après un délai
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // Effacer le message après 5 secondes
      }, 5000); // Délai de 5000 millisecondes (5 secondes)

      return () => clearTimeout(timer); // Nettoyage de l'effet
    }
  }, [message]); // Exécuter cet effet chaque fois que `message` change

  return (
    <>
      <HeaderAdmin />
      <main id="admin-review-main">
        <div>
          <p>{message}</p> {/* Afficher le message de succès ou d'erreur */}
          <div>
            <h2>Liste des avis</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  {review.content}{" "}
                  {/* Vous pouvez ajouter plus de détails ici */}
                  <button onClick={() => deleteReview(review.id)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminReviewPage;
