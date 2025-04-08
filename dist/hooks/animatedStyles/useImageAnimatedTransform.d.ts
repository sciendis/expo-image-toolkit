type Props = {
    centerX: number;
    centerY: number;
};
export declare const useImageAnimatedTransform: ({ centerX, centerY, }: Props) => {
    animatedStyleContainer: {
        transform: {
            rotate: string;
        }[];
    };
    animatedStyleImage: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            rotateX: string;
            translateX?: undefined;
            translateY?: undefined;
            scale?: undefined;
            rotateY?: undefined;
        } | {
            rotateY: string;
            translateX?: undefined;
            translateY?: undefined;
            scale?: undefined;
            rotateX?: undefined;
        })[];
    };
};
export {};
//# sourceMappingURL=useImageAnimatedTransform.d.ts.map