import { useState } from "react";
import Button from "../UI/Button";
import CreateProjectModal from "./CreateProject";
import ProjetoItem from "./ProjetoItem";

export default function ProjetoList({ projetos }: { projetos: number[] }) {
  const [showModal, setShowModal] = useState(false);

  function modalHandler() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <Button text="Estudantes" />
          <Button text="Empresas" />
          <Button text="Salvos" />
        </div>

        <Button
          text="Adicionar Projeto"
          onClick={modalHandler}
          selectable={false}
        />
      </div>
      <div className="rounded-md border-2 border-transparent bg-[#757575] p-3 shadow-lg">
        <h2 className="text-3xl text-white">Projetos</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8 overflow-auto">
          {projetos.map(() => (
            <ProjetoItem />
          ))}
        </div>
      </div>
      {showModal && <CreateProjectModal onClose={modalHandler} />}
    </div>
  );
}
