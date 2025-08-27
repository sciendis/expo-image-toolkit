import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { Config } from '../../types';

type Props = {
  hintId: string;
  setOpacity: Dispatch<SetStateAction<0 | 1>>;
} & Pick<Config, 'labels'>;

export const getHintAlert = function ({ hintId, setOpacity, labels }: Props) {
  return Alert.alert(
    labels.ALERT_TITLE,
    labels.ALERT_MESSAGE,
    [
      { text: labels.ALERT_CANCEL, style: 'cancel' },
      {
        text: labels.DONT_SHOW_AGAIN,
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.setItem(hintId, 'true');
          setOpacity(0);
        },
      },
      {
        text: labels.CLOSE_ONLY,
        onPress: () => setOpacity(0),
      },
    ],
    { cancelable: true }
  );
};
