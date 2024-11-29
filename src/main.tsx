import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./store/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./utils/ErrorBoundary.tsx";
import { GlobalErrorProvider } from "./store/GlobalErrorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalErrorProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </GlobalErrorProvider>
    </ErrorBoundary>
  </StrictMode>,
);
