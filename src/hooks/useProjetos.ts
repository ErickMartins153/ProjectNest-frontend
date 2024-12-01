import { useState, useEffect, useCallback } from "react";
import { Projeto } from "../models/projetos/Projeto";
import { Categorias } from "../models/projetos/enums/Categorias";
import { projetoService } from "../api/projetoService";
import { ProjetoCreation } from "../models/projetos/ProjetoCreation";
import { Contribuicao } from "../models/contribuicao/Contribuicao";

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
  const [contribuicoes, setContribuicoes] = useState<Contribuicao[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjetos = useCallback(async () => {
    setIsLoading(true);
    try {
      if (uuid) {
        const projeto = await projetoService.getProjetoByUuid(uuid, token);
        setProjeto(projeto || null);
        const contribuicoes = await projetoService.findContribuicoes(
          uuid,
          token,
        );
        setContribuicoes(contribuicoes || []);
      } else {
        const projetos = (await projetoService.getAllProjetos(token)) || [];
        setProjetos(projetos);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, uuid]);

  useEffect(() => {
    if (!token) return;
    fetchProjetos();
  }, [selectedCategory, token, uuid, fetchProjetos]);

  async function criarProjeto(projeto: ProjetoCreation) {
    try {
      await projetoService.criarProjeto(projeto, token);
      await fetchProjetos();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }

  async function atualizarProjeto(projeto: Projeto) {
    try {
      await projetoService.atualizarProjeto(projeto, token);
      await fetchProjetos();
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
    }
  }

  return {
    projetos,
    projeto,
    isLoading,
    criarProjeto,
    refetchProjetos: fetchProjetos,
    atualizarProjeto,
    contribuicoes,
  };
}
