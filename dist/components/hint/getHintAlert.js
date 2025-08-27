var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export const getHintAlert = function ({ hintId, setOpacity, labels }) {
    return Alert.alert(labels.ALERT_TITLE, labels.ALERT_MESSAGE, [
        { text: labels.ALERT_CANCEL, style: 'cancel' },
        {
            text: labels.DONT_SHOW_AGAIN,
            style: 'destructive',
            onPress: () => __awaiter(this, void 0, void 0, function* () {
                yield AsyncStorage.setItem(hintId, 'true');
                setOpacity(0);
            }),
        },
        {
            text: labels.CLOSE_ONLY,
            onPress: () => setOpacity(0),
        },
    ], { cancelable: true });
};
//# sourceMappingURL=getHintAlert.js.map