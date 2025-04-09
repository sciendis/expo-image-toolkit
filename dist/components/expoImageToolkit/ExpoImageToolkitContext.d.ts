/// <reference types="react" />
import { OnSaveProps, UserConfig } from '../../types';
type ExpoImageToolkitContextType = {
    showEditor: (selectedImage: string, onCrop: (props?: OnSaveProps) => void, userConfig?: UserConfig) => void;
    hideEditor: () => void;
};
export declare const ExpoImageToolkitContext: import("react").Context<ExpoImageToolkitContextType | undefined>;
export {};
//# sourceMappingURL=ExpoImageToolkitContext.d.ts.map