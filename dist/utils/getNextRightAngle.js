/**
 * find the next angle based on the current angle when user clicks the rotate-right button
 * @param currentAngle - The current rotation angle in degrees
 * @returns The next angle rotated 90 degrees to the right
 */
export const getNextRightAngle = (currentAngle) => {
    if (currentAngle <= -360)
        return -270;
    if (currentAngle <= -270)
        return -180;
    if (currentAngle <= -180)
        return -90;
    if (currentAngle <= -90)
        return 0;
    if (currentAngle <= 0)
        return 90;
    if (currentAngle <= 90)
        return 180;
    if (currentAngle <= 180)
        return 270;
    return 360;
};
//# sourceMappingURL=getNextRightAngle.js.map