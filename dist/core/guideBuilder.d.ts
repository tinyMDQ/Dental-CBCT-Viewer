import { ManifoldToplevel } from 'manifold-3d';
import { Vec3 } from './implantGeometry';
import { Point2 } from './cprMath';
import { TriMesh } from './guideGeom';
import { GuideParams } from '../types/dicom';
export type { GuideParams };
export interface GuideImplantInput {
    /** Platform center, world mm */
    entry: Vec3;
    /** Unit axis, entry → apex */
    axis: Vec3;
    length: number;
    sleeveDiameter: number;
    sleeveOffset: number;
    sleeveHeight: number;
}
export interface BuildGuideInput {
    controlPoints: Point2[];
    implants: GuideImplantInput[];
    /** World-space triangle soups (already transformed) to subtract as tissue */
    scanSoups: Float32Array[];
    params: GuideParams;
}
export interface BuildGuideResult {
    mesh: TriMesh;
    warnings: string[];
    stats: {
        volumeMm3: number;
        triangles: number;
    };
}
/**
 * XY centerline for the base bar: the arch sampled over the guided implants'
 * `s`-span (+padding), lifted to `baseZ`. Pure — no WASM.
 */
export declare function planBaseCenterline(controlPoints: Point2[], entries: Vec3[], baseZ: number, padS?: number, samples?: number): Vec3[];
/**
 * A sleeve housing counts as connected to the base bar when its axis passes
 * within (housing radius + half the base cross-section) of the base
 * centerline AND the housing's Z span overlaps the base slab. Conservative
 * geometric stand-in for the exact Boolean-overlap check (the manifold WASM
 * kernel cannot run under unit tests); it catches housings that clearly miss
 * the bar — e.g. an implant placed far buccal of the arch.
 */
export declare function isHousingConnectedToBase(axisA: Vec3, axisB: Vec3, housingRadius: number, baseCenterline: Vec3[], baseWidthMm: number, baseHeightMm: number): boolean;
/** Lazily initialize the manifold WASM kernel (cached across exports). */
export declare function initManifold(): Promise<ManifoldToplevel>;
/**
 * Build the drill guide. Async (WASM). Guided implants only should be passed in.
 */
export declare function buildDrillGuide(input: BuildGuideInput): Promise<BuildGuideResult>;
