import React, { useState, useEffect } from "react";

const UploadImages = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [images, setImages] = useState([]);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Récupérer le token JWT depuis le stockage local (localStorage)
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }

    // Fonction pour récupérer les galeries disponibles depuis l'API
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery", {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Ajouter le token JWT dans l'en-tête
          },
        });
        if (response.ok) {
          const data = await response.json(); // Convertir la réponse en JSON
          setGalleries(data); // Stocker les galeries dans l'état
        } else {
          throw new Error("Erreur lors de la récupération des galeries");
        }
      } catch (error) {
        setMessage(error.message); // Afficher un message d'erreur
      }
    };

    fetchGalleries(); // Appeler la fonction pour récupérer les galeries
  }, []);

  // Fonction pour gérer le changement de galerie sélectionnée
  const handleGalleryChange = (event) => {
    setSelectedGallery(event.target.value); // Mettre à jour la galerie sélectionnée
  };

  // Fonction pour gérer les fichiers d'images sélectionnés
  const handleImageChange = (event) => {
    setImages(event.target.files); // Mettre à jour l'état avec les fichiers sélectionnés
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    if (!selectedGallery || images.length === 0) {
      // Vérifier si une galerie est sélectionnée et si au moins une image est ajoutée
      setMessage("Veuillez sélectionner une galerie et au moins une image.");
      return;
    }

    const formData = new FormData(); // Créer un objet FormData pour envoyer les fichiers
    for (const image of images) {
      formData.append("images", image); // Ajouter chaque fichier d'image à FormData
    }

    try {
      // Faire une requête POST pour envoyer les images à l'API
      const response = await fetch(
        `http://localhost:3001/api/image/${selectedGallery}/images`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: registerDataJson,
        }
      );
      if (response.ok) {
        setMessage("Le téléchargement d'images a été un succès."); // Afficher un message de succès
      } else {
        throw new Error("Erreur lors de l'upload des images"); // Gérer les erreurs de l'API
      }
    } catch (error) {
      setMessage(error.message); // Afficher un message d'erreur
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Afficher un message d'erreur ou de succès */}
      <h3>{message}</h3>
      <div>
        {/* Sélectionner une galerie */}
        <label htmlFor="gallery">Sélectionner une galerie :</label>
        <select
          id="gallery"
          value={selectedGallery}
          onChange={handleGalleryChange}
        >
          <option value="">-- Sélectionner une galerie --</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>
              {gallery.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* Ajouter des fichiers d'images */}
        <label htmlFor="images">Sélectionner des images :</label>
        <input type="file" id="images" multiple onChange={handleImageChange} />
      </div>
      {/* Bouton pour soumettre le formulaire */}
      <button type="submit">Uploader les images</button>
    </form>
  );
};

export default UploadImages;
