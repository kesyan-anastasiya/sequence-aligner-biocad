export const AMINO_ACIDS = [
  "A",
  "R",
  "N",
  "D",
  "C",
  "E",
  "Q",
  "G",
  "H",
  "I",
  "L",
  "K",
  "M",
  "F",
  "P",
  "S",
  "T",
  "W",
  "Y",
  "V",
  "-",
];

// Цвета в соответствии со схемой выравнивания аминокислот
export const AMINO_ACID_COLORS: Record<string, string> = {
  // Цистеин
  C: "bg-amino_acid-cysteine",

  // Гидрофобные
  A: "bg-amino-acid-hydrophobic",
  I: "bg-amino-acid-hydrophobic",
  L: "bg-amino-acid-hydrophobic",
  M: "bg-amino-acid-hydrophobic",
  F: "bg-amino-acid-hydrophobic",
  W: "bg-amino-acid-hydrophobic",
  Y: "bg-amino-acid-hydrophobic",
  V: "bg-amino-acid-hydrophobic",
  P: "bg-amino-acid-hydrophobic",

  // Глицин
  G: "bg-amino-acid-glycine",

  // Отрицательно заряженные
  D: "bg-amino-acid-negative",
  E: "bg-amino-acid-negative",

  // Положительно заряженные
  K: "bg-amino-acid-positive",
  R: "bg-amino-acid-positive",

  // Полярные незаряженные
  S: "bg-amino-acid-polar",
  T: "bg-amino-acid-polar",
  H: "bg-amino-acid-polar",
  Q: "bg-amino-acid-polar",
  N: "bg-amino-acid-polar",

  // Пробел/разрыв
  "-": "bg-gray-200",
};
