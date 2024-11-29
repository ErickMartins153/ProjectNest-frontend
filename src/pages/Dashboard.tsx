import { useState } from "react";
import ProjetoList from "../components/projeto/ProjetoList";
import Navbar from "../components/UI/Navbar";
import UserLabel from "../components/UI/UserLabel";
import { Categorias } from "../models/projetos/enums/Categorias";
import { useProjetos } from "../hooks/useProjetos";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { usuario } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof Categorias | ""
  >("");

  const { projetos } = useProjetos(selectedCategory, usuario!.token);

  function selectCategoryHandler(category: typeof selectedCategory) {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  }

  return (
    <div className="flex flex-col w-full bg-black">
      <Navbar />
      <div className="flex flex-col px-6 py-4">
        <UserLabel />
        <ProjetoList
          projetos={projetos}
          onChangeCategory={selectCategoryHandler}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
