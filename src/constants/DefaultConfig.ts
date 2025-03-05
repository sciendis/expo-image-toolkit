import { EN } from "@/locales";
import { Config } from "@/types";

export const DefaultConfig: Config = {
  locale: "en",
  minZoom: 1,
  maxZoom: 10,
  labels: EN,
  defaultEditor: "CROP",
  // enableCrop: true,
  enableZoom: true,
  enableRotate: true,
} as const;
