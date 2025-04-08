import { useEffect } from 'react';
import { useImageEditorContext } from './useImageEditorContext';
/**
 * Step 2: Calculate Image layout based on ImageRef measurement.
 */
export const useUpdateImageLayout = function () {
    const { imageRef, imageLayout, setImageLayout } = useImageEditorContext();
    useEffect(() => {
        const updateLayout = () => {
            if (!imageRef.current)
                return;
            if (imageLayout.width !== 0)
                return; // check if imageLayout already has been set.
            imageRef.current.measure((x, y, width, height) => {
                const newImageLayout = {
                    x: Math.round(x),
                    y: Math.round(y),
                    width: Math.round(width),
                    height: Math.round(height),
                };
                setImageLayout(newImageLayout);
            });
        };
        const frame = requestAnimationFrame(updateLayout);
        return () => cancelAnimationFrame(frame);
    }, [imageRef, setImageLayout, imageLayout]);
};
//# sourceMappingURL=useUpdateImageLayout.js.map