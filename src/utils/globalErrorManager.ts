import { ExceptionBody } from "../models/error/ExceptionBody";

let globalSetError: ((error: ExceptionBody) => void) | null = null;

export const setGlobalError = (error: ExceptionBody) => {
  if (globalSetError) {
    globalSetError(error);
  } else {
    console.error("Erro não tratado (global):", error);
  }
};

export const initializeGlobalSetError = (
  setErrorFunction: (error: ExceptionBody) => void,
) => {
  globalSetError = setErrorFunction;
};
