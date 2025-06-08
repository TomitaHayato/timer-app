import axios from "axios";

// 指定されたエラーがAxiosエラーで、かつStatusコードが正しいか
export const checkAxiosErrorStatus = (status: number, error: unknown): boolean => {
  return axios.isAxiosError(error) && error.response?.status === status
}
