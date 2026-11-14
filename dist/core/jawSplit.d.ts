import { VolumeSamplingData } from './cprMath';
import { ClipPlaneParam } from './cropBox';
export type JawSide = 'both' | 'upper' | 'lower';
export declare const JAW_SIDES: JawSide[];
export interface JawSplit {
    /** World z of the occlusal gap, or null when there is nothing to split. */
    splitZ: number | null;
    hasUpper: boolean;
    hasLower: boolean;
}
/** Nothing detected — the view offers no jaw filter. */
export declare const NO_JAW_SPLIT: JawSplit;
/**
 * Find the occlusal gap and which arches the volume holds.
 *
 * The scan is sampled on a coarse lattice (the split only has to be accurate to
 * a millimetre or two), binned along z by enamel-voxel count, and the deepest
 * valley between the two tallest peaks is taken as the split. A valley that is
 * not clearly a valley — no second peak, or a "gap" nearly as full as the peaks
 * around it — means one arch, and the bone's centre of mass relative to the
 * crowns says which one.
 */
export declare function detectJawSplit(vol: VolumeSamplingData): JawSplit;
/**
 * The clipping plane that keeps one jaw, in vtk's convention (the half-space
 * where (p − origin) · normal ≥ 0 survives). `both` — or a volume with nothing
 * to split — clips nothing.
 */
export declare function jawClipPlane(split: JawSplit, side: JawSide): ClipPlaneParam | null;
/** Whether the jaw filter is worth offering at all (both arches are present). */
export declare const canSplitJaws: (split: JawSplit) => boolean;
/** Memoized detectJawSplit for a loaded volume. */
export declare function jawSplitFor(volumeId: string, vol: VolumeSamplingData | null | undefined): JawSplit;
