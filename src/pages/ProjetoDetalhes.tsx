import { Link, useParams } from "react-router-dom";
import { useProjetos } from "../hooks/useProjetos";
import Navbar from "../components/UI/Navbar";
import useAuth from "../hooks/useAuth";
import Loading from "../components/UI/Loading";
import { useEffect, useState } from "react";
import { usuarioService } from "../api/usuarioService";
import { Usuario } from "../models/usuarios/Usuario";

export default function ProjetoDetalhes() {
  const { uuid } = useParams<{ uuid: string }>();
  const { usuario } = useAuth();
  const { projeto, isLoading } = useProjetos({ token: usuario!.token, uuid });

  const [donoProjeto, setDonoProjeto] = useState<Usuario | null>(null);

  useEffect(() => {
    if (!projeto) return;

    async function fetchDonoProjeto() {
      const dono = await usuarioService.getUsuarioByUuid(
        projeto!.idDono,
        usuario!.token,
      );
      setDonoProjeto(dono || null);
    }

    fetchDonoProjeto();
  }, [projeto, usuario]);

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
          <h1 className="mb-4 text-4xl font-bold text-blue-400 capitalize">
            {projeto.titulo}
          </h1>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Descrição:
              </h3>
              <p className="mb-6 text-lg text-gray-300">{projeto.descricao}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">Escopo:</h3>
              <p className="text-gray-400">{projeto.escopo}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">Status:</h3>
              <p className="text-gray-400">{projeto.status}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Repositório:
              </h3>
              <a
                href={projeto.urlRepositorio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Ir para o repositório
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300">
                Dono do Projeto:
              </h3>
              <Link to={`/profile/${donoProjeto?.uuid}`}>
                <p className="text-xl text-gray-400 capitalize hover:underline">
                  {donoProjeto?.apelido}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
