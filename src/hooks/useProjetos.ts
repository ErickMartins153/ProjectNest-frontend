import { useState, useEffect, useCallback } from "react";
import { Projeto } from "../models/projetos/Projeto";
import { Categorias } from "../models/projetos/enums/Categorias";
import { projetoService } from "../api/projetoService";
import { ProjetoCreation } from "../models/projetos/ProjetoCreation";

interface UseProjetosParams {
  selectedCategory?: keyof typeof Categorias | "";
  token: string;
  uuid?: string;
}

export function useProjetos({
  selectedCategory = "",
  token,
  uuid,
}: UseProjetosParams) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjetos = useCallback(async () => {
    try {
      if (uuid) {
        const projeto = await projetoService.getProjetoByUuid(uuid, token);
        setProjeto(projeto || null);
      } else {
        const projetos = (await projetoService.getAllProjetos(token)) || [];
        setProjetos(projetos);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token, uuid]);

  useEffect(() => {
    if (!token) return;
    fetchProjetos();
  }, [selectedCategory, token, uuid, fetchProjetos]);

  async function criarProjeto(projeto: ProjetoCreation) {
    projetoService.criarProjeto(projeto, token);
  }

  return {
    projetos,
    projeto,
    isLoading,
    criarProjeto,
    refetchProjetos: fetchProjetos,
  };
}
