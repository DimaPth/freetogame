import React, { FC } from "react";
import style from "./CustomBtn.module.scss";
import cn from "classnames";

interface CustomBtnProps {
  type?: "link" | "ghost";
  children: React.ReactNode | string;
}

const CustomBtn: FC<CustomBtnProps> = ({ type, children }) => {
  return (
    <div
      className={cn(style.btn, {
        [style.linkBtn]: type === "link",
        [style.ghost]: type === "ghost",
      })}
    >
      {children}
    </div>
  );
};

export default CustomBtn;
