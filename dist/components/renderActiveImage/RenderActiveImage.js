import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { useImageAnimatedOverflow, useImageAnimatedTransform, } from '../../hooks/animatedStyles';
import { CropFrame } from '../cropFrame';
export const RenderActiveImage = function ({ activeEditor }) {
    const { image, imageRef, rotate, dimensions: { displayedImageWidth, displayedImageHeight, rotateScale }, } = useImageEditorContext();
    const { animatedStyleContainer, animatedStyleImage } = useImageAnimatedTransform();
    const animatedOverflowStyle = useImageAnimatedOverflow(activeEditor);
    const animatedStyleRotateScale = useAnimatedStyle(() => {
        'worklet';
        return { transform: [{ scale: withTiming(1 / rotateScale) }] };
    }, [rotate, rotateScale]);
    return (<Animated.View style={[
            styles.container,
            !!displayedImageWidth &&
                !!displayedImageHeight && {
                width: displayedImageWidth,
                height: displayedImageHeight,
            },
            animatedOverflowStyle,
            animatedStyleRotateScale,
        ]}>
      <Animated.View ref={imageRef} style={styles.imageContainer}>
        {activeEditor === EditorModes.CROP && <CropFrame />}
        <Animated.View style={[styles.imageMovingContainer, animatedStyleContainer]}>
          <Animated.Image style={[styles.image, animatedStyleImage]} source={{ uri: image }}/>
        </Animated.View>
      </Animated.View>
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        width: '100%',
        height: '100%',
        maxHeight: '70%',
        position: 'relative',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    imageMovingContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
//# sourceMappingURL=RenderActiveImage.js.map