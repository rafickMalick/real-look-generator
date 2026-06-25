# L'AMI — Handoff React (prototype → repo `real-look-generator`)

Stack cible : **TanStack Start + TanStack Router**, React 19, Tailwind v4, TS, `lucide-react`.
Source de vérité visuelle : **`Prototype L'AMI.dc.html`** (le flux + les transitions y sont déjà réglés).

> Je ne peux pas pousser sur le repo (accès lecture seule). Ce document + le prototype suffisent à un dev — ou à Claude Code dans ton clone local — pour appliquer les changements.

---

## 1. Mapping écrans → fichiers

| Écran du prototype | Route / fichier repo | Action |
|---|---|---|
| 01 · Chargement | `src/routes/index.tsx` | Refondre le splash + loader doré |
| 02 · Choix | `src/routes/choice.tsx` | « Bienvenue » + 2 cartes (Composer / Faire confiance) |
| 03 · Sélection des menus | `src/routes/menus.tsx` | Galerie « Nos Voyages » |
| 03b · L'expérience | `src/routes/experience.tsx` | Plein cadre, photo **glissée** par Acte + flèche retour |
| 04 · Composer la carte | `src/routes/carte.tsx` | Filtres catégories, plats XOF, sélection live |
| 05 · Détail plat | `src/routes/carte.$dishId.tsx` *(nouvelle route)* | « L'assiette se pose » |
| 06 · Ma sélection | `src/routes/selection.tsx` *(nouvelle route)* | Récap panier + confirmation |

---

## 2. Palette & type (déjà dans le repo)

```
GOLD #c9a96a · CREAM #e9dcc4 · MUTED #c9b896 · BG #0c0907  (carte: #0a0604)
Titres : Cormorant Garamond · Sur-titres/labels : Cormorant SC (petites caps, letter-spacing .3em)
```

Toutes les valeurs exactes (tailles, opacités, ombres) sont lisibles inline dans le prototype — copie-les depuis l'écran correspondant.

---

## 3. Transitions entre écrans — le cœur de la refonte

Ajouter ces keyframes à **`src/styles.css`** :

```css
@keyframes lamSlideInUp   { from { transform: translateY(104%);} to { transform: translateY(0);} }
@keyframes lamSlideOutUp  { from { transform: translateY(0);}   to { transform: translateY(-104%);} }
@keyframes lamSlideInDown { from { transform: translateY(-104%);} to { transform: translateY(0);} }
@keyframes lamSlideOutDown{ from { transform: translateY(0);}   to { transform: translateY(104%);} }
@keyframes lamTextUp  { from { opacity:0; transform: translateY(16px);} to { opacity:1; transform:none;} }
@keyframes lamEmerge  { from { opacity:0; transform: translateY(18px); filter: blur(6px);} to { opacity:1; transform:none; filter:blur(0);} }

/* transitions de page */
@keyframes enterTheatre  { 0% { opacity:0; filter:brightness(0);} 55% { filter:brightness(.55);} 100% { opacity:1; filter:brightness(1);} }
@keyframes exitDark      { from { opacity:1; filter:brightness(1);} to { opacity:0; filter:brightness(.05);} }
@keyframes enterGrow     { 0% { opacity:0; transform:scale(.5);} 45% { opacity:1;} 100% { opacity:1; transform:scale(1);} }
@keyframes exitFadeBack  { from { opacity:1; filter:brightness(1); transform:scale(1);} to { opacity:0; filter:brightness(.45); transform:scale(.96);} }
@keyframes enterBehind   { from { opacity:.5; transform:scale(1.03);} to { opacity:1; transform:scale(1);} }
@keyframes exitShrink    { from { opacity:1; transform:scale(1);} to { opacity:0; transform:scale(.9);} }
```

Courbe commune : `cubic-bezier(.4,.02,.18,1)`. Durées : **théâtre 1.5 s**, **grow 1.05 s**, **retour 0.82 s**.

