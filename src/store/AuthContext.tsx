import { createContext, ReactNode, useEffect, useState } from "react";
import { Usuario } from "../models/usuarios/Usuario";
import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { EmpresaCreation } from "../models/usuarios/EmpresaCreation";
import { authService } from "../api/authService";
import { UsuarioType } from "../models/usuarios/enums/UsuarioType";
import { Token } from "../models/usuarios/Token";
import _ from "lodash"

export type RegisterData = PessoaCreation | EmpresaCreation;

export type Credenciais = {
  email: string;
  senha: string;
};

type AuthContextProps = {
  usuario: AuthResponse | null;
  logar: (credenciais: Credenciais) => Promise<void>;
  registrar: (data: RegisterData) => Promise<void>;
  refresh: (token: string) => void
  deslogar: () => Promise<void>;
  isError: Error | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  deslogar: async () => {},
  logar: async () => {},
  registrar: async () => {},
  refresh: async () => {},
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
    try {
      if (usuarioLocal) {
        setUsuario(JSON.parse(usuarioLocal));
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro ao parsear o usuário do localStorage:", error);
      setUsuario(null);
      localStorage.removeItem("usuario");
    }
  }, []);

  async function refresh() {
    if (usuario === null) return;
    const authResponse = await authService.refresh(usuario.token)

    if (authResponse === null) {
      await deslogar();
      return;
    }

    if (!_.isEqual(usuario, authResponse)) {
      localStorage.setItem("usuario", JSON.stringify(authResponse))
      setUsuario(authResponse);
    }
  }

  async function logar(credenciais: Credenciais) {
    const usuarioLogado = await authService.logar(credenciais);
    setUsuario(usuarioLogado || null);
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  }

  async function deslogar() {
    await localStorage.removeItem("usuario");
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
    refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
