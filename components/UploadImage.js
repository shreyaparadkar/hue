import { CogIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { colorsState } from "../atoms/colorsState";
import connectToClarifai from "../helper/Clarifai";

function UploadImage() {
  const placeholder =
    "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [colors, setColors] = useRecoilState(colorsState);
  const [err, setErr] = useState(false);
  const api = connectToClarifai();

  useEffect(() => {
    if (err) {
      setTimeout(() => {
        setErr(false);
      }, 2500);
    }
  }, [err]);

  const generatePalette = () => {
    if (imageSrc !== placeholder) {
      api.models
        .predict(Clarifai.COLOR_MODEL, imageSrc)
        .then((response) => {
          let data = response.outputs[0].data.colors;
          let colorsList = data.map((color) => color.raw_hex);
          console.log(colorsList);
          setColors(colorsList);
        })
        .catch((err) => {
          console.log(err);
          setErr(true);
        });
    } else {
      setErr(true);
    }
  };

  const clearInput = () => {
    setImageSrc("");
  };

  return (
    <div className="flex flex-col items-center lg:place-self-end px-0 lg:px-8">
      <div className="text-center h-20">
        <p>Enter image url: </p>
        <div>
          <input
            className="w-72 h-8 mt-2 md:w-[22rem] border-[1px] border-sky-700 mb-5 dark:bg-gray-800"
            type="text"
            placeholder="www.example.com"
            onChange={(e) => setImageSrc(e.target.value)}
            value={imageSrc}
          />
          <button
            onClick={clearInput}
            className="bg-sky-200 cursor-pointer shadow-md h-8 px-3 text-black"
          >
            X
          </button>
        </div>
      </div>
      <img
        className="w-[20rem] md:w-[28rem] h-72 shadow-md"
        src={imageSrc.length ? imageSrc : placeholder}
      />
      <button className="button mb-4" onClick={generatePalette}>
        <p>Generate Palette</p>
        <CogIcon className="w-6 h-6" />
      </button>
      {err ? (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error! </strong>
          <span class="block sm:inline">Check the URL and try again.</span>
        </div>
      ) : null}
    </div>
  );
}

export default UploadImage;
