CLAUDE.md — Contexte & Règles du projet « L'AMI »


Ce fichier est la source de vérité du projet. Claude Code doit le lire avant
toute tâche et ne jamais s'en écarter. En cas de doute, ce fichier prime sur
toute autre interprétation.




1. CE QU'ON CONSTRUIT

Une expérience web immersive pour le restaurant gastronomique
L'AMI — Sofitel Bénin.

Ce n'est PAS un menu classique. C'est une mise en scène théâtrale :
le visiteur n'« consulte » pas une carte, il assiste à une pièce en 4 actes.
Chaque acte = un plat + un ingrédient phare + une histoire locale béninoise
(le Mono, le Ouémé, Abomey, Parakou…).

Le mot d'ordre du projet : « la beauté du travail ».
Chaque détail compte. La lenteur, l'élégance et la noblesse priment toujours
sur la performance ou la quantité de fonctionnalités.


2. UNIVERS VISUEL (non négociable)


Fond : noir profond (#0A0A0A principal, #111111 pour les surfaces)
Couleur signature : or (#C9A84C principal, #E8CC80 clair, #F5E6B8 très clair)
Texte clair : blanc cassé (#F0EBE0)
Texte secondaire : or éteint (#8A7A5A)
Typographie titres : serif, style Playfair Display
Typographie corps : serif léger, style Cormorant Garamond
Typographie labels/nav : sans-serif fin, style Montserrat, lettre-spacing large, UPPERCASE
Espacements : généreux, beaucoup de vide, jamais de surcharge



3. STRUCTURE NARRATIVE

La page vit dans la section « expérience » du site (projet déjà lancé —
NE PAS recréer la structure globale, s'intégrer à l'existant).

4 actes :


ACTE I — AMUSE-BOUCHES
ACTE II — ENTRÉES
ACTE III — PLATS
ACTE IV — DOUCEURS


Le nombre d'actes et leur contenu doivent rester modifiables et adaptables
(données séparées du code — voir règle §6).


4. ANIMATIONS VOULUES (le cœur du projet)

À l'ouverture


Fondu depuis le noir.
Le logo apparaît lentement.
Le titre de l'acte se révèle lettre par lettre.


Pendant un acte


La photo du plat entre en glissant doucement depuis la droite.
Effet de brume / fumée subtile autour du plat — EN CSS PUR, pas de vidéo.


Changement d'acte


Transition type rideau de théâtre : le noir recouvre l'écran,
puis se lève sur le nouvel acte.


Navigation (barre du bas, I · II · III · IV)


Un indicateur doré animé glisse d'un acte à l'autre.



5. RÈGLES D'ANIMATION (strictes)


Tout est lent et noble. Durées minimales : 0.6s, idéalement 1s–2s.
Rien ne clignote, rien ne saute, rien ne rebondit.
Pas de particules qui volent partout, pas d'effets tape-à-l'œil.
Chaque animation a une raison dramatique. Elle sert la narration,
jamais le spectacle pour le spectacle. Si une animation n'a pas de sens
narratif, on ne la met pas.
Utiliser des courbes cubic-bezier personnalisées (ex:
cubic-bezier(0.76, 0, 0.24, 1)), jamais les ease par défaut.
Respecter prefers-reduced-motion pour l'accessibilité.



6. RÈGLES TECHNIQUES


Données séparées du code. Le contenu des actes (titre, description,
ingrédient, image, histoire) vit dans un fichier de données dédié
(ex: actes.js ou actes.json), JAMAIS en dur dans le HTML.
→ Ajouter/modifier/supprimer un acte ne doit jamais demander de toucher
à la logique d'animation.
Code propre et commenté par section.
Animations en CSS d'abord, JS seulement pour orchestrer
(changement d'acte, séquencement des révélations).
Responsive : desktop (côte à côte) / tablette (empilé) / mobile
(photo en fond + overlay sombre).
Aucune dépendance lourde. Pas de framework d'animation externe sauf
accord explicite. Vanilla JS + CSS privilégiés.
Les images sont des placeholders au départ (dégradé noir/or élégant)
jusqu'à fourniture des vraies photos.



7. CE QU'ON NE FAIT JAMAIS


Pas de couleurs hors palette (noir / or / blanc cassé uniquement).
Pas d'animation rapide, brusque ou « fun ».
Pas de contenu en dur qui empêcherait d'ajouter un acte.
Pas de refonte de la structure globale du site (on s'intègre à l'existant).
Pas d'ajout de fonctionnalité non demandée « parce que ce serait cool ».



8. CONTENU DES 4 ACTES (version test, adaptable)

ACTE I — AMUSE-BOUCHES


Titre : LA BRUME DE MAÏS
Description : « La première brume se lève sur les rives du Mono. »
Ingrédient phare : Maïs du Ouémé
Histoire : « Cultivé localement puis fumé lentement, il apporte à cette
création ses notes douces et boisées. »


ACTE II — ENTRÉES


Titre : L'ÉVEIL DU LAGUNE
Description : « Les eaux du lac Nokoué révèlent leurs trésors à l'aube. »
Ingrédient phare : Tilapia du Nokoué
Histoire : « Pêché au lever du soleil, mariné aux épices du marché Dantokpa,
il incarne la mémoire vivante du lac. »


ACTE III — PLATS


Titre : LA FORÊT ROYALE
Description : « L'ombre dense des fromagers d'Abomey enveloppe le palais. »
Ingrédient phare : Moringa d'Allada
Histoire : « Récolté à l'aube dans les jardins d'Allada, séché puis réhydraté,
il porte la force tranquille de la terre béninoise. »


ACTE IV — DOUCEURS


Titre : L'OR DE PARAKOU
Description : « Le soleil descend sur les plaines du Nord, sucré et cuivré. »
Ingrédient phare : Karité de Natitingou
Histoire : « Cueilli à la main dans les parcs arborés du Nord-Bénin, cet or
blanc est transformé en beurre pur pour sublimer cette finale en douceur. »



9. CHECKLIST AVANT DE LIVRER


 Le contenu des actes est dans un fichier de données séparé.
 Ajouter un 5e acte ne demande aucune modification de la logique d'animation.
 Toutes les animations durent ≥ 0.6s avec cubic-bezier personnalisé.
 Rien ne clignote, ne saute, ne rebondit.
 La palette est strictement noir / or / blanc cassé.
 prefers-reduced-motion est respecté.
 Le rendu est responsive sur les 3 tailles d'écran.
 Le code est commenté par section.