import axios from "axios";
import { errorMessageFromStatusCode } from "./errorMessage";

// エラーがAxiosエラーで、Status Codeが正しいか
export const checkAxiosErrorStatus = (status: number, error: unknown): boolean => {
  return axios.isAxiosError(error) && error.response?.status === status
}

// Axiosエラーのステータスコードに対し、エラーメッセージを返す
export const getAxiosErrorMessageFromStatusCode = (error: unknown, defaultMessage: string): string => {
  if (!axios.isAxiosError(error) || !error.response) return defaultMessage;

  return errorMessageFromStatusCode(error.response.status, defaultMessage);
}
