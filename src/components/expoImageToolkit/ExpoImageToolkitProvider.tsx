import React, { useState } from 'react';
import { OnSaveProps, UserConfig } from '../../types';
import { StyleSheet, View } from 'react-native';
import { ExpoImageToolkitContext } from './ExpoImageToolkitContext';
import { ImageEditor } from '../imageEditor';

type EditorState = {
  selectedImage: string | null;
  visible: boolean;
  userConfig?: UserConfig;
  onCrop: (props?: OnSaveProps) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ExpoImageToolkitProvider = function ({ children }: Props) {
  const [editorState, setEditorState] = useState<EditorState>({
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

  return (
    <ExpoImageToolkitContext.Provider value={{ showEditor, hideEditor }}>
      {children}
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
    </ExpoImageToolkitContext.Provider>
  );
};

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    elevation: 1000,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
