import { useState, useEffect, useRef } from "react";

const AdminTarifPage = () => {
  const [tarifs, setTarifs] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [editingTarif, setEditingTarif] = useState(null); // Etat pour savoir si un tarif est en cours de modification

  const fileInputRef = useRef(null); // Référence pour réinitialiser le champ de fichier

  useEffect(() => {
    fetchTarifs();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Récupérer tous les tarifs depuis l'API
  const fetchTarifs = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tarifs");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des tarifs");
      }
      const data = await response.json();
      setTarifs(data);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la récupération des tarifs");
    }
  };

  // Fonction pour créer ou mettre à jour
  // en param mes différents input a envoyer dans mon body au moment de la requete
  const createOrUpdateTarif = async (title, text, price, duration, image) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("text", text);
      formData.append("price", price);
      formData.append("duration", duration);
      if (image) formData.append("image", image);
      // si mon utilisateur click sur le bouton mettre a jour les données sont chargé dans mes inputs 
      // et lors de l'envoie la route update va etre utilisé
      // utilisations des conditions ? avec si et sinon :
      const method = editingTarif ? "PUT" : "POST"; // Choisir la méthode (PUT ou POST) en fonction de l'action
      const url = editingTarif
        ? `http://localhost:3001/api/tarifs/update/${editingTarif.id}`
        : "http://localhost:3001/api/tarifs/post";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage(
          editingTarif
            ? "Tarif mis à jour avec succès"
            : "Tarif créé avec succès"
        );
        fetchTarifs(); // Récupérer les tarifs à jour
        resetForm(); // Réinitialiser le formulaire
      } else {
        throw new Error(
          "Erreur lors de la création ou de la mise à jour du tarif"
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Fonction pour supprimer un tarif
  const deleteTarif = async (id) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:3001/api/tarifs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Tarif supprimé avec succès");
        fetchTarifs(); // Récupérer les tarifs à jour
      } else {
        throw new Error("Erreur lors de la suppression du tarif");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setTitle("");
    setText("");
    setPrice("");
    setDuration("");
    setImage(null);
    setEditingTarif(null); // Réinitialiser l'état d'édition
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Réinitialiser le champ de fichier
    }
  };

  // Fonction pour gérer l'envoi du formulaire (création ou mise à jour)
  const handleSubmit = (e) => {
    e.preventDefault();
    createOrUpdateTarif(title, text, price, duration, image);
  };

  // Fonction pour gérer le changement d'image
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Fonction pour remplir le formulaire avec les données du tarif sélectionné pour la mise à jour
  const handleEditTarif = (tarif) => {
    setTitle(tarif.title);
    setText(tarif.text);
    setPrice(tarif.price);
    setDuration(tarif.duration);
    setImage(tarif.image);
    setEditingTarif(tarif); // Mettre à jour l'état avec le tarif à modifier
  };

  return (
    <>
      <main>
        <h2>{editingTarif ? "Modifier un Tarif" : "Créer un Nouveau Tarif"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            required
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix"
            required
          />
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Durée (ex: 1 mois, 1 semaine)"
            required
          />
          <input type="file" ref={fileInputRef} onChange={handleImageChange} />
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
          <button type="submit">
            {editingTarif ? "Mettre à jour" : "Créer"}
          </button>
        </form>

        <h3>Liste des Tarifs</h3>
        <ul>
          {tarifs.map((tarif) => (
            <li key={tarif.id}>
              {tarif.title} - {tarif.price}€
              <button onClick={() => handleEditTarif(tarif)}>Modifier</button>
              <button onClick={() => deleteTarif(tarif.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default AdminTarifPage;
