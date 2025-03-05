import React from 'react';
import { Text as RNText } from 'react-native';
export const CustomText = function (props) {
    return (<RNText {...props} style={[{ fontFamily: 'Poppins_400Regular' }, props.style]}/>);
};
//# sourceMappingURL=CustomText.js.map