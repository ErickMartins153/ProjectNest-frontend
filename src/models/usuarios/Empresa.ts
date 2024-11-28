import { UsuarioType } from "./enums/UsuarioType";
import { Usuario } from "./Usuario";

export interface Empresa extends Usuario {
  cnpj: string;
}

export function isEmpresa(user: Usuario): user is Empresa {
  return user.type === UsuarioType.EMPRESA;
}
