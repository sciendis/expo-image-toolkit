import { useContext } from 'react';
import { ImageEditorContext } from './ImageEditorContext';

export const useImageEditorContext = () => {
  const context = useContext(ImageEditorContext);
  if (context === undefined)
    throw new Error(
      'useImageEditorContext must be used in ImageEditorProvider'
    );

  return context;
};
