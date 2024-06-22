import Toast from "@/components/core/Toast";
import { createContext, useState } from "react";

export const ToastContext = createContext(null);

export const ToastContextProvider = ({ children }) => {
  const [prop, setProp] = useState({ display: false, msg: "" });

  return (
    <ToastContext.Provider value={{ prop, setProp }}>
      {children}
    </ToastContext.Provider>
  );
};
