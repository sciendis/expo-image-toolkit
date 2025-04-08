import { ActivityIndicator, Animated, StyleSheet, } from 'react-native';
import { useImageEditorContext } from '../../hooks';
export const LoadingIndicator = function ({ opacity, style }) {
    const { config: { colors }, } = useImageEditorContext();
    const colorStylesContainer = { backgroundColor: colors.background };
    return (<Animated.View style={[styles.contianer, colorStylesContainer, style, { opacity }]}>
      <ActivityIndicator size="large" color={colors.indicator}/>
    </Animated.View>);
};
const styles = StyleSheet.create({
    contianer: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { justifyContent: 'center', alignItems: 'center', zIndex: 1000 }),
});
//# sourceMappingURL=LoadingIndicator.js.map