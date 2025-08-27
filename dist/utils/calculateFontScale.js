import { Dimensions } from 'react-native';
import { BASE_FONT_SCALE } from '../constants';
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export const calculateFontScale = function (baseFontSize = 14) {
    'worklet';
    return (baseFontSize * Math.min(screenWidth, screenHeight)) / BASE_FONT_SCALE;
};
//# sourceMappingURL=calculateFontScale.js.map