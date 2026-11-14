import { Vec3 } from './implantGeometry';
/** Shortest distance from point p to the segment [a, b]. */
export declare function distPointToSegment3(p: Vec3, a: Vec3, b: Vec3): number;
/**
 * Shortest distance between two segments [p1,q1] and [p2,q2].
 * Standard clamped closest-point-of-two-segments solution.
 */
export declare function distSegmentToSegment3(p1: Vec3, q1: Vec3, p2: Vec3, q2: Vec3): number;
/** Shortest distance between segment [a,b] and a polyline (>=1 point). */
export declare function distSegmentToPolyline3(a: Vec3, b: Vec3, poly: Vec3[]): number;
export interface ClearanceResult {
    /** Surface-to-surface clearance in mm (negative = overlap) */
    mm: number;
    /** True if mm >= threshold */
    ok: boolean;
}
/** Implant (axis [entry,apex], radius) ↔ anatomy polyline (tube radius). */
export declare function markerClearance(entry: Vec3, apex: Vec3, implantRadius: number, polyline: Vec3[], tubeRadius: number, threshold: number): ClearanceResult;
export interface AnatomyEval {
    id: string;
    type: 'nerve' | 'sinus';
    mm: number;
    ok: boolean;
}
/**
 * Clearance of one implant (axis [entry,apex], radius) against every anatomy
 * marker, each judged vs its type threshold. `worstOk` is false if any marker
 * is violated.
 */
export declare function evaluateImplantAnatomy(entry: Vec3, apex: Vec3, implantRadius: number, markers: {
    id: string;
    type: 'nerve' | 'sinus';
    radius: number;
    points: Vec3[];
}[], thresholds: {
    nerve: number;
    sinus: number;
}): {
    results: AnatomyEval[];
    worstOk: boolean;
};
export interface ImplantSeg {
    id: string;
    entry: Vec3;
    apex: Vec3;
    radius: number;
}
export interface ImplantSafety {
    anatomy: AnatomyEval[];
    /** Nearest neighbouring-implant clearance, or null when alone */
    neighborMm: number | null;
    neighborOk: boolean;
    worstOk: boolean;
}
/**
 * Full safety evaluation of one implant against the anatomy markers and the
 * other implants. `worstOk` is false if any clearance is below its threshold.
 */
export declare function evaluateImplant(self: ImplantSeg, others: ImplantSeg[], markers: {
    id: string;
    type: 'nerve' | 'sinus';
    radius: number;
    points: Vec3[];
}[], thresholds: {
    nerve: number;
    sinus: number;
    neighbor: number;
}): ImplantSafety;
/** Implant ↔ neighbouring implant (both as axis segments + radii). */
export declare function neighborClearance(entryA: Vec3, apexA: Vec3, radiusA: number, entryB: Vec3, apexB: Vec3, radiusB: number, threshold: number): ClearanceResult;
