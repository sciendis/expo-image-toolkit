/// <reference types="react" />
type Props = {
    visible: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    alertText: string;
    submitLabel: string;
    cancelLabel: string;
};
/**
 * @description This is a custom alert built for ImageEditor.
 *
 * @param props - An object containing:
 * - `visible`: `boolean` – Check if the alert should be shown.
 * - `onSubmit`: `() => void` – Callback returning the user’s submit the alert.
 * - `onCancel`: `() => void` – Callback returning the user’s cancel the alert.
 *
 * @returns A Dialog animated alert with YES and NO buttons.
 */
export declare const Alert: ({ visible, onSubmit, onCancel, alertText, submitLabel, cancelLabel, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=Alert.d.ts.map