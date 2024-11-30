import useAuth from "../../hooks/useAuth.ts";
import { useParams } from "react-router-dom";
import OwnProfile from "./OwnProfile.tsx";
import OtherProfile from "./OtherProfile.tsx";
import Navbar from "../../components/UI/Navbar.tsx";
import ProjetoItem from "../../components/projeto/ProjetoItem.tsx";
import { Projeto } from "../../models/projetos/Projeto.ts";

export type ProfileProps = {
  uuid: string
}

export default function Profile() {
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
  const { uuid } = useParams();

  return (
    <div className="flex flex-col bg-black h-screen overflow-auto">
      <Navbar />
      {usuario?.uuid === uuid ? <OwnProfile/>
        : <OtherProfile uuid={uuid!}/>}
      <section id="projetos" className="px-8 pb-8">
        <h1 className="py-4">Projetos</h1>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          {projetos.map(() => <ProjetoItem projeto={projetoDummy}/>)}
        </div>
      </section>
    </div>
  );
}