import { createContext, ReactNode, useState } from "react";
import { Usuario } from "../models/usuarios/Usuario";
import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { EmpresaCreation } from "../models/usuarios/EmpresaCreation";
import { authService } from "../api/authService";
import { UsuarioType } from "../models/usuarios/enums/UsuarioType";

export type RegisterData = PessoaCreation | EmpresaCreation;

type Credenciais = {
  email: string;
  senha: string;
};

type AuthContextProps = {
  usuario: Usuario | null;
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

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<AuthContextProps["usuario"]>(null);
  const [isLoading, setIsLoading] =
    useState<AuthContextProps["isLoading"]>(false);
  const [isError, setIsError] = useState<AuthContextProps["isError"]>(null);

  async function logar(credenciais: Credenciais) {
    console.log(credenciais);
  }

  async function deslogar() {}

  async function registrar(data: RegisterData) {
    console.log("chegou");

    if (data.type === UsuarioType.PESSOA) {
      console.log("Registrando pessoa");
      authService.registerPessoa(data as PessoaCreation);
      return;
    }

    console.log("Tipo não é PESSOA, ou outro comportamento aqui");
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
