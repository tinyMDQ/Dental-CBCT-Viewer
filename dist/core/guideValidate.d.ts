import { Vec3 } from './implantGeometry';
import { GuideParams, AnatomyMarker } from '../types/dicom';
/** Minimum printable wall thickness (mm) for a typical SLA/DLP dental resin. */
export declare const MIN_WALL_MM = 1;
/** Smallest sensible guided-drill diameter (mm). */
export declare const MIN_DRILL_MM = 1.8;
/** Extra depth (mm) the drill travels past the implant apex. */
export declare const DRILL_OVERSHOOT_MM = 2;
export interface GuideCheckImplant {
    entry: Vec3;
    /** Unit axis, entry → apex. */
    axis: Vec3;
    length: number;
    sleeveDiameter: number;
    sleeveOffset: number;
    sleeveHeight: number;
}
export interface GuideCheckInput {
    implants: GuideCheckImplant[];
    params: GuideParams;
    /** Marked anatomy (world polylines with a safety radius). */
    anatomy?: AnatomyMarker[];
    /** Clearance thresholds (mm). */
    thresholds?: {
        nerve: number;
        sinus: number;
    };
}
export type GuideIssueSeverity = 'error' | 'warning';
export interface GuideIssue {
    /** i18n key suffix: guideCheck.<code> */
    code: string;
    severity: GuideIssueSeverity;
    /** Human-readable measured detail (already formatted), e.g. "0.6 mm". */
    detail?: string;
}
/**
 * Validate a guide plan. Returns issues sorted errors-first; an empty array
 * means no problem was detected (not a guarantee of clinical fitness).
 */
export declare function validateGuide(input: GuideCheckInput): GuideIssue[];
