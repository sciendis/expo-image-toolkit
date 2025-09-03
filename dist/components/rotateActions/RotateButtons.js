import { RotateCcw, RotateCw } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useAnimatedReaction, useDerivedValue, withTiming, } from 'react-native-reanimated';
import { useImageEditorContext } from '../../hooks';
import { FontSizes, Spacing } from '../../styles';
import { getNextLeftAngle, getNextRightAngle, resetZoomState, } from '../../utils';
import { Button } from './Button';
import { FlipButtons } from './FlipButtons';
/**
 * @description Renders Rotate-Left/Right buttons.
 * Also includes FlipButtons between them.
 * Handles total rotation logic and enables/disables buttons at ±360.
 * @returns Rotate Buttons and Flip Buttons.
 */
export const RotateButtons = function () {
    const { rotate, previousRotate, zoom, imagePosition, saveHistoryState, config: { colors }, } = useImageEditorContext();
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
        const nextRotate = nextAngle - previousRotate;
        rotate.set(withTiming(nextRotate));
        saveHistoryState();
    };
    const rotateLeft = () => {
        const currentAngle = totalRotation.get();
        const nextAngle = getNextLeftAngle(currentAngle);
        if (currentAngle === nextAngle)
            return;
        resetZoomState(zoom, imagePosition);
        const nextRotate = nextAngle - previousRotate;
        rotate.set(withTiming(nextRotate));
        saveHistoryState();
    };
    return (<View style={styles.container}>
      <Button onPress={rotateLeft} disabled={leftDisabled}>
        <RotateCcw size={FontSizes.l} color={colors.rotateActions}/>
      </Button>
      <FlipButtons />
      <Button onPress={rotateRight} disabled={rightDisabled}>
        <RotateCw size={FontSizes.l} color={colors.rotateActions}/>
      </Button>
    </View>);
};
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: Spacing.xxs,
        position: 'absolute',
        bottom: '4%',
        left: 0,
        width: '100%',
        flexWrap: 'wrap',
    },
});
//# sourceMappingURL=RotateButtons.js.map