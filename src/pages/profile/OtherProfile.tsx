import { ProfileProps } from "./Profile.tsx";
import { usuarioService } from "../../api/usuarioService.ts";
import useAuth from "../../hooks/useAuth.ts";
import ProfileInfo from "./components/ProfileInfo.tsx";
import { useEffect, useState } from "react";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import ProjetoItem from "../../components/projeto/ProjetoItem.tsx";
import { Projeto } from "../../models/projetos/Projeto.ts";

export default function OtherProfile({ uuid }: ProfileProps) {
  const projetos: number[] = [1, 2, 3, 4, 5];
  const projetoDummy: Projeto = {
    escopo: "Educação",
    idDono: "123",
    status: "pendente",
    urlRepositorio: "abc.com",
    uuid: "1234",
    titulo: "ProjectNest",
    descricao: "Projeto Top"
  }
  const { usuario } = useAuth();
  const [other, setOther] = useState<Usuario | null>(null);

  useEffect( () => {
    const fetchUsuario = async () => {
      const found = await usuarioService.findByUUID(uuid, usuario!.token);
      setOther(found ? found : null);
    }

    fetchUsuario();
  }, [usuario, uuid]);

  if (usuario === null) {
    return <h1>Usuário não encontrado =(</h1>
  }

  return (<>
    <div className="p-8 flex flex-col bg-secondary-color h-max">
      <div className="flex flex-col md:flex-row h-full items-center">
        {other && <ProfileInfo usuario={other} />}
      </div>
    </div>
    <section id="projetos" className="px-8 pb-8">
      <h1 className="py-4">Projetos</h1>
      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {projetos.map(() => <ProjetoItem projeto={projetoDummy} />)}
      </div>
    </section>
  </>);
}


