import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CogIcon } from "@heroicons/react/outline";
import { colorsState } from "../atoms/colorsState";
import { connectToClarifai, generatePalette } from "../helper/clarifai_helper";
import ErrorAlert from "./ErrorAlert";
import ImagePreviewBox from "./ImagePreviewBox";
import InputBox from "./InputBox";

function UploadImage() {
  const placeholder =
    "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";
  const [imageSrc, setImageSrc] = useState("");
  const [colors, setColors] = useRecoilState(colorsState);
  const [err, setErr] = useState(false);
  const api = connectToClarifai();

  useEffect(() => {
    if (err) {
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  }, [err]);

  const handleClick = () => {
    if (placeholder !== imageSrc)
      generatePalette(api, imageSrc, setColors, setErr);
    else setErr(true);
  };

  return (
    <div className="flex flex-col items-center lg:place-self-end px-0 lg:px-16">
      <InputBox setImageSrc={setImageSrc} imageSrc={imageSrc} />
      <ImagePreviewBox
        setImageSrc={setImageSrc}
        imageSrc={imageSrc}
        placeholder={placeholder}
      />
      <button className="button mb-4" onClick={handleClick}>
        <p>Generate Palette</p>
        <CogIcon className="w-6 h-6" />
      </button>
      {err ? <ErrorAlert /> : null}
    </div>
  );
}

export default UploadImage;
