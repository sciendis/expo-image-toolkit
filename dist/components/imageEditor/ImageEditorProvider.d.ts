import { ReactNode } from 'react';
import { UserConfig } from '../../types';
type Props = {
    image: string;
    userConfig?: UserConfig;
    children: ReactNode;
};
/**
 * @description This provider is not related to `ExpoImageToolkitProvider`.
 * While `ExpoImageToolkitProvider` is used to wrap the app at root level,
 * `ImageEditorProvider` handles all internal state of the image editor, such as crop frame scale/position, rotation, flip, and zoom.
 *
 * @param props - An object containing:
 * - `image`: `string` – The initial/original source of the image to be edited.
 * - `userConfig`: `UserConfig` (optional) – Optional user configuration for editor settings.
 * - `children`: `ReactNode` – The nested components that render the active editor container.
 *
 * @returns React provider for sharing image editor state via context.
 */
export declare const ImageEditorProvider: ({ image: initialImage, userConfig, children, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ImageEditorProvider.d.ts.map