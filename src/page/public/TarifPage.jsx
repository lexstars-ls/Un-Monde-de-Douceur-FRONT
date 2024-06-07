import { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/TarifPage.scss";

const TarifPage = () => {
  const [tarifs, setTarifs] = useState([]);
  const [message, setMessage] = useState("Chargement des tarifs...");

  useEffect(() => {
    const fetchTarifs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tarifs");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tarifs");
        }
        const data = await response.json();
        setTarifs(data);
        setMessage(""); // Efface le message de chargement une fois les tarifs récupérés
      } catch (error) {
        console.error(error);
        setMessage("Erreur lors de la récupération des tarifs");
      }
    };
    fetchTarifs();
  }, []);

  return (
    <>
      <Header />
      <main id="main-tarif">
        {message && <p>{message}</p>} {/* Affiche le message de chargement ou d'erreur */}
        {tarifs.length > 0 ? (
          tarifs.map((tarif) => (
            <section key={tarif.id}>
              <div className="image-container">
                <img src={`${tarif.imageUrl}`} alt="" />
              </div>
              <div className="text-container">
                <h2>{tarif.title}</h2>
                <h4>{tarif.duration}</h4>
                <h5>{tarif.price}€</h5>
                <p>{tarif.text}</p>
                <p>(Le tarif peut varier en fonction de la ville)</p>
              </div>
            </section>
          ))
        ) : (
          !message && <p>Aucun tarif pour le moment</p> // Affiche ceci seulement si aucun message de chargement ou d'erreur n'est présent
        )}
      </main>
      <Footer />
    </>
  );
};

export default TarifPage;
