import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ReservationPage from "../pages/ReservationPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<ReservationPage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard"element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;