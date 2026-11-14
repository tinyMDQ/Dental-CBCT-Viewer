import { DicomStudyInfo } from '../../types/dicom';
export type ImportFormat = 'galileos' | 'onevolume';
export interface ImportedVolume {
    study: DicomStudyInfo;
    volumeId: string;
    windowLevel: {
        wc: number;
        ww: number;
    };
}
/** Detect a native (non-DICOM) CT export from the selected file set. */
export declare function detectFormat(files: File[]): ImportFormat | null;
/** Parse + build a GALILEOS / OneVolume export; null if the set isn't one. */
export declare function importNativeVolume(files: File[], onProgress?: (pct: number) => void): Promise<ImportedVolume | null>;
