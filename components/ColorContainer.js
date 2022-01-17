import { useState } from "react";
import Tooltip from "./Tooltip";

const ColorContainer = ({ color, h }) => {
  const [tooltipText, setTooltipText] = useState("Click to copy!");
  const isColorLight = () => {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    if (brightness > 128) {
      return true;
    }
    return false;
  };

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
        <p className={isColorLight() ? "text-black" : "text-white"}>{color}</p>
      </div>
    </Tooltip>
  );
};

export default ColorContainer;
