import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
const GalleryCRUD = () => {
  const [galleries, setGalleries] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/gallery");
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

  const createGallery = async () => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:3001/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ name, year }),
      });
      if (response.ok) {
        setMessage("Galerie créée avec succès");
        setName("");
        setYear("");
        fetchGalleries();
      } else {
        throw new Error("Erreur lors de la création de la galerie");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteGallery = async (galleryId) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:3001/api/gallery/${galleryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.ok) {
        setMessage("Galerie supprimée avec succès");
        fetchGalleries();
      } else {
        throw new Error("Erreur lors de la suppression de la galerie");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleUpdate = (galleryId) => {
    setSelectedGalleryId(galleryId);
    const selectedGallery = galleries.find(
      (gallery) => gallery.id === galleryId
    );
    if (selectedGallery) {
      setName(selectedGallery.name);
      setYear(selectedGallery.year);
    }
  };

  const upgradeGallery = async () => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:3001/api/gallery/${selectedGalleryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ name, year }),
        }
      );
      if (response.ok) {
        setMessage("Galerie mise à niveau avec succès");
        setName("");
        setYear("");
        setSelectedGalleryId(null);
        fetchGalleries();
      } else {
        throw new Error("Erreur lors de la mise à niveau de la galerie");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
    <HeaderAdmin/>
    <div>
      <p>{message}</p>
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
              <button onClick={() => handleUpdate(gallery.id)}>Modifier</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedGalleryId && (
        <div>
          <h2>Modifier la galerie</h2>
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
          <button onClick={upgradeGallery}>Mettre à jour</button>
        </div>
      )}
    </div>
    </>
  );
};

export default GalleryCRUD;
