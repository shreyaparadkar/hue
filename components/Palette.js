import { DownloadIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { colorsState } from "../atoms/colorsState";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import ColorContainer from "./ColorContainer";

function Palette() {
  const colors = useRecoilValue(colorsState);

  const downloadPalette = () => {
    htmlToImage
      .toPng(document.getElementById("palette"))
      .then(function (dataUrl) {
        download(dataUrl, "palette.png");
      });
  };

  return (
    <div className="flex flex-col items-center justify-start lg:place-self-start lg:px-8">
      <div className="h-20">
        <h1 className="text-center text-lg py-4 mt-2 font-bold">
          Generated Palette
        </h1>
      </div>
      <div id="palette" className="w-[20rem] md:w-[28rem] h-72 shadow-md">
        {colors.map((color) => (
          <ColorContainer key={color} color={color} h={18 / colors.length} />
        ))}
      </div>
      <button onClick={downloadPalette} className="button">
        <p>Download</p> <DownloadIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Palette;
