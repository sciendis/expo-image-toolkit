import { EN } from '../locales';
import { Colors } from '../styles';
import { Config } from '../types';

export const DefaultConfig: Config = {
  locale: 'en',
  maxZoom: 10,
  labels: EN,
  defaultEditor: 'ROTATE',
  enableZoom: true,
  enableRotate: true,
  colors: Colors,
} as const;
