import React, { useState } from 'react';
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
};

/**
 * @description Renders the active editor contents (Zoom/Rotate/Crop) based on the currently selected mode
 * with gesture handling and active editor tools components.
 *
 * @param props - An object containing:
 * - `children`: `ReactNode` – The active editor contents to render inside the wrapper.
 *
 * @returns The view of the active editor or loading screen.
 */
export const ImageEditorContents = function ({ activeEditor }: Props) {
  const {
    config: { labels, enableRotate, enableZoom },
  } = useImageEditorContext();

  const moveGesture = useMoveCropFrame();
  const zoomGesture = useZoomGesture();

  const [rotateHintOpacity, setRotateHintOpacity] = useState<0 | 1>(1);
  const [zoomHintOpacity, setZoomHintOpacity] = useState<0 | 1>(1);

  return (
    <GestureHandlerRootView>
      <ContentWrapper>
        {enableRotate && activeEditor === EditorModes.ROTATE && (
          <>
            <Hint
              id="rotate"
              message={labels.ROTATE_HINT}
              opacity={rotateHintOpacity}
              setOpacity={setRotateHintOpacity}
            />
            <RenderActiveImage activeEditor={activeEditor} />
            <RotateActions />
          </>
        )}
        {enableZoom && activeEditor === EditorModes.ZOOM && (
          <>
            <Hint
              id="zoom"
              message={labels.ZOOM_HINT}
              opacity={zoomHintOpacity}
              setOpacity={setZoomHintOpacity}
            />
            <GestureDetector gesture={zoomGesture}>
              <RenderActiveImage activeEditor={activeEditor} />
            </GestureDetector>
            <ZoomRange />
          </>
        )}
        {activeEditor === EditorModes.CROP && (
          <GestureDetector gesture={moveGesture}>
            <RenderActiveImage activeEditor={activeEditor} />
          </GestureDetector>
        )}
      </ContentWrapper>
    </GestureHandlerRootView>
  );
};
