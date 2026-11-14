/**
 * Links window/level (contrast) across all views. The panoramic and
 * cross-section already read state.windowLevel; this keeps the three Cornerstone
 * MPR viewports in sync with it both ways. Loop-safe: an `applying` flag blocks
 * the echo from our own updates, listeners attach once per volume/layout (not on
 * every W/L change), and a threshold ignores sub-2 HU jitter.
 */
export declare function WindowLevelSync(): null;
