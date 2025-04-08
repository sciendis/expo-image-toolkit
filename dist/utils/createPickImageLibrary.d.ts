import * as ImagePicker from 'expo-image-picker';
type Props = {
    acceptedFormats?: string[];
    onImageSelected: (uri: string) => void;
};
export declare const createPickImageLibrary: ({ acceptedFormats, onImageSelected, }: Props) => () => Promise<ImagePicker.ImagePickerSuccessResult | ImagePicker.ImagePickerCanceledResult>;
export {};
//# sourceMappingURL=createPickImageLibrary.d.ts.map