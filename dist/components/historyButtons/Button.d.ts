/// <reference types="react" />
import { LucideIcon } from 'lucide-react-native';
type Props = {
    onPress: () => void;
    disabled: boolean;
    Icon: LucideIcon;
};
/**
 * @description A reusable button component for the history buttons, rendering an icon with customizable styling and disabled state.
 *
 * @param props - An object containing:
 * - `onPress`: `() => void` – Callback triggered when the undo/redo-button is pressed.
 * - `disabled`: `boolean` – Indicates whether the undo/redo-button is disabled.
 * - `Icon`: `LucideIcon` – The Lucide icon component to render inside the button. Render the undo/redo-icon color with enabled/disabled styling.
 *
 * @returns A TouchableOpacity component styled as a button, containing the provided icon,
 * styled and disabled based on the availability of undo/redo actions.
 */
export declare const Button: ({ onPress, disabled, Icon }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map