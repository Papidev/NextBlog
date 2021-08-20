import React from "react";

export default function CitationWrapper({ citation, children }) {
  // CitationWrapper.propTypes = {
  //   //section: PropTypes.string.isRequired,
  //   // imgName: PropTypes.string.isRequired,
  //   // description: utilLib.propStringValidator,
  // };
  let {
    isEditedContent,
    contentType,
    contentHref,
    contentAuthor,
    license,
    licenseHref,
  } = citation;
  return (
    <>
      {children}
      <p>
        {isEditedContent ? "Edit of " : ""}
        {contentType}
        {" by "}
        <cite>
          <a href={contentHref}>{`${contentAuthor}`}</a>
        </cite>
        {license && (
          <>
            {", license "} <a href={licenseHref}>{license}</a>
          </>
        )}
      </p>
    </>
  );
}
