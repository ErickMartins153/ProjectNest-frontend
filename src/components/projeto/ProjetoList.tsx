import { useState } from "react";
import Button from "../UI/Button";
import CreateProjectModal from "./CreateProject";
import ProjetoItem from "./ProjetoItem";
import { Categorias } from "../../models/projetos/enums/Categorias";

type ProjetoListProps = {
  projetos: number[];
  onChangeCategory: (category: keyof typeof Categorias) => void;
  selectedCategory: keyof typeof Categorias | "";
};

export default function ProjetoList({
  projetos,
  onChangeCategory,
  selectedCategory,
}: ProjetoListProps) {
  const [showModal, setShowModal] = useState(false);

  function modalHandler() {
    setShowModal((prev) => !prev);
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <Button
            text="Estudantes"
            onClick={onChangeCategory.bind(null, "ESTUDANTES")}
            isSelected={selectedCategory === "ESTUDANTES"}
          />
          <Button
            text="Empresas"
            onClick={onChangeCategory.bind(null, "EMPRESAS")}
            isSelected={selectedCategory === "EMPRESAS"}
          />
          <Button
            text="Salvos"
            onClick={onChangeCategory.bind(null, "SALVOS")}
            isSelected={selectedCategory === "SALVOS"}
          />
        </div>

        <Button text="Adicionar Projeto" onClick={modalHandler} />
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
