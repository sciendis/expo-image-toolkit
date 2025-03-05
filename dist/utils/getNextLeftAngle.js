import { getNormalizedAngle } from './getNormalizedAngle';
export const getNextLeftAngle = (currentAngle) => {
    const normalizedAngle = getNormalizedAngle(currentAngle);
    if (currentAngle === 360 && normalizedAngle === 0)
        return 270;
    if (normalizedAngle <= 90)
        return 0;
    if (normalizedAngle <= 180)
        return 90;
    if (normalizedAngle <= 270)
        return 180;
    return 270;
};
//# sourceMappingURL=getNextLeftAngle.js.map