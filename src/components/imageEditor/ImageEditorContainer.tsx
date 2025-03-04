import { STATIC_TEXTS } from '@/constants';
import {
  useSetInitialPositionCropFrame,
  useSwitchEditor,
  useUpdateImageLayout,
} from '@/hooks';
import { Colors } from '@/styles';
import { StyleSheet, View } from 'react-native';
import { CancelButton } from '../cancelButton';
import { CropImageButton } from '../cropImageButton';
import { ImageEditorContents } from '../imageEditorContents';
import { ImageEditorHeader } from '../imageEditorHeader';
import { LoadingIndicator } from '../loadingIndicator';
import { SwitchEditorButtons } from '../switchEditorButtons';
import { ImageEditorProps } from './ImageEditor';
import { useImageEditorContext } from './useImageEditorContext';

export const ImageEditorContainer = function ({
  onCancel,
  onCrop,
}: Pick<ImageEditorProps, 'onCrop' | 'onCancel'>) {
  const { switchEditor, opacity, opacityReverse, isLoading, activeEditor } =
    useSwitchEditor();
  const { isSaving } = useImageEditorContext();

  useSetInitialPositionCropFrame();
  useUpdateImageLayout();

  if (isSaving) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {(isLoading || activeEditor === null) && (
        <LoadingIndicator opacity={opacityReverse} /> // This loading must be here to load indicator while other things being loaded
      )}
      <ImageEditorHeader
        title={STATIC_TEXTS.EDITOR_TITLE}
        headerLeft={<CancelButton onCancel={onCancel} />}
        headerRight={<CropImageButton onCrop={onCrop} />}
      />
      <ImageEditorContents activeEditor={activeEditor} opacity={opacity} />
      <SwitchEditorButtons
        activeEditor={activeEditor}
        switchEditor={switchEditor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.background,
  },
});
