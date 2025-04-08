import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageInfo } from '../types';
type Props = {
    setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
    onCrop: (editedImageUri: string) => void;
};
export declare const createSaveCroppedImage: ({ setDimensions, onCrop, }: Props) => ({ uri, width, height, rotate, }: OnSaveProps) => Promise<void>;
export {};
//# sourceMappingURL=createSaveCroppedImage.d.ts.map