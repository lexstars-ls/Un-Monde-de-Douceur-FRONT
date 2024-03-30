import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCreateReviewPage = () => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { content } = formData;

    const reviewData = {
      content: content,
    };
    const reviewDataJson = JSON.stringify(reviewData);

    const token = localStorage.getItem("jwt");

    const reviewResponse = await fetch("http://localhost:3001/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Ajout du token JWT dans l'en-tête de la requête
      },
      body: reviewDataJson,
    });

    if (reviewResponse.status === 201) {
      setMessage("Votre critique a été créée avec succès");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMessage("Erreur lors de la création de la critique");
    }
  };

  return (
    <main>
      <h2>Créer une critique</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Contenu de la critique:
          <textarea
            placeholder="Contenu de la critique"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Créer</button>
      </form>
    </main>
  );
};

export default UserCreateReviewPage;
