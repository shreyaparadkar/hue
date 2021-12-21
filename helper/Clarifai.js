import Clarifai from "clarifai";

const connectToClarifai = () => {
  const app = new Clarifai.App({
    apiKey: process.env.API_KEY,
  });
  return app;
};

export default connectToClarifai;
