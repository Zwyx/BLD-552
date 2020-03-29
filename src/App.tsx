import React, { useCallback, useEffect, useState, useRef } from "react";
import style from "./App.module.scss";
import { BOTH, BOTH_KEYS, CORNER_KEYS, EDGE_KEYS } from "./Data";
import { Checkbox, CubeFace, Textbox, TextboxRef } from "./Ui";

const App: React.FC = () => {
  const [edges, setEdges] = useState<boolean>(true);
  const [corners, setCorners] = useState<boolean>(false);
  const [clues, setClues] = useState<boolean>(true);
  const [position, setPosition] = useState<keyof typeof BOTH>();
  const [letter, setLetter] = useState<string>("");
  const [verdict, setVerdict] = useState<"right" | "wrong">();
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  const fieldRef = useRef<TextboxRef>(null);

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

  const onCheckboxKeyPress = (key: string) => {
    setLetter(key);
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  };

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
          onKeyPress={onCheckboxKeyPress}
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
          onKeyPress={onCheckboxKeyPress}
        />

        <Checkbox
          id="checkboxClues"
          label="Clues"
          checked={clues}
          onCheckChange={checked => setClues(checked)}
          onKeyPress={onCheckboxKeyPress}
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
          ref={fieldRef}
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
