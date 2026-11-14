import { DicomStudyInfo } from '../../types/dicom';
export interface RawVolume {
    /** int16 scalars, slice-major (k outer, then row j, then col i). */
    data: Int16Array;
    /** [cols, rows, depth] */
    dimensions: [number, number, number];
    /** [sx, sy, sz] mm */
    spacing: [number, number, number];
    /** [ox, oy, oz] mm — defaults to a centered volume if omitted */
    origin?: [number, number, number];
    windowCenter: number;
    windowWidth: number;
    modality: string;
    minValue: number;
    maxValue: number;
    patientName?: string;
    patientId?: string;
    seriesDescription?: string;
    /** Non-fatal assumptions made while decoding (e.g. header fallbacks). */
    warnings?: string[];
}
interface LoadedRaw {
    study: DicomStudyInfo;
    volumeId: string;
    windowLevel: {
        wc: number;
        ww: number;
    };
}
/** Drop a raw volume's pixel data (call when its Cornerstone volume is purged). */
export declare function disposeRawVolume(volumeId: string): void;
/** Build a Cornerstone volume + study from a decoded raw volume. */
export declare function buildRawVolume(raw: RawVolume, onProgress?: (pct: number) => void): Promise<LoadedRaw>;
export {};
