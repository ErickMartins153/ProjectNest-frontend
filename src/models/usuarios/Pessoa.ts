import { UsuarioType } from "./enums/UsuarioType";
import { Usuario } from "./Usuario";

export interface Pessoa extends Usuario {
  nome: string;
  sobrenome: string;
  pronomes?: string;
}

export const isPessoa = (user: Usuario): user is Pessoa => {
  return user.type === UsuarioType.PESSOA;
};
