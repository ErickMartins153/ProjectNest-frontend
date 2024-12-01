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
      <div className="flex flex-row justify-between mb-4"></div>
      <div className="p-4 bg-gray-200 border rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-4 align-middle preto">
          <h2 className="mb-4 text-2xl">Contribuições</h2>

          <button
            onClick={() => showContribuirModal(true)}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
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
            <p className="text-gray-500">Nenhuma contribuição encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
