/// <reference types="react" />
import { ImageEditorProps } from './ImageEditor';
/**
 * @description This container handles switching between editors (Zoom/Rotate/Crop) and renders the header, footer, and contents of the editor.
 * If saving is in progress, it shows a full-screen loading view.
 *
 * @param props - An object containing:
 * - `onCancel`: `() => void` – Callback triggered when the user presses the cancel button.
 * - `onCrop`: `() => void` – Callback triggered when the user presses the finish button.
 *
 * @returns The view that renders the editor components based on the active/selected editor or the loading screen while processing the image.
 */
export declare const ImageEditorContainer: ({ onCancel, onCrop, }: Pick<ImageEditorProps, 'onCrop' | 'onCancel'>) => import("react").JSX.Element;
//# sourceMappingURL=ImageEditorContainer.d.ts.map