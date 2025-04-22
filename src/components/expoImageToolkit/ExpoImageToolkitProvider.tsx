import React, { useEffect, useState } from 'react';
import { OnSaveProps, UserConfig } from '../../types';
import { BackHandler, StyleSheet, View } from 'react-native';
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

/**
 * @description This provider renders the editor modal in fullscreen mode at the root level.
 * To use expoImageToolkit, you must wrap your entire app in this provider.
 * It handles how the editor is opened after image selection or taking a photo, and how it's closed.
 *
 * @param children - Your app’s components.
 * @returns The wrapped children along with the editor modal.
 */
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

  useEffect(() => {
    const backAction = () => {
      if (editorState.visible) {
        onCancel();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
    // update BackEvent only when custom modal visibility changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState.visible]);

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
    elevation: 1000,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
