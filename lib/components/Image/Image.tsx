import React from "react";

// import styles from "./CaptionImage.module.css";

// import { viewportContext } from "components/ViewportProvider";
// import styles from "./CaptionImage.module.css";

const imagesLib = require("lib/images");
const constants = require("lib/constants");

export default function CaptionImage({
  section,
  imgName,
  description,
  alternativeImgName,
  // children,
}) {
  console.log("section", section);
  const srcSet = imagesLib.getImgSrcset(section, imgName, constants.imgSizes);
  const alternativesrcSet = imagesLib.getImgSrcset(
    section,
    alternativeImgName,
    constants.imgSizes
  );

  // const { isNarrowScreen } = React.useContext(viewportContext);
  // let { width, height } = imagesLib.getImgInfo(path);
  return (
    <>
      <picture>
        <source srcSet={alternativesrcSet} media="(max-width: 600px)" />
        <img
          src={`${imgName}.jpg`}
          alt={`${description}`}
          srcSet={srcSet}
          sizes="100vw"
          // className={styles["content-img"]}
        ></img>
      </picture>

      {/* <p className={styles["img-citation"]}>
        <cite dangerouslySetInnerHTML={createMarkup(children)} />
      </p> */}
    </>
  );
}
