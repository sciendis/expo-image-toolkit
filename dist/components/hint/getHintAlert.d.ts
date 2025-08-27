import { Dispatch, SetStateAction } from 'react';
import { Config } from '../../types';
type Props = {
    hintId: string;
    setOpacity: Dispatch<SetStateAction<0 | 1>>;
} & Pick<Config, 'labels'>;
export declare const getHintAlert: ({ hintId, setOpacity, labels }: Props) => void;
export {};
//# sourceMappingURL=getHintAlert.d.ts.map