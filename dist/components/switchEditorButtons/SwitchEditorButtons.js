import { Crop, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale } from '../../utils';
import { Button } from './Button';
import { RotateIcon } from './RotateIcon';
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
export const SwitchEditorButtons = function ({ activeEditor, switchEditor, }) {
    const { config: { enableRotate, enableZoom, colors }, } = useImageEditorContext();
    return (<View style={stylesScreens.container}>
      {enableRotate && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ROTATE}>
          <RotateIcon />
        </Button>)}
      {enableZoom && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ZOOM}>
          <ZoomIn size={calculateFontScale(24)} color={colors.switchEditorIcon}/>
        </Button>)}
      {(enableRotate || enableZoom) && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.CROP}>
          <Crop size={calculateFontScale(24)} color={colors.switchEditorIcon}/>
        </Button>)}
    </View>);
};
const stylesScreens = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 2,
        position: 'relative',
        width: '100%',
        justifyContent: 'space-evenly',
        marginBottom: 20,
        marginTop: 10,
    },
});
//# sourceMappingURL=SwitchEditorButtons.js.map