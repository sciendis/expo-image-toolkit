import { Dimensions } from 'react-native';
import { clamp } from '../utils/clamp';
const BASE_SCALE = 430; // iphone 15 pro max screen width
const MIN_SCALE = 0.9;
const MAX_SCALE = 1.35;
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export const getScale = function (size) {
    'worklet';
    const scale = Math.min(screenWidth, screenHeight) / BASE_SCALE;
    const scaleFactor = clamp(scale, MIN_SCALE, MAX_SCALE);
    return Math.round(size * scaleFactor);
};
//# sourceMappingURL=getScale.js.map