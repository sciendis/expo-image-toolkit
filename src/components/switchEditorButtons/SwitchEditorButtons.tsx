import { Crop, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
import { Button } from './Button';
import { RotateIcon } from './RotateIcon';

type Props = {
  activeEditor: EditorModes | null;
  switchEditor: (mode: EditorModes) => Promise<void>;
};

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
          <ZoomIn color={colors.switchEditorIcon} />
        </Button>
      )}
      {(enableRotate || enableZoom) && (
        <Button
          activeEditor={activeEditor}
          switchEditor={switchEditor}
          editorName={EditorModes.CROP}
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
