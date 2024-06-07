import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import de la fonction jwtDecode
import "../../assets/style/UserPage.scss";
import Header from "../../components/public/Header";

function UserProfilePage() {
  const [userData, setUserData] = useState(null); // État pour les données utilisateur
  const [message, setMessage] = useState(null); // État pour les messages d'erreur ou de succès
  const [deleteMessage, setDeleteMessage] = useState(null); // État pour les messages de suppression
  const [reviewMessage, setReviewMessage] = useState(null); // État pour les messages concernant les avis
  const [reviews, setReviews] = useState([]); // État pour stocker les avis de l'utilisateur
  const [isDeleted, setIsDeleted] = useState(false); // État pour suivre si l'utilisateur a été supprimé

  const token = localStorage.getItem("jwt"); // Récupération du token JWT depuis le localStorage
  const decodedToken = jwtDecode(token); // Décodage du token JWT pour obtenir les données utilisateur

  const navigate = useNavigate(); // Hook pour la navigation

// Effet pour récupérer les données de l'utilisateur
useEffect(() => {
  if (isDeleted) return; // Si l'utilisateur est supprimé, ne pas récupérer les données

  const fetchUserData = async () => {
    try {
      const userDataResponse = await fetch(
        // Spécification de la route avec l'ID décodé de l'utilisateur
        `http://localhost:3001/api/users/${decodedToken.dataId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête de la requête
          },
        }
      );
      if (userDataResponse.ok) {
        const userData = await userDataResponse.json(); // Conversion des données en JSON
        setUserData(userData.data); // Mise à jour des données utilisateur
      } else {
        throw new Error(
          "Erreur lors de la récupération des données de l'utilisateur, essayez de vous reconnecter"
        );
      }
    } catch (error) {
      setMessage(error.message); // Mise à jour du message d'erreur
    }
  };

  fetchUserData();
}, [decodedToken.dataId, token, isDeleted]); // Dépendances de l'effet, l'effet se déclenche chaque fois que l'un de ces éléments change


  // Effet pour récupérer les avis de l'utilisateur
  useEffect(() => {
    if (isDeleted) return; // Si l'utilisateur est supprimé, ne pas récupérer les avis

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/reviews/ownReview/${decodedToken.dataId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data); // Mise à jour des avis
        } else {
          throw new Error(
            "Erreur lors de la récupération des avis de l'utilisateur"
          );
        }
      } catch (error) {
        setReviewMessage(error.message); // Mise à jour du message d'erreur pour les avis
        console.error(error);
      }
    };

    fetchReviews();
  }, [decodedToken.dataId, token, isDeleted]); // Dépendances de l'effet

  // Fonction pour supprimer l'utilisateur
  const handleDeleteUser = async () => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const deleteResponse = await fetch(
        `http://localhost:3001/api/users/ownUser/${decodedToken.dataId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (deleteResponse.ok) {
        setDeleteMessage("Utilisateur supprimé avec succès"); // Mise à jour du message de suppression
        localStorage.removeItem("jwt"); // Suppression du token JWT
        setIsDeleted(true); // Mise à jour de l'état de suppression
        navigate("/"); // Redirection vers la page d'accueil
      } else {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      setDeleteMessage(error.message); // Mise à jour du message d'erreur
    }
  };

  // Fonction pour mettre à jour le profil de l'utilisateur
  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const newUsername = event.target.username.value;
    const newEmail = event.target.email.value;
    const newPassword = event.target.password.value;
    const currentPassword = event.target.currentPassword.value;

    const updateData = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
      currentPassword: currentPassword,
    };

    try {
      const updateResponse = await fetch(
        `http://localhost:3001/api/users/${decodedToken.dataId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (updateResponse.ok) {
        setMessage("Informations de l'utilisateur mises à jour avec succès");
        setUserData({
          ...userData,
          username: newUsername,
          email: newEmail,
        });
      } else {
        throw new Error(
          "Erreur lors de la mise à jour des informations de l'utilisateur"
        );
      }
    } catch (error) {
      setMessage(error.message); // Mise à jour du message d'erreur
    }
  };

  // Fonction pour mettre à jour un avis
  const handleUpdateReview = async (reviewId, newContent) => {
    try {
      const updateResponse = await fetch(
        `http://localhost:3001/api/reviews/ownReview/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newContent }),
        }
      );

      if (updateResponse.ok) {
        setMessage("Critique mise à jour avec succès");
        const updatedReviews = reviews.map((review) =>
          review.id === reviewId ? { ...review, content: newContent } : review
        );
        setReviews(updatedReviews); // Mise à jour des avis
      } else {
        throw new Error("Erreur lors de la mise à jour de la critique");
      }
    } catch (error) {
      setMessage(error.message); // Mise à jour du message d'erreur
    }
  };

  // Fonction pour supprimer un avis
  const handleDeleteReview = async (reviewId) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:3001/api/reviews/ownReview/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deleteResponse.ok) {
        setMessage("Critique supprimée avec succès");
        const updatedReviews = reviews.filter(
          (review) => review.id !== reviewId
        );
        setReviews(updatedReviews); // Mise à jour des avis
      } else {
        throw new Error("Erreur lors de la suppression de la critique");
      }
    } catch (error) {
      setMessage(error.message); // Mise à jour du message d'erreur
    }
  };

  return (
    <>
      <Header />

      <main id="UserPageMain" className="user-page-main">
        <div className="user-profile">
          <h2>Profil de l'utilisateur</h2>
          {message && <p>{message}</p>} {/* Affichage des messages */}
          {userData && (
            <div>
              <form onSubmit={handleUpdateProfile} className="user-profile-form">
                <div>
                  <label>
                    Nom d'utilisateur :
                    <input
                      type="text"
                      name="username"
                      defaultValue={userData.username}
                      className="input-username"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email :
                    <input
                      type="email"
                      name="email"
                      defaultValue={userData.email}
                      className="input-email"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Nouveau mot de passe :
                    <input
                      type="password"
                      name="password"
                      className="input-password"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Mot de passe actuel :
                    <input
                      type="password"
                      name="currentPassword"
                      className="input-current-password"
                    />
                  </label>
                </div>
                <button type="submit" className="btn-profile">
                  Mettre à jour
                </button>
                <button type="button" className="btn-profile" onClick={handleDeleteUser}>
                  Supprimer le compte
                </button>
                {deleteMessage && <p>{deleteMessage}</p>} {/* Affichage du message de suppression */}
              </form>
            </div>
          )}
        </div>

        <div className="review-container">
          <h1>Avis</h1>
          {reviewMessage && <p>{reviewMessage}</p>} {/* Affichage des messages concernant les avis */}
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <input
                  type="text"
                  value={review.content}
                  onChange={(e) =>
                    handleUpdateReview(review.id, e.target.value)
                  }
                  className="input-review-content"
                />
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="btn-delete-review"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default UserProfilePage;
