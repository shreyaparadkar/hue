import { useState } from "react";
import Tooltip from "./Tooltip";
import { isColorLight } from "../helper/colors";

const ColorContainer = ({ color, h }) => {
  const [tooltipText, setTooltipText] = useState("Click to copy!");

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    setTooltipText("Copied!");
    setTimeout(() => {
      setTooltipText("Click to copy!");
    }, 1000);
  };

  return (
    <Tooltip tooltipText={tooltipText}>
      <div
        onClick={copyColor}
        className="color w-full flex justify-end items-end px-2 py-2 cursor-pointer"
        style={{ backgroundColor: color, height: h + "rem" }}
      >
        <p className={isColorLight(color) ? "text-black" : "text-white"}>
          {color}
        </p>
      </div>
    </Tooltip>
  );
};

export default ColorContainer;
