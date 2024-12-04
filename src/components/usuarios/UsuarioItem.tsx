import { FaProjectDiagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../models/usuarios/Usuario";
import Avatar from "../UI/Avatar.tsx";
import { isPessoa, Pessoa } from "../../models/usuarios/Pessoa.ts";
import { Empresa, isEmpresa } from "../../models/usuarios/Empresa.ts";
import { startCase } from "lodash";

type UsuarioItemProps = {
  usuario: Usuario;
};

export default function UsuarioItem({ usuario: foundUsuario }: UsuarioItemProps) {
  const navigate = useNavigate();

  function toProfileHandler() {
    navigate(`/profile/${foundUsuario.uuid}`);
  }

  return (
    <div
      className="flex transform flex-col justify-between rounded-md bg-[#404040] p-6 shadow-md transition-transform hover:scale-105 hover:cursor-pointer"
      onClick={toProfileHandler}
    >
      <div className="mb-4 flex items-center gap-4">
        <Avatar
          url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
          alt="Ursão"
          size={"6rem"}
        />

        <div>
          <h3 className="text-2xl font-bold text-white">
            {foundUsuario.apelido}
          </h3>
          <div className="text-white flex gap-4">
            <div className="w-max rounded-2xl bg-selected-blue px-1.5">
              {startCase(foundUsuario.type.toLowerCase())}
            </div>
            {isPessoa(foundUsuario) && (
              <div>
                {foundUsuario.pronomes}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {isPessoa(foundUsuario) && showPessoaData(foundUsuario)}
        {isEmpresa(foundUsuario) && showEmpresaData(foundUsuario)}
      </div>
    </div>
  );
}

function showPessoaData(pessoa: Pessoa) {
  return (<>
    <div className="text-white">{pessoa.nome + " " + pessoa.sobrenome}</div>
  </>)
}

function showEmpresaData(empresa: Empresa) {
  return (<>
    <div className="text-white">{empresa.cnpj}</div>
  </>)
}