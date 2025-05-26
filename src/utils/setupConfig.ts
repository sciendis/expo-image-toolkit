import { DefaultConfig } from '../constants';
import { DE } from '../locales';
import { Config, UserConfig } from '../types';

/**
 * @description Merges the `defaultConfig` and `userConfig` together, applying the user settings where provided.
 * If no user configuration is given, the default configuration is used.
 *
 * @param userConfig - An object containing user-specific configuration settings (optional).
 *
 * @returns Config – The final merged configuration object, combining default and user configurations.
 */
export const setupConfig = function (userConfig?: UserConfig) {
  // locales
  const locale = userConfig?.locale ?? DefaultConfig.locale;
  let labels = { ...DefaultConfig.labels };
  if (locale === 'de') labels = { ...DE };
  const mergedLabels = { ...labels, ...(userConfig?.labels || {}) };

  // colors
  const mergedColors = {
    ...DefaultConfig.colors,
    ...(userConfig?.colors || {}),
  };

  const config: Config = {
    ...DefaultConfig,
    ...userConfig,
    labels: mergedLabels,
    colors: mergedColors,
  };

  return config;
};
