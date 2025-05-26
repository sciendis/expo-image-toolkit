import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { DefaultLayoutState } from '../constants';
import { LayoutDimensions } from '../types';

type ReturnType = [LayoutDimensions, (event: LayoutChangeEvent) => void];

/**
 * @description Manages layout state updates for the zoom and rotate range bars.
 * @returns the current layout state and an onLayout callback to update the range bars' layout dynamically.
 */
export const useSetViewLayout = function (): ReturnType {
  const [viewLayout, setViewLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      if (
        viewLayout.x !== layout.x ||
        viewLayout.y !== layout.y ||
        viewLayout.width !== layout.width ||
        viewLayout.height !== layout.height
      ) {
        setViewLayout(layout);
      }
    },
    [viewLayout]
  );

  return [viewLayout, onLayout];
};
