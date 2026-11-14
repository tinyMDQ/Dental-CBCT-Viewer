/**
 * Loading the two bundled demo data sets, from the landing page or the top bar.
 *
 *  - CT sample:        public/sample/    — a de-identified CBCT on its own.
 *  - CT + IO sample:   public/sample-io/ — a CBCT *and* the patient's upper and
 *                      lower intraoral scans, already paired to it (the 4×4
 *                      transforms were measured offline; see
 *                      scripts/register-scan-to-cbct.cjs), so the "3D IO view"
 *                      shows the arches sitting on the bone straight away.
 *
 * Both are kept out of the landing bundle: Cornerstone, the sample loader and
 * the mesh readers are all imported on demand.
 */
export type SampleKind = 'ct' | 'ctIo';
export declare function useSampleLoad(): (kind: SampleKind, onProgress?: (pct: number) => void) => Promise<boolean>;
