import React from 'react';
type Props = {
    children: React.ReactNode;
};
/**
 * @description This provider renders the editor modal in fullscreen mode at the root level.
 * To use `expo-image-toolkit`, you must wrap your entire app in this provider.
 * It handles opening the editor after image selection or taking a photo, and closing it.
 *
 * @param children - Your app’s components.
 * @returns The wrapped children along with the editor modal.
 */
export declare const ExpoImageToolkitProvider: ({ children }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ExpoImageToolkitProvider.d.ts.map