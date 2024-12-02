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
    <div className="flex items-center justify-between gap-4 p-4 transition-colors bg-gray-800 border rounded-md shadow-md hover:bg-gray-700">
      <div className="flex items-center gap-3">
        <FaCodeBranch size={20} className="text-blue-400" />
        <div>
          <h3 className="text-lg font-bold text-blue-300 capitalize">
            {contribuicao.titulo}
          </h3>
          <p className="text-sm text-gray-400 indent-0">
            {contribuicao.descricao}
          </p>
        </div>
      </div>
      <Link
        to={`/contribuicoes/${contribuicao.uuid}`}
        className="text-blue-400 hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
}
