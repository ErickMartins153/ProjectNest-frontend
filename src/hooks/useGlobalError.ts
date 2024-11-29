import { useContext } from "react";
import { GlobalErrorContext } from "../store/GlobalErrorContext";

export const useGlobalError = () => {
  const context = useContext(GlobalErrorContext);
  if (!context) {
    throw new Error("useGlobalError deve estar dentro GlobalErrorProvider");
  }
  return context;
};
