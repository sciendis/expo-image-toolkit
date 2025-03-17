import React from 'react';
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes | null;
    editorName: EditorModes;
    switchEditor: (mode: EditorModes) => Promise<void>;
    children: React.ReactNode;
};
export declare const Button: ({ activeEditor, editorName, switchEditor, children, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map