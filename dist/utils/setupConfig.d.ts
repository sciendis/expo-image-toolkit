import { Config, UserConfig } from '../types';
/**
 * @description Merges the `defaultConfig` and `userConfig` together, applying the user settings where provided.
 * If no user configuration is given, the default configuration is used.
 *
 * @param userConfig - An object containing user-specific configuration settings (optional).
 *
 * @returns Config – The final merged configuration object, combining default and user configurations.
 */
export declare const setupConfig: (userConfig?: UserConfig) => Config;
//# sourceMappingURL=setupConfig.d.ts.map