import { Routes, Route, Navigate, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import MainPage from "./pages/MainPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useState } from "react";
import Layout from "./components/Layout";

function App() {
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token"),
  );
  const navigate = useNavigate();

  const handleAuthSuccess = (token) => {
    localStorage.setItem("access_token", token);
    setToken(token);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage handleAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        <Route
          element={
            <PrivateRoute token={token}>
              <Layout handleLogout={handleLogout} />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
