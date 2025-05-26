import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useImageEditorContext } from '../../hooks';
const { height } = Dimensions.get('screen');
/**
 * @description This alert appears when users modify the CropFrame and try to switch editors.
 * It shows a confirmation dialog asking whether they want to crop or not before proceeding.
 *
 * @param props - An object containing:
 * - `visible`: `boolean` – Check if the alert should be shown (CropFrame has changed).
 * - `handleAlertResponse`: `(shouldCrop: boolean) => Promise<void>` – Callback returning the user’s choice (to crop or not).
 *
 * @returns A Dialog animated alert with YES and NO buttons.
 */
export const CropAlert = function ({ visible, handleAlertResponse }) {
    const { config: { labels, colors }, } = useImageEditorContext();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: visible ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: visible ? 1 : 0.8,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps
    return (<Animated.View style={[
            styles.container,
            {
                opacity: fadeAnim,
                transform: [{ translateY: -height / 16 }, { scale: scaleAnim }],
                zIndex: visible ? 1000 : -20,
                backgroundColor: colors.alertBg,
                shadowColor: colors.alertShadow,
            },
        ]}>
      <View style={styles.messageContainer}>
        <Text style={[styles.message, { color: colors.alertMessage }]}>
          {labels.CROP_ALERT}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsParent}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.alertNoBg }]} onPress={() => handleAlertResponse(false)} // No
    >
            <Text style={[styles.buttonText, { color: colors.alertNo }]}>
              {labels.NO}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsParent}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.alertYesBg }]} onPress={() => handleAlertResponse(true)} // Yes
    >
            <Text style={[styles.buttonText, { color: colors.alertYes }]}>
              {labels.YES}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        width: '80%',
        borderRadius: 12,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 30,
    },
    messageContainer: {
        width: '100%',
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    message: {
        textAlign: 'justify',
        fontSize: 15,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 18,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    buttonsParent: {
        width: '40%',
    },
    button: {
        padding: 4,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
    },
});
//# sourceMappingURL=CropAlert.js.map