import { ToastOptions, toast } from "react-toastify";

type ToastType = "error" | "success";

export const showToast = (
  text: string,
  type: ToastType,
  options?: Partial<ToastOptions>,
) => {
  const toastFn = type === "error" ? toast.error : toast.success;

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  toastFn(text, {
    ...toastOptions,
    ...options,
  });
};

// export const errorToast = (text: string, time?: number) => {
//   if (text != undefined && text != null && text !== "") {
//     toast.error(text, {
//       position: "top-right",
//       autoClose: time || 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }
// };

// export const successToast = (text: string) => {
//   if (text != undefined && text != null && text !== "") {
//     toast.success(text, {
//       position: "top-right",
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }
// };
