import { StyleSheet, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';

/**
 * @description A visual cross "+" placed at the center of the CropFrame, used for alignment or reference.
 *
 * @returns The view that display vertical and horizontal lines in the center of the CropFrame.
 */
export const Aim = function () {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStyles = {
    backgroundColor: colors.cropFrameCorners,
    borderColor: colors.cropFrameCorners,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.aim, styles.verticalLine, colorStyles]} />
      <View style={[styles.aim, styles.horizontalLine, colorStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aim: {
    borderRadius: 2,
    borderWidth: 1,
  },
  verticalLine: {
    width: 25,
    position: 'absolute',
  },
  horizontalLine: {
    height: 25,
  },
});
