import { useState, useEffect, useCallback } from "react";
import { Projeto } from "../models/projetos/Projeto";
import { Categorias } from "../models/projetos/enums/Categorias";
import { projetoService } from "../api/projetoService";
import { ProjetoCreation } from "../models/projetos/ProjetoCreation";
import { Contribuicao } from "../models/contribuicao/Contribuicao";

interface UseProjetosParams {
  selectedCategory?: keyof typeof Categorias | "";
  token?: string;
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
        const projeto = await projetoService.getProjetoByUuid(uuid);
        console.log(projeto);

        setProjeto(projeto || null);
        const contribuicoes = await projetoService.findContribuicoes(uuid);
        setContribuicoes(contribuicoes || []);
      } else {
        const projetos = (await projetoService.getAllProjetos()) || [];
        setProjetos(projetos);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    fetchProjetos();
  }, [selectedCategory, token, uuid, fetchProjetos]);

  async function buscarProjetos(query: string) {
    setIsLoading(true);
    try {
      const projetos = await projetoService.searchProjetos(query);

      setProjetos(projetos || []);
      return projetos;
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function criarProjeto(projeto: ProjetoCreation) {
    try {
      await projetoService.criarProjeto(projeto, token!);
      await fetchProjetos();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }

  async function atualizarProjeto(projeto: Projeto) {
    try {
      await projetoService.atualizarProjeto(projeto, token!);
      await fetchProjetos();
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
    }
  }

  async function deletarProjeto(projetoId: string, token: string) {
    try {
      await projetoService.deletarProjeto(projetoId, token);
      await fetchProjetos();
    } catch (error) {
      console.error("Error ao deletar projeto", error);
    }
  }

  return {
    projetos,
    projeto,
    isLoading,
    buscarProjetos,
    criarProjeto,
    refetchProjetos: fetchProjetos,
    atualizarProjeto,
    contribuicoes,
    deletarProjeto,
  };
}
