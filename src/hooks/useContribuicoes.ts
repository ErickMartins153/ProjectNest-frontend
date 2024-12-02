import { useState, useEffect, useCallback } from "react";
import { Contribuicao } from "../models/contribuicao/Contribuicao";
import { ContribuicaoCreation } from "../models/contribuicao/ContribuicaoCreation";
import { contribuicaoService } from "../api/contribuicaoService";
import { Usuario } from "../models/usuarios/Usuario";

interface UseContribuicaoParams {
  token: string;
  contribuicaoUuid?: string;
}

export function useContribuicoes({
  token,
  contribuicaoUuid,
}: UseContribuicaoParams) {
  const [contribuicoes, setContribuicoes] = useState<Contribuicao[]>([]);
  const [contribuicao, setContribuicao] = useState<Contribuicao | null>(null);
  const [contribuintes, setContribuintes] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getContribuintes = useCallback(
    async (contribuicaoId: string, contribuintesIds: string[]) => {
      try {
        const contribuintes =
          (await contribuicaoService.getContribuintes(
            contribuicaoId,
            contribuintesIds,
            token,
          )) || [];
        return contribuintes;
      } catch (error) {
        console.error("Erro ao soliciar contribuintes:", error);
      }
    },
    [token],
  );

  const fetchContribuicoes = useCallback(async () => {
    setIsLoading(true);
    try {
      if (contribuicaoUuid) {
        const contribuicao = await contribuicaoService.getContribuicaoByUuid(
          contribuicaoUuid,
          token,
        );
        setContribuicao(contribuicao || null);
        if (!contribuicao) return;
        const contribuintes = await getContribuintes(
          contribuicao.uuid,
          contribuicao.idUsuarios,
        );
        setContribuintes(contribuintes || []);
      } else {
        const contribuicoes =
          await contribuicaoService.getAllContribuicoes(token);
        setContribuicoes(contribuicoes || []);
      }
    } catch (error) {
      console.error("Erro ao buscar contribuições:", error);
    } finally {
      setIsLoading(false);
    }
  }, [contribuicaoUuid, token, getContribuintes]);

  useEffect(() => {
    if (!token) return;
    fetchContribuicoes();
  }, [token, contribuicaoUuid, fetchContribuicoes]);

  async function criarContribuicao(contribuicao: ContribuicaoCreation) {
    try {
      await contribuicaoService.criarContribuicao(contribuicao, token);
      await fetchContribuicoes();
    } catch (error) {
      console.error("Erro ao criar contribuição:", error);
    }
  }

  async function atualizarContribuicao(contribuicao: Contribuicao) {
    try {
      await contribuicaoService.atualizarContribuicao(contribuicao, token);
      await fetchContribuicoes();
    } catch (error) {
      console.error("Erro ao atualizar contribuição:", error);
    }
  }

  async function deletarContribuicao(contribuicaoId: string) {
    try {
      await contribuicaoService.deletarContribuicao(contribuicaoId, token);
      await fetchContribuicoes();
    } catch (error) {
      console.error("Erro ao deletar contribuição:", error);
    }
  }

  return {
    contribuicoes,
    contribuicao,
    isLoading,
    criarContribuicao,
    atualizarContribuicao,
    deletarContribuicao,
    refetchContribuicoes: fetchContribuicoes,
    getContribuintes,
    contribuintes,
  };
}
