import { Vec3 } from './implantGeometry';
/**
 * Segments where the plane (point + unit normal) cuts the triangle soup
 * [ax,ay,az, bx,by,bz, cx,cy,cz, …]. Each crossing triangle yields one segment.
 */
export declare function slicePlaneSegments(tris: Float32Array | number[], planePoint: Vec3, planeNormal: Vec3): [Vec3, Vec3][];
interface BVHNode {
    cx: number;
    cy: number;
    cz: number;
    hx: number;
    hy: number;
    hz: number;
    left: BVHNode | null;
    right: BVHNode | null;
    tris: Int32Array | null;
}
export interface TriangleBVH {
    root: BVHNode | null;
    count: number;
}
/** Build an AABB tree over a triangle soup (median centroid split). */
export declare function buildTriangleBVH(tris: Float32Array | number[]): TriangleBVH;
/**
 * Slice a triangle soup using its BVH — identical result to
 * `slicePlaneSegments`, but prunes subtrees whose AABB is entirely on one side
 * of the plane (classic AABB-plane test: |centre·n − d| > extent·|n|).
 */
export declare function slicePlaneBVH(tris: Float32Array | number[], bvh: TriangleBVH, planePoint: Vec3, planeNormal: Vec3): [Vec3, Vec3][];
export {};
