import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { canvasState, colorsState } from "../atoms/colorsState";

function Canvas() {
  const canvasRef = useRef(null);
  const colors = useRecoilValue(colorsState);
  const [canvas, setCanvas] = useRecoilState(canvasState);

  const drawPalette = (context) => {
    colors.map((color, i) => {
      context.fillStyle = color;
      context.fillRect(0, i * 38, context.canvas.width, 38);
      context.font = "10px";
      context.fillStyle = "black";
      context.fillText(color, context.canvas.width - 95, (i + 1) * 35);
    });
  };

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    drawPalette(canvasRef.current.getContext("2d"));
  }, [colors]);

  return <canvas className="w-72 md:w-96 h-64 object-cover" ref={canvasRef} />;
}

export default Canvas;
