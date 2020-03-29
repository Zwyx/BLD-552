import React from "react";
import style from "./Ui.module.scss";

export const Checkbox: React.FC<{
  id: string;
  label?: string;
  checked?: boolean;
  onCheckChange: (checked: boolean) => void;
}> = ({ id, label, checked, onCheckChange }) => {
  return (
    <div className={style.checkbox}>
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

export const CubeFace: React.FC<{
  color?: string;
  position?: string;
}> = ({ color, position }) => {
  return (
    <div className={style.cubeFace + (color ? ` ${style[color]}` : "")}>
      <div className={style.horizontal} />
      <div className={style.vertical}></div>
      <div className={style.dot + (position ? ` ${style[position]}` : "")} />
    </div>
  );
};

export const Textbox: React.FC<{
  text?: string;
  className?: string;
  onTextChange: (text: string) => void;
}> = ({ text, className, onTextChange }) => {
  console.log(className);
  return (
    <input
      className={style.textbox + (className ? ` ${className}` : "")}
      value={text}
      autoFocus
      onChange={e => onTextChange(e.currentTarget.value)}
    />
  );
};
