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
      <div className="rounded-lg border bg-gray-900 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-300">Contribuições</h2>
          <button
            onClick={() => showContribuirModal(true)}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700"
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
