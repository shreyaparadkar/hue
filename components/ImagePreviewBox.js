import { useEffect } from "react";
import {
  extractDraggedImageDataUrl,
  validateImageFile,
} from "../helper/handleImage";

const ImagePreviewBox = ({ imageSrc, placeholder, setImageSrc }) => {
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
  return (
    <div
      id="drop-region"
      className="border-2 border-dotted dark:border-gray-600 border-gray-400 w-[20rem] sm:w-[27rem] h-72 px-10 flex items-center justify-center"
    >
      <img
        className="shadow-md"
        src={imageSrc.length ? imageSrc : placeholder}
      />
    </div>
  );
};

export default ImagePreviewBox;
