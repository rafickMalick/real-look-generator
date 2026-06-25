import carpaccioImg from "@/assets/dish-carpaccio.jpg";
import filetImg from "@/assets/dish-acte1.jpg";
import agneauImg from "@/assets/dish-agneau.jpg";
import chocolatImg from "@/assets/dish-chocolat.jpg";
import cocktailImg from "@/assets/coktail.png";

export type Category = "TOUS" | "ENTRÉES" | "PLATS" | "DESSERTS" | "BOISSONS";

export type Dish = {
  name: string;
  desc: string;
  price: string;
  category: Exclude<Category, "TOUS">;
  image: string;
  signature: boolean;
};

export const CATEGORIES: readonly Category[] = ["TOUS", "ENTRÉES", "PLATS", "DESSERTS", "BOISSONS"];

export const DISHES: Dish[] = [
  {
    name: "Carpaccio de gambas",
    desc: "Agrumes du Bénin, mangue verte, huile de gingembre.",
    price: "12 000",
    category: "ENTRÉES",
    image: carpaccioImg,
    signature: false,
  },
  {
    name: "Le Filet des Rives du Mono",
    desc: "Maïs fumé, légumes de saison, émulsion au beurre noisette.",
    price: "24 000",
    category: "PLATS",
    image: filetImg,
    signature: true,
  },
  {
    name: "Agneau du terroir",
    desc: "Cuit lentement, jus corsé au djon djon, légumes rôtis.",
    price: "22 000",
    category: "PLATS",
    image: agneauImg,
    signature: false,
  },
  {
    name: "Chocolat & fève de tonka",
    desc: "Crémeux chocolat noir, croustillant praliné, glace fève de tonka.",
    price: "9 000",
    category: "DESSERTS",
    image: chocolatImg,
    signature: false,
  },
  {
    name: "Cocktail de L'Ami",
    desc: "Hibiscus du Bénin, gingembre frais, citron vert.",
    price: "6 000",
    category: "BOISSONS",
    image: cocktailImg,
    signature: true,
  },
];

export function dishPrice(dish: Dish): number {
  return Number(dish.price.replace(/\s/g, ""));
}
