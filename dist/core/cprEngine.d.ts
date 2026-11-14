import { Point2, CPRResult, VolumeSamplingData } from './cprMath';
import { ProjectionMode } from '../types/dicom';
export type { CPRResult };
export interface CPRParams {
    volumeId: string;
    controlPoints: Point2[];
    slabWidth: number;
    projection: ProjectionMode;
    resolution: number;
}
export declare function getVolumeData(volumeId: string): VolumeSamplingData | null;
export declare function generatePanoramic(params: CPRParams): CPRResult | null;
export interface CrossSectionParams {
    volumeId: string;
    controlPoints: Point2[];
    position: number;
    tiltDeg: number;
    widthMm: number;
    resolution: number;
}
export type CrossSectionResult = CPRResult;
export declare function generateCrossSection(params: CrossSectionParams): CrossSectionResult | null;
