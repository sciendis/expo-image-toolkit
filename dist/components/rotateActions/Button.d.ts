import React from "react";
type Props = {
    onPress: () => void;
    children: React.ReactNode;
};
export declare const Button: ({ children, onPress }: Props) => React.JSX.Element;
export declare const styles: {
    item: {
        borderRadius: number;
        width: number;
        height: number;
        backgroundColor: "#fff";
        justifyContent: "center";
        alignItems: "center";
    };
    icon: {
        resizeMode: "contain";
        width: "100%";
        height: "100%";
    };
};
export {};
//# sourceMappingURL=Button.d.ts.map