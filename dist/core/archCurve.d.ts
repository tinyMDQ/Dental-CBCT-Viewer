/**
 * Dental arch curve math — CatmullRom spline interpolation,
 * default arch generation, normals & arc-lengths.
 */
type Point2 = [number, number];
/**
 * Interpolate control points through a Catmull-Rom spline.
 * Returns a dense polyline in the same coordinate space.
 */
export declare function interpolateArchCurve(controlPoints: Point2[], samplesPerSegment?: number): Point2[];
/**
 * Compute unit normals perpendicular to the curve at each point.
 * The normal is rotated 90 ° CW from the tangent in the XY plane.
 */
export declare function computeCurveNormals(curve: Point2[]): Point2[];
export declare function totalArcLength(curve: Point2[]): number;
/**
 * Resample a polyline so that points are uniformly spaced by arc length.
 * This eliminates distortion caused by uneven control point spacing.
 */
export declare function resampleByArcLength(curve: Point2[], numSamples: number): Point2[];
/**
 * Generate a default U-shaped dental arch centered on `center` with
 * approximate extent given by `size` (the usable volume size in XY).
 */
export declare function generateDefaultArchCurve(center: Point2, size: Point2): Point2[];
export declare function offsetCurve(curve: Point2[], normals: Point2[], distance: number): Point2[];
export {};
