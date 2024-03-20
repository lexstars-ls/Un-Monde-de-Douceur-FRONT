import React, { useState, useEffect } from "react";
import "../../assets/style/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // Utiliser useState pour initialiser l'état de connexion en fonction de la présence d'un token dans le localStorage
  // Vérifie si l'utilisateur est connecté en regardant la présence d'un token dans le localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );
  // useEffect pour mettre à jour l'état de connexion du localStorage lorsqu'il change dans le composant
  useEffect(() => {
    // Si l'utilisateur est connecté, enregistrer le jeton dans le localStorage
    if (isLoggedIn) {
      localStorage.setItem("jwt", "token"); // Remplacer "token" par le jeton d'authentification
    } else {
      // Si l'utilisateur est déconnecté, supprimer le jeton du localStorage
      localStorage.removeItem("jwt");
    }
  }, [isLoggedIn]); // Déclenche cet effet à chaque changement de l'état de connexion (isLoggedIn)

  // Fonction pour se déconnecter
  const handleLogout = () => {
    setIsLoggedIn(false); // Met à jour l'état de connexion
    navigate("/"); // Redirige vers la page d'accueil
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/parcours">Parcours</a>
          </li>
          <li>
            <a href="/createReview">Prestations</a>
          </li>
          <li>
            <a href="/reviewPage">Galerie</a>
          </li>

          {/* affichage des Boutons votre profil et décon après vérification de l'identification de mon utilisateur */}
          {isLoggedIn ? (
            <>
              <li>
                <button
                  id="profileButton"
                  onClick={() => navigate("/profilPage")}
                >
                  Votre profil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="disconnectButton"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            // sinon affichage du bouton connexion quand l'utilisateur est déconnecté
            <li>
              {/* redirection => page de connection */}
              <button id="loginButton" onClick={() => navigate("/loginPage")}>
                Connexion
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
