# react-hrnet-modal

Ce dépôt contient la **modal React** que j’ai développée dans le cadre du projet HRnet (OpenClassrooms — Projet 14).
L’objectif était de remplacer l’ancienne modale jQuery (kylefox/jquery-modal) (https://github.com/kylefox/jquery-modal)
utilisée dans l’application HRnet afin de moderniser l’interface et de rendre le projet entièrement React.

J’ai cherché à garder le même comportement que la modale originale, tout en proposant une version plus légère, accessible et adaptée à React.

---

## Fonctionnalités

La modale propose toutes les bases nécessaires :

- Un overlay sombre qui bloque l’arrière-plan
- Une boîte de dialogue centrée
- Un bouton de fermeture
- Fermeture via :
  - clic sur l’overlay
  - clic sur le bouton "close"
  - touche Échap
- Blocage du scroll en arrière-plan
- Aucun package externe (hormis React)
- J’ai volontairement gardé une API simple pour qu’elle puisse être réutilisée facilement dans n’importe quel projet.

---

### Prérequis

- **Node.js** ≥ 16
- **npm** ≥ 8 (or yarn / pnpm)
- **React** ≥ 17

Je recommande d’utiliser VS Code + ESLint pour faciliter le développement.

---

#### Installation

```bash
npm install react-hrnet-modal
# ou
yarn add react-hrnet-modal
```

---

##### Usage

```jsx
import React, { useState } from "react";
import Modal from "react-hrnet-modal";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Open modal</button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        Employee Created!
      </Modal>
    </div>
  );
}

export default Example;
```

---

###### Component API

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Optional title">
  Modal content goes here.
</Modal>
```

---

###### # Props

- isOpen — boolean
  Active ou désactive l’affichage de la modale.

- onClose — function
  Fonction déclenchée lorsque la modale doit se fermer (overlay, bouton ×, Escape).

- title — string, optionnel
  Si un titre est fourni, il apparaît au-dessus du contenu.

- children — ReactNode
  Contenu de la modale (texte, message, boutons, etc.).

---

###### ## Style

Le composant importe automatiquement Modal.css.
Les classes peuvent être modifiées ou étendues :

.hrnet-modal-overlay
.hrnet-modal
.hrnet-modal**close-button
.hrnet-modal**title
.hrnet-modal\_\_body

---

###### ### Comportement & différences avec jquery-modal

J’ai repris tous les comportements essentiels de l’ancienne librairie (https://github.com/kylefox/jquery-modal):

- Overlay sombre
- Fenêtre centrée
- Fermeture via bouton × / overlay / Escape
- Blocage du scroll

---

###### #### Fonctionnalités non reprises

Certaines parties du plugin original n’avaient pas d'intérêt dans une application React moderne :

- chargement AJAX intégré
- animations fade-in/out
- gestion de multiples modales empilées
- création automatique via les liens <a rel="modal:open">
- spinner automatique

J’ai fait le choix de garder le composant minimaliste, stable et cohérent avec React.

---

###### ##### Auteur

Développé par Iliesse,
dans le cadre du projet OpenClassrooms — Projet 14
“Faites passer une librairie jQuery vers React”

---

###### ###### Licence

MIT License — utilisation libre, personnelle ou commerciale.

---

###### ###### # Remerciements

Modèle initial :
https://github.com/kylefox/jquery-modal
Crédits aux auteurs du plugin jQuery d’origine.
