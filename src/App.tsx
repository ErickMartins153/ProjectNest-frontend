import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";
import useAuth from "./hooks/useAuth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import About from "./components/About.tsx";
import ProjetoDetalhes from "./pages/ProjetoDetalhes.tsx";

function App() {
  const { usuario, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/about" element={<About />} />
      {!usuario ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Auth Child={Login} />} />
          <Route path="/auth/register" element={<Auth Child={Register} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projetos/:uuid" element={<ProjetoDetalhes />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
