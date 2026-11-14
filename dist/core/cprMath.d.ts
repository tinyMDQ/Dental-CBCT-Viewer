/**
 * Pure CPR sampling math — no Cornerstone dependency, so it is unit-testable.
 * Used by cprEngine.ts which supplies the volume data from the Cornerstone cache.
 */
export type Point2 = [number, number];
export interface CPRResult {
    pixelData: Float32Array;
    width: number;
    height: number;
    horizontalSpacing: number;
    verticalSpacing: number;
    zMin: number;
    zMax: number;
}
/** Minimal volume description needed for sampling (subset of what cprEngine builds). */
export interface VolumeSamplingData {
    dims: [number, number, number];
    origin: [number, number, number];
    getVoxel: (i: number, j: number, k: number) => number;
    invSx: number;
    invSy: number;
    invSz: number;
    zMin: number;
    zMax: number;
    vSpacing: number;
}
export declare function trilinear(getVoxel: (i: number, j: number, k: number) => number, dims: [number, number, number], ci: number, cj: number, ck: number): number;
/**
 * Build a dense, arc-length-uniform curve with normals from control points.
 * Used by both panoramic and cross-section generation.
 */
export declare function buildUniformCurve(controlPoints: Point2[], numSamples: number): {
    curve: [number, number][];
    normals: [number, number][];
    arcLen: number;
};
export interface CrossSectionGeometryParams {
    controlPoints: Point2[];
    position: number;
    tiltDeg: number;
    widthMm: number;
    resolution: number;
}
/** World-space frame of the cross-section plane. */
export interface CrossSectionFrame {
    point: Point2;
    normal: Point2;
    tangent: Point2;
    origin: [number, number, number];
    eU: [number, number, number];
    eV: [number, number, number];
}
export declare function crossSectionFrame(controlPoints: Point2[], position: number, tiltDeg: number, zMin: number, zMax: number): CrossSectionFrame | null;
/**
 * Corners of the cross-section plane as a quad, for drawing the cut in 3D:
 * the plane spanned by eU (buccolingual, ±halfWidth) and eV (vertical,
 * ±halfHeight) about the frame origin. Returned in vtkPlaneSource order.
 */
export declare function crossSectionPlaneCorners(frame: CrossSectionFrame, halfWidthMm: number, halfHeightMm: number): {
    origin: [number, number, number];
    point1: [number, number, number];
    point2: [number, number, number];
};
/**
 * Sample a cross-section slice perpendicular to the arch curve.
 *
 * The slice plane is spanned by:
 *  - horizontal axis: the curve normal (buccolingual direction)
 *  - vertical axis: the Z axis leaned by tiltDeg toward the curve tangent,
 *    pivoting at mid-Z — matching the tilted line drawn on the panoramic
 *    (positive tilt → top of the slice toward increasing arch position)
 */
export declare function computeCrossSection(vol: VolumeSamplingData, params: CrossSectionGeometryParams): CPRResult | null;
