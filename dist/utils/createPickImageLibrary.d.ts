import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
type Props = {
    setOriginalImage: Dispatch<SetStateAction<string | null>>;
    setShowEditor: Dispatch<SetStateAction<boolean>>;
    setImage: Dispatch<SetStateAction<string | null>>;
    acceptedFormats?: string[];
};
export declare const createPickImageLibrary: ({ setOriginalImage, setShowEditor, setImage, acceptedFormats, }: Props) => () => Promise<ImagePicker.ImagePickerSuccessResult | ImagePicker.ImagePickerCanceledResult>;
export {};
//# sourceMappingURL=createPickImageLibrary.d.ts.map