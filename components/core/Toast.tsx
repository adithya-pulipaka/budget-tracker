import { ToastContext } from "@/components/core/AppContexts";
import React, { useContext, useEffect } from "react";

const Toast = () => {
  const { prop, setProp } = useContext(ToastContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setProp({ display: false, msg: "" });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [prop]);

  return (
    <>
      {prop.display && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{prop.msg}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
