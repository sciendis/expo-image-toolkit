/// <reference types="react" />
import { UserConfig } from "../../types";
export declare const useImageEditor: (userConfig?: UserConfig) => {
    pickImage: () => Promise<void>;
    image: string | null;
    aspectRatio: number;
    ImageEditorModal: () => import("react").JSX.Element;
    takePhoto: () => Promise<void>;
};
//# sourceMappingURL=useImageEditor.d.ts.map