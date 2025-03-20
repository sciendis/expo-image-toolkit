import { useEffect } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { Dimensions } from '../types';

export const useSetExactImageDimensions = function (
  calculatedImageDimensions: Dimensions | null
) {
  const { setExactImageDimensions } = useImageEditorContext();

  useEffect(() => {
    if (!calculatedImageDimensions) return;

    setExactImageDimensions(calculatedImageDimensions);
  }, [calculatedImageDimensions, setExactImageDimensions]);
};
