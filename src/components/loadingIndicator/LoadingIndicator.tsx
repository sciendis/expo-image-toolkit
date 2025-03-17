import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  opacity?: Animated.Value;
  style?: StyleProp<ViewStyle>;
};

export const LoadingIndicator = function ({ opacity, style }: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  return (
    <Animated.View
      style={[styles.contianer, colorStylesContainer, style, { opacity }]}
    >
      <ActivityIndicator size="large" color={colors.indicator} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
