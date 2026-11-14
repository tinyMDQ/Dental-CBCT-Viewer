import { ImplantData, AnatomyMarker, MeasurementLayer, ProjectionMode, GuideParams, ScanMesh } from '../types/dicom';
import { ReportFields, DisplayConfig } from '../context/ViewerContext';
export declare const PLAN_VERSION = 1;
/** The persistable slices of the viewer state. */
export interface PlanData {
    implants: ImplantData[];
    anatomy: AnatomyMarker[];
    measurements: MeasurementLayer[];
    archCurveControlPoints: [number, number][] | null;
    crossSectionPosition: number;
    crossSectionTiltDeg: number;
    panoramicSlabWidth: number;
    panoramicProjection: ProjectionMode;
    panoramicResolution: number;
    safety: {
        marginMm: number;
        color: string;
        nerveMm: number;
        sinusMm: number;
        neighborMm: number;
    };
    guide: GuideParams;
    windowLevel: {
        wc: number;
        ww: number;
    };
    report: ReportFields;
    display: DisplayConfig;
    /**
     * Imported surface scans — descriptors only. The mesh itself is megabytes
     * and stays in memory, but the transform is the expensive part to recreate:
     * it is the registration, minutes of landmark picking. Saving it means a
     * reopened plan needs the file back, not the work.
     */
    scans: ScanMesh[];
}
export interface PlanFile extends PlanData {
    version: number;
    savedAt: string;
    studyInstanceUID: string | null;
    patientId: string | null;
}
/**
 * Result of planFromObject: the validated plan plus the studyInstanceUID it was
 * recorded against, so the caller can detect a study mismatch before applying.
 * Optional so plain PlanData values (e.g. imperative-handle loads) remain
 * assignable to it.
 */
export interface ParsedPlan extends PlanData {
    studyInstanceUID?: string | null;
}
/** Pull the persistable slices out of a state-like object. */
export declare function extractPlan(s: PlanData): PlanData;
export declare function serializePlan(s: PlanData, meta: {
    savedAt: string;
    studyInstanceUID: string | null;
    patientId: string | null;
}): PlanFile;
/** Validate + coerce a parsed JSON object into PlanData (best-effort). */
export declare function planFromObject(obj: any): ParsedPlan | null;
