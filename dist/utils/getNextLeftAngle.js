/**
 * find the next angle based on the current angle when user clicks the rotate-left button
 * @param currentAngle - The current rotation angle in degrees
 * @returns The next angle rotated 90 degrees to the left
 */
export const getNextLeftAngle = (currentAngle) => {
    if (currentAngle <= -270)
        return -360;
    if (currentAngle <= -180)
        return -270;
    if (currentAngle <= -90)
        return -180;
    if (currentAngle <= 0)
        return -90;
    if (currentAngle <= 90)
        return 0;
    if (currentAngle <= 180)
        return 90;
    if (currentAngle <= 270)
        return 180;
    return 270;
};
//# sourceMappingURL=getNextLeftAngle.js.map