// Importe le hook useState de React
import React, { useState } from "react";

// Importe le hook custom useVerifyIfUserIsLogged
// qui permet de vérifier si l'utilisateur est connecté
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import { useNavigate } from "react-router-dom";

// Définition du composant UserCreateReview
const UserCreateReview = () => {
  // Utilisation du hook custom useVerifyIfUserIsLogged
  // pour vérifier si l'utilisateur est connecté
  useVerifyIfUserIsLogged();

  // Déclaration des états pour le contenu de la review, le message de retour et le délai avant la redirection
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);

  // Utilisation de useNavigate pour la redirection
  const navigate = useNavigate();

  // Fonction appelée lors de la soumission du formulaire
  const handleCreateReview = async (event) => {
    event.preventDefault();

    // Récupération du token depuis le localStorage
    const token = localStorage.getItem("jwt");

    // Vérifie si le token est présent
    if (!token) {
      console.log("Token non trouvé dans le localStorage");
      return;
    }

    // Appel à l'API pour créer une nouvelle review
    const createReviewResponse = await fetch(
      "http://localhost:3001/api/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ content }),
      }
    );
    // Utilisation de la méthode ok pour vérifier si le statut est dans la plage 200-299
    if (createReviewResponse.ok) {
      setMessage("Commentaire créé !");

      // Ajout d'un délai de 2 secondes avant la redirection
      setTimeout(() => {
        // Redirection vers la page d'accueil
        navigate("/");
        // Tu peux effectuer d'autres actions ici si nécessaire.
      }, 2000);
    } else {
      setMessage("Erreur !");
    }
  };

  // Rendu du composant avec un formulaire
  return (
    <div>
      <form onSubmit={handleCreateReview}>
        <input type="hidden" name="token" value={localStorage.getItem("jwt")} />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écris ta review ici"
          required
        ></textarea>
        <button type="submit">Poster la review</button>
      </form>
      {/* Affichage du message de retour */}
      {message && <p>{message}</p>}
    </div>
  );
};

// Exporte le composant UserCreateReview
export default UserCreateReview;
