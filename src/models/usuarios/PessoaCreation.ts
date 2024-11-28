import { Pessoa } from "./Pessoa";

export type PessoaCreation = Omit<Pessoa, "uuid" | "roles"> & {
  senha: string;
};
