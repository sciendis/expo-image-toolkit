import { useImageEditorContext } from '../../hooks';
import { Alert } from '../alert';

type Props = {
  visible: boolean;
  handleAlertResponse: (shouldCrop: boolean) => Promise<void>;
};

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
export const CropAlert = function ({ visible, handleAlertResponse }: Props) {
  const {
    config: { labels },
  } = useImageEditorContext();

  return (
    <Alert
      alertText={labels.CROP_ALERT_TEXT}
      submitLabel={labels.CROP_ALERT_YES}
      cancelLabel={labels.CROP_ALERT_NO}
      onSubmit={() => handleAlertResponse(true)} // YES
      onCancel={() => handleAlertResponse(false)} // NO
      visible={visible}
    />
  );
};
