import { StyleSheet, View } from 'react-native';
import { useImageEditorContext, useSetInitialPositionCropFrame, useSwitchEditor, useUpdateImageLayout, } from '../../hooks';
import { CropAlert } from '../cropAlert';
import { ImageEditorContents } from '../imageEditorContents';
import { ImageEditorHeader } from '../imageEditorHeader';
import { LoadingIndicator } from '../loadingIndicator';
import { SwitchEditorButtons } from '../switchEditorButtons';
export const ImageEditorContainer = function ({ onCancel, onCrop, }) {
    const { switchEditor, opacityReverse, isLoading, activeEditor, showAlert, handleAlertResponse, } = useSwitchEditor();
    const { isSaving, config: { colors }, } = useImageEditorContext();
    const colorStylesContainer = { backgroundColor: colors.background };
    useSetInitialPositionCropFrame();
    useUpdateImageLayout();
    if (isSaving) {
        return (<View style={[styles.container, colorStylesContainer]}>
        <LoadingIndicator />
      </View>);
    }
    return (<View style={[styles.container, colorStylesContainer]}>
      {(isLoading || activeEditor === null) && (<LoadingIndicator opacity={opacityReverse}/> // This loading must be here to load indicator while other things being loaded
        )}
      <ImageEditorHeader onCancel={onCancel} onCrop={onCrop}/>
      <ImageEditorContents activeEditor={activeEditor}/>
      <SwitchEditorButtons activeEditor={activeEditor} switchEditor={switchEditor}/>
      <CropAlert showAlert={showAlert} handleAlertResponse={handleAlertResponse}/>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
});
//# sourceMappingURL=ImageEditorContainer.js.map