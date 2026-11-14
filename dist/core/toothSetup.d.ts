import { ArchFrame, Vec3 } from './implantGeometry';
import { Point2, VolumeSamplingData } from './cprMath';
export interface PrincipalAxis {
    /** Mean of the input points. */
    centroid: Vec3;
    /** Unit eigenvector of the largest spread (the mesh's long axis; sign arbitrary). */
    axis: Vec3;
    /** Extent (max − min projection) along that axis, mm. */
    extent: number;
}
/** PCA long axis of a flat [x,y,z, …] point set (≥ 3 points). */
export declare function principalAxis(positions: ArrayLike<number>): PrincipalAxis | null;
/**
 * Inverse of `implantAxis`: given a (unit) world apex axis and an arch frame,
 * recover the implant's buccolingual + mesiodistal angles. The sign of cos(BL)
 * is chosen so the mesiodistal lean stays small (|MD| ≤ 90°) and BL carries the
 * jaw (apex down → |BL| small, apex up → |BL| near 180°).
 */
export declare function anglesFromWorldAxis(frame: ArchFrame, axis: Vec3): {
    angleBLDeg: number;
    angleMDDeg: number;
};
export interface CrownSuggestion {
    position: Vec3;
    angleBLDeg: number;
    angleMDDeg: number;
}
/**
 * Pick the apical direction (±axis) as the one with denser bone just beyond the
 * crown — the apex points into the jaw. `huAt` samples volume intensity at a
 * world point; returns the oriented axis. Auto-detects upper vs lower jaw.
 */
export declare function orientAxisByBone(centroid: Vec3, axis: Vec3, extent: number, huAt: (p: Vec3) => number): Vec3;
/** A single crown's long axis is at most this tall; larger means a multi-tooth mesh. */
export declare const MAX_CROWN_EXTENT_MM = 25;
/** Reject a screw axis leaning further than this from vertical (degrees). */
export declare const MAX_AXIS_TILT_DEG = 60;
/**
 * Suggest an implant placement from a tooth-setup mesh: its PCA long axis is
 * the screw axis, oriented apically, and the platform is placed at the mesh's
 * apical (bone-facing) end. If `vol` is given the apical direction is detected
 * from bone density (auto jaw); otherwise it defaults to apex down (pass
 * `apexUp` for the maxilla). Returns null when the mesh is not plausibly a
 * single crown.
 */
export declare function suggestImplantFromMesh(controlPoints: Point2[], positions: ArrayLike<number>, opts?: {
    apexUp?: boolean;
    vol?: VolumeSamplingData;
    maxExtentMm?: number;
}): CrownSuggestion | null;
