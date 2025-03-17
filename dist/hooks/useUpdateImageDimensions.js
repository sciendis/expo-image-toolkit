import { useEffect, useState } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { DefaultDimensionState } from '../constants';
import { calculateImageOffset } from '../utils';
/**
 * Step 4: Calculate the exact image dimensions to remove the offset around the image.
 * This offset occurs due to zooming. When the image is zoomed in, its width and height increase,
 * causing an area around the image to appear as a margin.
 */
export const useUpdateImageDimensions = function () {
    const { image, imageLayout, setOffset } = useImageEditorContext();
    const [imageDimensions, setImageDimensions] = useState(DefaultDimensionState);
    useEffect(() => {
        if (!image || imageLayout.width <= 0 || imageLayout.height <= 0)
            return;
        try {
            calculateImageOffset({ image, imageLayout }).then(({ displayedImageWidth, displayedImageHeight, offsetX, offsetY }) => {
                // update image dimensions to remove around space
                setImageDimensions({
                    width: displayedImageWidth,
                    height: displayedImageHeight,
                });
                setOffset({ x: offsetX, y: offsetY });
            });
        }
        catch (error) {
            console.error('Failed to calculate image dimensions:', error);
        }
    }, [imageLayout, image, setOffset]);
    return imageDimensions;
};
//# sourceMappingURL=useUpdateImageDimensions.js.map