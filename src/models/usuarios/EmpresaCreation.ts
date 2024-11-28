import { Empresa } from "./Empresa";

export type EmpresaCreation = Omit<Empresa, "uuid" | "roles"> & {
  senha: string;
};
