import { EditorModes } from "@/constants";
import { EN } from "@/locales";

export type Config = {
  locale: "en" | "de";
  minZoom: number;
  maxZoom: number;
  enableRotate: boolean;
  enableZoom: boolean;
  // enableCrop: boolean;
  defaultEditor: keyof typeof EditorModes;
  labels: Record<keyof typeof EN, string>;
  // customIcons
};

export type UserConfig = Partial<Config>;
