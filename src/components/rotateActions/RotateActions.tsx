import React from 'react';
import { RotateButtons } from './RotateButtons';
import { RotateRange } from './RotateRange';

/**
 * @description Displays Rotate-Left/Right and Flip-X/Y buttons,
 * and also shows the current angle of the rotated image.
 *
 */
export const RotateActions = function () {
  return (
    <>
      <RotateButtons />
      <RotateRange />
    </>
  );
};
