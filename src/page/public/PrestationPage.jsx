import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/PrestationPage.scss";
import { useState, useEffect } from "react";

const PrestationPage = () => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState(null);
  const [loadMessage, setLoadMessage] = useState("Chargement des prestations...");
  const [content, setContent] = useState("");
  const [isLogged, setIsLogged] = useState(false); // État pour stocker l'état de connexion de l'utilisateur

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté 
    const storedToken = localStorage.getItem("jwt");
    setIsLogged(!!storedToken); // Mettre à jour l'état en fonction de la présence du token
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/articles");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des prestations");
      }
      const data = await response.json();
      setArticles(data);
      setLoadMessage(null); // Réinitialiser le message de chargement en cas de succès
    } catch (error) {
      console.error(error);
      setLoadMessage("Erreur lors de la récupération des prestations");
    }
  };

  const createReview = async () => {
    try {
      const storedToken = localStorage.getItem("jwt");

      if (!storedToken) {
        setMessage("Vous devez être connecté pour créer un commentaire.");
        return;
      }

      if (!content.trim()) {
        setMessage("Le contenu du commentaire ne peut pas être vide.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setMessage("Commentaire créé avec succès.");
        setContent("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création du commentaire");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview();
  };

  return (
    <>
      <Header />
      <main id="mainPrestationPage">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={article.id} className="article">
              {index % 2 === 0 && (
                <section>
                  <h2 className="article-title">{article.title}</h2>
                  {article.text && (
                    <p className="article-text">{article.text}</p>
                  )}
                </section>
              )}
              <div className="imageContainer">
                <img
                  src={article.imageUrl}
                  className="article-image"
                  alt={article.title}
                />
              </div>
              {index % 2 !== 0 && (
                <section>
                  <h2 className="article-title">{article.title}</h2>
                  {article.text && (
                    <p className="article-text">{article.text}</p>
                  )}
                </section>
              )}
            </div>
          ))
        ) : (
          <p>{loadMessage}</p>
        )}

        {isLogged && (
          <div className="containerReview">
            <h1>Laisser un Commentaire</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="content">Commentaire :</label>
              <textarea
                id="content"
                name="content"
                rows="4"
                cols="50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <br />
              <button type="submit">Soumettre</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
export default PrestationPage;
