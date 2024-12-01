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
        projeto!.idDono,
        usuario!.token,
      );
      setDonoProjeto(dono || null);
    }

    fetchDonoProjeto();
  }, [projeto, usuario]);

  function toDetailsHandler() {
    navigate(`projetos/${projeto.uuid}`);
  }

  return (
    <div
      className="preto m-4 aspect-square min-w-[100px] transform rounded-md border-4 bg-[#e6e6e6] p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:border-blue-400 hover:bg-blue-100"
      onClick={toDetailsHandler}
    >
      <div className="flex items-center gap-4 mb-4">
        <FaProjectDiagram size={24} className="text-blue-400 capitalize" />
        <h3 className="text-xl font-bold">{projeto.titulo}</h3>
      </div>
      <h4 className="text-gray-500">{projeto.descricao}</h4>

      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <FaUserAlt />
          <span className="capitalize">{donoProjeto?.apelido}</span>
        </div>
      </div>
    </div>
  );
}
