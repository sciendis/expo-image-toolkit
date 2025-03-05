export const clamp = function (val, min, max) {
    'worklet';
    return Math.min(Math.max(val, min), max);
};
//# sourceMappingURL=clamp.js.map