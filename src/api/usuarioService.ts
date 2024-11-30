import { UsuarioUpdate } from "../models/usuarios/UsuarioUpdate.ts";
import { UsuarioType } from "../models/usuarios/enums/UsuarioType.ts";
import { tryCatch } from "../utils/tryCatch.ts";
import { ExceptionBody } from "../models/error/ExceptionBody.ts";
import { Usuario } from "../models/usuarios/Usuario.ts";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/usuarios`;

async function updateUsuario(usuarioUpdate: UsuarioUpdate, token: string) {
  const endpoint =
    usuarioUpdate.type === UsuarioType.PESSOA ? "pessoas" : "empresas";

  return tryCatch(async () => {
    const response = await fetch(
      `${baseUrl}/${endpoint}/${usuarioUpdate.uuid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuarioUpdate),
        method: "PUT",
      },
    );

    if (!response.ok) {
      throw (await response.json()) as ExceptionBody;
    }
  });
}

async function findByUUID(
  uuid: string,
  token: string,
): Promise<void | Usuario> {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw (await response.json()) as ExceptionBody;
    }

    return (await response.json()) as Usuario;
  });
}

export const usuarioService = { updateUsuario, findByUUID };
