import PagedModel from "../../models/common/PagedModel.ts";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import Navbar from "../../components/UI/Navbar.tsx";
import ListView from "../../components/UI/ListView.tsx";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usuarioService } from "../../api/usuarioService.ts";
import UsuarioItem from "../../components/usuarios/UsuarioItem.tsx";

type PageRequestHandler = (page: number, size: number) => PagedModel<Usuario>

export default function SearchUsuarios() {
  const searchQuery = (useLocation().state) as string;
  const [results, setResults] = useState(PagedModel.emptyPage<Usuario>());
  const [hasMore, setHasMore] = useState(!results.isLast());
  const pageRequestHandler = useCallback((page: number, size: number) =>
    usuarioService.searchByApelido(searchQuery, page, size)
  , [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      const searchResult = await pageRequestHandler(0, 20);
      setResults(searchResult || PagedModel.emptyPage<Usuario>());
    };

    fetchData();
  }, [pageRequestHandler]);

  async function fetchMoreData() {
    if (!hasMore) return;

    const newData = await pageRequestHandler(results.page.number+1, results.page.size);
    newData!.content = [...results.content, ...newData!.content]

    if (newData!.isLast()) setHasMore(false);
    setResults(newData!);
  }

  return (<>
    <div id="root-about" className="w-full overflow-y-auto bg-black h-max">
      <Navbar/>
      <div className="p-8">
        <h1 className="mb-4">Resultados da busca: "{searchQuery}" ({results.page.totalElements} resultados)</h1>
        <ListView>
          {results.content.map(x => <UsuarioItem usuario={x}/>)}
        </ListView>
      </div>
    </div>
  </>);
}
