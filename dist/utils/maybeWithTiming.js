import { withTiming } from 'react-native-reanimated';
export const maybeWithTiming = (value, useTiming) => useTiming ? withTiming(value) : value; // I do not need to know the type of value
//# sourceMappingURL=maybeWithTiming.js.map