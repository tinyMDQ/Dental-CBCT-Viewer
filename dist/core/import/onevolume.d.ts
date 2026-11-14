import { RawVolume } from './rawVolumeLoader';
export declare function matchOneVolume(files: File[]): boolean;
export declare function parseOneVolume(files: File[], onProgress?: (pct: number) => void): Promise<RawVolume>;
