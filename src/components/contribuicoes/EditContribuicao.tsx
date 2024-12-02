import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../UI/Input";
import { Contribuicao } from "../../models/contribuicao/Contribuicao";
import { useContribuicoes } from "../../hooks/useContribuicoes";

type EditContribuicaoModalProps = {
  contribuicao: Contribuicao;
  onClose: () => void;
};

export default function EditContribuicao({
  contribuicao,
  onClose,
}: EditContribuicaoModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [contribuicaoEditada, setContribuicaoEditada] =
    useState<Contribuicao>(contribuicao);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { usuario } = useAuth();
  const { atualizarContribuicao, deletarContribuicao } = useContribuicoes({
    token: usuario!.token,
  });

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  function onChangeHandler<T extends keyof Contribuicao>(
    field: T,
    value: Contribuicao[T],
  ) {
    setContribuicaoEditada((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    await atualizarContribuicao(contribuicaoEditada);
    onClose();
  }

  async function handleDelete() {
    await deletarContribuicao(contribuicao.uuid);
    onClose();
  }

  return createPortal(
    <>
      {/* Modal principal */}
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
            <h2 className="mb-2 text-center text-black">Editar Contribuição</h2>

            <Input
              label="Título"
              value={contribuicaoEditada.titulo}
              onChange={(e) => onChangeHandler("titulo", e.target.value)}
              required
            />
            <Input
              label="Descrição"
              value={contribuicaoEditada.descricao}
              onChange={(e) => onChangeHandler("descricao", e.target.value)}
              required
            />
            <Input
              label="URL do Repositório (opcional)"
              value={contribuicaoEditada.urlRepositorio || ""}
              onChange={(e) =>
                onChangeHandler("urlRepositorio", e.target.value || undefined)
              }
            />

            <button
              className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Atualizar Contribuição
            </button>

            <button
              className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Deletar Contribuição
            </button>
          </div>
        </div>
      </div>

      {/* Menu de confirmação de exclusão */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDeleteConfirmOpen(false)}
          ></div>
          <div className="relative z-10 p-4 bg-white rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-center text-black">
              Tem certeza que deseja deletar a contribuição{" "}
              <span className="font-semibold">{contribuicao.titulo}</span>?
            </h3>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal")!,
  );
}
