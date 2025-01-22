import { useState, useEffect } from "react"; 
import "../../assets/style/GaleriePage.scss";
import Header from "../../components/public/Header"; 
import Footer from "../../components/public/Footer"; 

const GaleriePage = () => {
  const [galeries, setGaleries] = useState([]); // État local pour stocker la liste des galeries récupérées depuis l'API
  const [message, setMessage] = useState("Chargement des galeries..."); // État local pour afficher un message (chargement ou erreur)

  useEffect(() => {
    // Hook effect : utilisé pour exécuter la function a chaque chargement
    const fetchGaleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery"); 
        // Requête vers l'API pour récupérer les galeries

        if (!response.ok) {
          // Vérification du succès de la réponse HTTP
          throw new Error("Erreur lors de la récupération des galeries"); // Gestion des erreurs
        }
        const data = await response.json(); // Conversion de la réponse en JSON
        setGaleries(data); // Mise à jour de l'état avec les galeries récupérées
        setMessage(null); // Suppression du message de chargement
      } catch (error) {
        console.error(error); // Affichage de l'erreur dans la console
        setMessage("Erreur lors de la récupération des galeries"); // Message d'erreur à afficher à l'utilisateur
      }
    };
    fetchGaleries(); // Appel de la fonction pour récupérer les données dès le montage
  }, []); // Le tableau vide [] signifie que cet effet s'exécute uniquement au montage

  return (
    <>
      <Header /> {/* Inclusion du composant Header */}
      <main id="galerieMain">
        <div id="container-gallery">
          {message && <p className="errorMessage">{message}</p>} 
          {/* Affichage du message d'erreur ou de chargement s'il existe */}

          {galeries.length > 0 ? (
            // Vérifie si des galeries sont disponibles
            galeries.map((galerie) => (
              <div key={galerie.id}>
                {/* Chaque galerie est représentée par un conteneur unique */}
                <h2>{galerie.name}</h2> {/* Nom de la galerie */}
                <p>Année: {galerie.year}</p> {/* Année de la galerie */}
                <div className="images-container">
                  {galerie.Images.length > 0 ? (
                    // Si la galerie contient des images
                    galerie.Images.map((image) => (
                      <img 
                        key={image.id} 
                        src={image.imageUrl} 
                        alt={`${image.id}`} 
                      />
                    ))
                  ) : (
                    // Si la galerie ne contient pas d'images
                    <h4>Cette galerie est vide pour le moment</h4>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Si aucune galerie n'est trouvée et qu'aucun message d'erreur n'est défini
            !message && <p className="errorMessage">Aucune galerie pour le moment</p>
          )}
        </div>
      </main>
      <Footer /> {/* Inclusion du composant Footer */}
    </>
  );
};

export default GaleriePage; // Exportation du composant pour être utilisé ailleurs
