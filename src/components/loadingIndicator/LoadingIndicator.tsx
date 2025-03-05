import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { Colors } from "../../styles";

type Props = {
  opacity?: Animated.Value;
};

export const LoadingIndicator = ({ opacity }: Props) => (
  <Animated.View style={[styles.contianer, { opacity }]}>
    <ActivityIndicator size="large" color={Colors.white} />
  </Animated.View>
);

const styles = StyleSheet.create({
  contianer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
