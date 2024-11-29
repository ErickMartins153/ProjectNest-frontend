import { useState, useEffect } from "react";
import { Projeto } from "../models/projetos/Projeto";
import { Categorias } from "../models/projetos/enums/Categorias";
import { projetoService } from "../api/projetoService";

interface UseProjetosReturn {
  projetos: Projeto[];
  loading: boolean;
  error: string | null;
}

export function useProjetos(
  selectedCategory: keyof typeof Categorias | "",
  token: string,
): UseProjetosReturn {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      setLoading(true);
      setError(null);

      try {
        const projetos = (await projetoService.getAllProjetos(token)) || [];

        setProjetos(projetos);
      } catch (err) {
        setError("Erro ao carregar os projetos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, [selectedCategory, token]);

  return { projetos, loading, error };
}
