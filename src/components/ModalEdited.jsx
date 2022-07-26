import React from "react";
import "../styles/modal.css";
import closeModal from "../images/close-icon.png";

export default function ModalEdited({ children, open, close }) {
  if (!open) return null;
  return (
    <>
      <div id="modal_overlay" />
      <div id="modal_style">
        <div className="container-modal">
          <h1 className="client-text">Edit</h1>

          <button className="button-close" onClick={close}>
            <img alt="close-button" src={closeModal} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
