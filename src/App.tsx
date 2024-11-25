import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import HomePage from "./components/HomePage.tsx";
import Auth from "./components/auth/Auth.tsx";
import Register from "./components/auth/Register.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/login" element={<Auth Child={Login} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
