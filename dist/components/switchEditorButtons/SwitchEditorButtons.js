import { Crop, RotateCcw, ZoomIn } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { EditorModes } from "../../constants";
import { Colors } from "../../styles";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";
import { Button } from "./Button";
export const SwitchEditorButtons = function ({ activeEditor, switchEditor, }) {
    const { config } = useImageEditorContext();
    return (<View style={stylesScreens.container}>
      <Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.CROP}>
        <Crop color={Colors.white}/>
      </Button>
      {config.enableZoom && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ZOOM}>
          <ZoomIn color={Colors.white}/>
        </Button>)}
      {config.enableRotate && (<Button activeEditor={activeEditor} switchEditor={switchEditor} editorName={EditorModes.ROTATE}>
          <RotateCcw color={Colors.white}/>
        </Button>)}
    </View>);
};
const stylesScreens = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 2,
        position: "relative",
        width: "100%",
        justifyContent: "space-evenly",
        marginBottom: 20,
    },
});
//# sourceMappingURL=SwitchEditorButtons.js.map