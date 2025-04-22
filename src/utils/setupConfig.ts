import { DefaultConfig } from '../constants';
import { DE } from '../locales';
import { Config, UserConfig } from '../types';

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
