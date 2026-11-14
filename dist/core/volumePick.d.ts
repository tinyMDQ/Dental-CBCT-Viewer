import { VolumeSamplingData } from './cprMath';
import { ClipPlaneParam } from './cropBox';
import { Vec3 } from './implantGeometry';
/**
 * Density that counts as "surface". Enamel and cortical bone are far above it,
 * soft tissue and the scanner's air far below, so the exact value barely
 * matters — but it must stay above the ~200–400 HU of cancellous bone or the
 * ray stops on the first trabecula inside the jaw.
 */
export declare const PICK_HU_THRESHOLD = 800;
export interface VolumePickOptions {
    /** Density that counts as the surface (default PICK_HU_THRESHOLD). */
    threshold?: number;
    /** Planes the volume is clipped by; samples they cut away are skipped. */
    clipPlanes?: ClipPlaneParam[];
    /** March step in mm (default: half the finest voxel). */
    stepMm?: number;
}
/**
 * Ray/AABB slab test. Returns the [tEnter, tExit] range of the ray inside the
 * box, or null when it misses. `dir` need not be normalized, but t is in units
 * of `dir`, so callers that want millimetres should normalize it.
 */
export declare function rayBoxRange(origin: Vec3, dir: Vec3, bmin: Vec3, bmax: Vec3): [number, number] | null;
/** World-space axis-aligned bounds of a sampled volume. */
export declare function volumeBounds(vol: VolumeSamplingData): [Vec3, Vec3];
/**
 * First point along the ray where the volume crosses `threshold`, or null if
 * the ray never enters dense tissue. The crossing is bracketed by the march and
 * then bisected, so the result is accurate to a small fraction of a voxel
 * rather than to the step size.
 */
export declare function pickVolumeSurface(vol: VolumeSamplingData, origin: Vec3, direction: Vec3, opts?: VolumePickOptions): Vec3 | null;
