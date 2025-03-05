const isSignificantChange = (oldLayout, newLayout) => {
    const offset = 2; // 2 pixel offset
    return (Math.abs(oldLayout.width - newLayout.width) > offset ||
        Math.abs(oldLayout.height - newLayout.height) > offset ||
        Math.abs(oldLayout.x - newLayout.x) > offset ||
        Math.abs(oldLayout.y - newLayout.y) > offset);
};
export const setLayoutDimensions = function (setLayout) {
    return function (event) {
        const newLayout = event.nativeEvent.layout;
        setLayout((oldLayout) => {
            if (!isSignificantChange(oldLayout, newLayout))
                return oldLayout;
            return newLayout;
        });
    };
};
//# sourceMappingURL=setLayoutDimensions.js.map