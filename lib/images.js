const IMAGES_PATH = "/images";
const IMAGES_EXTENSION = ".jpeg";
const BIG_IMAGES_PATH = `${IMAGES_PATH}/big`;
const BIG_IMAGES_SUFFIX = "BIG";
const NARROW_IMAGES_SUFFIX = "NARROW";

// const getImgInfo = (imgPath) => {
//   let width = "";
//   let height = "";

//   let lastUnderscoreIndex = imgPath.lastIndexOf("_");
//   let lastDashIndex = imgPath.lastIndexOf("-");
//   let lastDotIndex = imgPath.lastIndexOf(".");

//   if (lastUnderscoreIndex > 0 && lastDashIndex > 0) {
//     width = imgPath.substring(lastDashIndex + 1, lastUnderscoreIndex);
//     height = imgPath.substring(lastUnderscoreIndex + 1, lastDotIndex);
//   }
//   return { width, height };
// };

// const getImgPrefix = (imgPath) => {
//   let filenamePrefix = "";
//   let lastUnderscoreIndex = imgPath.lastIndexOf("_");
//   let lastDashIndex = imgPath.lastIndexOf("-");
//   let lastSlashIndex = imgPath.lastIndexOf("/");
//   if (lastUnderscoreIndex > 0 && lastDashIndex > 0) {
//     filenamePrefix = imgPath.substring(lastSlashIndex + 1, lastDashIndex + 1);
//   }
//   return filenamePrefix;
// };

// function createBigImagePath(filenamePrefix) {
//   return `${BIG_IMAGES_PATH}/${filenamePrefix}${BIG_IMAGES_SUFFIX}${IMAGES_EXTENSION}`;
// }

// function createNARROWImagePath(filenamePrefix) {
//   return `/images/${filenamePrefix}${NARROW_IMAGES_SUFFIX}${IMAGES_EXTENSION}`;
// }

// function getDerivedImgPath(baseimgPath, variant) {
//   const prefix = getImgPrefix(baseimgPath);
//   switch (variant) {
//     case "NARROW": {
//       let mobilePath = createNARROWImagePath(prefix);
//       console.log(mobilePath);
//       return mobilePath; //createMobileImagePath(prefix);
//     }

//     case "BIG":
//       return createBigImagePath(prefix);

//     default:
//       return baseimgPath;
//   }
// }

// const getLightBoxImagePath = (path, hasBig, isNarrowScreen) => {
//   let filePath = path;
//   if (hasBig) {
//     if (isNarrowScreen) {
//       filePath = getDerivedImgPath(
//         getDerivedImgPath(path, NARROW_IMAGES_SUFFIX),
//         BIG_IMAGES_SUFFIX
//       );
//     } else {
//       filePath = getDerivedImgPath(path, BIG_IMAGES_SUFFIX);
//     }
//   }
//   return filePath;
// };

const getImgSrcset = (section,imgName, imgSizes) => {
  const reducerFn = (accumulator, currentValue, currentIndex, array) => {
    const stringon = `/images/${section}/${imgName}_${currentValue.width}.jpg ${currentValue.width}w`;
    let accumulament = accumulator;
    if (currentIndex !== 0) {
      accumulament = accumulament + ",";
    }

    return accumulament + stringon;
  };

  return imgSizes.reduce(reducerFn, "");
};

module.exports = {
  // getDerivedImgPath,
  // getImgInfo,
  // getLightBoxImagePath,
   getImgSrcset,
};
