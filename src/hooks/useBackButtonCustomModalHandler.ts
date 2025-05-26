import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { ToolkitProviderState } from '../types';

type Props = {
  editorState: ToolkitProviderState;
  onCancel: () => void;
};

/**
 * @description This custom back event handler is for custom Modal on the root level.
 * React Native modal has an `onRequestClose` to handle physical BackButton of the mobile.
 * With the custom modal, we have to handle back button in the custom mode.
 *
 * @param props - An object containing:
 * - `editorState`: `ToolkitProviderState` – State object needs to check modal visibility.
 * - `onCancel`: `() => void` – Callback triggered when the user presses the physical BackButton.
 */
export const useBackButtonCustomModalHandler = function ({
  editorState,
  onCancel,
}: Props) {
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
};
