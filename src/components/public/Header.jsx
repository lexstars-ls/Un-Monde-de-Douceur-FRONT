import React, { useState, useEffect } from "react";
import "../../assets/style/Header.scss";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");
  

  // Utiliser useState pour initialiser l'état de connexion en fonction de la présence d'un token dans le localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    token !== null
  );

  // Utiliser useEffect pour vérifier si le token est toujours présent dans le localStorage
  useEffect(() => {
    // Fonction pour vérifier la présence du token
    const checkToken = () => {
      setIsLoggedIn(token !== null);
    };

    // Vérifier le token à chaque changement du localStorage
    checkToken();

  }, [token]); // Exécuter cet effet à chaque changement du localStorage

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // retire mon token
    setIsLoggedIn(false); // Mettre à jour l'état de connexion
    navigate("/"); // Rediriger vers la page d'accueil
  };

  return (
    <header id="headerUser">
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/parcours">Parcours</a>
          </li>
          <li>
            <a href="/prestations">Prestations</a>
          </li>
          <li>
            <a href="/Galerie">Galerie</a>
          </li>
          <li>
            <a href="/tarifs">Tarifs</a>
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
