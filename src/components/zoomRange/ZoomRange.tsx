import { DefaultLayoutState } from "@/constants";
import { useMoveZoomRangeBar } from "@/hooks";
import { Colors } from "@/styles";
import { LayoutDimensions } from "@/types";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, TextInput, View } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(TextInput);

export const ZoomRange = function () {
  const [rangeLayout, setRangeLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);

  const currentX = useSharedValue(1);

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

  const { moveRangeBar, animatedTextProps, styledRangeAnimated, currentZoom } =
    useMoveZoomRangeBar({ currentX, rangeLayout });

  return (
    <View style={styles.container} onLayout={onRangeLayout}>
      <GestureHandlerRootView>
        <GestureDetector gesture={moveRangeBar}>
          <Animated.View style={[styles.pointer, styledRangeAnimated]}>
            <AnimatedText
              animatedProps={animatedTextProps}
              style={styles.text}
              value={`${currentZoom.toFixed(2)}x`}
              editable={false}
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 20,
    backgroundColor: Colors.secondary,
    position: "absolute",
    bottom: "5%",
    left: "5%",
    zIndex: 500,
    borderRadius: 20,
  },
  pointer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.lightGray,
    zIndex: 50,
  },
  text: {
    position: "absolute",
    bottom: 25,
    left: -25 + 10, // -35 because of text box width: 70 / 2. 10 is because of the pointer width: 20 / 2
    backgroundColor: Colors.lightGray,
    borderRadius: 100,
    overflow: "hidden",
    padding: 4,
    width: 50,
    aspectRatio: 1,
    textAlign: "center",
  },
});
