import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  useImageEditorContext,
  useSetInitialDimensions,
  useSwitchEditor,
} from '../../hooks';
import { CropAlert } from '../cropAlert';
import { ImageEditorContents } from '../imageEditorContents';
import { ImageEditorHeader } from '../imageEditorHeader';
import { LoadingIndicator } from '../loadingIndicator';
import { SwitchEditorButtons } from '../switchEditorButtons';
import { ImageEditorProps } from './ImageEditor';

/**
 * @description This container handles switching between editors (Zoom/Rotate/Crop) and renders the header, footer, and contents of the editor.
 * If saving is in progress, it shows a full-screen loading view.
 *
 * @param props - An object containing:
 * - `onCancel`: `() => void` – Callback triggered when the user presses the cancel button.
 * - `onCrop`: `() => void` – Callback triggered when the user presses the finish button.
 *
 * @returns The view that renders the editor components based on the active/selected editor or the loading screen while processing the image.
 */
export const ImageEditorContainer = function ({
  onCancel,
  onCrop,
}: Pick<ImageEditorProps, 'onCrop' | 'onCancel'>) {
  const {
    switchEditor,
    activeEditor,
    showAlert,
    handleAlertResponse,
    opacity,
  } = useSwitchEditor();
  const {
    isSaving,
    isLoading,
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  const { isDeviceRotated } = useSetInitialDimensions();

  if (isSaving) {
    return (
      <View style={[styles.container, colorStylesContainer]}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, colorStylesContainer]}>
      <ImageEditorHeader onCancel={onCancel} onCrop={onCrop} />
      <ImageEditorContents
        activeEditor={activeEditor}
        opacity={opacity}
        showOrientationHint={isDeviceRotated}
      />
      <SwitchEditorButtons
        activeEditor={activeEditor}
        switchEditor={switchEditor}
      />
      <CropAlert
        visible={showAlert}
        handleAlertResponse={handleAlertResponse}
      />
      {isLoading === 'full' && <LoadingIndicator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    zIndex: 1,
  },
});
