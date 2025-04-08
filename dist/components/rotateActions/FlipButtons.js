import { FlipHorizontal, FlipVertical } from 'lucide-react-native';
import React from 'react';
import { withTiming } from 'react-native-reanimated';
import { useImageEditorContext } from '../../hooks';
import { resetZoomState } from '../../utils';
import { Button } from './Button';
export const FlipButtons = function () {
    const { flipX, flipY, zoom, imagePosition, rotate, config } = useImageEditorContext();
    const { colors } = config;
    const flipVertical = () => {
        if (Math.abs(rotate.get()) % 180 === 90) {
            flipY.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        else {
            flipX.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        resetZoomState(zoom, imagePosition);
    };
    const flipHorizontal = () => {
        if (Math.abs(rotate.get()) % 180 === 90) {
            flipX.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        else {
            flipY.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        }
        resetZoomState(zoom, imagePosition);
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