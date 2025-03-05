import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../styles";

export const ExtraBorders = function () {
  return (
    <>
      <View style={styles.verticalLines} />
      <View style={styles.horizontalLines} />
    </>
  );
};

const styles = StyleSheet.create({
  verticalLines: {
    position: "absolute",
    left: "33.33%",
    top: 0,
    width: "33%",
    height: "100%",
    backgroundColor: "transparent",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: Colors.lightGray,
    borderRightColor: Colors.lightGray,
  },
  horizontalLines: {
    position: "absolute",
    left: 0,
    top: "33.33%",
    width: "100%",
    height: "33%",
    backgroundColor: "transparent",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: Colors.lightGray,
    borderBottomColor: Colors.lightGray,
  },
});
