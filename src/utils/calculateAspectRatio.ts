import * as ImageManipulator from "expo-image-manipulator";
import { LayoutDimensions } from "../types";

type Props = {
  image: string;
  imageLayout: LayoutDimensions;
};

export const calculateAspectRatio = async function ({
  image,
  imageLayout,
}: Props) {
  const { width, height } = await ImageManipulator.manipulateAsync(image, [], {
    base64: false,
  });

  const imageAspectRatio = width / height;
  const viewAspectRatio = imageLayout.width / imageLayout.height;

  return { imageAspectRatio, viewAspectRatio, width, height };
};
