import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { Projeto } from "../../models/projetos/Projeto";
import { useProjetos } from "../../hooks/useProjetos";
import useAuth from "../../hooks/useAuth";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";

type EditProjectModalProps = {
  projeto: Projeto;
  onClose: () => void;
};

export default function EditProject({
  projeto,
  onClose,
}: EditProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [projetoEditado, setProjetoEditado] = useState<Projeto>(projeto);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { usuario } = useAuth();
  const { atualizarProjeto, deletarProjeto } = useProjetos({
    token: usuario!.token,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  function onChangeHandler<T extends keyof Projeto>(
    field: T,
    value: Projeto[T],
  ) {
    setProjetoEditado((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    await atualizarProjeto(projetoEditado);
    onClose();
  }

  async function handleDelete() {
    await deletarProjeto(projeto.uuid, usuario!.token);
    navigate("/");
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
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            onClick={() => onClose()}
          >
            ✕
          </button>

          <div className="w-full">
            <h2 className="mb-2 text-center text-black">Editar Projeto</h2>

            <Input
              label="Título"
              value={projetoEditado.titulo}
              onChange={(e) => onChangeHandler("titulo", e.target.value)}
              required
            />
            <Input
              label="Descrição"
              value={projetoEditado.descricao}
              onChange={(e) => onChangeHandler("descricao", e.target.value)}
              required
            />
            <Input
              label="URL do Repositório"
              value={projetoEditado.urlRepositorio}
              onChange={(e) =>
                onChangeHandler("urlRepositorio", e.target.value)
              }
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Escopo
              </label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                value={projetoEditado.escopo}
                onChange={(e) => onChangeHandler("escopo", e.target.value)}
                required
              >
                <option value="SAUDE">Saúde</option>
                <option value="Gerenciamento">Gerenciamento</option>
                <option value="Inteligência Artificial">
                  Inteligência Artificial
                </option>
                <option value="Educação">Educação</option>
                <option value="Culinária">Culinária</option>
                <option value="Jogo">Jogo</option>
                <option value="Biologia">Biologia</option>
              </select>
            </div>

            <button
              className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Atualizar Projeto
            </button>

            <button
              className="mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              Deletar Projeto
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
          <div className="relative z-10 w-96 rounded-lg bg-white p-4 shadow-lg">
            <h3 className="mb-4 text-center text-black">
              Tem certeza que deseja deletar o projeto{" "}
              <span className="font-semibold">{projeto.titulo}</span>?
            </h3>
            <div className="flex justify-between">
              <button
                className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
