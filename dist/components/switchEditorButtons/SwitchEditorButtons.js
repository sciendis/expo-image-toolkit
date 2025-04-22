import { Crop, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { Button } from './Button';
import { RotateIcon } from './RotateIcon';
export const SwitchEditorButtons = function ({ activeEditor, switchEditor, isLoading, }) {
    const { config: { enableRotate, enableZoom, colors }, } = useImageEditorContext();
    return (<View style={stylesScreens.container}>
      {enableRotate && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ROTATE} disabled={isLoading}>
          <RotateIcon />
        </Button>)}
      {enableZoom && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ZOOM} disabled={isLoading}>
          <ZoomIn color={colors.switchEditorIcon}/>
        </Button>)}
      {(enableRotate || enableZoom) && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.CROP} disabled={isLoading}>
          <Crop color={colors.switchEditorIcon}/>
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
    },
});
//# sourceMappingURL=SwitchEditorButtons.js.map