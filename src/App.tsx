import { Route, Routes } from "react-router-dom";
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

function App() {
  const { usuario, refresh } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (usuario !== null) refresh(usuario.token);
      console.log("REFRESHING")
    }, 300000)

    return () => {
      clearInterval(interval);
    };
  }, [usuario, refresh]);

  return (
    <Routes>
      {!usuario ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Auth Child={Login} />} />
          <Route path="/auth/register" element={<Auth Child={Register} />} />
          <Route path="/about" element={<About/>} />
        </>
      ) : (
        <>
        <Route path="/auth/login" element={<Auth Child={Login} />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/:uuid" element={<Profile/>} />
        </>
      )}
    </Routes>
  );
}

export default App;
