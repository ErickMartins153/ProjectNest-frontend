import { ExceptionBody } from "../models/error/ExceptionBody";
import { Usuario } from "../models/usuarios/Usuario";

import { tryCatch } from "../utils/tryCatch";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/usuarios`;

async function getUsuarioByUuid(idUsuario: string, tokenUsuario: string) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${idUsuario}`, {
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

    const usuario = (await response.json()) as Usuario;
    return usuario;
  });
}

export const usuarioService = {
  getUsuarioByUuid,
};
