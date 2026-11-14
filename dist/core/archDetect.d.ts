import { Point2, VolumeSamplingData } from './cprMath';
export interface ArchDetectOptions {
    /** World Z of the slab centre (e.g. the axial focal point). Default: mid-Z. */
    focalWorldZ?: number;
    /** Half-thickness of the projected slab, in mm. Default 6. */
    slabHalfMm?: number;
    /** Bone threshold in stored HU. Default 400 (alveolar cortical / teeth). */
    boneThreshold?: number;
    /** Number of control points to emit. Default 9. */
    numControlPoints?: number;
    /** Angular half-span of the swept arc from anterior, in degrees. Default 115. */
    angularSpanDeg?: number;
}
/**
 * Estimate arch control points from a volume. Returns null when the slab holds
 * too little bone to trace a plausible arch (caller should keep the manual/
 * default curve in that case).
 */
export declare function detectArchControlPoints(vol: VolumeSamplingData, opts?: ArchDetectOptions): Point2[] | null;
