import { DefaultConfig } from '../constants';
import { DE } from '../locales';
/**
 * @description Merges the `defaultConfig` and `userConfig` together, applying the user settings where provided.
 * If no user configuration is given, the default configuration is used.
 *
 * @param userConfig - An object containing user-specific configuration settings (optional).
 *
 * @returns Config – The final merged configuration object, combining default and user configurations.
 */
export const setupConfig = function (userConfig) {
    var _a;
    // locales
    const locale = (_a = userConfig === null || userConfig === void 0 ? void 0 : userConfig.locale) !== null && _a !== void 0 ? _a : DefaultConfig.locale;
    let labels = Object.assign({}, DefaultConfig.labels);
    if (locale === 'de')
        labels = Object.assign({}, DE);
    const mergedLabels = Object.assign(Object.assign({}, labels), ((userConfig === null || userConfig === void 0 ? void 0 : userConfig.labels) || {}));
    // colors
    const mergedColors = Object.assign(Object.assign({}, DefaultConfig.colors), ((userConfig === null || userConfig === void 0 ? void 0 : userConfig.colors) || {}));
    const config = Object.assign(Object.assign(Object.assign({}, DefaultConfig), userConfig), { labels: mergedLabels, colors: mergedColors });
    return config;
};
//# sourceMappingURL=setupConfig.js.map