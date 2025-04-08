import { useContext } from 'react';
import { ExpoImageToolkitContext } from './ExpoImageToolkitContext';

export const useExpoImageToolkitContext = () => {
  const context = useContext(ExpoImageToolkitContext);
  if (context === undefined)
    throw new Error(
      'useExpoImageToolkitContext must be used in ExpoImageToolkitProvider'
    );

  return context;
};
