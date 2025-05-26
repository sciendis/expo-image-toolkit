import { EditorModes } from '../constants';
import { Config } from '../types';

/**
 * @description Finds the initial editor that should be displayed by verifying `defaultEditor` from `defaultConfig` and `userConfig`,
 * and checks if that editor is disabled by `userConfig`.
 * @param config - The combined configuration object from default and user settings.
 * @returns The valid initial editor mode to be displayed.
 */
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
