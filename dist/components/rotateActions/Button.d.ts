import React from 'react';
type Props = {
    onPress: () => void;
    children: React.ReactNode;
    disabled?: boolean;
};
/**
 * @description The main Button component for Rotate/Flip actions.
 * It accepts any ReactNode as children (usually an icon).
 *
 * @param props - An object containing:
 * - `children`: `React.ReactNode` – Accepts any ReactNode, but typically used for Rotate/Flip icons.
 * - `onPress`: `() => void` – Callback triggered when the button is pressed.
 * - `disabled`: `boolean` (optional) – If true, disables the button and applies a deactivated background style.
 *
 */
export declare const Button: ({ children, onPress, disabled }: Props) => React.JSX.Element;
export declare const styles: {
    item: {
        borderRadius: number;
        width: number;
        height: number;
        justifyContent: "center";
        alignItems: "center";
    };
    icon: {
        resizeMode: "contain";
        width: "100%";
        height: "100%";
    };
};
export {};
//# sourceMappingURL=Button.d.ts.map