import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.tsx";
import HomePage from "./components/HomePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
