import { Vec3 } from './implantGeometry';
/** Step sizes offered in the UI. */
export declare const NUDGE_MM = 0.25;
export declare const NUDGE_DEG = 1;
export type NudgeAxis = 'x' | 'y' | 'z';
/** Column-major translation matrix. */
export declare function translation4(t: Vec3): number[];
/** Column-major rotation of `deg` degrees about a world axis through the origin. */
export declare function rotation4(axis: NudgeAxis, deg: number): number[];
/** Translate a registered scan by `mm` along one world axis. */
export declare function nudgeScan(transform: number[], axis: NudgeAxis, mm: number): number[];
/**
 * Rotate a registered scan about a world pivot — the scan's own centre, so the
 * mesh turns in place instead of swinging around the volume origin.
 */
export declare function rotateScan(transform: number[], axis: NudgeAxis, deg: number, pivot: Vec3): number[];
/**
 * World-space centre of a scan: its local bounding-box centre carried through
 * the current transform. `bounds` is vtk's [xmin,xmax,ymin,ymax,zmin,zmax].
 */
export declare function scanCenterWorld(transform: number[], bounds: number[] | null | undefined): Vec3;
