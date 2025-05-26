import { useCallback, useState } from 'react';
import { DefaultLayoutState } from '../constants';
/**
 * @description Manages layout state updates for the zoom and rotate range bars.
 * @returns the current layout state and an onLayout callback to update the range bars' layout dynamically.
 */
export const useSetViewLayout = function () {
    const [viewLayout, setViewLayout] = useState(DefaultLayoutState);
    const onLayout = useCallback((event) => {
        const { layout } = event.nativeEvent;
        if (viewLayout.x !== layout.x ||
            viewLayout.y !== layout.y ||
            viewLayout.width !== layout.width ||
            viewLayout.height !== layout.height) {
            setViewLayout(layout);
        }
    }, [viewLayout]);
    return [viewLayout, onLayout];
};
//# sourceMappingURL=useSetViewLayout.js.map