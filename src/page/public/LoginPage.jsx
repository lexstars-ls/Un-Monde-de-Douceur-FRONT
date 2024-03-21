import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/LoginPage.scss";
import { jwtDecode } from "jwt-decode"; // Import de la fonction jwtDecode

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Récupération des informations de connexion depuis le formulaire
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Création des données de connexion à envoyer au serveur
    const loginData = {
      email,
      password,
    };

    // Conversion des données de connexion en format JSON
    const loginDataJson = JSON.stringify(loginData);

    // Envoi de la requête de connexion au serveur
    const loginResponse = await fetch("http://localhost:3001/api/users/login", {
      // La méthode login est un POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
         // Récupération du contenu du body
      body: loginDataJson,
    });

    // Traitement de la réponse de la requête
    const loginResponseData = await loginResponse.json();
    const token = loginResponseData.data;

    if (token) {
      localStorage.setItem("jwt", token);

      // Décodage du token pour obtenir les informations utilisateur, notamment le rôle
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.dataRole);
      console.log(decodedToken.dataId);
      // Redirection en fonction du rôle de l'utilisateur
      if (decodedToken.dataRole <= 2) {
        setMessage("Vous êtes bien connecté en tant qu'admin");
        setTimeout(() => {
          navigate("/admin");
        }, 2000); // Redirection vers la page d'admin après 2 secondes
      } else {
        setMessage("Vous êtes bien connecté");
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirection vers la page d'accueil après 2 secondes
      }
    } else {
      setMessage(
        "Identifiants incorrects ou mot de passe. Veuillez réessayer."
      );
    }
  };

  return (
    <main className="loginpage-main">
      <section id="sectionLogin">
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Mot de passe:
            <input type="password" name="password" />
          </label>
          <button type="submit">Connexion</button>
          <p>Vous n'avez pas de compte ?</p>
          
          <p onClick={() => navigate("/createUserPage")}>Créer un compte.</p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
