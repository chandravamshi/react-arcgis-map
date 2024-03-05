// Modal.js
import React, { useEffect, useRef } from "react";
import "./InfoModla.css";
import { ModalProps } from "./mapActions";

const Modal: React.FC<ModalProps> = ({ isOpen, data, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeModal]);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-popup">
        <span className="close-button" onClick={closeModal}>
          &times;Xx
        </span>
        <div>
          {data.map((d, i) => (
            <>
              <div key={i}>
                <h2>{d.NAME}</h2>
                <p>Auftraggeber: {d.AUFTRAGGEBER}</p>
                <p>Auftragnehmer: {d.AUFTRAGNEHMER}</p>
                <p>Bemerkung: {d.BEMERKUNG}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

/* import React from "react";

// Define an interface for the component's props
interface ModalProps {
  isOpen: boolean;
  data: {
    AUFTRAGGEBER?: string;
    AUFTRAGNEHMER?: string;
    BEMERKUNG?: string;
    NAME?: string;
    // Include other fields as necessary, marking optional fields with '?'
  };
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, data, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>{data.NAME}</h2>
        <p>Auftraggeber: {data.AUFTRAGGEBER}</p>
        <p>Auftragnehmer: {data.AUFTRAGNEHMER}</p>
        <p>Bemerkung: {data.BEMERKUNG}</p>
      </div>
    </div>
  );
};

export default Modal; */

/* import React, { useState, useEffect } from "react";

const ModalWindow = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const subscription = objectInfo.subscribe(() => {
      setIsOpen(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {isOpen && (
        <div>
          <h1>Object Information</h1>
          <p>Name: {objectInfo.NAME}</p>
          <p>Status: {objectInfo.STATUS}</p>
          <p>Area: {objectInfo.FLAECHE_GIS_M2}</p>
          <p>...</p>
        </div>
      )}
    </div>
  );
};

export default ModalWindow; */
