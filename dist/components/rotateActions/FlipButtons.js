import { FlipHorizontal, FlipVertical } from 'lucide-react-native';
import React from 'react';
import { withTiming } from 'react-native-reanimated';
import { useImageEditorContext } from '../../hooks';
import { isRotate90, resetZoomState } from '../../utils';
import { Button } from './Button';
/**
 * @description Renders Flip-X/Y buttons.
 *
 * If rotated to ±90/±270, flips are based on visible X/Y-Axis to avoid confusion not the actual X/Y-Axis.
 * the rotated values with the visible X/Y-Axis has to be also verify on final crop calculation.
 */
export const FlipButtons = function () {
    const { flipX, flipY, zoom, imagePosition, rotate, saveHistoryState, config: { colors }, } = useImageEditorContext();
    const flipVertical = () => {
        if (isRotate90(rotate.get())) {
            flipY.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        else {
            flipX.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        resetZoomState(zoom, imagePosition);
        saveHistoryState();
    };
    const flipHorizontal = () => {
        if (isRotate90(rotate.get())) {
            flipX.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        else {
            flipY.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        resetZoomState(zoom, imagePosition);
        saveHistoryState();
    };
    return (<>
      <Button onPress={flipVertical}>
        <FlipVertical color={colors.rotateActions}/>
      </Button>
      <Button onPress={flipHorizontal}>
        <FlipHorizontal color={colors.rotateActions}/>
      </Button>
    </>);
};
//# sourceMappingURL=FlipButtons.js.map