/**
 * Shared viewport capture: composites a viewport's Cornerstone image canvas
 * with its SVG overlays (implants / sleeves / measurements) into one
 * undistorted canvas, optionally burning in the on-image text overlays (patient
 * name, clinic, orientation markers, …). Used by both the image and PDF export.
 */
/**
 * Composite a viewport's image canvas with its SVG overlays into one canvas at
 * the image's own aspect ratio, scaled by `scale` (a super-sample factor).
 */
export declare function captureView(view: HTMLElement, scale?: number): Promise<HTMLCanvasElement | null>;
/**
 * Force a fresh render of the 3D volume viewport and hide its cutting (slice)
 * planes so the capture shows only the model. The render also repopulates the
 * WebGL drawing buffer (which clears between frames), so the 3D capture isn't
 * blank. Returns the hidden actors to restore afterwards.
 */
export declare function hide3DSlicePlanes(): Promise<any[]>;
export declare function restore3DSlicePlanes(hidden: any[]): void;
export interface OverlayContent {
    name: boolean;
    birth: boolean;
    date: boolean;
    clinic: boolean;
    series: boolean;
    modality: boolean;
    viewTitle: boolean;
    orientation: boolean;
    slice: boolean;
}
export interface OverlayData {
    name: string;
    birth: string;
    date: string;
    clinic: string;
    series: string;
    modality: string;
    color: string;
}
/** Burn the selected text overlays onto an already-captured view canvas. */
export declare function burnOverlays(canvas: HTMLCanvasElement, view: HTMLElement, viewKey: string, content: OverlayContent, data: OverlayData, viewTitle: string): void;
/** Lay several capture canvases into a single grid image (black background). */
export declare function composeGrid(canvases: HTMLCanvasElement[], cols: number): HTMLCanvasElement;
/** Download a canvas as PNG or JPG. */
export declare function downloadCanvas(canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpg', quality: number): void;
