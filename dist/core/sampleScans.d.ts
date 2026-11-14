import { ScanMesh, ScanType } from '../types/dicom';
/** One entry of scans.json, as read — every field is still untrusted here. */
interface SampleScanEntry {
    file?: unknown;
    type?: unknown;
    nameKey?: unknown;
    transform?: unknown;
    triangles?: unknown;
}
/**
 * The manifest is fetched from the host's own public directory, which is not
 * necessarily the one this build shipped: an embedder copies public/sample-io/
 * into their app and may copy an older or edited one. So it is validated rather
 * than trusted — a bad transform would put a scan somewhere arbitrary in the
 * patient's anatomy, which is not a failure worth being quiet about.
 */
export declare function validEntry(e: SampleScanEntry): {
    file: string;
    type: ScanType;
    nameKey: string;
    transform: number[];
    triangles?: number;
} | null;
/**
 * Fetch, decompress and register the sample's scan meshes.
 * `label` turns a manifest nameKey into the display name (an i18n lookup).
 * Returns the ScanMesh descriptors, ready to dispatch as ADD_SCAN.
 */
export declare function loadSampleScans(label: (nameKey: string) => string, base?: string, onProgress?: (frac: number) => void): Promise<ScanMesh[]>;
export {};
