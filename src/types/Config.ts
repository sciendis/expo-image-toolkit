import { EditorModes } from "../constants";
import { EN } from "../locales";

export type Config = {
  locale: "en" | "de";
  maxZoom: number;
  enableRotate: boolean;
  enableZoom: boolean;
  defaultEditor: keyof typeof EditorModes;
  labels: Record<keyof typeof EN, string>;
};

export type UserConfig = Partial<Omit<Config, "labels">> & {
  labels?: Partial<Config["labels"]>;
};
