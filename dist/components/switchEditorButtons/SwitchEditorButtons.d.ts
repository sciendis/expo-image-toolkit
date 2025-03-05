/// <reference types="react" />
import { EditorModes } from "../../constants";
type Props = {
    activeEditor: EditorModes | null;
    switchEditor: (mode: EditorModes) => Promise<void>;
};
export declare const SwitchEditorButtons: ({ activeEditor, switchEditor, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SwitchEditorButtons.d.ts.map