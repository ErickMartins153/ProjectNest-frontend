import { FaProjectDiagram, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Projeto } from "../../models/projetos/Projeto";
import { useEffect, useState } from "react";
import { Usuario } from "../../models/usuarios/Usuario";
import { usuarioService } from "../../api/usuarioService";
import useAuth from "../../hooks/useAuth";

type ProjetoItemProps = {
  projeto: Projeto;
};

export default function ProjetoItem({ projeto }: ProjetoItemProps) {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [donoProjeto, setDonoProjeto] = useState<Usuario | null>(null);

  useEffect(() => {
    if (!projeto) return;

    async function fetchDonoProjeto() {
      const dono = await usuarioService.findByUUID(
        projeto.idDono,
        usuario!.token,
      );
      setDonoProjeto(dono || null);
    }

    fetchDonoProjeto();
  }, [projeto, usuario]);

  function toDetailsHandler() {
    navigate(`/projetos/${projeto.uuid}`);
  }

  return (
    <div
      className="flex transform flex-col justify-between rounded-md bg-[#404040] p-6 shadow-md transition-transform hover:scale-105 hover:cursor-pointer"
      onClick={toDetailsHandler}
    >
      <div className="flex items-center gap-4 mb-4">
        <FaProjectDiagram size={24} className="text-blue-400" />
        <h3 className="text-2xl font-bold text-white">{projeto.titulo}</h3>
      </div>
      <p className="mb-4 text-gray-300">{projeto.descricao}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <FaUserAlt />
          <span className="capitalize">
            {donoProjeto?.apelido || "Desconhecido"}
          </span>
        </div>
      </div>
    </div>
  );
}
