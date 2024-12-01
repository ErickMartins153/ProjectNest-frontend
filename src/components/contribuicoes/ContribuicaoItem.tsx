import { Link } from "react-router-dom";
import { FaCodeBranch } from "react-icons/fa";
import { Contribuicao } from "../../models/contribuicao/Contribuicao";

type ContribuicaoItemProps = {
  contribuicao: Contribuicao;
};

export default function ContribuicaoItem({
  contribuicao,
}: ContribuicaoItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border bg-[#f5f5f5] p-4 shadow-md hover:bg-blue-100">
      <div className="flex items-center gap-3">
        <FaCodeBranch size={20} className="text-blue-400" />
        <div>
          <h3 className="text-lg font-bold capitalize preto">
            {contribuicao.titulo}
          </h3>
          <p className="text-sm text-gray-600 indent-0">
            {contribuicao.descricao}
          </p>
        </div>
      </div>
      <Link
        to={`/contribuicoes/${contribuicao.uuid}`}
        className="text-blue-500 hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
}
