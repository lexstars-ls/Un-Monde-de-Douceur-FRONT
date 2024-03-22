import React, { useState} from "react";
import "../../assets/style/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // Utiliser useState pour initialiser l'état de connexion en fonction de la présence d'un token dans le localStorage
  // Vérifie si l'utilisateur est connecté en regardant la présence d'un token dans le localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );
  
  const handleLogout = () => {
    setIsLoggedIn(false); // Met à jour l'état de connexion
    navigate("/"); // Redirige vers la page d'accueil
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
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
                  id="profilButton"
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
