import Clarifai from "clarifai";
import { sortColors } from "./colors";

export const connectToClarifai = () => {
  const app = new Clarifai.App({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  return app;
};

export const generatePalette = (api, imageSrc, setColors, setErr) => {
  api.models
    .predict(Clarifai.COLOR_MODEL, imageSrc)
    .then((response) => {
      console.log(response);
      let data = response.outputs[0].data.colors;
      let colorsList = data.map((color) => color.raw_hex);
      const sortedColors = sortColors(colorsList);
      setColors(sortedColors);
    })
    .catch((err) => {
      setErr(true);
    });
};
