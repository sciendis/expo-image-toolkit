import { Dispatch, SetStateAction } from 'react';
import { EditorModes } from '../constants';
type UseHandleCropFrameChangeProps = {
    setPendingEditor: Dispatch<SetStateAction<EditorModes | null>>;
    setShowAlert: Dispatch<SetStateAction<boolean>>;
};
export declare const useHandleCropFrameChange: ({ setPendingEditor, setShowAlert, }: UseHandleCropFrameChangeProps) => (mode: EditorModes) => boolean;
export {};
//# sourceMappingURL=useHandleCropFrameChange.d.ts.map