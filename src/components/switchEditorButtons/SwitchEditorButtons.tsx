import { Crop, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { Button } from './Button';
import { RotateIcon } from './RotateIcon';

type Props = {
  activeEditor: EditorModes;
  switchEditor: (mode: EditorModes) => Promise<void>;
  isLoading: boolean;
};

/**
 * @description Renders buttons for switching between available editors: (Rotate/Zoom/Crop).
 * Each button activates its related editor when pressed.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 * - `switchEditor`: `(mode: EditorModes) => Promise<void>` – Function to handle switch editor modes.
 * - `isLoading`: `boolean` – Disables buttons while the image is processing.
 *
 * @returns A horizontal row of editor selection buttons.
 */
export const SwitchEditorButtons = function ({
  activeEditor,
  switchEditor,
  isLoading,
}: Props) {
  const {
    config: { enableRotate, enableZoom, colors },
  } = useImageEditorContext();

  return (
    <View style={stylesScreens.container}>
      {enableRotate && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.ROTATE}
          disabled={isLoading}
        >
          <RotateIcon />
        </Button>
      )}
      {enableZoom && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.ZOOM}
          disabled={isLoading}
        >
          <ZoomIn color={colors.switchEditorIcon} />
        </Button>
      )}
      {(enableRotate || enableZoom) && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.CROP}
          disabled={isLoading}
        >
          <Crop color={colors.switchEditorIcon} />
        </Button>
      )}
    </View>
  );
};

const stylesScreens = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    position: 'relative',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
