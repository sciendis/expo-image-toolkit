import React from 'react';
import { ImageEditorContainer } from './ImageEditorContainer';
import { ImageEditorProvider } from './ImageEditorProvider';
export const ImageEditor = function ({ image, onCrop, onCancel, userConfig, }) {
    if (!image)
        return <></>;
    return (<ImageEditorProvider image={image} userConfig={userConfig}>
      <ImageEditorContainer onCancel={onCancel} onCrop={onCrop}/>
    </ImageEditorProvider>);
};
//# sourceMappingURL=ImageEditor.js.map