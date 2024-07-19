import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/Parcours.scss";
import img1 from "../../assets/img/imgProf.png"; // image de profil
import img2 from "../../assets/img/222.png"; // image de diplôme 1
import img3 from "../../assets/img/image1.jpeg"; // image de diplôme 2

const ParcourPage = () => {
  return (
    <>
      <Header />
      <main id="parcours-main">
        <div className="profile-section">
          <img src={img1} alt="Profile" className="profile-image" />
          <div className="profile-text">
            <p>
              Psychomotricienne dans diverses institutions pendant plusieurs
              années.
            </p>
            <p>
              Émerveillée par les nouveaux nés et désireuse de travailler auprès
              d’eux et des tous petits, je ne cesse de me former (Bain des
              Merveilles, massage bébé….).
            </p>
            <p>
              Je souhaite mettre mes compétences au service des parents et de
              leur enfant, en les guidant vers une parentalité empreinte de
              confiance et de sérénité.
            </p>
            <p>
              Apporter des moments de douceur et de bien-être aux familles est
              ma priorité.
            </p>
            <p>
              De plus dans la santé, je pense qu’il est important d’agir
              préventivement. Favoriser la connexion de vos enfants à leur corps
              est essentiel, ils grandiront en respectant leur ressenti et leur
              corps ce qui les aidera à prendre soin d’eux toute leur vie.
            </p>
          </div>
        </div>
        <div className="diplomes-section">
          <h3>Diplômes et Formations</h3>
          <ul>
            <li>
              <strong>2023</strong>
              <ul>
                <li>
                  Formation au Bain des Merveilles avec Aurélie Cachen « Au Pays
                  des Merveilles » (Beguey).
                </li>
                <li>
                  Formation massage bébé avec « Graine de Massage » (Tigery).
                </li>
              </ul>
            </li>
            <li>
              <strong>2024</strong>
              <ul>
                <li>
                  Formation au Portage Physiologique avec « Graine de Massage
                  »(Tigery).
                </li>
                <li>
                  Formation au Sommeil du nourrisson, de l’enfant et de
                  l’adolescent Niveau 1 avec Aurélie Cachen « Au pays des
                  Merveilles » (Beguey).
                </li>
                <li>
                  Formation Réflexologie plantaire bébé en cours avec « Graine
                  de Massage » (Tigery).
                </li>
                <li>
                  Formation au Sommeil du nourrisson, de l’enfant et de l
                  adolescent Niveau 2 avec Aurélie Cachen « Au pays des
                  Merveilles ».
                </li>
              </ul>
            </li>
          </ul>
          <div className="diplomes-images">
            <img src={img2} alt="Diplome 1" className="diplome-image" />
            <img src={img3} alt="Diplome 2" className="diplome-image" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ParcourPage;
