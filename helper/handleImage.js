export const validateImageFile = (image) => {
  var validTypes = ["image/jpeg", "image/png"];
  if (validTypes.indexOf(image.type) === -1) {
    alert("Invalid File Type");
    return false;
  }

  var maxSizeInBytes = 10e6;
  if (image.size > maxSizeInBytes) {
    alert("File too large");
    return false;
  }

  return true;
};

export const extractDraggedImageDataUrl = (imageData) => {
  const rex = /src="?([^"\s]+)"?\s*/;
  let dataUrl = rex.exec(imageData);
  dataUrl = dataUrl[0].split('"')[1];
  return dataUrl;
};
