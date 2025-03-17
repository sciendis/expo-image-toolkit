import { Dispatch, SetStateAction } from 'react';
import { SavedImageInfo } from '../types';
type Props = {
    setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
    setImage: Dispatch<SetStateAction<string | null>>;
    setShowEditor: Dispatch<SetStateAction<boolean>>;
};
export type SaveCroppedImageProps = {
    uri: string;
    width: number;
    height: number;
    rotate: number;
};
export declare const createSaveCroppedImage: ({ setDimensions, setImage, setShowEditor, }: Props) => ({ uri, width, height, rotate, }: SaveCroppedImageProps) => Promise<void>;
export {};
//# sourceMappingURL=createSaveCroppedImage.d.ts.map