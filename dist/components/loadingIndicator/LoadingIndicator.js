import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { Colors } from "../../styles";
export const LoadingIndicator = ({ opacity }) => (<Animated.View style={[styles.contianer, { opacity }]}>
    <ActivityIndicator size="large" color={Colors.white}/>
  </Animated.View>);
const styles = StyleSheet.create({
    contianer: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { backgroundColor: Colors.black, justifyContent: "center", alignItems: "center", zIndex: 1000 }),
});
//# sourceMappingURL=LoadingIndicator.js.map