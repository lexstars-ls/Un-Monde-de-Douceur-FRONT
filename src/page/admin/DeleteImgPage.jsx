import React, { useState, useEffect } from "react";

const DeleteImgPage = () => {
  // États pour gérer les images, les galeries, la galerie sélectionnée, les messages d'erreur et le token JWT
  const [images, setImages] = useState([]); // État pour stocker les images
  const [galleries, setGalleries] = useState([]); // État pour stocker les galeries
  const [selectedGallery, setSelectedGallery] = useState(""); // État pour stocker la galerie sélectionnée
  const [errorMessage, setErrorMessage] = useState(""); // État pour stocker les messages d'erreur
  const [token, setToken] = useState(""); // État pour stocker le token JWT

  // useEffect pour récupérer le token JWT et les galeries disponibles
  useEffect(() => {
    // Récupérer le token JWT depuis le stockage local (localStorage)
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }

    // Fonction pour récupérer les galeries depuis l'API
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery", {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGalleries(data); // Mettre à jour l'état des galeries
        } else {
          setErrorMessage("Erreur lors de la récupération des galeries"); // Mettre à jour l'état des messages d'erreur en cas d'échec
        }
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des galeries"); // Mettre à jour l'état des messages d'erreur en cas d'erreur
      }
    };

    fetchGalleries(); // Appeler la fonction pour récupérer les galeries
  }, []); // Le tableau vide indique que cet effet ne s'exécute qu'une seule fois, après le premier rendu du composant

  // useEffect pour récupérer les images de la galerie sélectionnée
  useEffect(() => {
    // Fonction pour récupérer les images depuis l'API
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/image/${selectedGallery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Utiliser le token JWT dans l'en-tête
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data); // Mettre à jour l'état des images
        } else {
          setErrorMessage("Erreur lors de la récupération des images de la galerie"); // Mettre à jour l'état des messages d'erreur en cas d'échec
        }
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des images de la galerie"); // Mettre à jour l'état des messages d'erreur en cas d'erreur
      }
    };

    // Appel de la fonction pour récupérer les images si une galerie est sélectionnée
    if (selectedGallery) {
      fetchImages(); // Appeler la fonction pour récupérer les images
    }
  }, [selectedGallery, token]); // Exécuter cet effet chaque fois que `selectedGallery` ou `token` change

  // useEffect pour faire disparaître le message d'erreur après un délai
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Le message disparaît après 5 secondes

      return () => clearTimeout(timer); // Nettoyage de l'effet
    }
  }, [errorMessage]); // Exécuter cet effet chaque fois que `errorMessage` change

  // Fonction pour supprimer une image
  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/image/${selectedGallery}/images/${imageId}`,
        {
          method: "DELETE", // Méthode DELETE pour supprimer l'image
          headers: {
            Authorization: `Bearer ${token}`, // Utiliser le token JWT dans l'en-tête
          },
        }
      );
      if (response.ok) {
        // Mettre à jour l'état des images en filtrant l'image supprimée
        setImages(images.filter((image) => image.id !== imageId));
        setErrorMessage("Suppression réussie");
      } else {
        setErrorMessage("Erreur lors de la suppression de l'image"); // Mettre à jour l'état des messages d'erreur en cas d'échec
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'image"); // Mettre à jour l'état des messages d'erreur en cas d'erreur
    }
  };

  return (
    <div>
      <h1>Galerie d'Images</h1>

      {/* Section pour afficher les galeries disponibles */}
      <div>
        <h2>Galeries Disponibles</h2>
        <ul>
          {galleries.map((gallery) => (
            <li key={gallery.id}>
              <button onClick={() => setSelectedGallery(gallery.id)}>
                {gallery.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section pour afficher les images de la galerie sélectionnée */}
      <div>
        <h2>Images de la Galerie Sélectionnée</h2>
        <p>{errorMessage}</p>
        {images.length > 0 ? (
          <ul>
            {images.map((image) => (
              <li key={image.id}>
                <img src={image.imageUrl} alt={`${image.id}`} />
                <button onClick={() => handleDelete(image.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune image disponible</p>
        )}
      </div>
      
    </div>
  );
};

export default DeleteImgPage;
