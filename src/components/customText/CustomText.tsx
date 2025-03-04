import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export const CustomText = function (props: TextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: 'Poppins_400Regular' }, props.style]}
    />
  );
};
