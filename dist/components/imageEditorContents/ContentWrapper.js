import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Colors } from "../../styles";
export const ContentWrapper = function ({ opacity, children }) {
    return (<Animated.View style={[styles.container, { opacity }]}>
      {children}
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        flexDirection: "row",
    },
});
//# sourceMappingURL=ContentWrapper.js.map