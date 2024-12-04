import PagedModel from "../../models/common/PagedModel.ts";
import { Usuario } from "../../models/usuarios/Usuario.ts";
import Navbar from "../../components/UI/Navbar.tsx";
import ListView from "../../components/UI/ListView.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usuarioService } from "../../api/usuarioService.ts";
import UsuarioItem from "../../components/usuarios/UsuarioItem.tsx";


export default function SearchUsuarios() {
  const searchQuery = (useLocation().state) as string;
  const [results, setResults] = useState(PagedModel.emptyPage<Usuario>());
  const [hasMore, setHasMore] = useState(!results.isLast());
  const [isLoading, setIsLoading] = useState(false);

  const pageRequestHandler = useCallback(
    (page: number, size: number) => usuarioService.searchByApelido(searchQuery, page, size),
    [searchQuery]
  );

  // INICIALIZAÇÃO
  useEffect(() => {
    const fetchData = async () => {
      const initialData = await pageRequestHandler(0, 10);
      if (initialData) {
        setResults(initialData || PagedModel.emptyPage<Usuario>());
        setHasMore(!initialData.isLast());
      }
    };
    fetchData();
  }, [pageRequestHandler]);

  const fetchMoreData = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    const newData = await pageRequestHandler(results.page.number+1, results.page.size);
    if (newData) {
      newData.content = [...results.content, ...newData.content];
      setResults(newData);
      setHasMore(!newData.isLast());
      setIsLoading(false);
    }
  }, [isLoading, setHasMore, setIsLoading, hasMore, pageRequestHandler, results.content,
      results.page.number, results.page.size]);

  const scrollSentinelRef = useRef<HTMLDivElement | null>(null);

  // DEFINIÇÃO DO OBSERVER
  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        console.log("BUSCANDO...")
        const sentinel = entries[0];
        if (sentinel.isIntersecting && hasMore && !isLoading) fetchMoreData();
      },
      { threshold: 1.0 }
    )

    const sentinel = scrollSentinelRef.current;
    if (sentinel) scrollObserver.observe(sentinel);

    return () => {
      if (sentinel) scrollObserver.unobserve(sentinel);
    }
  }, [fetchMoreData, hasMore, isLoading]);

  return (<>
    <div id="root-about" className="w-full overflow-y-auto bg-black h-max">
      <Navbar/>
      <div className="p-8">
        <h1 className="mb-4">Resultados da busca: "{searchQuery}" ({results.page.totalElements} resultados)</h1>
        <ListView scrollSentinelRef={scrollSentinelRef}>
          {results.content.map(x => <UsuarioItem key={x.uuid} usuario={x}/>)}
        </ListView>
      </div>
    </div>
  </>);
}
