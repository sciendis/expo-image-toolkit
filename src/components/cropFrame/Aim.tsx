import { StyleSheet, View } from "react-native";
import { Colors } from "../../styles";

export const Aim = function () {
  return (
    <View style={styles.container}>
      <View style={[styles.aim, styles.verticalLine]} />
      <View style={[styles.aim, styles.horizontalLine]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  aim: {
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  verticalLine: {
    width: 25,
    position: "absolute",
  },
  horizontalLine: {
    height: 25,
  },
});
