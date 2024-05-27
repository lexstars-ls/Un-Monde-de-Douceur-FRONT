import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function UserProfilePage() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);
  const [review, setReview] = useState([]); // Initialiser à un tableau vide pour éviter les erreurs

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

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const newUsername = event.target.username.value;
    const newEmail = event.target.email.value;
    const newPassword = event.target.password.value;
    const currentPassword = event.target.currentPassword.value;

    try {
      const passwordCheckResponse = await fetch(
        "http://localhost:3001/api/users/check-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword }),
        }
      );

      if (!passwordCheckResponse.ok) {
        throw new Error("Mot de passe actuel incorrect");
      }
    } catch (error) {
      setMessage(error.message);
      return;
    }

    const updateData = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
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
          password: newPassword,
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
  // `http://localhost:3001/api/reviews/ownReview/${decodedToken.dataId}`

  useEffect(() => {
    // Récupérer les avis de l'utilisateur depuis l'API au chargement du composant
    const fetchOwnReview = async () => {
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

          console.log(data);
          setReview(data);
        } else {
          throw new Error(
            "Erreur lors de la récupération des avis de l'utilisateur"
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOwnReview();
  }, []);

  return (
    <>
      <div>
        <h2>Profil de l'utilisateur</h2>
        {message && <p>{message}</p>}
        {userData && (
          <div>
            <form onSubmit={handleUpdateProfile}>
              <div>
                <label>
                  Nom d'utilisateur :
                  <input
                    type="text"
                    name="username"
                    defaultValue={userData.username}
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
                  />
                </label>
              </div>
              <div>
                <label>
                  Mot de passe :
                  <input
                    type="password"
                    name="password"
                    defaultValue={userData.password}
                  />
                </label>
              </div>
              <div>
                <label>
                  Mot de passe actuel :
                  <input type="password" name="currentPassword" />
                </label>
              </div>
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        )}
      </div>

      <div>
        <h1>Avis</h1>
        <div>
          {review.map((review) => (
            <p key={review.id}>{review.content} {new Date(review.createdAt).toLocaleDateString()} </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
