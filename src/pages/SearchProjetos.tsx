import { useLocation } from "react-router-dom";
import { Projeto } from "../models/projetos/Projeto";
import ProjetoList from "../components/projeto/ProjetoList";

export default function SearchProjetos() {
  const location = useLocation();
  const projetos = (location.state?.projetos || []) as Projeto[];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Resultados da Busca</h1>
      {projetos.length > 0 ? (
        <ProjetoList projetos={projetos} />
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </div>
  );
}
