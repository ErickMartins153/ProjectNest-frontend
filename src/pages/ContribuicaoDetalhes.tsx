import { Link, useParams } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import EditContribuicao from "../components/contribuicoes/EditContribuicao";
import { useContribuicoes } from "../hooks/useContribuicoes";

export default function ContribuicaoDetalhes() {
  const { uuid } = useParams<{ uuid: string }>();
  const { usuario } = useAuth();
  const { contribuicao, getContribuintes, contribuintes } = useContribuicoes({
    token: usuario!.token,
    contribuicaoUuid: uuid,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (contribuicao && contribuicao.uuid && contribuicao.idUsuarios) {
      getContribuintes(contribuicao.uuid, contribuicao.idUsuarios);
    }
    setIsLoading(false);
  }, [contribuicao, getContribuintes]);

  if (isLoading) return <Loading />;

  if (!contribuicao) {
    return (
      <>
        <div className="flex h-screen flex-col items-center justify-center bg-[#121212] text-white">
          <h1 className="text-3xl font-bold">Contribuição não encontrada</h1>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white">
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl rounded-md bg-[#1f1f1f] p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-blue-400 capitalize">
              {contribuicao.titulo}
            </h1>
            {contribuicao.idUsuarios.includes(usuario!.uuid) && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 text-white transition-all bg-green-600 rounded-md hover:bg-green-700"
              >
                Editar Contribuição
              </button>
            )}
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Descrição:
              </h3>
              <p className="text-gray-300">{contribuicao.descricao}</p>
            </div>
            {contribuicao.urlRepositorio && (
              <div>
                <h3 className="text-lg font-semibold text-blue-300">
                  URL do Repositório:
                </h3>
                <a
                  href={contribuicao.urlRepositorio}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="text-blue-400 hover:underline"
                >
                  Link para repositório
                </a>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Contribuidores:
              </h3>
              {contribuintes &&
                contribuintes.map((contribuinte) => (
                  <li key={contribuinte.uuid}>
                    <Link
                      to={`/profile/${contribuinte?.uuid}`}
                      className="text-gray-400 hover:underline"
                    >
                      {contribuinte?.apelido}
                    </Link>
                  </li>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditContribuicao
          contribuicao={contribuicao}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
