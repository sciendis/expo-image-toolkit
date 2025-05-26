import { Redo, Undo } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { Button } from './Button';

/**
 * @description Renders Undo and Redo buttons for the image editor, allowing users to navigate through the history of editor actions.
 *
 * @returns A View component containing Undo and Redo buttons, positioned below the cancel button in the top-left corner using absolute positioning.
 */
export const HistoryButtons = function () {
  const { undo, redo, undoStack, redoStack } = useImageEditorContext();

  return (
    <View style={styles.container}>
      <Button Icon={Undo} onPress={undo} disabled={undoStack.length === 0} />
      <Button Icon={Redo} onPress={redo} disabled={redoStack.length === 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    top: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
