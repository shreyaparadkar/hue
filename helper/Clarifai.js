import Clarifai from "clarifai";

const connectToClarifai = () => {
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
      setColors(colorsList);
    })
    .catch((err) => {
      setErr(true);
    });
};

export default connectToClarifai;
