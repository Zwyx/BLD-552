const EDGES = {
  "white-tm": "A",
  "white-mr": "B",
  "white-bm": "C",
  "white-ml": "D",
  "orange-tm": "E",
  "orange-mr": "F",
  "orange-bm": "G",
  "orange-ml": "H",
  "green-tm": "I",
  "green-mr": "J",
  "green-bm": "K",
  "green-ml": "L",
  "red-tm": "M",
  "red-mr": "N",
  "red-bm": "O",
  "red-ml": "P",
  "blue-tm": "Q",
  "blue-mr": "R",
  "blue-bm": "S",
  "blue-ml": "T",
  "yellow-tm": "U",
  "yellow-mr": "V",
  "yellow-bm": "W",
  "yellow-ml": "X"
};

const CORNERS = {
  "white-tl": "A",
  "white-tr": "B",
  "white-br": "C",
  "white-bl": "D",
  "orange-tl": "E",
  "orange-tr": "F",
  "orange-br": "G",
  "orange-bl": "H",
  "green-tl": "I",
  "green-tr": "J",
  "green-br": "K",
  "green-bl": "L",
  "red-tl": "M",
  "red-tr": "N",
  "red-br": "O",
  "red-bl": "P",
  "blue-tl": "Q",
  "blue-tr": "R",
  "blue-br": "S",
  "blue-bl": "T",
  "yellow-tl": "U",
  "yellow-tr": "V",
  "yellow-br": "W",
  "yellow-bl": "X"
};

export const BOTH = { ...EDGES, ...CORNERS };

export const EDGE_KEYS = Object.keys(EDGES) as Array<keyof typeof EDGES>;

export const CORNER_KEYS = Object.keys(CORNERS) as Array<keyof typeof CORNERS>;

export const BOTH_KEYS = Object.keys(BOTH) as Array<keyof typeof BOTH>;
