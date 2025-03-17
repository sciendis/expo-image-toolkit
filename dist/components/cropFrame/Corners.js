import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useResizeFromBottomLeft, useResizeFromBottomRight, useResizeFromTopLeft, useResizeFromTopRight, } from '../../hooks/useResizeCropFrame';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
export const Corners = function () {
    const { config: { colors }, } = useImageEditorContext();
    const colorStyles = { borderColor: colors.cropFrameCorners };
    const topLeftCornerGesture = useResizeFromTopLeft();
    const topRightCornerGesture = useResizeFromTopRight();
    const bottomLeftCornerGesture = useResizeFromBottomLeft();
    const bottomRightCornerGesture = useResizeFromBottomRight();
    return (<>
      <GestureDetector gesture={topLeftCornerGesture}>
        <View style={[styles.corner, styles.cornerTopLeft, colorStyles]}/>
      </GestureDetector>
      <GestureDetector gesture={topRightCornerGesture}>
        <View style={[styles.corner, styles.cornerTopRight, colorStyles]}/>
      </GestureDetector>
      <GestureDetector gesture={bottomLeftCornerGesture}>
        <View style={[styles.corner, styles.cornerBottomLeft, colorStyles]}/>
      </GestureDetector>
      <GestureDetector gesture={bottomRightCornerGesture}>
        <View style={[styles.corner, styles.cornerBottomRight, colorStyles]}/>
      </GestureDetector>
    </>);
};
const styles = StyleSheet.create({
    corner: {
        position: 'absolute',
        height: 45,
        width: 45,
    },
    cornerTopLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 4,
        borderLeftWidth: 4,
    },
    cornerTopRight: {
        top: -2,
        right: -2,
        borderTopWidth: 4,
        borderRightWidth: 4,
    },
    cornerBottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
    },
    cornerBottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },
});
//# sourceMappingURL=Corners.js.map