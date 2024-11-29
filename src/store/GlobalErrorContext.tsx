import { createContext, ReactNode, useEffect, useState } from "react";
import { ExceptionBody } from "../models/error/ExceptionBody";
import { createPortal } from "react-dom";
import { initializeGlobalSetError } from "../utils/globalErrorManager";
import { dateFormatter } from "../utils/formatter";

interface GlobalErrorContextType {
  setError: (error: ExceptionBody) => void;
  error: ExceptionBody | null;
}

export const GlobalErrorContext = createContext<
  GlobalErrorContextType | undefined
>(undefined);

export function GlobalErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ExceptionBody | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [error]);

  useEffect(() => {
    initializeGlobalSetError(setError);
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, setError }}>
      {children}
      {isVisible &&
        error &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setError(null)}
            ></div>

            <div
              className={`relative z-10 w-96 rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="error">
                <h2 className="text-xl font-semibold text-red-600">Erro!</h2>
                <p className="mt-4">
                  <span className="font-bold">Status:</span> {error.httpStatus}
                </p>
                <p className="mt-2">
                  <span className="font-bold">Mensagem:</span> {error.message}
                </p>

                <p className="mt-2">
                  <span className="font-bold">Horário:</span>{" "}
                  {dateFormatter(error.timeStamp)}
                </p>
              </div>

              <button
                className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded hover:bg-red-700"
                onClick={() => setError(null)}
              >
                Fechar
              </button>
            </div>
          </div>,
          document.getElementById("modal")!,
        )}
    </GlobalErrorContext.Provider>
  );
}
