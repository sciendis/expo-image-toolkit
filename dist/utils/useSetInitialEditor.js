import { useEffect } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { EditorModes } from '../constants';
export const useSetInitialEditor = function (switchEditor) {
    const { image, activeEditor, config: { defaultEditor: initialEditor, enableRotate, enableZoom }, } = useImageEditorContext();
    useEffect(() => {
        if (activeEditor !== null)
            return;
        let defaultEditor = initialEditor;
        if (defaultEditor === 'ROTATE' && !enableRotate) {
            defaultEditor = 'ZOOM';
        }
        if (defaultEditor === 'ZOOM' && !enableZoom) {
            defaultEditor = 'CROP';
        }
        switchEditor(EditorModes[defaultEditor]);
    }, [
        activeEditor,
        image,
        switchEditor,
        initialEditor,
        enableRotate,
        enableZoom,
    ]);
};
//# sourceMappingURL=useSetInitialEditor.js.map