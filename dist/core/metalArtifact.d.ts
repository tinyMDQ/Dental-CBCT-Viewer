import { VolumeSamplingData } from './cprMath';
import { Vec3 } from './implantGeometry';
export interface MetalSite {
    /** World-mm centre of the lump. */
    center: Vec3;
    /** Its volume, mm³. */
    volumeMm3: number;
}
export interface MetalReport {
    /** Total high-density material found, mm³. */
    volumeMm3: number;
    /** Largest lumps first; small scatter is merged into the totals, not listed. */
    sites: MetalSite[];
    /**
     * `none` — nothing above the threshold worth mentioning.
     * `minor` — a filling or two; surfaces away from them are still usable.
     * `severe` — enough metal that surface-based registration should not be
     *            trusted anywhere in the arch.
     */
    severity: 'none' | 'minor' | 'severe';
}
export interface MetalOptions {
    /**
     * Density above which material is metal rather than tissue. Enamel, the
     * densest tissue in the scan, tops out around 2500 HU in CBCT, so 3000 sits
     * clear of it. Raise it for a scanner that reads enamel high.
     */
    threshold?: number;
    /** Sampling lattice, mm. Restorations are millimetres across. */
    latticeMm?: number;
    /** Lumps smaller than this are scatter noise, counted but not listed. */
    minSiteMm3?: number;
    /** At most this many sites are returned. */
    maxSites?: number;
}
/**
 * Sweep the volume for material denser than any tissue and group it into lumps.
 *
 * Cost is set by the lattice, not the volume's resolution: at the 1 mm default
 * a full head field of view is a few hundred thousand samples.
 */
export declare function assessMetal(vol: VolumeSamplingData, opts?: MetalOptions): MetalReport;
