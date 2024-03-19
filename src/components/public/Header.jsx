import '../../assets/style/Header.scss'
import {  useNavigate } from "react-router-dom";


const Header=() => {

    const navigate = useNavigate();

    const handleLogout = () => {
      // sortir le token du local storage
      localStorage.removeItem("jwt");
  
      // redirige l'utilisateur vers la page de login
      navigate("/");
    };
    
    return (
        <header>
           

                <nav>
                   
                        <ul>

                            <li><a href="/">Home</a></li>
                            <li><a href="/parcours">Parcours</a></li>
                            <li><a href="/createReview">Prestations</a></li>
                            <li><a href="/reviewPage">Galerie</a></li>
                            <li><a href="/loginPage"><button id='loginbutton'>Connexion</button></a></li>
                            <li><button id='discobutton' onClick={handleLogout}>Déconnection</button></li>

                        </ul>
                </nav>


        </header>
    )
}
export default Header