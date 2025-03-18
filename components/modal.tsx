"use client";

import { FC, PropsWithChildren } from "react";

const Modal: FC<PropsWithChildren> = ({ children, onClose }) => {
  return (
    <dialog id="my_modal_1" className="modal" open>
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
