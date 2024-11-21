import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Input from "../UI/Input";

type CreateProjectModalProps = {
  onClose: () => void;
};

export default function CreateProjectModal({
  onClose,
}: CreateProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div
        className={`relative z-10 w-96 rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="aspect-square w-full">
          <h2>Criar Projeto</h2>
          <Input label="Teste" />
        </div>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}
