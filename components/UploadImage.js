import { CogIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { colorsState } from "../atoms/colorsState";
import connectToClarifai from "../helper/clarifai";
import {
  extractDraggedImageDataUrl,
  validateImageFile,
} from "../helper/handleImage";

function UploadImage() {
  const placeholder =
    "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [colors, setColors] = useRecoilState(colorsState);
  const [err, setErr] = useState(false);
  const api = connectToClarifai();

  useEffect(() => {
    handleImage();
  }, []);

  const handleImage = () => {
    const dropRegion = document.getElementById("drop-region");
    dropRegion.addEventListener("dragenter", (e) => e.preventDefault());
    dropRegion.addEventListener("dragleave", (e) => e.preventDefault());
    dropRegion.addEventListener("dragover", (e) => e.preventDefault());
    dropRegion.addEventListener("drop", (e) => {
      e.preventDefault();
      const image = e.dataTransfer.files[0];
      if (!image) {
        const result = extractDraggedImageDataUrl(
          e.dataTransfer.getData("text/html")
        );
        handleApiCall(result);
      } else if (validateImageFile(image)) {
        const rf = new FileReader();
        rf.readAsDataURL(image);
        rf.onloadend = (event) => {
          handleApiCall(event.target.result);
        };
      }
    });
  };

  const handleApiCall = async (result) => {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`;
    const body = new FormData();
    body.append("image", result.split(",").pop());
    body.append("name", "test.jpg");
    body.append("expiration", "300");
    try {
      const res = await fetch(url, {
        method: "POST",
        body: body,
      });
      res = await res.json();
      console.log(res.data.url);
      setImageSrc(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePalette = () => {
    if (imageSrc !== placeholder) {
      api.models
        .predict(Clarifai.COLOR_MODEL, imageSrc)
        .then((response) => {
          let data = response.outputs[0].data.colors;
          let colorsList = data.map((color) => color.raw_hex);
          setColors(colorsList);
        })
        .catch((err) => {
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
      <div className="text-center h-21">
        <p>Drag and drop image inside the box, or enter image url: </p>
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
      <div
        id="drop-region"
        className="border-2 border-dotted dark:border-gray-600 border-gray-200 p-10"
      >
        <img
          className="w-[18rem] md:w-[26rem] h-64 shadow-md"
          src={imageSrc.length ? imageSrc : placeholder}
        />
      </div>

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
