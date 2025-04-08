import { GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import { EditorModes } from '../../constants';
import { useImageEditorContext, useMoveCropFrame, useZoomGesture, } from '../../hooks';
import { CropFrame } from '../cropFrame';
import { Hint } from '../hint';
import { RenderActiveImage } from '../renderActiveImage';
import { RotateActions } from '../rotateActions';
import { ZoomRange } from '../zoomRange';
import { ContentWrapper } from './ContentWrapper';
export const ImageEditorContents = function ({ activeEditor }) {
    const { config } = useImageEditorContext();
    const { labels, enableRotate, enableZoom } = config;
    const moveGesture = useMoveCropFrame();
    const { zoomGesture } = useZoomGesture();
    if (enableRotate && activeEditor === EditorModes.ROTATE) {
        return (<ContentWrapper>
        <Hint message={labels.ROTATE_HINT}/>
        <RenderActiveImage activeEditor={activeEditor}/>
        <RotateActions />
      </ContentWrapper>);
    }
    if (enableZoom && activeEditor === EditorModes.ZOOM) {
        return (<ContentWrapper>
        <Hint message={labels.ZOOM_HINT}/>
        <GestureHandlerRootView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
          <GestureDetector gesture={zoomGesture}>
            <RenderActiveImage activeEditor={activeEditor}/>
          </GestureDetector>
        </GestureHandlerRootView>
        <ZoomRange />
      </ContentWrapper>);
    }
    // Crop editor
    return (<GestureHandlerRootView>
      <GestureDetector gesture={moveGesture}>
        <ContentWrapper>
          <CropFrame />
          <RenderActiveImage activeEditor={activeEditor}/>
        </ContentWrapper>
      </GestureDetector>
    </GestureHandlerRootView>);
};
//# sourceMappingURL=ImageEditorContents.js.map