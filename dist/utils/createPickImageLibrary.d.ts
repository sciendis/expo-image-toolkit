import { Dispatch, SetStateAction } from 'react';
type Props = {
    setOriginalImage: Dispatch<SetStateAction<string | null>>;
    setShowEditor: Dispatch<SetStateAction<boolean>>;
};
export declare const createPickImageLibrary: ({ setOriginalImage, setShowEditor, }: Props) => () => Promise<void>;
export {};
//# sourceMappingURL=createPickImageLibrary.d.ts.map