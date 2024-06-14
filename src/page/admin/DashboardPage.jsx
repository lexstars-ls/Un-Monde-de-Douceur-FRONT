import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import "../../assets/style/AdminDashboard.scss";

const DashboardPage = () => {
  useVerifyIfUserIsLogged();

  return (
    <>
      <HeaderAdmin />
      <main id="dashbord-main">
        <article>
        <h2>Vous êtes bien connecté en tant qu'admin</h2>
        <h3>Résumé des choses possible à faire:</h3>

        <h4>-gérer les galeries</h4>
        <li>Vous pourrez ajouter une nouvelle galerie (nom et date) (post).</li>
        <li>Supprimer ou modifier une galerie existante. (get, delete)</li> 

        <h4>-gérer les images </h4>
        <li>
          Vous pourrez choisir ajouter des images dans la galerie de votre
          choix.(post)
        </li>
        <li>
          En cliquant sur un nom de galerie vous aurez la liste des images
          contenue et la possibilité de les supprimer.(get, delete)
        </li>

        <h4>-gérer les articles </h4>
        <li>
          Vous pourrez créer un nouvel article pour décrire votre prestation
          avec un titre, un texte explicatif et une image.(post)
        </li>
        <li>
          Vous aurez aussi la possibilité de modifier ou supprimer les articles
          existants. (put, delete)
        </li>

        <h4>-gérer les tarifs</h4>

        <li>Ici vous pourrez poster vos tarifs et leurs spécificités, (titre , durée , prix , et une petite description)(post)</li>
        <li>Vous pourrez aussi mettre a jour des tarifs existants (update)</li>
        <li>Vous pourrez aussi supprimer des tarifs existants (delete)</li>
        </article>
      </main>
    </>
  );
};

export default DashboardPage;
