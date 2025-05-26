/**
 * Check if rotate value is ±90/±270. This validation is useful because in all other cases,
 * there are no critical changes needed for the calculation.
 * But if the image has been rotated by ±90/±270, a new image has to be generated
 * because the width/height will swap. This is also useful for the flip action,
 * because when the rotation is ±90/±270, the displayed X/Y-axes are actually different from the actual image.
 *
 * @param angle - The rotation angle to check.
 * @returns `true` if the angle is ±90 or ±270, otherwise `false`.
 */
export declare const isRotate90: (angle: number) => boolean;
//# sourceMappingURL=isRotate90.d.ts.map