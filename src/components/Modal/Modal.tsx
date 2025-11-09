import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "../../types/photo";
import css from "./Modal.module.css";

interface ModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function Modal({ photo, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className={css.backdrop} 
      role="dialog" 
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button 
          className={css.closeButton} 
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img 
          src={photo.src.original} 
          alt={photo.alt}
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
      </div>
    </div>,
    document.body
  );
}
