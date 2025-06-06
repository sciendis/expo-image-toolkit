import { ActivityIndicator, Animated, StyleSheet, } from 'react-native';
import { useImageEditorContext } from '../../hooks';
/**
 * @description The loading screen which appears in two variants. First is while switching between editors. The second one is while saving
 * the final image edit. While switching between editors, there is a re-render for `RenderActiveImage`, and if no loading screen shows up, it feels like
 * a blinking problem rather than switching between editors. So I have to use this loading screen there. Also, for rotating on ±90/±270,
 * where the width/height of the image will swap,
 * it needs to generate a new image for correct calculation and it takes time for heavy images (for normal images is working fast).
 * This is the second reason for using a loading screen while switching between editors.
 *
 * @param props - An object containing:
 * - `opacity`: `Animated.Value` (optional) – Controls the opacity animation of the loading screen.
 * - `style`: `StyleProp<ViewStyle>` (optional) – Additional styles for customizing the loading container.
 *
 * @returns An animated loading screen with an ActivityIndicator.
 */
export const LoadingIndicator = function ({ opacity, size = 'large', style, }) {
    const { config: { colors }, } = useImageEditorContext();
    const colorStylesContainer = { backgroundColor: colors.background };
    return (<Animated.View style={[styles.container, colorStylesContainer, style, { opacity }]}>
      <ActivityIndicator size={size} color={colors.indicator}/>
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { justifyContent: 'center', alignItems: 'center', zIndex: 1000 }),
});
//# sourceMappingURL=LoadingIndicator.js.map