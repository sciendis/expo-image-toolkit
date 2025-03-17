import { useEffect } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { Dimensions } from '../types';

export const useSetExactImageDimensions = function (
  calculatedImageDimensions: Dimensions | null
) {
  const { exactImageDimensions, setExactImageDimensions } =
    useImageEditorContext();

  useEffect(() => {
    if (!calculatedImageDimensions) return;
    // TODO: Verify new condition with setImage after rotating or cropping
    if (exactImageDimensions.width || exactImageDimensions.height) return;

    setExactImageDimensions(calculatedImageDimensions);
  }, [
    calculatedImageDimensions,
    exactImageDimensions,
    setExactImageDimensions,
  ]);
};
