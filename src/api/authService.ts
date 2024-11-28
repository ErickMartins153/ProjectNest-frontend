import { PessoaCreation } from "../models/usuarios/PessoaCreation";
import { Usuario } from "../models/usuarios/Usuario";

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
  return data as Usuario;
}

export const authService = { registerPessoa };
