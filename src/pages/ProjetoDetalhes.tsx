import { Link, useParams } from "react-router-dom";
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
    token: usuario?.token,
    uuid,
  });

  const [donoProjeto, setDonoProjeto] = useState<Usuario | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateContribModalOpen, setIsCreateContribModalOpen] =
    useState(false);

  useEffect(() => {
    if (!projeto) return;

    async function fetchDonoProjeto() {
      const dono = await usuarioService.findByUUID(projeto!.idDono);
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

  function onOpenModalHandler() {
    console.log(usuario);

    if (!usuario) {
      return alert("Para realizar essa ação você precisa estar logado");
      setIsEditModalOpen(false);
    }
    setIsEditModalOpen(true);
  }

  if (isLoading) return <Loading />;

  if (!projeto) {
    return (
      <>
        <div className="flex h-screen flex-col items-center justify-center bg-[#121212] text-white">
          <h1 className="text-3xl font-bold">Projeto não encontrado</h1>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white">
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl rounded-md bg-[#1f1f1f] p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-4xl font-bold capitalize text-blue-400">
              {projeto.titulo}
            </h1>
            {usuario?.uuid === projeto.idDono && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="rounded-md bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700"
              >
                Editar Projeto
              </button>
            )}
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Descrição:
              </h3>
              <p className="text-gray-300">{projeto.descricao}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">Escopo:</h3>
              <p className="text-gray-300">{projeto.escopo}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Dono do Projeto:
              </h3>
              <Link
                to={`/profile/${donoProjeto?.uuid}`}
                className="text-gray-400 hover:underline"
              >
                {donoProjeto?.apelido}
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Contribuições:
              </h3>
              <ContribuicaoList
                contribuicoes={contribuicoes}
                showContribuirModal={onOpenModalHandler}
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
