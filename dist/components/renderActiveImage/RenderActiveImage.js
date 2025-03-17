import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useGetActiveImageStyles, useSetExactImageDimensions, useUpdateImageDimensions, } from '../../hooks';
import { useImageAnimatedOverflow, useImageAnimatedTransform, } from '../../hooks/animatedStyles';
import { setLayoutDimensions } from '../../utils';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
export const RenderActiveImage = function ({ activeEditor }) {
    const { image, imageRef, setContainerLayout } = useImageEditorContext();
    const onContainerLayout = setLayoutDimensions(setContainerLayout);
    const imageDimensions = useUpdateImageDimensions();
    const { top, left, centerX, centerY, calculatedImageDimensions } = useGetActiveImageStyles(imageDimensions);
    useSetExactImageDimensions(calculatedImageDimensions);
    const animatedTransform = useImageAnimatedTransform({ centerX, centerY });
    const animatedOverflowStyle = useImageAnimatedOverflow(activeEditor);
    return (<Animated.View style={[
            styles.container,
            { top, left },
            calculatedImageDimensions,
            animatedOverflowStyle,
        ]} onLayout={onContainerLayout}>
      <Animated.View ref={imageRef} style={styles.imageContainer}>
        <Animated.View style={styles.imageMovingContainer}>
          <Animated.Image style={[styles.image, animatedTransform]} source={{ uri: image }}/>
        </Animated.View>
      </Animated.View>
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        width: '100%',
        height: '100%',
        maxHeight: '70%',
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