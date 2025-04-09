import * as ImagePicker from 'expo-image-picker';
type Props = {
    onImageSelected: (uri: string) => void;
};
export declare const createTakePhotoCamera: ({ onImageSelected }: Props) => () => Promise<ImagePicker.ImagePickerSuccessResult | ImagePicker.ImagePickerCanceledResult | undefined>;
export {};
//# sourceMappingURL=createTakePhotoCamera.d.ts.map