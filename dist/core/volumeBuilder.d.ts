import { Types } from '@cornerstonejs/core';
/**
 * Creates a streaming image volume from a list of image IDs.
 * Resolves when all frames have been loaded; rejects when any frame
 * permanently fails (Cornerstone reports `success === false` on the event).
 */
export declare function createVolume(imageIds: string[]): Promise<string>;
/**
 * Sets a volume on multiple viewports at once.
 */
export declare function setVolumeOnViewports(renderingEngine: Types.IRenderingEngine, volumeId: string, viewportIds: string[]): Promise<void>;
