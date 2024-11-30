import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";
import useAuth from "./hooks/useAuth.ts";
import Dashboard from "./pages/Dashboard.tsx";
import About from "./pages/About.tsx";
import Profile from "./pages/profile/Profile.tsx";

function App() {
  const { usuario } = useAuth();

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/:uuid" element={<Profile/>} />
        </>
      )}
    </Routes>
  );
}

export default App;
