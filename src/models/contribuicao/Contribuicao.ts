export interface Contribuicao {
  uuid: string;
  idUsuarios: string[];
  idProjeto: string;
  titulo: string;
  descricao: string;
  urlRepositorio?: string;
}
