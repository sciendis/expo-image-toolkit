import { ImageEditorProps } from '../components/imageEditor';
type Props = Pick<ImageEditorProps, 'onCrop'>;
/**
 * @description Returns the `cropImage` function, used when the `CropImageButton` is pressed.
 *
 * The function gathers the current editor state (zoom/crop/rotation), performs the crop and transformation,
 * and returns the final edited image via the `onCrop` callback.
 *
 * @param {() => void} onCrop - Callback called after cropping. If successful, it receives the result; if not, it's called with no arguments to close the editor.
 * @returns {() => Promise<void>} cropImage function
 */
export declare const useCropImage: ({ onCrop }: Props) => () => Promise<void>;
export {};
//# sourceMappingURL=useCropImage.d.ts.map