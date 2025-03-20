/// <reference types="react" />
import { UserConfig } from '../../types';
export declare const useExpoImageToolkit: (userConfig?: UserConfig) => {
    width: number;
    height: number;
    pickImage: () => Promise<import("expo-image-picker").ImagePickerSuccessResult | import("expo-image-picker").ImagePickerCanceledResult>;
    image: string | null;
    aspectRatio: number;
    ImageEditorModal: () => import("react").JSX.Element;
    takePhoto: () => Promise<import("expo-image-picker").ImagePickerSuccessResult | import("expo-image-picker").ImagePickerCanceledResult | undefined>;
};
//# sourceMappingURL=useExpoImageToolkit.d.ts.map