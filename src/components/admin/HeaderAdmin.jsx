import { Link, useNavigate } from "react-router-dom";
import "../../assets/style/HeaderAdmin.scss";

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sortir le token du local storage
    localStorage.removeItem("jwt");

    // redirige l'utilisateur vers la page de login
    navigate("/loginPage");
  };

  return (
    <header>

      <nav>
        <ul>
          <li>
            <Link to="/admin/">Accueil</Link>
          </li>
          <li>
            <Link to="/admin/review">Gérer les reviews</Link>
          </li>
          <li>
            <Link to="/admin/Galerie">Gérer les Galeries</Link>
          </li>
          <li>
            <Link to="/admin/Image">Gérer les images</Link>
          </li>
          <li>
            <Link to="/admin/">Gérer les Article</Link>
          </li>
          
        </ul>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;