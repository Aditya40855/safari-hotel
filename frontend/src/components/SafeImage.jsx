import React, { useState, useEffect } from "react";

const SafeImage = ({ src, alt, className, ...rest }) => {
  const fallbackSrc = "/images/hotel-placeholder.jpg"; // Your fallback path
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Sync state if the "src" prop changes (important for dynamic lists)
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true); // Flag to stop the infinite loop
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...rest}
      src={imgSrc || fallbackSrc}
      alt={alt || "Hotel image"}
      className={className}
      onError={handleError}
    />
  );
};

export default SafeImage;