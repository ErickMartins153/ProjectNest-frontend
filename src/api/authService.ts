import { Token } from "../models/usuarios/Token";
import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { Usuario } from "../models/usuarios/Usuario";
import { AuthResponse, Credenciais } from "../store/AuthContext";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

async function registerPessoa(pessoaCreation: PessoaCreation) {
  const response = await fetch(`${baseUrl}/usuarios/pessoas`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pessoaCreation),
    method: "POST",
  });
  if (!response.ok) {
    console.log(response);
    return;
  }
  const data = await response.json();
  console.log(data);
  return;
}

async function logar(credenciais: Credenciais) {
  console.log(credenciais);

  try {
    const response = await fetch(`${baseUrl}/login`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciais),
      method: "POST",
    });

    const data = (await response.json()) as {
      usuarioDTO: Usuario;
      tokenDTO: Token;
    };

    const mergedData: AuthResponse = { ...data.usuarioDTO, ...data.tokenDTO };

    return mergedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const authService = { registerPessoa, logar };
