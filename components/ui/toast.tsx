import { FC, ReactNode } from "react";

import { createRoot } from "react-dom/client";

type ToastType = "success" | "error";

type Props = {
  type: ToastType;
  text: ReactNode | string;
};

const getClassName = (type: ToastType) => {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    default:
      return "alert-info";
  }
};

const Toast: FC<Props> = ({ type, text }) => {
  return (
    <div className="toast toast-left toast-middle">
      <div className={`alert ${getClassName(type)}`}>
        <span>{text}</span>
      </div>
    </div>
  );
};

export function alert(type: ToastType, text: ReactNode | string) {
  const fragment = document
    .createDocumentFragment()
    .appendChild(document.createElement("div"));
  document.getElementsByTagName("body")[0].appendChild(fragment);

  const root = createRoot(fragment);
  root.render(<Toast type={type} text={text} />);
  setTimeout(() => {
    root.unmount();
  }, 1000);
}
