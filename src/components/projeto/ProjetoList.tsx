import { useState } from "react";
import Button from "../UI/Button";
import CreateProjectModal from "./CreateProject";
import ProjetoItem from "./ProjetoItem";

import { useProjetos } from "../../hooks/useProjetos";
import useAuth from "../../hooks/useAuth";

export default function ProjetoList() {
  const [showModal, setShowModal] = useState(false);
  const { usuario } = useAuth();
  const { refetchProjetos, projetos } = useProjetos({ token: usuario!.token });

  function modalHandler() {
    refetchProjetos();
    setShowModal((prev) => !prev);
  }

  return (
    <div className="rounded-md bg-[#323232] p-6 shadow-lg">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-3xl text-white">Projetos</h2>
        <Button text="Adicionar Projeto" onClick={modalHandler} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projetos.map((projetoData) => (
          <ProjetoItem key={projetoData.uuid} projeto={projetoData} />
        ))}
      </div>
      {showModal && <CreateProjectModal onClose={modalHandler} />}
    </div>
  );
}
