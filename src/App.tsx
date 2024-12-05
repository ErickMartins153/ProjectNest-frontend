import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";
import useAuth from "./hooks/useAuth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import About from "./pages/About.tsx";
import Profile from "./pages/profile/Profile.tsx";
import UpdateProfile from "./pages/profile/UpdateProfile.tsx";
import { useEffect } from "react";
import ProjetoDetalhes from "./pages/ProjetoDetalhes.tsx";
import ContribuicaoDetalhes from "./pages/ContribuicaoDetalhes.tsx";
import SearchProjetos from "./pages/SearchProjetos.tsx";
import PageLayout from "./components/UI/PageLayout.tsx";
import SearchUsuarios from "./pages/usuarios/SearchUsuarios.tsx";

function App() {
  const { usuario, refresh, isLoading } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (usuario !== null) refresh(usuario.token);
      console.log("REFRESHING");
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [usuario, refresh]);

  if (isLoading) return null;

  return (
    <Routes>
      {/* Rotas de autenticação */}
      <Route element={<PageLayout />}>
        {!usuario ? (
          <>
            <Route index element={<HomePage />} />
            <Route path="/auth/login" element={<Auth Child={Login} />} />
            <Route path="/auth/register" element={<Auth Child={Register} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route index element={<Dashboard />} />
            <Route path="/profile/:uuid" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route
              path="/contribuicoes/:uuid"
              element={<ContribuicaoDetalhes />}
            />
            <Route path="/projetos/:uuid" element={<ProjetoDetalhes />} />
            <Route path="/projetos/search" element={<SearchProjetos />} />
            <Route path="/usuarios/search" element={<SearchUsuarios />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
