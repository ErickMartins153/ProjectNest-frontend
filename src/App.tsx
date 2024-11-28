import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./components/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";
import useAuth from "./hooks/useAuth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import { useEffect } from "react";

function App() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  return (
    <Routes>
      {!usuario ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Auth Child={Login} />} />
          <Route path="/auth/register" element={<Auth Child={Register} />} />
        </>
      ) : (
        <Route path="/" element={<Dashboard />} />
      )}
    </Routes>
  );
}

export default App;
