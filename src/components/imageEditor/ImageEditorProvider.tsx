import { ReactNode, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultDimensionState, DefaultPositionState } from '../../constants';
import { ImageEditorContext } from '../../hooks/useImageEditorContext/ImageEditorContext';
import { Dimensions, Position, UserConfig } from '../../types';
import { getInitialEditor, setupConfig } from '../../utils';

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
  const boxScale = useSharedValue<Position>(DefaultPositionState);
  const boxPosition = useSharedValue<Position>(DefaultPositionState);
  const zoom = useSharedValue(1);
  const rotate = useSharedValue(0);
  const flipX = useSharedValue(0);
  const flipY = useSharedValue(0);
  const focalPoint = useSharedValue<Position>(DefaultPositionState);
  const imagePosition = useSharedValue<Position>(DefaultPositionState);

  const [image, setImage] = useState(initialImage);
  const imageRef = useRef(null);

  const config = setupConfig(userConfig);
  const defaultEditor = getInitialEditor(config);

  const [activeEditor, setActiveEditor] = useState(defaultEditor);
  const [previousRotate, setPreviousRotate] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>(
    DefaultDimensionState
  );

  const value = {
    config,
    image,
    setImage,
    imageRef,
    boxScale,
    boxPosition,
    rotate,
    previousRotate,
    setPreviousRotate,
    flipX,
    flipY,
    zoom,
    activeEditor,
    setActiveEditor,
    isSaving,
    setIsSaving,
    focalPoint,
    imagePosition,
    dimensions,
    setDimensions,
  };

  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
};
