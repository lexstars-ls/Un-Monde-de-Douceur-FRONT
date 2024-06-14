import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useState, useEffect, useRef } from "react";
import "../../assets/style/AdminImage.scss";

const AdminImagePage = () => {
  const [token, setToken] = useState(""); // Token d'authentification
  const [galleries, setGalleries] = useState([]); // Liste des galeries disponibles
  const [selectedGallery, setSelectedGallery] = useState(""); // ID de la galerie sélectionnée pour l'envoi d'images
  const [images, setImages] = useState([]); // Liste des images sélectionnées à envoyer
  const [message, setMessage] = useState(null); // Message de succès ou d'erreur général
  const [checkSubmit, setCheckSubmit] = useState(false); // Pour recharger mes images en fonctions de l'état de checksubmit
  const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur spécifique pour la suppression d'images
  const [imageDelete, setImageDelete] = useState([]); // Liste des images à supprimer pour une galerie
  const [selectedGalleryForDeleteImg, setSelectedGalleryForDeleteImg] =
    useState(""); // Galerie sélectionnée pour la suppression d'images

  const fileInputRef = useRef(null); // Référence pour l'élément input de type file

  // useEffect pour récupérer le token depuis le local storage au premier chargement de la page
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // useEffect pour récupérer mes galeries pour sélectionner ou iront mes images
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGalleries(data);
        } else {
          throw new Error("Erreur lors de la récupération des galeries");
        }
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchGalleries();
  }, [token]);

  // récupérer depuis mon input file les images selectionné pour l'env vers ma galerie selectionné
  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  // function async qui s'assure qu'auncun champ est vide et upload mes images présente dans lon formData (file)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedGallery || images.length === 0) {
      setMessage("Veuillez sélectionner une galerie et au moins une image.");
      return;
    }

    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/image/${selectedGallery}/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // si l'upload est reussi remettre mes champs a 0 de mes input et indiqué que mon useState checkSubmit dev true.
      if (response.ok) {
        setMessage("Le téléchargement d'images a été un succès.");
        setSelectedGallery("");
        setCheckSubmit(true); // Déclenche le rechargement des images après soumission
        setImages([]);
        // utilie UseRef pour vider mon input de type file
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        throw new Error("Erreur lors de l'upload des images");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  // use effect pour remettre a 0 mes messages apres l'afficahge d'un message
  useEffect(() => {
    if (message === "Le téléchargement d'images a été un succès.") {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchGalleriesForDeleteImg = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/image/${selectedGalleryForDeleteImg}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImageDelete(data);
        } else {
          throw new Error(
            "Erreur lors de la récupération des images de la galerie"
          );
        }
      } catch (error) {
        setErrorMessage(
          "Erreur lors de la récupération des images de la galerie"
        );
      }
    };

    if (selectedGalleryForDeleteImg) {
      fetchGalleriesForDeleteImg();
    }
  }, [token, selectedGalleryForDeleteImg]);

  useEffect(() => {
    if (checkSubmit) {
      const fetchImageForDelete = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/image/${selectedGalleryForDeleteImg}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setImageDelete(data);
          } else {
            throw new Error(
              "Erreur lors de la récupération des images de la galerie"
            );
          }
        } catch (error) {
          setErrorMessage(
            "Erreur lors de la récupération des images de la galerie"
          );
        }
      };

      fetchImageForDelete();
      setCheckSubmit(false); // Réinitialise checkSubmit après le rechargement des images
    }
  }, [checkSubmit, selectedGalleryForDeleteImg, token]); // si check submit est true relance le composa

  useEffect(() => {
    if (errorMessage === "Suppression réussie") {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/image/${selectedGalleryForDeleteImg}/delete/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setImageDelete((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
        setErrorMessage("Suppression réussie");
      } else {
        throw new Error("Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'image");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <main id="admin-image-main">
        {/* form qui lors de l'envoie exécute handleSubmit */}
        <form onSubmit={handleSubmit}>
          <h4>Envoi d'image vers la galerie sélectionnée</h4>
          <p>{message}</p>
          <div>
            <label htmlFor="gallery">Sélectionner une galerie :</label>
            <select
              id="gallery"
              value={selectedGallery} // useState pour récupérer la gallery sélectionné
              // en fontion de c'elle sélectionné changé la valeur de selectedGallery
              onChange={(e) => setSelectedGallery(e.target.value)}
            >
              <option value="">-- Sélectionner une galerie --</option>
              {/* récupére grace a mon fetch et useState les différentes gallery disponible avec comme clée leurs id */}
              {galleries.map((gallery) => (
                <option key={gallery.id} value={gallery.id}>
                  {/* nom de la gallery */}
                  {gallery.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="images">Sélectionner des images :</label>
            {/* input de type file a choix multiple pour stocker les images sélectionner et les stockers av upload */}
            <input
              // useRef pour définir les ref de mes images
              ref={fileInputRef}
              type="file"
              id="images"
              multiple
              // a chaque changement gader la valeur de file
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Uploader les images</button>
        </form>

        <div>
          <h2>Galeries Disponibles</h2>
          <ul>
            {/* affiches les diff gallery dispo */}
            {galleries.map((gallery) => (
              <li key={gallery.id}>
                <button
                  // bouton on click qui selectionne Id de ma gallery et me permet de modifier la route upload
                  onClick={() => setSelectedGalleryForDeleteImg(gallery.id)}
                >
                  {gallery.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Images de la Galerie Sélectionnée</h2>
          <p>{errorMessage}</p>
          {/* affiche le message d'erreur ou non */}
          {imageDelete.length > 0 ? ( // vérif si tableau Image a delete compte + 1 img
            <ul>
              {/* affiche toutes les images de la galerie selectionné avec un bouton personnalisé 
              en fonction de leurs iD pour leurs supression */}

              {imageDelete.map((image) => (
                <li key={image.id}>
                  <img src={image.imageUrl} alt={`${image.id}`} />
                  <button onClick={() => handleDelete(image.id)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          ) : ( // si mon tableau ImageDelete contient 0 img afficher
            <p>Aucune image disponible</p>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminImagePage;
