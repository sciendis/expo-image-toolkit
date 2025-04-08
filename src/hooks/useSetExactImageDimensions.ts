import { useEffect } from 'react';
import { Dimensions } from '../types';
import { useImageEditorContext } from './useImageEditorContext';

export const useSetExactImageDimensions = function (
  calculatedImageDimensions: Dimensions | null
) {
  const { setExactImageDimensions } = useImageEditorContext();

  useEffect(() => {
    if (!calculatedImageDimensions) return;

    setExactImageDimensions(calculatedImageDimensions);
  }, [calculatedImageDimensions, setExactImageDimensions]);
};
