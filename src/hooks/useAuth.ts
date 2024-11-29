import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve estar dentro useAuthProvider");
  }
  return context;
}
