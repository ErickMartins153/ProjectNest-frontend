import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { contribuicaoService } from "../../api/contribuicaoService";
import Input from "../UI/Input";
import useAuth from "../../hooks/useAuth";

type CreateContribuicaoProps = {
  projetoId: string;
  onClose: () => void;
};

export default function CreateContribuicao({
  projetoId,
  onClose,
}: CreateContribuicaoProps) {
  const { usuario } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urlRepositorio, setUrlRepositorio] = useState("");

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  async function handleSubmit() {
    await contribuicaoService.criarContribuicao(
      {
        idProjeto: projetoId,
        titulo,
        descricao,
        urlRepositorio,
        idUsuarios: [usuario!.uuid],
      },
      usuario!.token,
    );
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
      ></div>

      <div
        className={`relative z-10 w-96 rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          className="absolute text-gray-500 right-2 top-2 hover:text-gray-800"
          onClick={() => onClose()}
        >
          ✕
        </button>

        <div className="w-full">
          <h2 className="mb-2 text-center text-black">Criar Contribuição</h2>
          <Input
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <Input
            label="URL do Repositório"
            value={urlRepositorio}
            onChange={(e) => setUrlRepositorio(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Criar Contribuição
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}
