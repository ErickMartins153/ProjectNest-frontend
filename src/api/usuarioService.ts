import { UsuarioUpdate } from "../models/usuarios/UsuarioUpdate.ts";
import { UsuarioType } from "../models/usuarios/enums/UsuarioType.ts";
import { tryCatch } from "../utils/tryCatch.ts";
import { ExceptionBody } from "../models/error/ExceptionBody.ts";
import { Usuario } from "../models/usuarios/Usuario.ts";
import PagedModel from "../models/common/PagedModel.ts";

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

    return true;
  });
}

async function findByUUID(uuid: string): Promise<void | Usuario> {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw (await response.json()) as ExceptionBody;
    }

    return (await response.json()) as Usuario;
  });
}

async function searchByApelido(apelido: string, page: number, size: number) {
  return tryCatch(async () => {
    const response = await fetch(`${baseUrl}?apelido=${apelido}&page=${page}&size=${size}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw (await response.json()) as ExceptionBody;
    }

    return PagedModel.fromJson<Usuario>(await response.json())
  });
}

export const usuarioService = { updateUsuario, findByUUID, searchByApelido };
