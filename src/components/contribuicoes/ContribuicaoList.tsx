import { Contribuicao } from "../../models/contribuicao/Contribuicao";
import ContribuicaoItem from "./ContribuicaoItem";

type ContribuicaoListProps = {
  contribuicoes: Contribuicao[];
  onFilterChange?: (filter: string) => void;
  showContribuirModal: (state: boolean) => void;
};

export default function ContribuicaoList({
  contribuicoes,
  showContribuirModal,
}: ContribuicaoListProps) {
  return (
    <div className="mt-4">
      <div className="p-6 bg-gray-900 border rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-300">Contribuições</h2>
          <button
            onClick={() => showContribuirModal(true)}
            className="px-4 py-2 text-sm font-semibold text-white transition-all bg-green-600 rounded-md hover:bg-green-700"
          >
            Adicionar Contribuição
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {contribuicoes.length > 0 ? (
            contribuicoes.map((contribuicao) => (
              <ContribuicaoItem
                key={contribuicao.uuid}
                contribuicao={contribuicao}
              />
            ))
          ) : (
            <p className="text-gray-400">Nenhuma contribuição encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
