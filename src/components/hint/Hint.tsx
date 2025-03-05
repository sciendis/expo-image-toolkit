import { StyleSheet, View } from "react-native";
import { Colors } from "../../styles";
import { CustomText } from "../customText";

type Props = {
  message: string;
};

export const Hint = function ({ message }: Props) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.message}>{message}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "5%",
    right: "5%",
    top: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 10,
  },
  message: {
    fontSize: 14,
    color: Colors.white,
    textAlign: "auto",
    backgroundColor: Colors.lightGrayLessTransparent,
    borderRadius: 5,
    overflow: "hidden",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
