import { DefaultLayoutState } from "@/constants";
import { useMoveRotateRangeBar } from "@/hooks";
import { Colors } from "@/styles";
import { LayoutDimensions } from "@/types";
import { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, TextInput, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(TextInput);

export const RotateRange = function () {
  const [rangeLayout, setRangeLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);

  const currentX = useSharedValue(0);

  const onRangeLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      if (
        rangeLayout.x !== layout.x ||
        rangeLayout.y !== layout.y ||
        rangeLayout.width !== layout.width ||
        rangeLayout.height !== layout.height
      ) {
        setRangeLayout(layout);
      }
    },
    [rangeLayout]
  );

  const { animatedTextProps, currentAngle } = useMoveRotateRangeBar({
    currentX,
    rangeLayout,
  });

  return (
    <View style={styles.container} onLayout={onRangeLayout}>
      <AnimatedText
        animatedProps={animatedTextProps}
        style={styles.text}
        value={`${currentAngle}°`}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    bottom: 10,
    left: 0,
  },
  text: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.lightGray,
    borderRadius: 100,
    overflow: "hidden",
    width: 40,
    height: 40,
    textAlign: "center",
    color: Colors.black,
  },
});
