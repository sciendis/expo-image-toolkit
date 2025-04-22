import React from 'react';
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
    editorName: EditorModes;
    switchEditor: (mode: EditorModes) => Promise<void>;
    children: React.ReactNode;
    disabled?: boolean;
};
export declare const Button: ({ activeEditor, editorName, switchEditor, children, disabled, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map