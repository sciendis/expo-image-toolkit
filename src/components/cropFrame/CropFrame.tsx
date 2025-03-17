import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useCropFrameAnimatedStyle } from '../../hooks/animatedStyles';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
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
  },
  box: {
    height: '100%',
    width: '100%',
  },
});
