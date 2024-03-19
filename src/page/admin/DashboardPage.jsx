import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const DashboardPage = () => {
  useVerifyIfUserIsLogged();

  return (
    <>
      <HeaderAdmin />

      <h2>Vous êtes bien connecté en tant qu'admin</h2>
    </>
  );
};

export default DashboardPage;