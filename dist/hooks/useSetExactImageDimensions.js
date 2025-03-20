import { useEffect } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
export const useSetExactImageDimensions = function (calculatedImageDimensions) {
    const { setExactImageDimensions } = useImageEditorContext();
    useEffect(() => {
        if (!calculatedImageDimensions)
            return;
        setExactImageDimensions(calculatedImageDimensions);
    }, [calculatedImageDimensions, setExactImageDimensions]);
};
//# sourceMappingURL=useSetExactImageDimensions.js.map