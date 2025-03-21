type Props = {
    centerX: number;
    centerY: number;
};
export declare const useImageAnimatedTransform: ({ centerX, centerY, }: Props) => {
    transform: ({
        translateX: number;
        translateY?: undefined;
        scale?: undefined;
        rotateX?: undefined;
        rotateY?: undefined;
        rotate?: undefined;
    } | {
        translateY: number;
        translateX?: undefined;
        scale?: undefined;
        rotateX?: undefined;
        rotateY?: undefined;
        rotate?: undefined;
    } | {
        scale: number;
        translateX?: undefined;
        translateY?: undefined;
        rotateX?: undefined;
        rotateY?: undefined;
        rotate?: undefined;
    } | {
        rotateX: string;
        translateX?: undefined;
        translateY?: undefined;
        scale?: undefined;
        rotateY?: undefined;
        rotate?: undefined;
    } | {
        rotateY: string;
        translateX?: undefined;
        translateY?: undefined;
        scale?: undefined;
        rotateX?: undefined;
        rotate?: undefined;
    } | {
        rotate: string;
        translateX?: undefined;
        translateY?: undefined;
        scale?: undefined;
        rotateX?: undefined;
        rotateY?: undefined;
    })[];
};
export {};
//# sourceMappingURL=useImageAnimatedTransform.d.ts.map