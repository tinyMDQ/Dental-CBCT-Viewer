import { DicomStudyInfo } from '../types/dicom';
/** Revoke every object URL created by parseDicomFiles and clear the list. */
export declare function revokeAllBlobUrls(): void;
export declare function parseDicomFiles(files: File[], onProgress?: (loaded: number, total: number) => void): Promise<DicomStudyInfo | null>;
