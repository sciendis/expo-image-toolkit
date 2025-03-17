import Svg, { Path } from 'react-native-svg';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
export const RotateIcon = function () {
    const { config: { colors }, } = useImageEditorContext();
    return (<Svg viewBox="0 0 512 512" fill={colors.switchEditorIcon} style={{ transform: [{ scale: 0.5 }] }}>
      <Path d="M85.9 301.2c-2-7.6-8.6-13.2-16.5-13.2c-10 0-17.6 8.9-15.2 18.6C76.8 397 158.6 464 256 464c59.8 0 113.7-25.3 151.7-65.7L433.4 424c5.1 5.1 12.1 8 19.3 8c15.1 0 27.3-12.2 27.3-27.3L480 304c0-8.8-7.2-16-16-16l-100.7 0c-15.1 0-27.3 12.2-27.3 27.3c0 7.2 2.9 14.2 8 19.3l41 41C352.9 410.3 307 432 256 432c-81.6 0-150.2-55.5-170.1-130.8zM127 136.3C159.1 101.7 205 80 256 80c81.6 0 150.2 55.5 170.1 130.8c2 7.6 8.6 13.2 16.5 13.2c10 0 17.6-8.9 15.2-18.6C435.2 115 353.4 48 256 48c-59.8 0-113.7 25.3-151.7 65.7L78.6 88c-5.1-5.1-12.1-8-19.3-8C44.2 80 32 92.2 32 107.3L32 208c0 8.8 7.2 16 16 16l100.7 0c15.1 0 27.3-12.2 27.3-27.3c0-7.2-2.9-14.2-8-19.3l-41-41zM64 192l0-73.4L137.4 192 64 192zM448 320l0 73.4L374.6 320l73.4 0z"/>
    </Svg>);
};
//# sourceMappingURL=RotateIcon.js.map