import { useEffect } from 'react';
import { useImageEditorContext } from './useImageEditorContext';
export const useSetExactImageDimensions = function (calculatedImageDimensions) {
    const { setExactImageDimensions } = useImageEditorContext();
    useEffect(() => {
        if (!calculatedImageDimensions)
            return;
        setExactImageDimensions(calculatedImageDimensions);
    }, [calculatedImageDimensions, setExactImageDimensions]);
};
//# sourceMappingURL=useSetExactImageDimensions.js.map