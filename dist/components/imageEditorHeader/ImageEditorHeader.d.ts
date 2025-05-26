/// <reference types="react" />
import { LayoutChangeEvent } from 'react-native';
import { ImageEditorProps } from '../imageEditor';
type Props = {
    onCancel: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
} & Pick<ImageEditorProps, 'onCrop'>;
/**
 * @description This is the header of the Modal Editor. This will render CancelButton/FinishButton and the title of the editor which can be edited via userConfig.
 *
 * @param props - An object containing:
 * - `onCancel`: `() => void` – Callback triggered when the user presses the cancel button.
 * - `onCrop`: `() => void` – Callback triggered when the user presses the finish button.
 * - `onLayout`: `(event: LayoutChangeEvent) => void` (optional) – Used to pass layout changes to the parent.
 *
 * @returns A Surface component containing the editor header with cancel, title, and crop actions.
 */
export declare const ImageEditorHeader: ({ onCancel, onCrop, onLayout, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ImageEditorHeader.d.ts.map