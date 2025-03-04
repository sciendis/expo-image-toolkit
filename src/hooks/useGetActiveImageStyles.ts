import { useImageEditorContext } from "@/components/imageEditor/useImageEditorContext";
import { Dimensions } from "@/types";
import { useMemo } from "react";

export const useGetActiveImageStyles = function (imageDimensions: Dimensions) {
  const { imageLayout, containerLayout } = useImageEditorContext();

  const isImageLoaded =
    imageDimensions &&
    imageDimensions.width !== 0 &&
    imageDimensions.height !== 0;

  const dimensions = useMemo(() => {
    const { width, height } = isImageLoaded ? imageDimensions : imageLayout;

    const top = containerLayout.height / 2 - height / 2;
    const left = containerLayout.width / 2 - width / 2;

    const centerX = width / 2;
    const centerY = height / 2;

    const exactImageDimensions = isImageLoaded ? { width, height } : null; // check isImageLoaded again to make sure width and height belong to activeImageDimensions

    return { top, left, centerX, centerY, exactImageDimensions };
  }, [imageDimensions, containerLayout, imageLayout, isImageLoaded]);

  return dimensions;
};
