import React from "react";
import style from "./Ui.module.scss";

export const Checkbox: React.FC<{
  id: string;
  label?: string;
  checked?: boolean;
  onCheckChange: (checked: boolean) => void;
  onKeyPress?: (key: string) => void;
}> = ({ id, label, checked, onCheckChange, onKeyPress }) => {
  return (
    <div className={style.checkbox}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onCheckChange(e.currentTarget.checked)}
        onKeyPress={onKeyPress && (e => onKeyPress(e.key))}
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

export type TextboxRef = HTMLInputElement;

export const Textbox = React.forwardRef<
  TextboxRef,
  {
    text?: string;
    className?: string;
    onTextChange: (text: string) => void;
  }
>(({ text, className, onTextChange }, ref) => {
  return (
    <input
      ref={ref}
      className={style.textbox + (className ? ` ${className}` : "")}
      value={text}
      autoFocus
      onChange={e => onTextChange(e.currentTarget.value)}
    />
  );
});
