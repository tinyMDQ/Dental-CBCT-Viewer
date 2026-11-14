import { PdfConfig } from './pdfExport';
import { GuideIssue } from './guideValidate';
import { OverlayData } from './viewCapture';
import { ViewerState } from '../context/ViewerContext';
export type { GuideIssue };
type TFn = (key: string, params?: Record<string, string | number>) => string;
/** Resolve the on-image overlay strings (name, clinic, …) from viewer state. */
export declare function overlayDataFromState(state: ViewerState): OverlayData;
/** Build and download the multi-view implant-planning PDF report. */
export declare function exportPlanPdf(state: ViewerState, t: TFn, lang: string, config?: Partial<PdfConfig>): Promise<void>;
/** Pure printability/safety pre-check for the current guide plan (no CSG). */
export declare function checkGuide(state: ViewerState): GuideIssue[];
/** Build the printable drill guide via CSG and download it as a binary STL.
 *  `ok` is false when there is no arch curve or no guided implant; `warnings`
 *  carries build warnings (e.g. a non-watertight scan). */
export declare function exportDrillGuideStl(state: ViewerState): Promise<{
    ok: boolean;
    warnings: string[];
}>;
