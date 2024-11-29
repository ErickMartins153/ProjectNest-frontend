import { Projeto } from "./Projeto";

export type ProjetoCreation = Omit<Projeto, "uuid">;
