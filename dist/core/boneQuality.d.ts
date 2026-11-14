import { VolumeSamplingData } from './cprMath';
import { Vec3 } from './implantGeometry';
export type BoneClass = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';
export declare function classifyBone(hu: number): BoneClass;
export interface BoneSample {
    meanHU: number;
    bone: BoneClass;
    /** Number of in-volume samples averaged */
    samples: number;
}
/**
 * Mean HU along the implant body — centerline plus a ring of radial samples at
 * 60% radius, over the full entry→apex length. Out-of-volume samples are
 * skipped. Returns null if nothing could be sampled.
 */
export declare function sampleImplantBoneHU(vol: VolumeSamplingData, entry: Vec3, apex: Vec3, radius: number, axialSteps?: number, radialSteps?: number): BoneSample | null;
