import React, { useState } from 'react';
import { GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import { EditorModes } from '../../constants';
import { useImageEditorContext, useMoveCropFrame, useZoomGesture, } from '../../hooks';
import { Hint } from '../hint';
import { RenderActiveImage } from '../renderActiveImage';
import { RotateActions } from '../rotateActions';
import { ZoomRange } from '../zoomRange';
import { ContentWrapper } from './ContentWrapper';
import { Animated, StyleSheet, View } from 'react-native';
/**
 * @description Renders the active editor contents (Zoom/Rotate/Crop) based on the currently selected mode
 * with gesture handling and active editor tools components.
 *
 * @param props - An object containing:
 * - `children`: `ReactNode` – The active editor contents to render inside the wrapper.
 *
 * @returns The view of the active editor or loading screen.
 */
export const ImageEditorContents = function ({ activeEditor, opacity, showOrientationHint = false, }) {
    const { config: { labels, enableRotate, enableZoom }, } = useImageEditorContext();
    const moveGesture = useMoveCropFrame();
    const zoomGesture = useZoomGesture();
    const [rotateHintVisible, setRotateHintVisible] = useState(true);
    const [zoomHintVisible, setZoomHintVisible] = useState(true);
    const [deviceRotatedHintVisible, setDeviceRotatedHintVisible] = useState(true);
    return (<GestureHandlerRootView>
      <ContentWrapper>
        <Animated.View style={[styles.imageContainer, { opacity }]}>
          <View style={styles.hintContainer}>
            {showOrientationHint && (<Hint id="device-rotated" message={labels.DEVICE_ROTATED_HINT} visible={deviceRotatedHintVisible} setVisible={setDeviceRotatedHintVisible}/>)}
            {enableRotate && activeEditor === EditorModes.ROTATE && (<Hint id="rotate" message={labels.ROTATE_HINT} visible={rotateHintVisible} setVisible={setRotateHintVisible}/>)}
            {enableZoom && activeEditor === EditorModes.ZOOM && (<Hint id="zoom" message={labels.ZOOM_HINT} visible={zoomHintVisible} setVisible={setZoomHintVisible}/>)}
          </View>
          {enableRotate && activeEditor === EditorModes.ROTATE && (<>
              <RenderActiveImage activeEditor={activeEditor}/>
              <RotateActions />
            </>)}
          {enableZoom && activeEditor === EditorModes.ZOOM && (<>
              <GestureDetector gesture={zoomGesture}>
                <RenderActiveImage activeEditor={activeEditor}/>
              </GestureDetector>
              <ZoomRange />
            </>)}
          {activeEditor === EditorModes.CROP && (<GestureDetector gesture={moveGesture}>
              <RenderActiveImage activeEditor={activeEditor}/>
            </GestureDetector>)}
        </Animated.View>
      </ContentWrapper>
    </GestureHandlerRootView>);
};
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    hintContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '5%',
        alignItems: 'center',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        pointerEvents: 'box-none',
    },
});
//# sourceMappingURL=ImageEditorContents.js.map