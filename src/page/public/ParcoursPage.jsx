import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/ParcoursPage.scss";
import { useState, useEffect } from "react";

const ParcoursPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

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
    }
  };

  return (
    <>
      <Header />
      <main id="mainParcoursPage">
        {articles.length > 0 ? (
         
          articles.map((article) => (
            console.log(article),
            <div key={article.id} className="article">
              <img src={article.image} className="article-image" />
              <section>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-text">{article.text}</p>
              </section>
            </div>
          ))
        ) : (
          <p>Aucun article disponible</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ParcoursPage;
