import * as ImagePicker from 'expo-image-picker';

type Props = {
  onImageSelected: (uri: string) => void;
};

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
