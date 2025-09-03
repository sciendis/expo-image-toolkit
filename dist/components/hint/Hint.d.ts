import React from 'react';
type Props = {
    message: string;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};
/**
 * @description This Hint component is used in two places: the Rotate editor and the Zoom editor.
 * These hints help users to work more effectively with the app.
 *
 * @param {string} message - The text to display in the hint box.
 * @returns A styled hint box with the given message.
 */
export declare const Hint: ({ id, message, visible, setVisible }: Props) => React.JSX.Element | null;
export {};
//# sourceMappingURL=Hint.d.ts.map