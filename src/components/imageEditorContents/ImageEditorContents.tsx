import { EditorModes, HINTS } from '@/constants';
import { useMoveCropFrame, useZoomGesture } from '@/hooks';
import { Animated } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { CropFrame } from '../cropFrame';
import { RenderActiveImage } from '../renderActiveImage';
import { RotateActions } from '../rotateActions';
import { ZoomRange } from '../zoomRange';
import { ContentWrapper } from './ContentWrapper';
import { Hint } from '../hint';

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;

type ZoomConfig = {
  minZoom?: number;
  maxZoom?: number;
};

type Props = {
  activeEditor: EditorModes | null;
  opacity: Animated.Value;
  zoomConfig?: ZoomConfig;
};

export const ImageEditorContents = function ({
  activeEditor,
  opacity,
  zoomConfig,
}: Props) {
  const { minZoom, maxZoom } = {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    ...zoomConfig,
  };

  const moveGesture = useMoveCropFrame();
  const { zoomGesture } = useZoomGesture({
    minZoom,
    maxZoom,
  });

  if (activeEditor === EditorModes.ROTATE) {
    return (
      <>
        <ContentWrapper opacity={opacity}>
          <Hint message={HINTS.ROTATE} />
          <RenderActiveImage activeEditor={activeEditor} />
          <RotateActions />
        </ContentWrapper>
      </>
    );
  }

  if (activeEditor === EditorModes.ZOOM) {
    return (
      <ContentWrapper opacity={opacity}>
        <Hint message={HINTS.ZOOM} />
        <GestureHandlerRootView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GestureDetector gesture={zoomGesture}>
            <RenderActiveImage activeEditor={activeEditor} />
          </GestureDetector>
        </GestureHandlerRootView>
        <ZoomRange zoomConfig={{ minZoom, maxZoom }} />
      </ContentWrapper>
    );
  }

  // Crop editor
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={moveGesture}>
        <ContentWrapper opacity={opacity}>
          <CropFrame />
          <RenderActiveImage activeEditor={activeEditor} />
        </ContentWrapper>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
