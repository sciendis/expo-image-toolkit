/// <reference types="react" />
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
    switchEditor: (mode: EditorModes) => Promise<void>;
    isLoading: boolean;
};
export declare const SwitchEditorButtons: ({ activeEditor, switchEditor, isLoading, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SwitchEditorButtons.d.ts.map