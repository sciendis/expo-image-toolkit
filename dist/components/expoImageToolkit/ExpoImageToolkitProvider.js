import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useBackButtonCustomModalHandler } from '../../hooks';
import { ImageEditor } from '../imageEditor';
import { ExpoImageToolkitContext } from './ExpoImageToolkitContext';
import { cleanupOldCroppedImages } from '../../utils/cleanupOldCroppedImages';
/**
 * @description This provider renders the editor modal in fullscreen mode at the root level.
 * To use `expo-image-toolkit`, you must wrap your entire app in this provider.
 * It handles opening the editor after image selection or taking a photo, and closing it.
 *
 * @param children - Your app’s components.
 * @returns The wrapped children along with the editor modal.
 */
export const ExpoImageToolkitProvider = function ({ children }) {
    const [editorState, setEditorState] = useState({
        selectedImage: null,
        visible: false,
        onCrop: () => { },
    });
    const showEditor = (selectedImage, onCrop, userConfig) => {
        setEditorState({
            visible: true,
            selectedImage,
            userConfig,
            onCrop,
        });
    };
    const hideEditor = () => {
        setEditorState((prev) => (Object.assign(Object.assign({}, prev), { visible: false, selectedImage: null })));
        cleanupOldCroppedImages();
    };
    const onCrop = (args) => {
        var _a, _b, _c;
        (_a = editorState.onCrop) === null || _a === void 0 ? void 0 : _a.call(editorState, args);
        if (args === null || args === void 0 ? void 0 : args.uri)
            (_c = (_b = editorState.userConfig) === null || _b === void 0 ? void 0 : _b.onSubmit) === null || _c === void 0 ? void 0 : _c.call(_b, args.uri);
        hideEditor();
    };
    const onCancel = () => {
        var _a, _b;
        (_b = (_a = editorState.userConfig) === null || _a === void 0 ? void 0 : _a.onCancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        hideEditor();
    };
    useBackButtonCustomModalHandler({ editorState, onCancel });
    return (<ExpoImageToolkitContext.Provider value={{ showEditor, hideEditor }}>
      {children}
      {/** start editor modal */}
      {editorState.visible && (<View style={styles.modal}>
          <ImageEditor image={editorState.selectedImage} onCrop={onCrop} onCancel={onCancel} userConfig={editorState.userConfig}/>
        </View>)}
      {/** end editor modal */}
    </ExpoImageToolkitContext.Provider>);
};
const styles = StyleSheet.create({
    modal: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { width: '100%', height: '100%', zIndex: 1000, paddingTop: 0, paddingBottom: 0 }),
});
//# sourceMappingURL=ExpoImageToolkitProvider.js.map