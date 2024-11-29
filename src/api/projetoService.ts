import { ExceptionBody } from "../models/error/ExceptionBody";
import { Projeto } from "../models/projetos/Projeto";
import { ProjetoCreation } from "../models/projetos/ProjetoCreation";
import { tryCatch } from "../utils/tryCatch";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/projetos`;

async function criarProjeto(
  projetoCreation: ProjetoCreation,
  tokenUsuario: string,
) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUsuario}`,
      },
      body: JSON.stringify(projetoCreation),
      method: "POST",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    return;
  });
}

async function getAllProjetos(tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUsuario}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    const projetos = (await response.json()) as Projeto[];
    return projetos;
  });
}

export const projetoService = { criarProjeto, getAllProjetos };
