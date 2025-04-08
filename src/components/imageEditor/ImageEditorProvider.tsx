import { ReactNode, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import {
  DefaultConfig,
  DefaultDimensionState,
  DefaultLayoutState,
  DefaultPositionState,
  EditorModes,
} from '../../constants';
import { ImageEditorContext } from '../../hooks/useImageEditorContext/ImageEditorContext';
import { DE } from '../../locales';
import {
  Config,
  Dimensions,
  LayoutDimensions,
  Position,
  UserConfig,
} from '../../types';

type Props = {
  image: string;
  userConfig?: UserConfig;
  children: ReactNode;
};

export const ImageEditorProvider = function ({
  image: initialImage,
  userConfig,
  children,
}: Props) {
  const initialBoxPosition = useSharedValue<Position>(DefaultPositionState);
  const initialBoxScale = useSharedValue<Position>(DefaultPositionState);
  const boxScale = useSharedValue<Position>(DefaultPositionState);
  const boxPosition = useSharedValue<Position>(DefaultPositionState);
  const zoom = useSharedValue(1);
  const rotate = useSharedValue(0);
  const flipX = useSharedValue(0);
  const flipY = useSharedValue(0);
  const focalPoint = useSharedValue<Position>(DefaultPositionState);
  const imagePosition = useSharedValue<Position>(DefaultPositionState);

  const [offset, setOffset] = useState<Position>(DefaultPositionState);
  const [image, setImage] = useState(initialImage);
  const imageRef = useRef(null);

  const [containerLayout, setContainerLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);
  const [imageLayout, setImageLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);

  const [previousRotate, setPreviousRotate] = useState(0);

  const [activeEditor, setActiveEditor] = useState<EditorModes | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [exactImageDimensions, setExactImageDimensions] = useState<Dimensions>(
    DefaultDimensionState
  );

  // locales
  const locale = userConfig?.locale ?? DefaultConfig.locale;
  let labels = { ...DefaultConfig.labels };
  if (locale === 'de') labels = { ...DE };
  const mergedLabels = { ...labels, ...(userConfig?.labels || {}) };

  // colors
  const mergedColors = {
    ...DefaultConfig.colors,
    ...(userConfig?.colors || {}),
  };

  const config: Config = {
    ...DefaultConfig,
    ...userConfig,
    labels: mergedLabels,
    colors: mergedColors,
  };

  const value = {
    config,
    image,
    setImage,
    imageRef,
    initialBoxScale,
    initialBoxPosition,
    boxScale,
    boxPosition,
    rotate,
    previousRotate,
    setPreviousRotate,
    flipX,
    flipY,
    zoom,
    offset,
    setOffset,
    containerLayout,
    setContainerLayout,
    imageLayout,
    setImageLayout,
    activeEditor,
    setActiveEditor,
    isSaving,
    setIsSaving,
    focalPoint,
    imagePosition,
    exactImageDimensions,
    setExactImageDimensions,
  };

  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
};
