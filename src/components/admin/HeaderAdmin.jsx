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
    <header id="headerAdmin">

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
            <Link to="/admin/Article">Gérer les Articles</Link>
          </li>

          <li>
            <Link to="/admin/Tarif">Gérer les Tarifs</Link>
          </li>
          
          <li>
            <Link to="/admin/User">Gérer (Admin et utilisateur) </Link>
          </li>

        </ul>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;