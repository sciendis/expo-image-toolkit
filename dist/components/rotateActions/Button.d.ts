import React from 'react';
type Props = {
    onPress: () => void;
    children: React.ReactNode;
    disabled?: boolean;
};
export declare const Button: ({ children, onPress, disabled }: Props) => React.JSX.Element;
export declare const styles: {
    item: {
        borderRadius: number;
        width: number;
        height: number;
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