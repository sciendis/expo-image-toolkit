import { useEffect, useState } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';

export const useSetInitialZoomAnimatedText = function () {
  const { zoom } = useImageEditorContext();

  const [initZoom, setInitZoom] = useState(1);

  useEffect(() => setInitZoom(zoom.get()), [zoom]);

  return initZoom;
};
