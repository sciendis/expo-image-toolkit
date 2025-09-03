import { getScale } from './getScale';
const Sizes = {
    xxxs: 4,
    xxs: 4,
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 40,
    xxl: 50,
};
export const FontSizes = {
    /** 12px */ xs: getScale(Sizes.xs),
    /** 14px */ s: getScale(Sizes.s),
    /** 16px */ m: getScale(Sizes.m),
    /** 20px */ l: getScale(Sizes.l),
    /** 40px */ xl: getScale(Sizes.xl),
};
export const Spacing = {
    /** 4px */ xxs: getScale(Sizes.xxs),
    /** 12px */ xs: getScale(Sizes.xs),
    /** 14px */ s: getScale(Sizes.s),
    /** 16px */ m: getScale(Sizes.m),
    /** 20px */ l: getScale(Sizes.l),
    /** 40px */ xl: getScale(Sizes.xl),
    /** 50px */ xxl: getScale(Sizes.xxl),
};
//# sourceMappingURL=Metrics.js.map