import { EditorModes } from '../constants';
export const getInitialEditor = function (config) {
    const { defaultEditor: initialEditor, enableRotate, enableZoom } = config;
    let defaultEditor = initialEditor;
    if (defaultEditor === 'ROTATE' && !enableRotate) {
        defaultEditor = 'ZOOM';
    }
    if (defaultEditor === 'ZOOM' && !enableZoom) {
        defaultEditor = 'CROP';
    }
    return EditorModes[defaultEditor];
};
//# sourceMappingURL=getInitialEditor.js.map