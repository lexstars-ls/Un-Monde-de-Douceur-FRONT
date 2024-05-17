import React, { useState, useEffect } from "react";

const UploadImages = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Récupérer le token JWT depuis le stockage local (localStorage)
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log(storedToken);
    // récup mes galeries disponible.
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gallery", {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Inclure le token JWT dans l'en-tête qui sera traité sur mon api
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGalleries(data);
        } else {
          setError("Erreur lors de la récupération des galeries");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des galeries");
      }
    };

    fetchGalleries();
  }, []);

  const handleGalleryChange = (event) => {
    setSelectedGallery(event.target.value);
  };

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedGallery || images.length === 0) {
      setError("Veuillez sélectionner une galerie et au moins une image.");
      return;
    }

    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/image/${selectedGallery}/images`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        setError("Erreur lors de l'upload des images");
      }
    } catch (error) {
      setError("Erreur lors de l'upload des images");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
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
        <label htmlFor="images">Sélectionner des images :</label>
        <input type="file" id="images" multiple onChange={handleImageChange} />
      </div>
      <button type="submit">Uploader les images</button>
    </form>
  );
};

export default UploadImages;
