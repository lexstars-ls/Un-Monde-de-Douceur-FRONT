import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserPage = () => {
  const [userData, setUserData] = useState(null); // State pour stocker les informations de l'utilisateur

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken); // Affiche le contenu du token JWT dans la console
      setUserData(decodedToken); // Stocke les informations de l'utilisateur dans le state
    }
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h1>Bienvenue, {userData.dataUsername}!</h1>
          <p>Votre Email : {userData.data}</p>
          
          {/* Affichez d'autres informations de l'utilisateur si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default UserPage;
