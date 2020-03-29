import React, { useCallback, useEffect, useState } from "react";
import style from "./App.module.scss";
import { Checkbox, CubeFace, Textbox } from "./Ui";

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

const App: React.FC = () => {
  const [edges, setEdges] = useState<boolean>(true);
  const [corners, setCorners] = useState<boolean>(false);
  const [clues, setClues] = useState<boolean>(true);
  const [position, setPosition] = useState<keyof typeof BOTH>();
  const [letter, setLetter] = useState<string>("");
  const [verdict, setVerdict] = useState<"right" | "wrong">();
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    try {
      setBestScore(parseInt(localStorage.getItem("bestScore") || "0"));
    } catch {}
  }, []);

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

      const newScore = score + 1;

      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        try {
          localStorage.setItem("bestScore", newScore.toString());
        } catch {}
      }

      changePosition();
    } else if (letter) {
      setVerdict("wrong");

      setScore(0);
    }

    setLetter("");

    setTimeout(() => setVerdict(undefined), 350);
  }, [position, letter, score, bestScore, changePosition]);

  useEffect(changePosition, [edges, corners]);

  return (
    <div className={style.app}>
      <div className={style.checkboxes}>
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

        <Checkbox
          id="checkboxClues"
          label="Clues"
          checked={clues}
          onCheckChange={checked => setClues(checked)}
        />
      </div>

      <div className={style.clues + (clues ? ` ${style.visible}` : "")}>
        <span className={style.white}>A</span>
        <span className={style.orange}>E</span>
        <span className={style.green}>I</span>
        <span className={style.red}>M</span>
        <span className={style.blue}>Q</span>
        <span className={style.yellow}>U</span>
      </div>

      <CubeFace
        color={position && position.slice(0, -3)}
        position={position && position.slice(-2)}
      />

      <div className={style.field}>
        <Textbox
          text={letter}
          className={verdict ? style[verdict] : undefined}
          onTextChange={text => setLetter(text)}
        />
      </div>

      <div className={style.score}>
        {score}     •     {bestScore}
      </div>
    </div>
  );
};

export default App;
