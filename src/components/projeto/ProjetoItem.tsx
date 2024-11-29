import { Projeto } from "../../models/projetos/Projeto";

type ProjetoItemProps = {
  projeto: Projeto;
};

export default function ProjetoItem({ projeto }: ProjetoItemProps) {
  return (
    <div className="preto m-4 aspect-square min-w-[100px] rounded-md border-4 bg-[#e6e6e6] p-8 shadow-lg transition-transform duration-200 hover:scale-110">
      <h3>{projeto.titulo}</h3>
      <h4>{projeto.descricao}</h4>
    </div>
  );
}
