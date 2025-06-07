import { toast } from "react-toastify"

export const toastSuccessRB = (text: string) => {
  toast.success(text, {
    position: "bottom-right",
  })
}

export const toastErrorRB = (text: string) => {
  toast.error(text, {
    position: "bottom-right",
  })
}
