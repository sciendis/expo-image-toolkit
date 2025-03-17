# Expo Image Toolkit

**Expo Image Toolkit** is a custom image editing module designed for `Expo` and `React Native` projects. Unlike `expo-image-picker`, which restricts cropping to a fixed aspect ratio, this toolkit provides more flexible image editing options, allowing users to **crop**, **zoom**, **rotate**, and **flip** images freely.

## Features

- **Flexible Cropping**: Crop images in any aspect ratio, not limited to square crops.
- **Zoom on Focal Point**: Zoom into images using pinch and double-tap gestures, with smooth movement of the zoomed image.
- **Rotate in Standard Angles**: Rotate images by 90, 180, 270, or 360 degrees.
- **Flip Images**: Flip images vertically or horizontally.

## Upcoming Features

- **Free Rotation**: Rotate images at any angle, not just predefined angles.

## Installation

To install **Expo Image Toolkit**, run:

```sh
npm install @sciendis/expo-image-toolkit
```

## Configuration

You can configure the image editor with the following options:

| Option          | Type         | Default    | Description                                       |
| --------------- | ------------ | ---------- | ------------------------------------------------- |
| `locale`        | `'en'\|'de'` | `'en'`     | Language option                                   |
| `maxZoom`       | number       | `10`       | Maximum zoom level allowed.                       |
| `enableRotate`  | boolean      | true       | Rotate editor can be disabled                     |
| `enableZoom`    | boolean      | true       | Zoom editor can be disabled                       |
| `defaultEditor` | string       | `'ROTATE'` | The initial editor when opening the image editor. |
| `labels`        | object       | `{}`       | Override default texts like "Set" and "Cancel".   |
| `colors`        | object       | `{}`       | Override default colors like "background".        |

## Usage Example

### Basic Usage

```tsx
import { useExpoImageToolkit } from '@sciendis/expo-image-toolkit';
import { Button, Image } from 'react-native';

const SelectImageComponent = function () {
  const { ImageEditorModal, pickImage, image, takePhoto, aspectRatio } =
    useExpoImageToolkit();

  return (
    <>
      <Button title="Select Image" onPress={pickImage} />
      <Button title="Take Photo" onPress={takePhoto} />
      <View style={[styles.imageContainer, { aspectRatio }]}>
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode={isDefault ? 'cover' : 'contain'}
        />
      </View>
      <ImageEditorModal />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    width: '100%',
    maxHeight: '50%',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#333333',
    shadowOpacity: 0.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
```

### Explanation

- `ImageEditorModal`: The modal that provides image editing functionality.
- `pickImage`: Opens the image picker to select an image.
- `takePhoto`: Opens the camera to capture an image.
- `image`: The processed image after cropping/rotating.
- `aspectRatio`: If you need to display the cropped image in its exact cropped dimensions, use **aspectRatio** to ensure the image appears as expected while maintaining its proportions.
