import { withTiming } from 'react-native-reanimated';

export const maybeWithTiming = <T>(value: T, useTiming: boolean): T =>
  useTiming ? withTiming(value as never) : value; // I do not need to know the type of value
