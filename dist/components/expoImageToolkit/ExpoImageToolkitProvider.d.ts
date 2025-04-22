import React from 'react';
type Props = {
    children: React.ReactNode;
};
/**
 * @description This provider renders the editor modal in fullscreen mode at the root level.
 * To use expoImageToolkit, you must wrap your entire app in this provider.
 * It handles how the editor is opened after image selection or taking a photo, and how it's closed.
 *
 * @param children - Your app’s components.
 * @returns The wrapped children along with the editor modal.
 */
export declare const ExpoImageToolkitProvider: ({ children }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ExpoImageToolkitProvider.d.ts.map