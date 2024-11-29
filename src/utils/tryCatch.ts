import { ExceptionBody } from "../models/error/ExceptionBody";
import { setGlobalError } from "./globalErrorManager";

export async function tryCatch<T>(
  func: () => Promise<T> | T,
): Promise<T | void> {
  try {
    return await func();
  } catch (error) {
    let handledError: ExceptionBody;

    if (typeof error === "object" && error !== null && "httpStatus" in error) {
      handledError = error as ExceptionBody;
    } else {
      handledError = new ExceptionBody({
        httpStatus: 500,
        message: "Ocorreu um erro inesperado. Tente novamente mais tarde",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        request: "N/A",
        timeStamp: new Date().toISOString(),
        name: "",
      });
    }

    setGlobalError(handledError);
  }
}
