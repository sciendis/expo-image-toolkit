import { useEffect, useState } from 'react';
import { useImageEditorContext } from './useImageEditorContext';

/**
 * @description when switching between editors and switch back to zoom editor, the previous zoomed value won't truly update due
 * the animated values. so I have to check the initial zoom value while switching to zoom editor with an extra useEffect.
 * @returns
 */
export const useSetInitialZoomAnimatedText = function () {
  const { zoom } = useImageEditorContext();

  const [initZoom, setInitZoom] = useState(1);

  useEffect(() => setInitZoom(zoom.get()), [zoom]);

  return initZoom;
};
