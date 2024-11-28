import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./components/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";
import { AuthContextProvider } from "./store/AuthContext.tsx";
import About from "./components/About.tsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Auth Child={Login} />} />
          <Route path="/auth/register" element={<Auth Child={Register} />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
