import { EditorModes } from '../constants';
import { EN } from '../locales';
import { Colors } from '../styles';
export type Config = {
    locale: 'en' | 'de';
    maxZoom: number;
    enableRotate: boolean;
    enableZoom: boolean;
    defaultEditor: keyof typeof EditorModes;
    labels: Record<keyof typeof EN, string>;
    colors: Record<keyof typeof Colors, string>;
    onCancel?: () => void;
    onSubmit?: (uri: string) => void;
    acceptedFormats?: string[];
};
export type UserConfig = Partial<Omit<Config, 'labels' | 'colors'>> & {
    labels?: Partial<Config['labels']>;
    colors?: Partial<Config['colors']>;
};
//# sourceMappingURL=Config.d.ts.map