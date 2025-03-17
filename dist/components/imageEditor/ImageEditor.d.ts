import React from 'react';
import { UserConfig } from '../../types';
import { SaveCroppedImageProps } from '../../utils';
export type ImageEditorProps = {
    image: string | null;
    onCancel: () => void;
    onCrop: (props: SaveCroppedImageProps) => void;
    userConfig?: UserConfig;
};
export declare const ImageEditor: ({ image, onCrop, onCancel, userConfig, }: ImageEditorProps) => React.JSX.Element | null;
//# sourceMappingURL=ImageEditor.d.ts.map