### Correspondance navigation → transition
| Navigation | Entrée / sortie | Détail |
|---|---|---|
| Chargement → Choix | `enterTheatre` / `exitDark` | l'écran s'éclaircit du noir, « Bienvenue » via `lamEmerge` (delay .45s) |
| Choix → Menus **ou** Carte | `enterGrow` / `exitFadeBack` | **`transform-origin` = centre de la carte cliquée** |
| Menus → Expérience | `enterGrow` / `exitFadeBack` | origin = miniature cliquée → devient photo héro |
| Carte → Détail | `enterGrow` / `exitFadeBack` | origin = vignette du plat |
| **Retour (toutes)** | `enterBehind` / `exitShrink` | écran courant rétrécit, le précédent réapparaît derrière |
| Acte → Acte (dans Expérience) | `lamSlideInUp`/`lamSlideOutUp` (et `…Down` en arrière) | la photo glisse, le texte via `lamTextUp` |

### `transform-origin` dynamique
Au clic, calculer le centre de l'élément déclencheur **relativement au conteneur téléphone** et le passer à l'écran cible : voir `originFrom(e)` dans le prototype (logique JS, section navigation). En React : `ref` sur le conteneur + `getBoundingClientRect()`, stocker `"x% y%"` dans le state de transition.

### Implémentation TanStack Router (recommandée)
Les routes sont des pages séparées → enrober l'`<Outlet/>` dans un wrapper qui garde l'écran sortant monté le temps de l'animation (pattern type AnimatePresence). Deux options :
- **A.** Un composant `<ScreenTransition>` autour de `<Outlet/>` dans `__root.tsx`, qui lit le type de transition depuis un store léger (Context/Zustand : `{ type, origin }`) posé juste avant `navigate()`.
- **B.** Plus proche du prototype : regrouper le flux sous **une** route `_flow` avec un state-machine local (`screen`, `prev`, `transType`, `origin`) — copier la classe `Component` du prototype quasi telle quelle (c'est déjà une machine à états React).

> Pour un rendu identique au prototype sans friction, **option B** ; pour rester « router-idiomatique », **option A**.

---

## 4. État panier (écran Ma sélection)

Le prototype garde la sélection dans `state.sel` (`{ [dishIndex]: true }`). Dans le repo, remonter ça en **Context** (ou Zustand) partagé entre `carte`, `carte.$dishId` et `selection` :

```ts
type CartState = {
  ids: Set<string>;
  toggle(id: string): void;
  remove(id: string): void;
  clear(): void;
  total(dishes: Dish[]): number;   // parseInt(price.replace(/\s/g,''))
};
```

- Carte : bouton `+/−` par plat (`stopPropagation` pour ne pas ouvrir le détail), badge + total dans la barre basse.
- CTA « MA SÉLECTION » (actif si `ids.size>0`) → route `selection`.
- Ma sélection : liste retirable, total, **CONFIRMER MA SÉLECTION** → overlay « Merci ✦ / transmis en cuisine » (`enterTheatre` + `lamEmerge` en cascade), bouton rejouer = `clear()` + retour `index`.
- État vide géré (icône + « Votre sélection est vide »).

Données plats (nom, desc, prix XOF, catégorie, `signature`, `ing`, image) : voir `dishesData()` dans le prototype.

---

## 5. Icônes
Le prototype dessine les icônes en SVG inline. Dans le repo, remplacer par **`lucide-react`** (déjà installé) quand l'équivalent existe (ex. `ChevronLeft`, `ChevronRight`, `ShoppingBag`, `Check`, `UtensilsCrossed`) ; garder l'inline seulement pour la goutte/cloche stylisées propres à la marque.

---

## 6. Ordre d'implémentation conseillé
1. Keyframes dans `styles.css` + wrapper de transition (option A ou B).
2. `experience.tsx` (glissé des photos + flèche retour) — le plus visible.
3. `choice.tsx` + transition `enterGrow` origin-based.
4. `index.tsx` (Chargement → `enterTheatre`).
5. Panier Context → `carte.tsx`, nouvelle route `selection.tsx`, route détail `carte.$dishId.tsx`.
6. Passe finale : durées/courbes (valeurs §3), `prefers-reduced-motion` (désactiver scale/blur, garder un simple fondu).
