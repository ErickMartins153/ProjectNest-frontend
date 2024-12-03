import ProfileInfo from "./components/ProfileInfo.tsx";
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
import useAuth from "../../hooks/useAuth.ts";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import ProjetoList from "../../components/projeto/ProjetoList.tsx";
import ProfileConfigModal from "./ProfileConfigModal.tsx";
import { useState } from "react";

export default function OwnProfile() {
  const [ showModal, setShowModal ] = useState(false);
  const { usuario } = useAuth();

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <div className="flex flex-col p-8 h-max bg-secondary-color">
        <BsGearFill
          className="text-white cursor-pointer ms-auto"
          size={"2.4rem"}
          onClick={toggleModal}
        />
        <div className="flex flex-col items-center h-full md:flex-row">
          <ProfileInfo usuario={usuario as Usuario} />
        </div>
      </div>
      {showModal && <ProfileConfigModal toggleModal={toggleModal}/>}
      <section id="projetos" className="px-8 pb-8">
        <div className="py-4">
          <ProjetoList />
        </div>
      </section>
    </>
  );
}
