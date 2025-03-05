import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../styles";
export const Button = function ({ children, onPress }) {
    return (<TouchableOpacity style={styles.item} onPress={onPress}>
      {children}
    </TouchableOpacity>);
};
export const styles = StyleSheet.create({
    item: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
    },
});
//# sourceMappingURL=Button.js.map