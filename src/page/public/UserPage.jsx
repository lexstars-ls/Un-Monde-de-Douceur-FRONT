import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../../assets/style/UserPage.scss";
import Header from "../../components/public/Header";

function UserProfilePage() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);
  const [reviewMessage, setReviewMessage] = useState(null);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await fetch(
          `http://localhost:3001/api/users/${decodedToken.dataId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData.data);
        } else {
          throw new Error(
            "Erreur lors de la récupération des données de l'utilisateur, essayez de vous reconnecter"
          );
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchUserData();
  }, [decodedToken.dataId, token]);

  useEffect(() => {
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
          setReviews(data);
        } else {
          throw new Error(
            "Erreur lors de la récupération des avis de l'utilisateur"
          );
        }
      } catch (error) {
        setReviewMessage(error.message);
        console.error(error);
      }
    };

    fetchReviews();
  }, [decodedToken.dataId, token]);

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
      setMessage(error.message);
    }
  };

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
        setReviews(updatedReviews);
      } else {
        throw new Error("Erreur lors de la mise à jour de la critique");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

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
        setReviews(updatedReviews);
      } else {
        throw new Error("Erreur lors de la suppression de la critique");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
    
      <Header />
      
      <main id="UserPageMain" className="user-page-main">
  <div className="user-profile">
    <h2>Profil de l'utilisateur</h2>
    {message && <p>{message}</p>}
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
          <button type="submit" className="btn-update-profile">
            Mettre à jour
          </button>
        </form>
      </div>
    )}
  </div>

  <div className="review-container">
    <h1>Avis</h1>
    {reviewMessage && <p>{reviewMessage}</p>}
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <input
            type="text"
            value={review.content}
            onChange={(e) => handleUpdateReview(review.id, e.target.value)}
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
