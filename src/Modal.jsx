/**
 * Composant Modal pour afficher du contenu dans une boîte de dialogue
 * au-dessus d’un fond assombri.
 *
 * Ce composant React est une adaptation du comportement du plugin
 * `kylefox/jquery-modal` utilisé dans l’application jQuery HRnet originale.
 *
 * Props :
 * - isOpen {boolean} :
 *     Contrôle si la modale est visible. Lorsque `true`, la modale et
 *     le fond assombri sont affichés au-dessus de la page. Lorsque `false`,
 *     rien n’est rendu.
 *
 * - onClose {function} :
 *     Fonction appelée lorsque l’utilisateur demande à fermer la modale.
 *     Cette fonction est déclenchée dans trois situations :
 *       1. L’utilisateur clique sur le bouton de fermeture en haut à droite.
 *       2. L’utilisateur clique sur le fond assombri en dehors de la boîte.
 *       3. L’utilisateur appuie sur la touche Échap du clavier.
 *
 * - title {string} :
 *     Titre optionnel affiché en haut de la modale, au-dessus du contenu.
 *     Si aucun titre n’est fourni, seuls les enfants sont affichés.
 *
 * - children {ReactNode} :
 *     Le contenu affiché à l’intérieur du corps de la modale (texte, boutons, etc.).
 */

import { useEffect } from "react";
import "./Modal.css";
console.log("Modal depuis NPM 🚀");

export default function Modal({ isOpen, onClose, title, children }) {
  // Écoute de la touche Échap pour fermer la modale, comme avec jquery-modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Empêche le défilement de la page en arrière-plan lorsque la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Si la modale est fermée, ne rien afficher
  if (!isOpen) {
    return null;
  }

  // Ferme la modale lorsqu’on clique sur l’overlay, 
  // mais pas lorsqu’on clique à l’intérieur de la boîte de dialogue
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="hrnet-modal-overlay" onClick={handleOverlayClick}>
      <div className="hrnet-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="hrnet-modal__close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {title && <h2 className="hrnet-modal__title">{title}</h2>}

        <div className="hrnet-modal__body">{children}</div>
      </div>
    </div>
  );
}