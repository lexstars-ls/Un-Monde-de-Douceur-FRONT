import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserPage = () => {
    useEffect(() => {
        // Récupération du token depuis le localStorage
        const token = localStorage.getItem("jwt");
        
        // Vérification si le token existe
        if (token) {
            // Décodage du token
            const decodedToken = jwtDecode(token);
            
            // Affichage du token dans la console log
            console.log("Token de l'utilisateur connecté :", decodedToken);
        } else {
            console.log("Aucun token trouvé dans le localStorage.");
        }
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            {/* Votre contenu de page */}
        </div>
    );
};
export default UserPage;