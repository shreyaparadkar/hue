import { atom } from "recoil";

export const colorsState = atom({
  key: "colorsState",
  default: ["#F1F1F1", "#F6F6F6", "#D2D2D2", "#B6B6B6"],
});
