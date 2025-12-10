/**
 * Composant Modal pour afficher une boîte de dialogue au-dessus d'un overlay sombre.
 * Cette version inclut la possibilité de personnaliser complètement le style via des props.
 *
 * Props principales :
 * - isOpen {boolean} : Affiche ou masque la modale
 * - onClose {function} : Fonction appelée quand la modale doit se fermer
 * - title {string} : Titre optionnel
 * - children {ReactNode} : Contenu de la modale
 *
 * Props de personnalisation :
 * - overlayClassName {string} : Classe personnalisée pour l'overlay
 * - modalClassName {string} : Classe personnalisée pour la boîte modale
 * - titleClassName {string} : Classe personnalisée pour le titre
 * - bodyClassName {string} : Classe personnalisée pour le contenu
 * - closeButtonClassName {string} : Classe personnalisée pour le bouton ×
 *
 * - overlayStyle {object} : Style inline appliqué à l'overlay
 * - modalStyle {object} : Style inline appliqué à la modale
 * - titleStyle {object}
 * - bodyStyle {object}
 * - closeButtonStyle {object}
 */

import { useEffect } from "react";
import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,

  // Classes personnalisables
  overlayClassName = "",
  modalClassName = "",
  titleClassName = "",
  bodyClassName = "",
  closeButtonClassName = "",

  // Styles inline personnalisables
  overlayStyle = {},
  modalStyle = {},
  titleStyle = {},
  bodyStyle = {},
  closeButtonStyle = {},
}) {
  // Gestion de la touche Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Empêche le scroll derrière la modale
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Ne rien afficher si modale fermée
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`hrnet-modal-overlay ${overlayClassName}`}
      style={overlayStyle}
      onClick={handleOverlayClick}
    >
      <div
        className={`hrnet-modal ${modalClassName}`}
        style={modalStyle}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={`hrnet-modal__close-button ${closeButtonClassName}`}
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {title && (
          <h2
            className={`hrnet-modal__title ${titleClassName}`}
            style={titleStyle}
          >
            {title}
          </h2>
        )}

        <div
          className={`hrnet-modal__body ${bodyClassName}`}
          style={bodyStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
