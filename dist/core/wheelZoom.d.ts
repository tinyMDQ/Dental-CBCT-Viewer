/**
 * Mouse-wheel zoom for the 3D view. Cornerstone's ZoomTool has no wheel handler
 * (only drag), so a Wheel binding on it does nothing — the 3D viewport installs
 * its own listener and uses this to compute the next zoom. Pure → unit-testable.
 */
export declare const WHEEL_ZOOM_MIN = 0.2;
export declare const WHEEL_ZOOM_MAX = 10;
/**
 * Next zoom for a wheel event. Exponential in the delta so a trackpad's many
 * small deltas and a mouse's few large notches zoom at the same overall rate,
 * and zooming in then out by the same amount returns to the start. Wheel up
 * (negative deltaY) zooms in. Clamped to [WHEEL_ZOOM_MIN, WHEEL_ZOOM_MAX].
 */
export declare function nextWheelZoom(current: number, deltaY: number, deltaMode?: number): number;
