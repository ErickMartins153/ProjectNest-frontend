import { Link } from "react-router-dom";
import { FaCodeBranch } from "react-icons/fa";
import { Contribuicao } from "../../models/contribuicao/Contribuicao";
import useAuth from "../../hooks/useAuth";

type ContribuicaoItemProps = {
  contribuicao: Contribuicao;
};

export default function ContribuicaoItem({
  contribuicao,
}: ContribuicaoItemProps) {
  const { usuario } = useAuth();
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border bg-gray-800 p-4 shadow-md transition-colors hover:bg-gray-700">
      <div className="flex items-center gap-3">
        <FaCodeBranch size={20} className="text-blue-400" />
        <div>
          <h3 className="text-lg font-bold capitalize text-blue-300">
            {contribuicao.titulo}
          </h3>
          <p className="indent-0 text-sm text-gray-400">
            {contribuicao.descricao}
          </p>
        </div>
      </div>
      {usuario ? (
        <Link
          to={`/contribuicoes/${contribuicao.uuid}`}
          className="text-blue-400 hover:underline"
        >
          Ver detalhes
        </Link>
      ) : (
        <p>Logue para ver detalhes</p>
      )}
    </div>
  );
}
