import { ScanMesh } from '../types/dicom';
export interface ScanImportResult {
    added: ScanMesh[];
    /** File names that could not be read as a mesh. */
    failed: string[];
}
export declare function useScanImport(): (files: File[]) => Promise<ScanImportResult>;
