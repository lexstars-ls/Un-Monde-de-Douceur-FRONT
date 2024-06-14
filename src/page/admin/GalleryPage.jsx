import { useState, useEffect } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import "../../assets/style/AdminGallery.scss";

const GalleryCRUD = () => {
  // useState pour l'upload
  const [galleries, setGalleries] = useState([]); // État pour stocker les galeries
  const [name, setName] = useState(""); // État pour stocker le nom de la galerie à créer
  const [year, setYear] = useState(""); // État pour stocker l'année de la galerie à créer

  const [selectedName, setSelectedName] = useState(""); // État pour stocker le nom de la galerie à mettre à jour
  const [selectedYear, setSelectedYear] = useState(""); // État pour stocker l'année de la galerie à mettre à jour
  const [message, setMessage] = useState(null); // État pour stocker les messages (succès ou erreur)
  const [selectedGalleryId, setSelectedGalleryId] = useState(null); // État pour stocker l'ID de la galerie sélectionnée pour modification

  // Fonction pour récupérer les galeries depuis l'API
  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/gallery");
      if (response.ok) {
        const data = await response.json();
        setGalleries(data); // Mettre à jour l'état des galeries
      } else {
        throw new Error("Erreur lors de la récupération des galeries");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // useEffect pour récupérer les galeries lors du premier rendu du composant
  useEffect(() => {
    fetchGalleries(); // Appeler la fonction pour récupérer les galeries
  }, []);

  // Fonction pour créer une nouvelle galerie
  const createGallery = async () => {
    try {
      const storedToken = localStorage.getItem("jwt"); // Récupérer le token JWT depuis le stockage local
      const response = await fetch("http://localhost:3001/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête
        },
        body: JSON.stringify({ name, year }), // Envoyer les données de la nouvelle galerie
      });
      if (response.ok) {
        setMessage("Galerie créée avec succès");
        setName(""); // Réinitialiser le champ du nom
        setYear(""); // Réinitialiser le champ de l'année
        fetchGalleries(); // Récupérer à nouveau les galeries pour mettre à jour la liste
      } else {
        throw new Error("Erreur lors de la création de la galerie");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // Fonction pour supprimer une galerie
  const deleteGallery = async (galleryId) => {
    try {
      const storedToken = localStorage.getItem("jwt"); // Récupérer le token JWT depuis le stockage local
      const response = await fetch(
        `http://localhost:3001/api/gallery/${galleryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête
          },
        }
      );
      if (response.ok) {
        setMessage("Galerie supprimée avec succès");
        fetchGalleries(); // Récupérer à nouveau les galeries pour mettre à jour la liste
      } else {
        throw new Error("Erreur lors de la suppression de la galerie");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // Fonction pour préparer la modification d'une galerie
  const handleUpdate = (galleryId) => {
    setSelectedGalleryId(galleryId); // Mettre à jour l'état avec l'ID de la galerie sélectionnée
    const selectedGallery = galleries.find(
      (gallery) => gallery.id === galleryId
    );
    if (selectedGallery) {
      setSelectedName(selectedGallery.name); // Mettre à jour le champ du nom avec le nom de la galerie sélectionnée
      setSelectedYear(selectedGallery.year); // Mettre à jour le champ de l'année avec l'année de la galerie sélectionnée
    }
  };

  // Fonction pour mettre à jour une galerie
  const upgradeGallery = async () => {
    try {
      const storedToken = localStorage.getItem("jwt"); // Récupérer le token JWT depuis le stockage local
      const response = await fetch(
        `http://localhost:3001/api/gallery/${selectedGalleryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête
          },
          // Récupération à l'aide d'un autre useState afin de ne pas afficher les données de création dans les champs d'entrée."
          body: JSON.stringify({ name: selectedName, year: selectedYear }), 
        }
      );
      if (response.ok) {
        setMessage("Galerie mise à jour avec succès");
        setSelectedName(""); // Réinitialiser le champ du nom
        setSelectedYear(""); // Réinitialiser le champ de l'année
        setSelectedGalleryId(null); // Réinitialiser l'ID de la galerie sélectionnée
        fetchGalleries(); // Récupérer à nouveau les galeries pour mettre à jour la liste
      } else {
        throw new Error("Erreur lors de la mise à jour de la galerie");
      }
    } catch (error) {
      setMessage(error.message); // Mettre à jour l'état des messages en cas d'erreur
    }
  };

  // useEffect pour réinitialiser selectedGalleryId si la galerie a été supprimée
  useEffect(() => {
    if (!galleries.some((gallery) => gallery.id === selectedGalleryId)) {
      setSelectedGalleryId(null);
      setSelectedName("");
      setSelectedYear("");
    }
  }, [galleries, selectedGalleryId]);

  // useEffect pour faire disparaître le message après un délai
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // Effacer le message après 5 secondes
      }, 5000); // Délai de 5000 millisecondes (5 secondes)

      return () => clearTimeout(timer); // Nettoyage de l'effet
    }
  }, [message]); // Exécuter cet effet chaque fois que `message` change

  return (
    <>
      <HeaderAdmin />
      <main id="admin-gallery-main">
        <div>
          <p>{message}</p> {/* Afficher le message de succès ou d'erreur */}
          <div>
            <h2>Créer une nouvelle galerie</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom de la galerie"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Année"
            />
            <button onClick={createGallery}>Créer</button>
          </div>
          <div>
            <h2>Liste des galeries</h2>
            <ul>
              {galleries.map((gallery) => (
                <li key={gallery.id}>
                  {gallery.name} ({gallery.year})
                  <button onClick={() => deleteGallery(gallery.id)}>
                    Supprimer
                  </button>
                  <button onClick={() => handleUpdate(gallery.id)}>
                    Modifier
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedGalleryId && (
            <div>
              <h2>Modifier la galerie</h2>
              <input
                type="text"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                placeholder="Nom de la galerie"
              />
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                placeholder="Année"
              />
              <button onClick={upgradeGallery}>Mettre à jour</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default GalleryCRUD;
