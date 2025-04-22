import { StyleSheet, View } from 'react-native';
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

export const ImageEditorContainer = function ({
  onCancel,
  onCrop,
}: Pick<ImageEditorProps, 'onCrop' | 'onCancel'>) {
  const {
    switchEditor,
    opacity,
    isLoading,
    activeEditor,
    showAlert,
    handleAlertResponse,
  } = useSwitchEditor();
  const {
    isSaving,
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  useSetInitialDimensions();

  if (isSaving) {
    return (
      <View style={[styles.container, colorStylesContainer]}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, colorStylesContainer]}>
      <ImageEditorHeader onCancel={onCancel} onCrop={onCrop} />
      <ImageEditorContents
        activeEditor={activeEditor}
        isLoading={isLoading}
        opacity={opacity}
      />
      <SwitchEditorButtons
        activeEditor={activeEditor}
        switchEditor={switchEditor}
        isLoading={isLoading}
      />
      <CropAlert
        showAlert={showAlert}
        handleAlertResponse={handleAlertResponse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
});
