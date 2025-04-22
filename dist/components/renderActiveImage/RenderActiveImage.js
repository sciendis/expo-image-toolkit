import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { useImageAnimatedOverflow, useImageAnimatedTransform, } from '../../hooks/animatedStyles';
import { CropFrame } from '../cropFrame';
export const RenderActiveImage = function ({ activeEditor }) {
    const { image, imageRef, dimensions: { displayedImageWidth, displayedImageHeight }, } = useImageEditorContext();
    const { animatedStyleContainer, animatedStyleImage } = useImageAnimatedTransform();
    const animatedOverflowStyle = useImageAnimatedOverflow(activeEditor);
    return (<Animated.View style={[
            styles.container,
            !!displayedImageWidth &&
                !!displayedImageHeight && {
                width: displayedImageWidth,
                height: displayedImageHeight,
            },
            animatedOverflowStyle,
        ]}>
      {activeEditor === EditorModes.CROP && <CropFrame />}
      <Animated.View ref={imageRef} style={styles.imageContainer}>
        <Animated.View style={[styles.imageMovingContainer, animatedStyleContainer]}>
          <Animated.Image style={[styles.image, animatedStyleImage]} source={{ uri: image }}/>
        </Animated.View>
      </Animated.View>
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        zIndex: 1,
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