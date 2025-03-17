import { useEffect } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
export const useSetExactImageDimensions = function (calculatedImageDimensions) {
    const { exactImageDimensions, setExactImageDimensions } = useImageEditorContext();
    useEffect(() => {
        if (!calculatedImageDimensions)
            return;
        // TODO: Verify new condition with setImage after rotating or cropping
        if (exactImageDimensions.width || exactImageDimensions.height)
            return;
        setExactImageDimensions(calculatedImageDimensions);
    }, [
        calculatedImageDimensions,
        exactImageDimensions,
        setExactImageDimensions,
    ]);
};
//# sourceMappingURL=useSetExactImageDimensions.js.map