import { toast } from "react-toastify"

export const toastSuccessRB = (text: string, option?: object) => {
  toast.success(text, {
    position: "bottom-right",
    ...option,
  })
}

export const toastErrorRB = (text: string, option?: object) => {
  toast.error(text, {
    position: "bottom-right",
    ...option,
  })
}
