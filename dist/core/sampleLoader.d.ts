import { DicomStudyInfo } from '../types/dicom';
export interface LoadedSample {
    study: DicomStudyInfo;
    volumeId: string;
    windowLevel: {
        wc: number;
        ww: number;
    };
}
/** Drop a sample volume's pixel data (call when its Cornerstone volume is purged). */
export declare function disposeSampleVolume(volumeId: string): void;
export declare function loadSample(base?: string, onProgress?: (pct: number) => void): Promise<LoadedSample>;
