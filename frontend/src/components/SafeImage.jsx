import React, { useEffect, useState } from "react";
import { ASSET_BASE } from "../lib/api";

/**
 * SafeImage
 * ----------
 * Centralized image handling for the entire app.
 * - Works in localhost & production
 * - Resolves backend `/uploads` paths
 * - Provides safe fallbacks
 * - Prevents infinite error loops
 */
const SafeImage = ({
  src,
  alt = "Image",
  className = "",
  fallback = "/images/safari-placeholder.jpg",
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let resolvedSrc = fallback;

    if (typeof src === "string" && src.length > 0) {
      if (src.startsWith("/uploads")) {
        resolvedSrc = ASSET_BASE ? `${ASSET_BASE}${src}` : src;
      } else {
        resolvedSrc = src;
      }
    }

    setCurrentSrc(resolvedSrc);
    setHasError(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      {...rest}
    />
  );
};

export default SafeImage;