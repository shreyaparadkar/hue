export const hexToRGB = (color) => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  return { r: c_r, g: c_g, b: c_b };
};

const rgbToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  };
};

export const isColorLight = (color) => {
  const rgb = hexToRGB(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  if (brightness > 128) {
    return true;
  }
  return false;
};

const getClusters = () => {
  return [
    { name: "white", leadColor: [255, 255, 255], colors: [] },
    { name: "grey", leadColor: [235, 235, 235], colors: [] },
    { name: "rose", leadColor: [255, 0, 128], colors: [] },
    { name: "red", leadColor: [255, 0, 0], colors: [] },
    { name: "magenta", leadColor: [255, 0, 255], colors: [] },
    { name: "orange", leadColor: [255, 128, 0], colors: [] },
    { name: "yellow", leadColor: [255, 255, 0], colors: [] },
    { name: "spring green", leadColor: [0, 255, 128], colors: [] },
    // { name: "chartreuse", leadColor: [128, 255, 0], colors: [] },
    { name: "green", leadColor: [0, 255, 0], colors: [] },
    { name: "cyan", leadColor: [0, 255, 255], colors: [] },
    // { name: "azure", leadColor: [0, 127, 255], colors: [] },
    { name: "blue", leadColor: [0, 0, 255], colors: [] },
    { name: "violet", leadColor: [127, 0, 255], colors: [] },
    { name: "black", leadColor: [0, 0, 0], colors: [] },
  ];
};

export const sortColors = (colors) => {
  let clusters = getClusters();

  colors.forEach((color) => {
    let rgb = hexToRGB(color);
    let minDistance;
    let minDistanceClusterIndex;
    clusters.forEach((cluster, clusterIndex) => {
      const colorRgbArr = [rgb.r, rgb.g, rgb.b];

      const distance = colorDistance(colorRgbArr, cluster.leadColor);
      if (typeof minDistance === "undefined" || minDistance > distance) {
        minDistance = distance;
        minDistanceClusterIndex = clusterIndex;
      }
    });
    clusters[minDistanceClusterIndex].colors.push(color);
  });

  let sortedColors = clusters.reduce((acc, curr) => {
    const colors = curr.colors.map((color) => color);
    return [...acc, ...colors];
  }, []);
  sortedColors = oneDimensionSorting(sortedColors, "l");
  sortedColors = sortedColors.reverse();
  return sortedColors;
};

const colorDistance = (color1, color2) => {
  const x =
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2);
  return Math.sqrt(x);
};

const oneDimensionSorting = (colors, dim) => {
  return colors.sort((colorA, colorB) => {
    let temp = hexToRGB(colorA);
    const colA = rgbToHSL(temp.r, temp.g, temp.b);
    temp = hexToRGB(colorB);
    const colB = rgbToHSL(temp.r, temp.g, temp.b);
    if (colA[dim] < colB[dim]) {
      return -1;
    } else if (colA[dim] > colB[dim]) {
      return 1;
    } else {
      return 0;
    }
  });
};
