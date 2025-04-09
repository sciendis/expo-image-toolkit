import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageInfo } from '../types';
type Props = {
    setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
    onCrop: (editedImageUri?: string) => void;
};
export declare const createSaveCroppedImage: ({ setDimensions, onCrop, }: Props) => (args?: OnSaveProps | undefined) => Promise<void>;
export {};
//# sourceMappingURL=createSaveCroppedImage.d.ts.map