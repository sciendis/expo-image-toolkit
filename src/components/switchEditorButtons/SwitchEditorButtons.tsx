import { Crop, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { FontSizes, Spacing } from '../../styles';
import { Button } from './Button';
import { RotateIcon } from './RotateIcon';

type Props = {
  activeEditor: EditorModes;
  switchEditor: (mode: EditorModes) => Promise<void>;
};

/**
 * @description Renders buttons for switching between available editors: (Rotate/Zoom/Crop).
 * Each button activates its related editor when pressed.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 * - `switchEditor`: `(mode: EditorModes) => Promise<void>` – Function to handle switch editor modes.
 *
 * @returns A horizontal row of editor selection buttons.
 */
export const SwitchEditorButtons = function ({
  activeEditor,
  switchEditor,
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
        >
          <RotateIcon />
        </Button>
      )}
      {enableZoom && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.ZOOM}
        >
          <ZoomIn size={FontSizes.l} color={colors.switchEditorIcon} />
        </Button>
      )}
      {(enableRotate || enableZoom) && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.CROP}
        >
          <Crop size={FontSizes.l} color={colors.switchEditorIcon} />
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
    marginBottom: Spacing.xxs,
  },
});
