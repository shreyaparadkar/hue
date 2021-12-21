import { DownloadIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { canvasState, colorsState } from "../atoms/colorsState";
import Canvas from "./Canvas";
import Rectangle from "./Rectangle";

function Palette() {
  const canvas = useRecoilValue(canvasState);
  const colors = useRecoilValue(colorsState);

  const downloadPalette = () => {
    canvas.toBlob(function (blob) {
      // blob ready, download it
      let link = document.createElement("a");
      link.download = "palette" + ".png";
      link.href = URL.createObjectURL(blob);
      link.click();
      // delete the internal blob reference, to let the browser clear memory from it
      URL.revokeObjectURL(link.href);
    }, "image/png");
  };

  return (
    <div className="flex flex-col items-center justify-start lg:place-self-start lg:px-8">
      <div>
        <h1 className="text-center text-lg py-4 mt-2">Generated Palette</h1>
      </div>
      <Canvas />
      <button onClick={downloadPalette} className="button">
        <p>Download</p> <DownloadIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Palette;
