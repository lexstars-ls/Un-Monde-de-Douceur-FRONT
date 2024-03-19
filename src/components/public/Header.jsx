import '../../assets/style/Header.scss';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token du local storage
        localStorage.removeItem("jwt");

        // Rediriger l'utilisateur vers la page de connexion
        navigate("/");
    };

    // Vérifier si l'utilisateur est connecté ; cette contstante s'applique uniquement si le local storage est différent de nul
    const isLoggedIn = localStorage.getItem("jwt") !== null;

    // Afficher "Votre profil" lorsque l'utilisateur est connecté
    const profileButton = isLoggedIn ? (
        <li><button id='profileButton' onClick={() => navigate("/profilPage")}>Votre profil</button></li>
    ) : null;

    // Afficher "Connexion" lorsque l'utilisateur n'est pas connecté
    const loginButton = !isLoggedIn ? (
        <li><a href="/loginPage"><button id='loginButton'>Connexion</button></a></li>
    ) : null;

    // Afficher le bouton de déconnexion lorsque l'utilisateur est connecté
    const disconnectButton = isLoggedIn ? (
        <li><button id='disconnectButton' onClick={handleLogout}>Déconnexion</button></li>
    ) : null;

    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/parcours">Parcours</a></li>
                    <li><a href="/createReview">Prestations</a></li>
                    <li><a href="/reviewPage">Galerie</a></li>

                    {/* rap des constantes (bouton) */}
                    {profileButton}
                    {loginButton}
                    {disconnectButton}
                </ul>
            </nav>
        </header>
    );
};

export default Header;