import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useImageEditorContext } from '../../hooks';
import { useCropFrameAnimatedStyle } from '../../hooks/animatedStyles';
import { Aim } from './Aim';
import { Corners } from './Corners';
import { ExtraBorders } from './ExtraBorders';

export const CropFrame = function () {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStyles = {
    borderColor: colors.cropFrameBorders,
    backgroundColor: colors.cropFrameBg,
  };

  const animatedStyle = useCropFrameAnimatedStyle();

  return (
    <Animated.View style={[styles.container, animatedStyle, colorStyles]}>
      <View style={styles.box}>
        <Aim />
        <Corners />
        <ExtraBorders />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderWidth: 1,
    pointerEvents: 'box-none',
    opacity: 0,
    top: 0,
    left: 0,
    zIndex: 10,
  },
  box: {
    height: '100%',
    width: '100%',
  },
});
