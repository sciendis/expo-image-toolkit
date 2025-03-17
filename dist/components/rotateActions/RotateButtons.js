import { RotateCcw, RotateCw } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useAnimatedReaction, useDerivedValue, withTiming, } from 'react-native-reanimated';
import { getNextLeftAngle, getNextRightAngle, resetZoomState, } from '../../utils';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
import { Button } from './Button';
import { FlipButtons } from './FlipButtons';
export const RotateButtons = function () {
    const { rotate, previousRotate, zoom, imagePosition, config } = useImageEditorContext();
    const { colors } = config;
    /** previousRotate holding the rotation angle from the last time that users changing image rotation and switch on another editor,
     * then because saving totally a new image from rotation, we keep the last state of rotation in previousRotate state
     */
    const totalRotation = useDerivedValue(() => previousRotate + rotate.get());
    const [rightDisabled, setRightDisabled] = useState(false);
    const [leftDisabled, setLeftDisabled] = useState(false);
    useAnimatedReaction(() => totalRotation.get(), (currentAngle) => {
        if (currentAngle === 360) {
            runOnJS(setRightDisabled)(true);
            runOnJS(setLeftDisabled)(false);
            return;
        }
        if (currentAngle === -360) {
            runOnJS(setLeftDisabled)(true);
            runOnJS(setRightDisabled)(false);
            return;
        }
        runOnJS(setLeftDisabled)(false);
        runOnJS(setRightDisabled)(false);
    });
    const rotateRight = () => {
        const currentAngle = totalRotation.get();
        const nextAngle = getNextRightAngle(currentAngle);
        if (currentAngle === nextAngle)
            return;
        resetZoomState(zoom, imagePosition);
        rotate.set(withTiming(nextAngle - previousRotate));
    };
    const rotateLeft = () => {
        const currentAngle = totalRotation.get();
        const nextAngle = getNextLeftAngle(currentAngle);
        if (currentAngle === nextAngle)
            return;
        resetZoomState(zoom, imagePosition);
        rotate.set(withTiming(nextAngle - previousRotate));
    };
    return (<View style={styles.container}>
      <Button onPress={rotateLeft} disabled={leftDisabled}>
        <RotateCcw color={colors.rotateActions}/>
      </Button>
      <FlipButtons />
      <Button onPress={rotateRight} disabled={rightDisabled}>
        <RotateCw color={colors.rotateActions}/>
      </Button>
    </View>);
};
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        position: 'absolute',
        bottom: 40,
        left: 0,
        width: '100%',
        flexWrap: 'wrap',
    },
});
//# sourceMappingURL=RotateButtons.js.map