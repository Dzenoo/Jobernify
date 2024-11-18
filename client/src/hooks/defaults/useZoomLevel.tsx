"use client";

import { useEffect, useState } from "react";

const useZoomLevel = () => {
  const [isZoomedOut, setIsZoomedOut] = useState(false);

  useEffect(() => {
    const checkZoomLevel = () => {
      const zoomLevel = window.devicePixelRatio;
      setIsZoomedOut(zoomLevel < 1);
    };

    checkZoomLevel();
    window.addEventListener("resize", checkZoomLevel);
    return () => window.removeEventListener("resize", checkZoomLevel);
  }, []);

  return isZoomedOut;
};

export default useZoomLevel;
