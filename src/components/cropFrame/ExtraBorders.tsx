import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';

/**
 * @description The borders displayed in the middle of the CropFrame. Two horizontal borders and two vertical borders.
 *
 */
export const ExtraBorders = function () {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStylesVL = {
    borderLeftColor: colors.cropFrameBorders,
    borderRightColor: colors.cropFrameBorders,
  };
  const colorStylesHL = {
    borderTopColor: colors.cropFrameBorders,
    borderBottomColor: colors.cropFrameBorders,
  };

  return (
    <>
      <View style={[styles.verticalLines, colorStylesVL]} />
      <View style={[styles.horizontalLines, colorStylesHL]} />
    </>
  );
};

const styles = StyleSheet.create({
  verticalLines: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    width: '33%',
    height: '100%',
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  horizontalLines: {
    position: 'absolute',
    left: 0,
    top: '33.33%',
    width: '100%',
    height: '33%',
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
});
