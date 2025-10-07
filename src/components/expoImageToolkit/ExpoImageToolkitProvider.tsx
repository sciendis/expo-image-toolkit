import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useBackButtonCustomModalHandler } from '../../hooks';
import { OnSaveProps, ToolkitProviderState, UserConfig } from '../../types';
import { ImageEditor } from '../imageEditor';
import { ExpoImageToolkitContext } from './ExpoImageToolkitContext';

type Props = {
  children: React.ReactNode;
};

/**
 * @description This provider renders the editor modal in fullscreen mode at the root level.
 * To use `expo-image-toolkit`, you must wrap your entire app in this provider.
 * It handles opening the editor after image selection or taking a photo, and closing it.
 *
 * @param children - Your app’s components.
 * @returns The wrapped children along with the editor modal.
 */
export const ExpoImageToolkitProvider = function ({ children }: Props) {
  const [editorState, setEditorState] = useState<ToolkitProviderState>({
    selectedImage: null,
    visible: false,
    onCrop: () => {},
  });

  const showEditor = (
    selectedImage: string,
    onCrop: (props?: OnSaveProps) => void,
    userConfig?: UserConfig
  ) => {
    setEditorState({
      visible: true,
      selectedImage,
      userConfig,
      onCrop,
    });
  };

  const hideEditor = () => {
    setEditorState((prev) => ({
      ...prev,
      visible: false,
      selectedImage: null,
    }));
  };

  const onCrop = (args?: OnSaveProps) => {
    editorState.onCrop?.(args);
    if (args?.uri) editorState.userConfig?.onSubmit?.(args.uri);
  };

  const onCancel = () => {
    editorState.userConfig?.onCancel?.();
    hideEditor();
  };

  useBackButtonCustomModalHandler({ editorState, onCancel });

  return (
    <ExpoImageToolkitContext.Provider value={{ showEditor, hideEditor }}>
      {children}
      {/** start editor modal */}
      {editorState.visible && (
        <View style={styles.modal}>
          <ImageEditor
            image={editorState.selectedImage}
            onCrop={onCrop}
            onCancel={onCancel}
            userConfig={editorState.userConfig}
          />
        </View>
      )}
      {/** end editor modal */}
    </ExpoImageToolkitContext.Provider>
  );
};

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
