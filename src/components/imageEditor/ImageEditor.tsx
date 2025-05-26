import React from 'react';
import { OnSaveProps, UserConfig } from '../../types';
import { ImageEditorContainer } from './ImageEditorContainer';
import { ImageEditorProvider } from './ImageEditorProvider';

export type ImageEditorProps = {
  image: string | null;
  onCancel: () => void;
  onCrop: (props?: OnSaveProps) => void;
  userConfig?: UserConfig;
};

/**
 * @description This component renders first inside the custom modal after an image is selected.
 *
 * @param {object} ImageEditorProps - An object containing:
 * - `image`: `string` – The original URI of the selected image.
 * - `onCrop`: `() => void` – The function to call when the finish button is pressed.
 * - `onCancel`: `() => void` – The function to call when the cancel button is pressed.
 * - `userConfig`: Optional user configuration for the toolkit.
 *
 * @returns The image editor component or null if no image is selected.
 */
export const ImageEditor = function ({
  image,
  onCrop,
  onCancel,
  userConfig,
}: ImageEditorProps) {
  if (!image) return <></>;
  return (
    <ImageEditorProvider image={image} userConfig={userConfig}>
      <ImageEditorContainer onCancel={onCancel} onCrop={onCrop} />
    </ImageEditorProvider>
  );
};
