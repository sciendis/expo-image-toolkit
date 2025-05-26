import { EN } from '../locales';
import { Colors } from '../styles';
import { Config } from '../types';

/**
 * @description The default config of the `ImageEditor`. By default the English labels will load.
 */
export const DefaultConfig: Config = {
  locale: 'en',
  maxZoom: 10,
  labels: EN,
  defaultEditor: 'ROTATE',
  enableZoom: true,
  enableRotate: true,
  colors: Colors,
} as const;
