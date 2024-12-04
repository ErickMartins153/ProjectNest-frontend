import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjetos } from "../../hooks/useProjetos";

export default function SearchBar() {
  const { buscarProjetos } = useProjetos({ });
  const [searchType, setSearchType] = useState<"projeto" | "usuario">(
    "projeto",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (searchType === "projeto") {
        const projetos = await buscarProjetos(searchQuery);
        setSearchQuery("");
        navigate("/projetos/search", { state: { projetos } });
      } else {
        navigate("/usuarios/search", { state: searchQuery });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex items-center justify-items-center"
      onSubmit={handleSearch}
    >
      <div className="flex w-[24em] rounded-lg bg-white">
        <div className="flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Buscar por ${searchType}`}
            className="h-full w-full bg-transparent p-2 focus:outline-none"
          />
        </div>
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value as "projeto" | "usuario")
          }
          className="rounded bg-gray-200 px-2 py-[0.25em] text-sm"
        >
          <option value="projeto">Projeto</option>
          <option value="usuario">Usuário</option>
        </select>
        <button className="rounded bg-white px-[0.25em] py-[0.25em]">
          Buscar
        </button>
      </div>
    </form>
  );
}
