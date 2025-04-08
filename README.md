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

| Option            | Type         | Default               | Description                                                                            |
| ----------------- | ------------ | --------------------- | -------------------------------------------------------------------------------------- |
| `locale`          | `'en'\|'de'` | `'en'`                | Language option                                                                        |
| `maxZoom`         | number       | `10`                  | Maximum zoom level allowed.                                                            |
| `enableRotate`    | boolean      | true                  | Rotate editor can be disabled                                                          |
| `enableZoom`      | boolean      | true                  | Zoom editor can be disabled                                                            |
| `defaultEditor`   | string       | `'ROTATE'`            | The initial editor when opening the image editor.                                      |
| `labels`          | object       | `{}`                  | Override default texts like "Set" and "Cancel".                                        |
| `colors`          | object       | `{}`                  | Override default colors like "background".                                             |
| `onCancel`        | function     | () => void            | Custom handler for the cancel event.                                                   |
| `onSubmit`        | function     | (uri: string) => void | Custom handler for the submit event. Receives the edited image URI as an argument.     |
| `acceptedFormats` | string[]     | []                    | Specifies accepted image formats for the pickImage function (e.g., [".jpg", ".jpeg"]). |

### Notes

> The onSubmit callback provides the URI of the edited image, which is also available as editedImageUri from the hook for external usage if needed.

## Usage Example

### Setup

To use the toolkit, wrap your app with the ExpoImageToolkitProvider at the root level to manage the full-screen image editor state:

```tsx
import { ExpoImageToolkitProvider } from "@sciendis/expo-image-toolkit";

export default function App() {
  return (
    <ExpoImageToolkitProvider>
      {/* Your app components */}
    </ExpoImageToolkitProvider>
  );
}
```

### Basic Usage

Here’s an example of using the toolkit in a component:

```tsx
import { useExpoImageToolkit } from "@sciendis/expo-image-toolkit";
import { Button, Image, StyleSheet, View } from "react-native";

const SelectImageComponent = function () {
  const { pickImage, takePhoto, editedImageUri, aspectRatio, width, height } =
    useExpoImageToolkit({
      locale: "de",
      onSubmit: (uri) => console.log("Edited image URI:", uri),
    });

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { width, height }]}>
        <Image
          style={styles.image}
          source={{ uri: editedImageUri }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Select Image" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    width: "100%",
    maxHeight: "50%",
    borderColor: "#cccccc",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333333",
    shadowOpacity: 0.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
});
```

### Explanation

- `ExpoImageToolkitProvider`: Must wrap your app or component tree to render the **full-screen** image editor at the root level.
- `pickImage`: Opens the image picker to select an image.
- `takePhoto`: Opens the camera to capture an image.
- `editedImageUri`: The URI of the processed image after editing. Available for external use if needed, though it’s also passed to `onSubmit`.
- `aspectRatio`, `width`, `height`: Use these to display the cropped image with its exact dimensions while maintaining proportions.
