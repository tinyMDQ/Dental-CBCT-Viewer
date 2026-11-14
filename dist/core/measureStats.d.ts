import { VolumeSamplingData } from './cprMath';
export type Vec3 = [number, number, number];
export interface RoiStats {
    count: number;
    mean: number;
    stdDev: number;
    min: number;
    max: number;
}
/** Population mean / SD / min / max of a set of intensity samples. */
export declare function roiStats(values: ArrayLike<number>): RoiStats | null;
/** Sample HU along the world segment a→b at `samples` evenly spaced points. */
export declare function lineProfileHU(vol: VolumeSamplingData, a: Vec3, b: Vec3, samples?: number): number[];
/** Angle in degrees at `vertex` between the rays to `a` and `b` (2-D or 3-D). */
export declare function angleDeg(a: number[], vertex: number[], b: number[]): number;
