import { VolumeSamplingData } from './cprMath';
import { Vec3 } from './implantGeometry';
/** A detected marker candidate. */
export interface Fiducial {
    /** World-mm centre, intensity-weighted (sub-voxel). */
    center: Vec3;
    /** Diameter implied by the blob's volume, mm. */
    diameterMm: number;
    /** 0–1, how bead-like the blob is; 1 is a perfect sphere. */
    sphericity: number;
    /** Mean density inside the blob. */
    meanValue: number;
}
export interface DetectOptions {
    /**
     * Density a marker must exceed. The default sits above enamel, since beads
     * are gutta-percha, composite or metal; lower it for a faint marker and
     * expect more candidates to sift through.
     */
    threshold?: number;
    /** Plausible bead sizes. Anything outside is a tooth, a restoration or noise. */
    minDiameterMm?: number;
    maxDiameterMm?: number;
    /** Search lattice, mm. Beads are millimetres across, so this can be coarse. */
    latticeMm?: number;
    maxResults?: number;
    /** Restrict the search in z — e.g. to one jaw. */
    zRange?: [number, number];
}
/**
 * Bead-shaped blobs in the volume, best first.
 *
 * Coarse to fine, because a single lattice cannot be both. One fine enough to
 * judge a 1 mm bead's shape is tens of millions of samples across a whole field
 * of view; one coarse enough to sweep that quickly cannot tell a bead from a
 * chip of calculus. So a coarse sweep (nearest-voxel, no interpolation) finds
 * *where* dense material sits, and each of those places is then measured
 * properly in a small box at a fine lattice.
 */
export declare function detectFiducials(vol: VolumeSamplingData, opts?: DetectOptions): Fiducial[];
/**
 * Least-squares sphere through a point cloud (algebraic fit — linear, so no
 * iteration and no starting guess). Returns null when the points are too few or
 * degenerate, e.g. all on one plane.
 */
export declare function fitSphere(points: Vec3[]): {
    center: Vec3;
    radiusMm: number;
    rmsMm: number;
} | null;
/**
 * Snap a click on a scan surface to the centre of the bead it landed on.
 *
 * The centre of a sphere is fixed by its surface, so fitting the vertices
 * around the click beats the click itself. The fit has to be *checked* though —
 * click flat gingiva and it will happily return a sphere of any size centred
 * anywhere — so an implausible radius or a poor fit falls back to the click.
 */
export declare function snapToSphere(surfacePoints: Vec3[], click: Vec3, opts?: {
    gatherMm?: number;
    minRadiusMm?: number;
    maxRadiusMm?: number;
    maxRmsMm?: number;
}): {
    point: Vec3;
    snapped: boolean;
    radiusMm?: number;
};
/** The candidate a camera ray passes closest to, within `maxDistMm` of the ray. */
export declare function nearestFiducialToRay(fiducials: Fiducial[], origin: Vec3, direction: Vec3, maxDistMm?: number): Fiducial | null;
/**
 * Which target point each source point corresponds to, from shape alone.
 *
 * Markers form a rigid constellation, so the correct assignment is the one
 * whose inter-point distances agree — pairing marker 2 with marker 3 stretches
 * the constellation and shows up immediately. Returns a permutation `perm`
 * where source i matches target perm[i], or null if the sets differ in size or
 * are too small to be distinctive.
 *
 * Brute force over permutations: this is used with a handful of markers, and at
 * that size exhaustive is both instant and exactly right.
 */
export declare function matchConstellations(source: Vec3[], target: Vec3[], maxErrorMm?: number): number[] | null;
