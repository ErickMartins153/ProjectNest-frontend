import { Link, useParams } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Loading from "../components/UI/Loading";
import { usuarioService } from "../api/usuarioService";
import { useEffect, useState } from "react";
import { Usuario } from "../models/usuarios/Usuario";
import { useProjetos } from "../hooks/useProjetos";
import useAuth from "../hooks/useAuth";
import EditProject from "../components/projeto/EditProject";
import CreateContribuicao from "../components/contribuicoes/CreateContribuicao";
import ContribuicaoList from "../components/contribuicoes/ContribuicaoList";

export default function ProjetoDetalhes() {
  const { uuid } = useParams<{ uuid: string }>();
  const { usuario } = useAuth();
  const { projeto, isLoading, refetchProjetos, contribuicoes } = useProjetos({
    token: usuario!.token,
    uuid,
  });

  const [donoProjeto, setDonoProjeto] = useState<Usuario | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateContribModalOpen, setIsCreateContribModalOpen] =
    useState(false);

  useEffect(() => {
    if (!projeto) return;

    async function fetchDonoProjeto() {
      const dono = await usuarioService.findByUUID(
        projeto!.idDono,
        usuario!.token,
      );
      setDonoProjeto(dono || null);
    }

    fetchDonoProjeto();
  }, [projeto, usuario]);

  async function onEditSubmit() {
    await refetchProjetos();
    setIsEditModalOpen(false);
  }

  async function onContribSubmit() {
    await refetchProjetos();
    setIsCreateContribModalOpen(false);
  }

  if (isLoading) return <Loading />;

  if (!projeto) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
          <h1 className="text-3xl font-bold">Projeto não encontrado</h1>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h1 className="mb-4 text-4xl font-bold text-blue-400 capitalize">
              {projeto.titulo}
            </h1>
            {usuario?.uuid === projeto.idDono && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Editar Projeto
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Descrição:
              </h3>
              <p className="mb-6 text-lg text-gray-300 indent-0">
                {projeto.descricao}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">Escopo:</h3>
              <p className="mb-6 text-lg text-gray-300 indent-0">
                {projeto.escopo}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Dono do Projeto:
              </h3>
              <Link to={`/profile/${donoProjeto?.uuid}`}>
                <p className="text-xl text-gray-400 capitalize indent-0 hover:underline">
                  {donoProjeto?.apelido}
                </p>
              </Link>
            </div>
            <div>
              <ContribuicaoList
                contribuicoes={contribuicoes}
                showContribuirModal={setIsCreateContribModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProject projeto={projeto} onClose={onEditSubmit} />
      )}
      {isCreateContribModalOpen && (
        <CreateContribuicao
          projetoId={projeto.uuid}
          onClose={onContribSubmit}
        />
      )}
    </div>
  );
}
