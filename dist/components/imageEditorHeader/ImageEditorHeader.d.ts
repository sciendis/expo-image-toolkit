/// <reference types="react" />
import { LayoutChangeEvent } from 'react-native';
import { ImageEditorProps } from '../imageEditor';
type Props = {
    onCancel: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
} & Pick<ImageEditorProps, 'onCrop'>;
export declare const ImageEditorHeader: ({ onCancel, onCrop, onLayout, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ImageEditorHeader.d.ts.map