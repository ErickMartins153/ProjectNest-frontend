import { Contribuicao } from "../models/contribuicao/Contribuicao";
import { ContribuicaoCreation } from "../models/contribuicao/ContribuicaoCreation";
import { ExceptionBody } from "../models/error/ExceptionBody";
import { Usuario } from "../models/usuarios/Usuario";

import { tryCatch } from "../utils/tryCatch";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/contribuicoes`;

async function criarContribuicao(
  contribuicaoCreation: ContribuicaoCreation,
  tokenUsuario: string,
) {
  return tryCatch(async () => {
    const response = await fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUsuario}`,
      },
      body: JSON.stringify(contribuicaoCreation),
      method: "POST",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    return (await response.json()) as Contribuicao;
  });
}

async function getAllContribuicoes(tokenUsuario: string) {
  if (!tokenUsuario) return;
  return tryCatch(async () => {
    const response = await fetch(baseUrl, {
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

    const contribuicoes = (await response.json()) as Contribuicao[];
    return contribuicoes;
  });
}

async function getContribuicaoByUuid(
  idContribuicao: string,
  tokenUsuario: string,
) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idContribuicao}`, {
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

    const contribuicao = (await response.json()) as Contribuicao;
    return contribuicao;
  });
}

async function atualizarContribuicao(
  contribuicao: Contribuicao,
  token: string,
) {
  return tryCatch(async () => {
    const response = await fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contribuicao),
      method: "PUT",
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    return (await response.json()) as Contribuicao;
  });
}

async function deletarContribuicao(
  idContribuicao: string,
  tokenUsuario: string,
) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idContribuicao}`, {
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

    return;
  });
}

async function getContribuintes(
  idContribuicao: string,
  idsContribuintes: string[],
  tokenUsuario: string,
) {
  return tryCatch(async () => {
    console.log(idContribuicao, idsContribuintes, tokenUsuario);

    const response = await fetch(`${baseUrl}/${idContribuicao}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUsuario}`,
      },
      method: "POST",
      body: JSON.stringify(idsContribuintes),
    });

    if (!response.ok) {
      const error = (await response.json()) as ExceptionBody;
      throw error;
    }

    return (await response.json()) as Usuario[];
  });
}

export const contribuicaoService = {
  criarContribuicao,
  getAllContribuicoes,
  getContribuicaoByUuid,
  atualizarContribuicao,
  deletarContribuicao,
  getContribuintes,
};
