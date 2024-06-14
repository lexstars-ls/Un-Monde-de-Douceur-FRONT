import { useState, useEffect } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import "../../assets/style/AdminArticle.scss";


const AdminArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
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

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/articles");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la récupération des articles");
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const response = await fetch(
        `http://localhost:3001/api/articles/delete/${articleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.ok) {
        setMessage("Article supprimé avec succès");
        fetchArticles();
      } else {
        throw new Error("Erreur lors de la suppression de l'article");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const createArticle = async (title, text, image) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("text", text);
      formData.append("image", image);

      const response = await fetch(
        "http://localhost:3001/api/articles/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Article créé avec succès");
        fetchArticles();
        setTitle("");
        setText("");
        setImage(null);
      } else {
        throw new Error("Erreur lors de la création de l'article");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const updateArticle = async (articleId) => {
    try {
      const storedToken = localStorage.getItem("jwt");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("text", text);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `http://localhost:3001/api/articles/update/${articleId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Article mis à jour avec succès");
        fetchArticles();
        setTitle("");
        setText("");
        setImage(null);
        setSelectedArticleId(null);
      } else {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedArticleId) {
      updateArticle(selectedArticleId);
    } else {
      createArticle(title, text, image);
    }
  };

  const handleUpdate = (articleId) => {
    setSelectedArticleId(articleId);
    const selectedArticle = articles.find((article) => article.id === articleId);
    if (selectedArticle) {
      setTitle(selectedArticle.title);
      setText(selectedArticle.text);
      setImage(selectedArticle.imageUrl);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <main id="Admin-Article">
      <h2>Créer un nouvel article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">
          {selectedArticleId ? "Mettre à jour" : "Créer"}
        </button>
        {message && <p>{message}</p>}
        {error && <p>Erreur: {error}</p>}
      </form>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.text}</p>
            <div className="imageContainer">
              <img
                src={article.imageUrl}
                className="article-image"
                alt={article.title}
              />
            </div>
            <button onClick={() => deleteArticle(article.id)}>Supprimer</button>
            <button onClick={() => handleUpdate(article.id)}>Modifier</button>
          </li>
        ))}
      </ul>
      </main>
    </>
  );
};

export default AdminArticlePage;
