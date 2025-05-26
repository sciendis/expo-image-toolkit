import { LayoutChangeEvent } from 'react-native';
import { LayoutDimensions } from '../types';
type ReturnType = [LayoutDimensions, (event: LayoutChangeEvent) => void];
/**
 * @description Manages layout state updates for the zoom and rotate range bars.
 * @returns the current layout state and an onLayout callback to update the range bars' layout dynamically.
 */
export declare const useSetViewLayout: () => ReturnType;
export {};
//# sourceMappingURL=useSetViewLayout.d.ts.map