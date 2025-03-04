import { EditorModes } from '@/constants';
import { Colors } from '@/styles';
import { Crop, RotateCcw, ZoomIn } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { Button } from './Button';

type Props = {
  activeEditor: EditorModes | null;
  switchEditor: (mode: EditorModes) => Promise<void>;
};

export const SwitchEditorButtons = function ({
  activeEditor,
  switchEditor,
}: Props) {
  return (
    <View style={stylesScreens.container}>
      <Button
        activeEditor={activeEditor}
        switchEditor={switchEditor}
        editorName={EditorModes.CROP}
      >
        <Crop color={Colors.white} />
      </Button>
      <Button
        activeEditor={activeEditor}
        switchEditor={switchEditor}
        editorName={EditorModes.ZOOM}
      >
        <ZoomIn color={Colors.white} />
      </Button>
      <Button
        activeEditor={activeEditor}
        switchEditor={switchEditor}
        editorName={EditorModes.ROTATE}
      >
        <RotateCcw color={Colors.white} />
      </Button>
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
