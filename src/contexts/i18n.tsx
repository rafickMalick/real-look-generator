import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "es";

export const LANGS: Lang[] = ["fr", "en", "es"];
export const LANG_LABELS: Record<Lang, string> = { fr: "FR", en: "EN", es: "ES" };

const T = {
  fr: {
    // Loading
    loading_tagline: "La cuisine d'une femme,\nle goût d'un territoire.",
    loading_quote: "Je m'inspire du terroir Béninois pour sublimer la tradition française.",
    loading_author: "— Georgiana, Cheffe de L'Ami",
    loading_preparing: "PRÉPARATION DU VOYAGE…",
    loading_touch: "TOUCHEZ POUR ENTRER",

    // Choice
    welcome: "BIENVENUE",
    welcome_sub: "Comment souhaitez-vous\nvivre votre expérience ?",
    compose_title: "COMPOSER\nMON MENU",
    compose_desc: "Sélectionnez vos plats préférés.",
    trust_title: "FAIRE CONFIANCE\nÀ LA CHEFFE",
    trust_desc: "Découvrez ses menus signature.",
    choice_quote: "« Chaque plat est une rencontre.\nChaque repas, une histoire. »",
    choice_author: "— Georgiana, Cheffe de L'Ami",

    // Menus
    menu_surtitle: "LA CARTE DES MENUS",
    menu_title: "Nos Voyages",
    menu_subtitle: "Choisissez votre destination",
    menu_quote: "« Chaque plat est une rencontre,\nchaque repas une histoire. »",
    menu_quote_author: "GEORGIANA VIOU",
    menus: [
      { name: "DÉCOUVERTE",  steps: "EN QUATRE ACTES", desc: "Une immersion délicate en quatre temps." },
      { name: "DÉGUSTATION", steps: "EN SEPT ACTES",   desc: "Le grand voyage gastronomique de la Cheffe." },
      { name: "VÉGÉTARIEN",  steps: "EN CINQ ACTES",   desc: "La nature béninoise sublimée, acte après acte." },
    ],

    // Experience
    acts: [
      { label: "ACTE I",   step: "AMUSE-BOUCHE", t1: "LA BRUME",  t2: "DE MAÏS",         desc: "La première brume se lève sur les rives du Mono.",         ing: "Maïs du Ouémé" },
      { label: "ACTE II",  step: "ENTRÉE",       t1: "CARPACCIO", t2: "DE GAMBAS",        desc: "Les saveurs marines dansent avec les agrumes du terroir.", ing: "Gambas du Golfe" },
      { label: "ACTE III", step: "PLAT",         t1: "AGNEAU",    t2: "DU TERROIR",       desc: "L'agneau cuit lentement dans les épices du pays.",         ing: "Agneau local" },
      { label: "ACTE IV",  step: "DOUCEUR",      t1: "CHOCOLAT",  t2: "& FÈVE DE TONKA",  desc: "La douceur finale, un voyage dans le terroir du cacao.",   ing: "Fève de tonka" },
    ],

    // Carte
    carte_title: "NOTRE CARTE",
    carte_subline: "Une expérience gastronomique imaginée par la Chef Georgiana Viou.",
    cat_all: "TOUS",
    cat_starters: "ENTRÉES",
    cat_mains: "PLATS",
    cat_desserts: "DESSERTS",
    cat_drinks: "BOISSONS",
    dish_sig: "SIGNATURE",
    ma_selection: "MA SÉLECTION",
    plat_singular: "PLAT",
    plat_plural: "PLATS",
    total: "TOTAL",
    dishes: [
      { name: "Carpaccio de gambas",         desc: "Agrumes du Bénin, mangue verte, huile de gingembre.",              longDesc: "Tranches fines de gambas marinées aux agrumes du Bénin, copeaux de mangue verte et huile parfumée au gingembre frais.", ing: "Gambas du Golfe de Guinée" },
      { name: "Le Filet des Rives du Mono",  desc: "Maïs fumé, légumes de saison, émulsion au beurre noisette.",        longDesc: "Filet nacré, maïs fumé sur les rives du Mono, légumes de saison et émulsion délicate au beurre noisette.",              ing: "Maïs fumé du Ouémé" },
      { name: "Agneau du terroir",           desc: "Cuit lentement, jus corsé au djon djon, légumes rôtis.",            longDesc: "Épaule d'agneau cuite lentement, jus corsé au djon djon, légumes rôtis du marché de Cotonou.",                         ing: "Agneau élevé au Bénin" },
      { name: "Chocolat & fève de tonka",    desc: "Crémeux chocolat noir, croustillant praliné, glace fève de tonka.", longDesc: "Crémeux de chocolat noir grand cru, croustillant praliné cacahuète et glace infusée à la fève de tonka.",              ing: "Fève de tonka du Bénin" },
      { name: "Cocktail de L'Ami",           desc: "Hibiscus du Bénin, gingembre frais, citron vert.",                   longDesc: "Une création signature aux fleurs d'hibiscus séchées du Bénin, infusées à froid avec gingembre frais et citron vert.",  ing: "Hibiscus du Bénin" },
    ],

    // Detail page
    detail_product: "LE PRODUIT",
    detail_add: "AJOUTER À MA SÉLECTION",
    detail_added: "✓ AJOUTÉ À MA SÉLECTION",

    // Selection
    sel_surtitle: "VOTRE MENU SUR-MESURE",
    sel_title: "Ma Sélection",
    sel_empty: "Votre sélection est vide.\nComposez votre menu depuis la carte.",
    sel_back: "RETOUR À LA CARTE",
    sel_brigade: "Votre sélection sera préparée avec soin par la brigade de la Cheffe.",
    sel_confirm: "CONFIRMER MA SÉLECTION",
    sel_merci: "Merci ✦",
    sel_transmitted: "Votre voyage est transmis en cuisine.\nLa Cheffe Georgiana et sa brigade\nvous attendent.",
    sel_restart: "↺ REVIVRE L'EXPÉRIENCE",

    // Back buttons
    back: "Retour",
    back_to_carte: "RETOUR À LA CARTE",
  },

  en: {
    loading_tagline: "A woman's cuisine,\nthe taste of a territory.",
    loading_quote: "I draw inspiration from Beninese terroir to elevate French tradition.",
    loading_author: "— Georgiana, Chef of L'Ami",
    loading_preparing: "PREPARING YOUR JOURNEY…",
    loading_touch: "TOUCH TO ENTER",

    welcome: "WELCOME",
    welcome_sub: "How would you like\nto experience your meal?",
    compose_title: "COMPOSE\nMY MENU",
    compose_desc: "Select your favourite dishes.",
    trust_title: "TRUST\nTHE CHEF",
    trust_desc: "Discover her signature menus.",
    choice_quote: "« Every dish is an encounter.\nEvery meal, a story. »",
    choice_author: "— Georgiana, Chef of L'Ami",

    menu_surtitle: "MENU SELECTION",
    menu_title: "Our Journeys",
    menu_subtitle: "Choose your destination",
    menu_quote: "« Every dish is an encounter,\nevery meal a story. »",
    menu_quote_author: "GEORGIANA VIOU",
    menus: [
      { name: "DISCOVERY",   steps: "FOUR COURSES",  desc: "A delicate immersion in four movements." },
      { name: "TASTING",     steps: "SEVEN COURSES", desc: "The Chef's grand gastronomic journey." },
      { name: "VEGETARIAN",  steps: "FIVE COURSES",  desc: "Beninese nature sublimated, course after course." },
    ],

    acts: [
      { label: "ACT I",   step: "AMUSE-BOUCHE", t1: "THE MIST",    t2: "OF CORN",          desc: "The first mist rises over the banks of the Mono.",        ing: "Corn from Ouémé" },
      { label: "ACT II",  step: "STARTER",      t1: "CARPACCIO",   t2: "OF PRAWNS",        desc: "Marine flavours dance with the citrus fruits of the land.", ing: "Gulf Prawns" },
      { label: "ACT III", step: "MAIN",         t1: "LAMB",        t2: "OF THE LAND",      desc: "Lamb slow-cooked in the spices of Benin.",                  ing: "Local Lamb" },
      { label: "ACT IV",  step: "DESSERT",      t1: "CHOCOLATE",   t2: "& TONKA BEAN",     desc: "The final sweetness, a journey through cacao terroir.",     ing: "Tonka Bean" },
    ],

    carte_title: "OUR MENU",
    carte_subline: "A gastronomic experience created by Chef Georgiana Viou.",
    cat_all: "ALL",
    cat_starters: "STARTERS",
    cat_mains: "MAINS",
    cat_desserts: "DESSERTS",
    cat_drinks: "DRINKS",
    dish_sig: "SIGNATURE",
    ma_selection: "MY SELECTION",
    plat_singular: "DISH",
    plat_plural: "DISHES",
    total: "TOTAL",
    dishes: [
      { name: "Prawn carpaccio",             desc: "Beninese citrus, green mango, ginger oil.",                         longDesc: "Thinly sliced prawns marinated in Beninese citrus, green mango shavings and fresh ginger-infused oil.",               ing: "Gulf of Guinea Prawns" },
      { name: "Fillet of the Mono River",    desc: "Smoked corn, seasonal vegetables, hazelnut butter emulsion.",        longDesc: "Pearlescent fillet, smoked corn from the Mono river banks, seasonal vegetables and a delicate hazelnut butter emulsion.", ing: "Smoked Corn from Ouémé" },
      { name: "Lamb from the land",          desc: "Slow-cooked, rich djon djon jus, roasted market vegetables.",        longDesc: "Slow-cooked lamb shoulder, rich djon djon jus, roasted vegetables from the Cotonou market.",                          ing: "Locally Raised Lamb" },
      { name: "Chocolate & tonka bean",      desc: "Dark chocolate cream, praline crunch, tonka bean ice cream.",        longDesc: "Grand cru dark chocolate cream, peanut praline crunch and ice cream infused with tonka bean.",                        ing: "Beninese Tonka Bean" },
      { name: "L'Ami Cocktail",              desc: "Beninese hibiscus, fresh ginger, lime.",                              longDesc: "A signature creation with cold-brewed dried hibiscus flowers from Benin, fresh ginger and lime.",                    ing: "Beninese Hibiscus" },
    ],

    detail_product: "THE PRODUCT",
    detail_add: "ADD TO MY SELECTION",
    detail_added: "✓ ADDED TO MY SELECTION",

    sel_surtitle: "YOUR CUSTOM MENU",
    sel_title: "My Selection",
    sel_empty: "Your selection is empty.\nCompose your menu from the carte.",
    sel_back: "BACK TO THE MENU",
    sel_brigade: "Your selection will be carefully prepared by the Chef's brigade.",
    sel_confirm: "CONFIRM MY SELECTION",
    sel_merci: "Thank you ✦",
    sel_transmitted: "Your journey has been sent to the kitchen.\nChef Georgiana and her brigade\nawait you.",
    sel_restart: "↺ RELIVE THE EXPERIENCE",

    back: "Back",
    back_to_carte: "BACK TO THE MENU",
  },

  es: {
    loading_tagline: "La cocina de una mujer,\nel sabor de un territorio.",
    loading_quote: "Me inspiro en el terruño beninés para sublimar la tradición francesa.",
    loading_author: "— Georgiana, Chef de L'Ami",
    loading_preparing: "PREPARANDO EL VIAJE…",
    loading_touch: "TOCA PARA ENTRAR",

    welcome: "BIENVENIDO",
    welcome_sub: "¿Cómo desea\nvivir su experiencia?",
    compose_title: "COMPONER\nMI MENÚ",
    compose_desc: "Seleccione sus platos favoritos.",
    trust_title: "CONFIAR\nEN LA CHEF",
    trust_desc: "Descubra sus menús emblemáticos.",
    choice_quote: "« Cada plato es un encuentro.\nCada comida, una historia. »",
    choice_author: "— Georgiana, Chef de L'Ami",

    menu_surtitle: "LA CARTA DE MENÚS",
    menu_title: "Nuestros Viajes",
    menu_subtitle: "Elija su destino",
    menu_quote: "« Cada plato es un encuentro,\ncada comida una historia. »",
    menu_quote_author: "GEORGIANA VIOU",
    menus: [
      { name: "DESCUBRIMIENTO", steps: "CUATRO TIEMPOS", desc: "Una inmersión delicada en cuatro tiempos." },
      { name: "DEGUSTACIÓN",    steps: "SIETE TIEMPOS",  desc: "El gran viaje gastronómico de la Chef." },
      { name: "VEGETARIANO",    steps: "CINCO TIEMPOS",  desc: "La naturaleza beninesa sublimada, tiempo a tiempo." },
    ],

    acts: [
      { label: "ACTO I",   step: "APERITIVO",  t1: "LA BRUMA",    t2: "DE MAÍZ",          desc: "La primera bruma asciende sobre las orillas del Mono.",   ing: "Maíz del Ouémé" },
      { label: "ACTO II",  step: "ENTRADA",    t1: "CARPACCIO",   t2: "DE GAMBAS",         desc: "Los sabores marinos danzan con los cítricos del terroir.", ing: "Gambas del Golfo" },
      { label: "ACTO III", step: "PLATO",      t1: "CORDERO",     t2: "DEL TERRUÑO",       desc: "El cordero cocinado lentamente en las especias del país.", ing: "Cordero local" },
      { label: "ACTO IV",  step: "DULCE",      t1: "CHOCOLATE",   t2: "Y HABA DE TONKA",   desc: "El dulce final, un viaje por el terruño del cacao.",       ing: "Haba de tonka" },
    ],

    carte_title: "NUESTRA CARTA",
    carte_subline: "Una experiencia gastronómica imaginada por la Chef Georgiana Viou.",
    cat_all: "TODOS",
    cat_starters: "ENTRADAS",
    cat_mains: "PLATOS",
    cat_desserts: "POSTRES",
    cat_drinks: "BEBIDAS",
    dish_sig: "EMBLEMA",
    ma_selection: "MI SELECCIÓN",
    plat_singular: "PLATO",
    plat_plural: "PLATOS",
    total: "TOTAL",
    dishes: [
      { name: "Carpaccio de gambas",          desc: "Cítricos de Benín, mango verde, aceite de jengibre.",               longDesc: "Finas láminas de gambas marinadas en cítricos de Benín, virutas de mango verde y aceite perfumado de jengibre fresco.", ing: "Gambas del Golfo de Guinea" },
      { name: "El Filete de las Orillas del Mono", desc: "Maíz ahumado, verduras de temporada, emulsión de mantequilla.", longDesc: "Filete nacarado, maíz ahumado a orillas del Mono, verduras de temporada y delicada emulsión de mantequilla avellana.",  ing: "Maíz Ahumado del Ouémé" },
      { name: "Cordero del terruño",          desc: "Cocido lentamente, jugo de djon djon, verduras asadas.",             longDesc: "Paleta de cordero cocinada a fuego lento, jugo intenso de djon djon, verduras asadas del mercado de Cotonú.",          ing: "Cordero Criado en Benín" },
      { name: "Chocolate y haba de tonka",    desc: "Cremoso de chocolate negro, crujiente praliné, helado de tonka.",    longDesc: "Cremoso de chocolate negro grand cru, crujiente de praliné y helado infusionado con haba de tonka.",                    ing: "Haba de Tonka de Benín" },
      { name: "Cóctel de L'Ami",             desc: "Hibisco de Benín, jengibre fresco, lima.",                            longDesc: "Una creación emblemática con flores de hibisco seco de Benín, infusionadas en frío con jengibre fresco y lima.",       ing: "Hibisco de Benín" },
    ],

    detail_product: "EL PRODUCTO",
    detail_add: "AÑADIR A MI SELECCIÓN",
    detail_added: "✓ AÑADIDO A MI SELECCIÓN",

    sel_surtitle: "SU MENÚ A MEDIDA",
    sel_title: "Mi Selección",
    sel_empty: "Su selección está vacía.\nComponga su menú desde la carta.",
    sel_back: "VOLVER A LA CARTA",
    sel_brigade: "Su selección será preparada con esmero por la brigada de la Chef.",
    sel_confirm: "CONFIRMAR MI SELECCIÓN",
    sel_merci: "Gracias ✦",
    sel_transmitted: "Su viaje ha sido enviado a la cocina.\nLa Chef Georgiana y su brigada\nle esperan.",
    sel_restart: "↺ REVIVIR LA EXPERIENCIA",

    back: "Volver",
    back_to_carte: "VOLVER A LA CARTA",
  },
} as const;

export type Tr = typeof T.fr;

type I18nCtx = { lang: Lang; t: Tr; setLang: (l: Lang) => void };
const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  return (
    <I18nContext.Provider value={{ lang, t: T[lang] as Tr, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}
