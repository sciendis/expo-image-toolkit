import { Dispatch, SetStateAction } from 'react';
type Props = {
    setOriginalImage: Dispatch<SetStateAction<string | null>>;
    setShowEditor: Dispatch<SetStateAction<boolean>>;
};
export declare const createTakePhotoCamera: ({ setOriginalImage, setShowEditor, }: Props) => () => Promise<void>;
export {};
//# sourceMappingURL=createTakePhotoCamera.d.ts.map