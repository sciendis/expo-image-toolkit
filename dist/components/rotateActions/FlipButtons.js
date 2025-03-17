import { FlipHorizontal, FlipVertical } from 'lucide-react-native';
import React from 'react';
import { withTiming } from 'react-native-reanimated';
import { resetZoomState } from '../../utils';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
import { Button } from './Button';
export const FlipButtons = function () {
    const { flipX, flipY, zoom, imagePosition, config } = useImageEditorContext();
    const { colors } = config;
    const flipVertical = () => {
        flipX.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
        resetZoomState(zoom, imagePosition);
    };
    const flipHorizontal = () => {
        flipY.set((prevVal) => withTiming(prevVal === 180 ? 0 : 180));
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