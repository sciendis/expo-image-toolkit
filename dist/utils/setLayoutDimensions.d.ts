import { Dispatch, SetStateAction } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { LayoutDimensions } from '../types';
type SetLayout = Dispatch<SetStateAction<LayoutDimensions>>;
export declare const setLayoutDimensions: (setLayout: SetLayout) => (event: LayoutChangeEvent) => void;
export {};
//# sourceMappingURL=setLayoutDimensions.d.ts.map