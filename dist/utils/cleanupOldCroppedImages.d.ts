/**
 * @deprecated Temporary migration utility.
 *
 * Cleans up legacy cropped image files that were previously saved
 * in `FileSystem.documentDirectory` by older versions of the
 * Expo Image Toolkit.
 *
 * This function should ONLY be used internally during the
 * transition phase. It can safely be removed in the next major
 * release once all users have migrated and no legacy files remain.
 *
 * Purpose:
 * - Remove `cropped_image_*.png` files created before v1.2.10
 * - Avoid long-term storage bloat caused by outdated behavior
 *
 * Do NOT use this function for new features.
 * New versions of the editor no longer create permanent image files.
 */
export declare function cleanupOldCroppedImages(): Promise<void>;
//# sourceMappingURL=cleanupOldCroppedImages.d.ts.map