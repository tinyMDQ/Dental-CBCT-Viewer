import { Vec3 } from './implantGeometry';
export declare const IDENTITY4: number[];
/** Multiply two column-major 4×4 matrices: returns a·b. */
export declare function mul4(a: number[], b: number[]): number[];
/** Apply a column-major 4×4 (affine) to a world point. */
export declare function applyMat4(m: number[], p: Vec3): Vec3;
/** Eigen-decomposition of a symmetric n×n matrix. vectors[r][c] = component r
 * of eigenvector c. */
export declare function jacobiEigenSymmetric(input: number[][], n: number): {
    values: number[];
    vectors: number[][];
};
/**
 * Best-fit rigid transform mapping src → tgt (corresponding, same length ≥ 3).
 * Returns a 4×4 column-major matrix, or null if degenerate.
 */
export declare function kabschTransform(src: Vec3[], tgt: Vec3[]): number[] | null;
/**
 * kabschTransform() plus the RMS point-pair residual in mm — the fit quality
 * of the registration. Large RMS (> ~1 mm) means the landmark pairs do not
 * agree with a single rigid transform (mis-picked points).
 */
export declare function kabschTransformWithRms(src: Vec3[], tgt: Vec3[]): {
    matrix: number[];
    rmsMm: number;
} | null;
export interface IcpOptions {
    /** Max iterations (default 40). */
    maxIterations?: number;
    /** Stop when the RMS improvement between iterations drops below this (mm, default 1e-4). */
    tolerance?: number;
    /** Initial source→target transform (default identity — pass the 3-point Kabsch result). */
    initial?: number[];
    /**
     * Fraction of correspondences to keep, closest first (default 1 = all).
     *
     * Registering an intraoral scan to a CBCT is the case that needs this: most
     * of an arch scan is gingiva, which the CBCT does not image at all. Those
     * points have no true counterpart, and letting them vote drags the fit off
     * the teeth — a full-set objective plateaus around 1–2 mm where a trimmed one
     * reaches the voxel size. 0.3–0.5 is the useful range.
     */
    keep?: number;
}
export interface IcpResult {
    /** Refined source → target rigid transform (4×4 column-major). */
    transform: number[];
    /** Final RMS of each source point to its nearest target point, mm. */
    rmsMm: number;
    iterations: number;
}
/**
 * Point-to-point ICP: refine a source point cloud onto a target cloud by
 * repeatedly matching each source point to its nearest target and solving the
 * best rigid transform (Kabsch) for those correspondences. Seed `initial` with
 * the coarse 3-point Kabsch result so ICP only has to polish it.
 *
 * Pure (no Cornerstone/vtk) → unit-testable. Nearest-neighbour is brute force,
 * so callers should subsample large surfaces before passing them in.
 */
export declare function icpAlign(source: Vec3[], target: Vec3[], opts?: IcpOptions): IcpResult | null;
/** Möller–Trumbore ray/triangle: returns t (ray param) of the hit, or null. */
export declare function rayTriangleHit(orig: Vec3, dir: Vec3, a: Vec3, b: Vec3, c: Vec3): number | null;
/**
 * Nearest ray hit against a triangle soup (flat world-space vertex triplets).
 * `tris` is [ax,ay,az, bx,by,bz, cx,cy,cz, …]. Returns the hit world point.
 */
export declare function pickTriangleSoup(orig: Vec3, dir: Vec3, tris: Float32Array | number[]): Vec3 | null;
