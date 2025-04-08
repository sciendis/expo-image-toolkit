import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpoImageToolkitContext } from './ExpoImageToolkitContext';
import { ImageEditor } from '../imageEditor';
export const ExpoImageToolkitProvider = function ({ children }) {
    const [editorState, setEditorState] = useState({
        selectedImage: null,
        visible: false,
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
        setEditorState({
            visible: false,
            selectedImage: null,
        });
    };
    const onCrop = (args) => {
        var _a, _b, _c;
        (_a = editorState.onCrop) === null || _a === void 0 ? void 0 : _a.call(editorState, args);
        (_c = (_b = editorState.userConfig) === null || _b === void 0 ? void 0 : _b.onSubmit) === null || _c === void 0 ? void 0 : _c.call(_b, args.uri);
    };
    const onCancel = () => {
        var _a, _b;
        (_b = (_a = editorState.userConfig) === null || _a === void 0 ? void 0 : _a.onCancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        hideEditor();
    };
    return (<ExpoImageToolkitContext.Provider value={{ showEditor, hideEditor }}>
      {children}
      {editorState.visible && (<View style={styles.modal}>
          <ImageEditor image={editorState.selectedImage} onCrop={onCrop} onCancel={onCancel} userConfig={editorState.userConfig}/>
        </View>)}
    </ExpoImageToolkitContext.Provider>);
};
const styles = StyleSheet.create({
    modal: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { width: '100%', height: '100%', zIndex: 1000, elevation: 1000, paddingTop: 0, paddingBottom: 0 }),
});
//# sourceMappingURL=ExpoImageToolkitProvider.js.map