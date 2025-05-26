import { UserConfig } from './Config';
import { OnSaveProps } from './OnSaveProps';

export type ToolkitProviderState = {
  selectedImage: string | null;
  visible: boolean;
  userConfig?: UserConfig;
  onCrop: (props?: OnSaveProps) => void;
};
