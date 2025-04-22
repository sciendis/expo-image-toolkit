import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { EditorModes } from '../../constants';
import {
  useImageEditorContext,
  useMoveCropFrame,
  useZoomGesture,
} from '../../hooks';
import { Hint } from '../hint';
import { RenderActiveImage } from '../renderActiveImage';
import { RotateActions } from '../rotateActions';
import { ZoomRange } from '../zoomRange';
import { ContentWrapper } from './ContentWrapper';

type Props = {
  activeEditor: EditorModes;
  isLoading: boolean;
  opacity: Animated.Value;
};

export const ImageEditorContents = function ({
  activeEditor,
  isLoading,
  opacity,
}: Props) {
  const { config } = useImageEditorContext();
  const { labels, enableRotate, enableZoom } = config;

  const moveGesture = useMoveCropFrame();
  const { zoomGesture } = useZoomGesture();

  if (enableRotate && activeEditor === EditorModes.ROTATE) {
    return (
      <ContentWrapper isLoading={isLoading} opacity={opacity}>
        <Hint message={labels.ROTATE_HINT} />
        <RenderActiveImage activeEditor={activeEditor} />
        <RotateActions />
      </ContentWrapper>
    );
  }

  if (enableZoom && activeEditor === EditorModes.ZOOM) {
    return (
      <ContentWrapper isLoading={isLoading} opacity={opacity}>
        <Hint message={labels.ZOOM_HINT} />
        <GestureHandlerRootView style={styles.gestureRootView}>
          <GestureDetector gesture={zoomGesture}>
            <RenderActiveImage activeEditor={activeEditor} />
          </GestureDetector>
        </GestureHandlerRootView>
        <ZoomRange />
      </ContentWrapper>
    );
  }

  // Crop editor
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={moveGesture}>
        <ContentWrapper isLoading={isLoading} opacity={opacity}>
          <RenderActiveImage activeEditor={activeEditor} />
        </ContentWrapper>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureRootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
