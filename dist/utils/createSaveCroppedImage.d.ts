import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageDimensions } from '../types';
type Props = {
    setSavedImageDimensions: Dispatch<SetStateAction<SavedImageDimensions>>;
    onCrop: (editedImageUri?: string) => void;
};
export declare const createSaveCroppedImage: ({ setSavedImageDimensions, onCrop, }: Props) => (args?: OnSaveProps | undefined) => Promise<void>;
export {};
//# sourceMappingURL=createSaveCroppedImage.d.ts.map