import { EditorModes } from '../constants';
import { Config } from '../types';

export const getInitialEditor = function (config: Config) {
  const { defaultEditor: initialEditor, enableRotate, enableZoom } = config;
  let defaultEditor = initialEditor;
  if (defaultEditor === 'ROTATE' && !enableRotate) {
    defaultEditor = 'ZOOM';
  }
  if (defaultEditor === 'ZOOM' && !enableZoom) {
    defaultEditor = 'CROP';
  }

  return EditorModes[defaultEditor];
};
