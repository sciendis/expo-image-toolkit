import { createContext } from 'react';
import { OnSaveProps, UserConfig } from '../../types';

type ExpoImageToolkitContextType = {
  showEditor: (
    selectedImage: string,
    onCrop?: (props: OnSaveProps) => void,
    userConfig?: UserConfig
  ) => void;
  hideEditor: () => void;
};

export const ExpoImageToolkitContext = createContext<
  ExpoImageToolkitContextType | undefined
>(undefined);
