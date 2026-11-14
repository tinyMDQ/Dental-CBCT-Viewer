import { RawVolume } from './rawVolumeLoader';
/** True when the file list looks like a GALILEOS export. */
export declare function matchGalileos(files: File[]): boolean;
export declare function parseGalileos(files: File[], onProgress?: (pct: number) => void): Promise<RawVolume>;
