import { Dispatch, SetStateAction } from 'react';
import { OnSaveProps, SavedImageInfo } from '../types';
type Props = {
    setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
    setImage: Dispatch<SetStateAction<string | null>>;
    setShowEditor: Dispatch<SetStateAction<boolean>>;
};
export declare const createSaveCroppedImage: ({ setDimensions, setImage, setShowEditor, }: Props) => ({ uri, width, height, rotate, }: OnSaveProps) => Promise<void>;
export {};
//# sourceMappingURL=createSaveCroppedImage.d.ts.map