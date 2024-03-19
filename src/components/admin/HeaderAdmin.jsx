import { Link, useNavigate } from "react-router-dom";

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
      <h1>admin header</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/review">Gérer les reviews</Link>
          </li>
          
        </ul>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;