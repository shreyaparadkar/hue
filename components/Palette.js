import { ClipboardCopyIcon, DownloadIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { colorsState } from "../atoms/colorsState";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import ColorContainer from "./ColorContainer";
import { useEffect, useState } from "react";

function Palette() {
  const colors = useRecoilValue(colorsState);
  const [imageUrl, setImageUrl] = useState(null);
  const [btnText, setBtnText] = useState("Copy link");

  useEffect(() => {
    createImageURL();
  }, [colors]);

  const downloadPalette = () => {
    htmlToImage
      .toPng(document.getElementById("palette"))
      .then(function (dataUrl) {
        download(dataUrl, "palette.png");
      });
  };

  const createImageURL = async () => {
    const dataUrl = await htmlToImage.toBlob(
      document.getElementById("palette")
    );
    const rf = new FileReader();
    rf.readAsDataURL(dataUrl);
    rf.onloadend = (event) => {
      handleApiCall(event.target.result);
    };
  };

  const handleApiCall = async (result) => {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`;
    const body = new FormData();
    body.append("image", result.split(",").pop());
    body.append("name", "test.jpg");
    body.append("expiration", "3000");
    try {
      const res = await fetch(url, {
        method: "POST",
        body: body,
      });
      res = await res.json();
      setImageUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const sharePalette = () => {
    navigator.clipboard.writeText(imageUrl);
    setBtnText("Copied!");
    setTimeout(() => {
      setBtnText("Copy link");
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-start lg:place-self-start lg:px-16">
      <div className="h-24">
        <h1 className="text-center text-lg py-4 mt-2 font-bold">
          Generated Palette
        </h1>
      </div>
      <div
        id="palette"
        className=" w-[20rem] sm:w-[27rem] h-72 flex-col items-center justify-center shadow-md"
      >
        {colors.map((color) => (
          <ColorContainer key={color} color={color} h={18 / colors.length} />
        ))}
      </div>
      <div className="inline-flex space-x-8">
        <button onClick={downloadPalette} className="button">
          <p>Download</p> <DownloadIcon className="w-6 h-6" />
        </button>
        <button
          onClick={sharePalette}
          className="button"
          disabled={btnText === "Copy link" ? false : true}
        >
          <p>{btnText}</p> <ClipboardCopyIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Palette;
