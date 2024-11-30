import ProfileInfo from "./components/ProfileInfo.tsx";
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import ProjetoItem from "../../components/projeto/ProjetoItem.tsx";
import { Projeto } from "../../models/projetos/Projeto.ts";


export default function OwnProfile() {
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
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const goTo = (path: string) => () => navigate(path);

  return (<>
    <div className="p-8 flex flex-col bg-secondary-color h-max">
      <BsGearFill className="ms-auto text-white cursor-pointer"
                  size={"2.4rem"}
                  onClick={goTo("/update-profile")} />
      <div className="flex flex-col md:flex-row h-full items-center">
        <ProfileInfo usuario={usuario as Usuario} />
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