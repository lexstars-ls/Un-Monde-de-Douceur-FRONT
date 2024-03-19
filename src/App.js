import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/public/LoginPage";
import HomePage from "./page/public/HomePage";
import ReviewPage from "./page/public/ReviewPage";
import UserReviewCreate from "./page/public/UserCreateReview";
import DashboardPage from "./page/admin/DashboardPage";
import CreateUserPage from "./page/public/CreateUserPage";
import UserPage from "./page/public/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* utilisateur */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/createUserPage" element={<CreateUserPage />} />
        <Route path="/profilPage" element={<UserPage />} />


        <Route path="/reviewPage" element={<ReviewPage />} />
        <Route path="/createReview" element={<UserReviewCreate />} />

        {/* admin */}
        <Route path="/admin" element={<DashboardPage />} />

      </Routes>
    </Router>
  );
}

export default App;
