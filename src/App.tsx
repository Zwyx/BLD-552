import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

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

const BOTH = { ...EDGES, ...CORNERS };

const EDGE_KEYS = Object.keys(EDGES) as Array<keyof typeof EDGES>;

const CORNER_KEYS = Object.keys(CORNERS) as Array<keyof typeof CORNERS>;

const BOTH_KEYS = Object.keys(BOTH) as Array<keyof typeof BOTH>;

const Checkbox: React.FC<{
  id: string;
  label?: string;
  checked?: boolean;
  onCheckChange: (checked: boolean) => void;
}> = ({ id, label, checked, onCheckChange }) => {
  return (
    <div className="checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onCheckChange(e.currentTarget.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const Face: React.FC<{
  color?: string;
  position?: string;
}> = ({ color, position }) => {
  return (
    <div className={"face" + (color ? ` ${color}` : "")}>
      <div className="horizontal" />
      <div className="vertical"></div>
      <div className={"dot" + (position ? ` ${position}` : "")} />
    </div>
  );
};

const Field: React.FC<{
  text?: string;
  className?: string;
  onTextChange: (text: string) => void;
}> = ({ text, className, onTextChange }) => {
  return (
    <input
      className={"field" + (className ? ` ${className}` : "")}
      value={text}
      autoFocus
      onChange={e => onTextChange(e.currentTarget.value)}
    />
  );
};

const App: React.FC = () => {
  const [edges, setEdges] = useState<boolean>(true);
  const [corners, setCorners] = useState<boolean>(false);
  const [position, setPosition] = useState<keyof typeof BOTH>();
  const [letter, setLetter] = useState<string>("");
  const [verdict, setVerdict] = useState<"right" | "wrong">();

  const changePosition = useCallback(() => {
    let newPosition: keyof typeof BOTH;

    do {
      if (edges && corners) {
        newPosition = BOTH_KEYS[Math.floor(Math.random() * BOTH_KEYS.length)];
      } else if (edges) {
        newPosition = EDGE_KEYS[Math.floor(Math.random() * EDGE_KEYS.length)];
      } else {
        newPosition =
          CORNER_KEYS[Math.floor(Math.random() * CORNER_KEYS.length)];
      }
    } while (newPosition === position);

    setPosition(newPosition);
  }, [edges, corners, position]);

  useEffect(() => {
    if (position && letter.toUpperCase() === BOTH[position]) {
      setVerdict("right");
      changePosition();
    } else if (letter) {
      setVerdict("wrong");
    }

    setLetter("");

    setTimeout(() => setVerdict(undefined), 350);
  }, [position, letter, changePosition]);

  useEffect(changePosition, [edges, corners]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="checkboxes">
          <Checkbox
            id="checkboxEdges"
            label="Edges"
            checked={edges}
            onCheckChange={checked => {
              setEdges(checked);

              if (!checked && !corners) {
                setCorners(true);
              }
            }}
          />
          <Checkbox
            id="checkboxCorners"
            label="Corners"
            checked={corners}
            onCheckChange={checked => {
              setCorners(checked);

              if (!checked && !edges) {
                setEdges(true);
              }
            }}
          />
        </div>

        <div className="clues">
          <span className="cluesWhite">A</span>
          {"          "}
          <span className="cluesOrange">E</span>
          {"          "}
          <span className="cluesGreen">I</span>
          {"          "}
          <span className="cluesRed">M</span>
          {"          "}
          <span className="cluesBlue">Q</span>
          {"          "}
          <span className="cluesYellow">U</span>
        </div>

        <Face
          color={position && position.slice(0, -3)}
          position={position && position.slice(-2)}
        />

        <Field
          text={letter}
          className={verdict}
          onTextChange={text => setLetter(text)}
        />
      </header>
    </div>
  );
};

export default App;
