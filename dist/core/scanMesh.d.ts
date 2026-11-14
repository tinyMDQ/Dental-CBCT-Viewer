import { Vec3 } from './implantGeometry';
export declare const getScanPolyData: (id: string) => any | null;
export declare const setScanPolyData: (id: string, pd: any) => void;
export declare const removeScanPolyData: (id: string) => void;
export declare const setScanBaseTransform: (id: string, m: number[]) => void;
export declare const getScanBaseTransform: (id: string) => number[] | null;
export declare const hasScanPolyData: (id: string) => boolean;
/** Empty the whole scan-mesh registry (e.g. when the session is purged). */
export declare function clearScanRegistry(): void;
/** 4×4 column-major identity. */
export declare const IDENTITY16: number[];
/** 4×4 column-major translation matrix. */
export declare function translation16(tx: number, ty: number, tz: number): number[];
/**
 * Sanity-check a mesh's extent against mm-scale jaw anatomy (STL/OBJ/PLY carry
 * no unit metadata). Returns a human-readable warning when the bounding box is
 * implausible (< 5 mm or > 2000 mm), else null. Never auto-scales — wrong-unit
 * geometry must be flagged, not silently "fixed".
 */
export declare function meshScaleWarning(pd: any): string | null;
/**
 * Parse mesh bytes into vtkPolyData, choosing the reader by file extension.
 * Returns null when the format is unreadable or the mesh comes back empty.
 */
export declare function parseScanMesh(fileName: string, buffer: ArrayBuffer): any | null;
/** Read a mesh file into vtkPolyData by extension. Returns null on failure. */
export declare function loadScanPolyData(file: File): Promise<any | null>;
/** Center of a polydata's bounding box, in its own coordinates. */
export declare function polyDataCenter(pd: any): [number, number, number];
/**
 * World-space triangle soup [ax,ay,az, bx,by,bz, cx,cy,cz, …] for a scan,
 * with `transform` (its userMatrix) applied. Polygons are fan-triangulated.
 * Used for ray-cast landmark picking on the 3D surface.
 */
export declare function scanTriangleSoupWorld(id: string, transform: number[]): Float32Array | null;
/**
 * World-space contour of a scan cut by a plane, using a cached BVH. Rebuilds the
 * world soup + tree only when `transform` changes; otherwise a plane scrub only
 * traverses the tree (≈O(crossings)) — replacing the old rebuild-and-brute-force
 * per move. Returns [] if the mesh is not registered.
 */
export declare function sliceScanWorld(id: string, transform: number[], planePoint: Vec3, planeNormal: Vec3): [Vec3, Vec3][];
export interface ScanMeshInfo {
    points: number;
    triangles: number;
    extentMm: [number, number, number];
}
/** Point/triangle counts and mm extent of a loaded mesh, for the series tree. */
export declare function scanMeshInfo(id: string): ScanMeshInfo | null;
/** Build a vtk actor for a scan mesh with color / opacity / transform. */
export declare function buildScanActor(pd: any, colorHex: string, opacity: number, transform: number[]): any;
