import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// client
import LoginPage from "./page/public/LoginPage";
import HomePage from "./page/public/HomePage";
import UserPage from "./page/public/UserPage";

import ParcourPage from "./page/public/ParcourPage";
import PrestationPage from "./page/public/PrestationPage";
import TarifPage from "./page/public/TarifPage";
import CreateUserPage from "./page/public/CreateUserPage";
import GaleriePage from "./page/public/GaleriePage";

// admin
import DashboardPage from "./page/admin/DashboardPage";
import GalleryCrudPage from "./page/admin/GalleryPage";
import AdminImagePage from "./page/admin/AdminImagePage";
import AdminArticlePage from "./page/admin/AdminArticlePage";
import AdminReviewPage from "./page/admin/AdminReviewPage";
import AdminTarifPage from "./page/admin/AdminTarifPage";
import AdminUserPage from "./page/admin/AdminUserPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* utilisateur */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/createUserPage" element={<CreateUserPage />} />
        <Route path="/profilPage" element={<UserPage />} />
        <Route path="/prestations" element={<PrestationPage />} />
        <Route path="/tarifs" element={<TarifPage />} />
        <Route path="/parcours" element={<ParcourPage />} />
        
       

        {/* page de galerie */}
        <Route path="/Galerie" element={<GaleriePage />} />

      
      
        {/* admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/Galerie" element={<GalleryCrudPage />} />
        <Route path="/admin/Image" element={<AdminImagePage />} />
        <Route path="/admin/Review" element={<AdminReviewPage />} />
        <Route path="/admin/Article" element={<AdminArticlePage />} />
        <Route path="/admin/Tarif" element={<AdminTarifPage />} />
        <Route path="/admin/User" element={<AdminUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
