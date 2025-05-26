/**
 * Restricts a value to stay within a specified range.
 * Specifically used for limiting movement and scaling in zoom gesture handlers.
 *
 * @param {number} val - The value to be clamped.
 * @param {number} min - The minimum allowable value.
 * @param {number} max - The maximum allowable value.
 * @returns {number} The clamped value.
 */
export const clamp = function (val, min, max) {
    'worklet';
    return Math.min(Math.max(val, min), max);
};
//# sourceMappingURL=clamp.js.map