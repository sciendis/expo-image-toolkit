import * as ImagePicker from 'expo-image-picker';

type Props = {
  onImageSelected: (uri: string) => void;
};

/**
 * @description Creates a function to open the device's camera and capture a photo.
 * If permission is granted, launches the camera and passes the image URI to a callback.
 *
 * @param props - An object containing:
 * - `onImageSelected`: `(uri: string) => void` – Callback triggered with the URI of the captured image.
 *
 * @returns A function that requests camera permission and launches the camera.
 */
export const createTakePhotoCamera = function ({ onImageSelected }: Props) {
  return async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return result;

    onImageSelected(result.assets[0].uri);

    return result;
  };
};
