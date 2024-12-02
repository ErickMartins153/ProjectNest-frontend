import { Contribuicao } from "../models/contribuicao/Contribuicao";
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
    const response = await fetch(baseUrl, {
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
  if (!tokenUsuario) return;
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

async function getProjetoByUuid(idProjeto: string, tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idProjeto}`, {
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

    const projeto = (await response.json()) as Projeto;
    return projeto;
  });
}

async function atualizarProjeto(projeto: Projeto, token: string) {
  return tryCatch(async () => {
    const response = await fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projeto),
      method: "PUT",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    return (await response.json()) as Projeto;
  });
}

async function findContribuicoes(idProjeto: string, tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idProjeto}/contribuicoes`, {
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

    const contribuicao = (await response.json()) as Contribuicao[];
    return contribuicao;
  });
}

async function deletarProjeto(idProjeto: string, tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idProjeto}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUsuario}`,
      },
      method: "DELETE",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    const projeto = (await response.json()) as Projeto;
    return projeto;
  });
}

async function searchProjetos(query: string, tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/search?title=${query}`, {
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

export const projetoService = {
  criarProjeto,
  getAllProjetos,
  getProjetoByUuid,
  atualizarProjeto,
  findContribuicoes,
  deletarProjeto,
  searchProjetos,
};
