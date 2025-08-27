import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale } from '../../utils';
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
export const Button = function ({ onPress, disabled, Icon }) {
    const { config: { colors }, } = useImageEditorContext();
    return (<TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, { backgroundColor: colors.headerTitleBg }]}>
      <Icon size={calculateFontScale(20)} color={disabled ? colors.historyDisabled : colors.historyEnabled}/>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    button: {
        padding: calculateFontScale(4),
        borderRadius: 100,
        opacity: 0.8,
    },
});
//# sourceMappingURL=Button.js.map