import React from 'react';
import { OnSaveProps, UserConfig } from '../../types';
export type ImageEditorProps = {
    image: string | null;
    onCancel: () => void;
    onCrop: (props: OnSaveProps) => void;
    userConfig?: UserConfig;
};
export declare const ImageEditor: ({ image, onCrop, onCancel, userConfig, }: ImageEditorProps) => React.JSX.Element | null;
//# sourceMappingURL=ImageEditor.d.ts.map