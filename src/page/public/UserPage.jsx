import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserPage = () => {
  const [userData, setUserData] = useState(null); // State pour stocker les informations de l'utilisateur

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken); // Stocker les informations de l'utilisateur dans le state
    }
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h1>Bienvenue, {userData.data}!</h1>
          <p>Votre ID : {userData.dataId}</p>
          <p>Votre rôle : {userData.dataRole}</p>
          {/* Afficher d'autres informations de l'utilisateur si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default UserPage;