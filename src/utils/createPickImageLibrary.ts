import * as ImagePicker from 'expo-image-picker';

type Props = {
  acceptedFormats?: string[];
  onImageSelected: (uri: string) => void;
  quality?: number;
};

/**
 * @description Creates a function to open the device's image library and select an image.
 * Handles optional format filtering and calls a callback with the image URI.
 *
 * @param props - An object containing:
 * - `acceptedFormats`: `string[]` (optional) – Array of accepted image file extensions (e.g., ['.jpg', '.png']).
 * - `onImageSelected`: `(uri: string) => void` – Callback triggered with the URI of the selected image.
 * - `quality`: `number` – Quality of the image to be selected (0 to 1).
 *
 * @returns A function that launches the image picker and returns the result.
 */
export const createPickImageLibrary = function ({
  acceptedFormats,
  onImageSelected,
  quality = 1,
}: Props) {
  return async function pickImageLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: quality,
    });

    if (result.canceled) return result;

    const uri = result.assets[0].uri;

    if (acceptedFormats && acceptedFormats.length) {
      const isAccepted = acceptedFormats.some((format) => uri.endsWith(format));
      if (!isAccepted) return result;
    }

    onImageSelected(uri);

    return result;
  };
};
