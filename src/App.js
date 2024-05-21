import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// client
import LoginPage from "./page/public/LoginPage";
import HomePage from "./page/public/HomePage";
import ReviewPage from "./page/public/ReviewPage";
import UserReviewCreate from "./page/public/UserCreateReview";
import UserPage from "./page/public/UserPage";
import ParcoursPage from "./page/public/ParcoursPage";
import CreateUserPage from "./page/public/CreateUserPage";

// admin
import DashboardPage from "./page/admin/DashboardPage";
import GalleryCrudPage from "./page/admin/GalleryPage";
import AdminImagePage from "./page/admin/AdminImagePage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* utilisateur */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/createUserPage" element={<CreateUserPage />} />
        <Route path="/profilPage" element={<UserPage />} />
        <Route path="/Parcours" element={<ParcoursPage />} />

        {/* utilisateur Review */}
        <Route path="/reviewPage" element={<ReviewPage />} />
        <Route path="/createReview" element={<UserReviewCreate />} />

        {/* admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/Galerie" element={<GalleryCrudPage />} />
        <Route path="/admin/Image" element={<AdminImagePage />} />

      </Routes>
    </Router>
  );
}

export default App;
