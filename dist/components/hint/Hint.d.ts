import React from 'react';
type Props = {
    message: string;
    opacity: 0 | 1;
    setOpacity: React.Dispatch<React.SetStateAction<0 | 1>>;
};
/**
 * @description This Hint component is used in two places: the Rotate editor and the Zoom editor.
 * These hints help users to work more effectively with the app.
 *
 * @param {string} message - The text to display in the hint box.
 * @returns A styled hint box with the given message.
 */
export declare const Hint: ({ message, opacity, setOpacity }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=Hint.d.ts.map