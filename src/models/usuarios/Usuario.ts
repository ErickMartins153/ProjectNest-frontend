import { UsuarioType } from "./enums/UsuarioType";

export interface Usuario {
  type: UsuarioType;
  uuid: string;
  apelido: string;
  email: string;
  roles: string[];
}
