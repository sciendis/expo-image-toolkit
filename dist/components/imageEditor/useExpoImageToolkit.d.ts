/// <reference types="react" />
import { UserConfig } from '../../types';
export declare const useExpoImageToolkit: (userConfig?: UserConfig) => {
    pickImage: () => Promise<void>;
    image: string | null;
    aspectRatio: number;
    ImageEditorModal: () => import("react").JSX.Element;
    takePhoto: () => Promise<void>;
};
//# sourceMappingURL=useExpoImageToolkit.d.ts.map