import { Token } from "../models/usuarios/Token";
import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { Usuario } from "../models/usuarios/Usuario";
import { AuthResponse, Credenciais } from "../store/AuthContext";
import { ExceptionBody } from "../models/error/ExceptionBody";
import { tryCatch } from "../utils/tryCatch";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

async function registerPessoa(pessoaCreation: PessoaCreation) {
  await fetch(`${baseUrl}/usuarios/pessoas`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pessoaCreation),
    method: "POST",
  });

  return;
}

async function logar(credenciais: Credenciais) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/login`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciais),
      method: "POST",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    const data = (await response.json()) as {
      usuarioDTO: Usuario;
      tokenDTO: Token;
    };

    const mergedData: AuthResponse = { ...data.usuarioDTO, ...data.tokenDTO };
    return mergedData;
  });
}

async function refresh(token: string): Promise<AuthResponse | null> {
  const response = await tryCatch(async () =>
    await fetch(`${baseUrl}/validate`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST"
    })
  );

  if (response === undefined || !response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    usuarioDTO: Usuario,
    tokenDTO: Token
  };

  return { ...data.usuarioDTO, ...data.tokenDTO };
}

export const authService = { registerPessoa, logar, refresh };
