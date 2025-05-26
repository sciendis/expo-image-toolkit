/// <reference types="react" />
/**
 * @description Renders Rotate-Left/Right buttons.
 * Also includes FlipButtons between them.
 * Handles total rotation logic and enables/disables buttons at ±360.
 * @returns Rotate Buttons and Flip Buttons.
 */
export declare const RotateButtons: () => import("react").JSX.Element;
export declare const styles: {
    container: {
        flexDirection: "row";
        justifyContent: "space-around";
        paddingHorizontal: number;
        position: "absolute";
        bottom: number;
        left: number;
        width: "100%";
        flexWrap: "wrap";
    };
};
//# sourceMappingURL=RotateButtons.d.ts.map