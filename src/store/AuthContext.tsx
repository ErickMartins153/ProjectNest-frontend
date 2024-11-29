import { createContext, ReactNode, useEffect, useState } from "react";
import { Usuario } from "../models/usuarios/Usuario";
import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { EmpresaCreation } from "../models/usuarios/EmpresaCreation";
import { authService } from "../api/authService";
import { UsuarioType } from "../models/usuarios/enums/UsuarioType";
import { Token } from "../models/usuarios/Token";

export type RegisterData = PessoaCreation | EmpresaCreation;

export type Credenciais = {
  email: string;
  senha: string;
};

type AuthContextProps = {
  usuario: AuthResponse | null;
  logar: (credenciais: Credenciais) => Promise<void>;
  registrar: (data: RegisterData) => Promise<void>;
  deslogar: () => Promise<void>;
  isError: Error | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  deslogar: async () => {},
  logar: async () => {},
  registrar: async () => {},
  usuario: null,
  isError: null,
  isLoading: false,
});

export type AuthResponse = Usuario & Token;

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<AuthResponse | null>(null);
  const [isLoading] = useState<AuthContextProps["isLoading"]>(false);
  const [isError, setError] = useState<AuthContextProps["isError"]>(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    } else {
      setUsuario(null);
    }
  }, []);

  async function logar(credenciais: Credenciais) {
    const usuarioLogado = await authService.logar(credenciais);

    if (usuarioLogado === null) {
      setError(() => new Error("Credenciais inválidas"));
      return;
    }

    console.log(`USUARIO LOGADO: ${JSON.stringify(usuarioLogado)}`);
    setUsuario(usuarioLogado);
    setError(null);
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  }

  async function deslogar() {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  async function registrar(data: RegisterData) {
    if (data.type === UsuarioType.PESSOA) {
      authService.registerPessoa(data as PessoaCreation);
      return;
    }
    console.log("Tipo não é PESSOA");
    return;
  }

  const value: AuthContextProps = {
    usuario,
    logar,
    deslogar,
    isError,
    isLoading,
    registrar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
