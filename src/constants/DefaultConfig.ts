import { EN } from "../locales";
import { Config } from "../types";

export const DefaultConfig: Config = {
  locale: "en",
  maxZoom: 10,
  labels: EN,
  defaultEditor: "CROP",
  enableZoom: true,
  enableRotate: true,
} as const;
