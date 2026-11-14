import { DicomStudyInfo, ImplantData, MeasurementLayer, AnatomyMarker } from '../types/dicom';
import { OverlayContent, OverlayData } from './viewCapture';
import { ReportFields } from '../context/ViewerContext';
/** What the PDF report includes — every section/field can be toggled. */
export interface PdfConfig {
    patientName: boolean;
    birth: boolean;
    studyDate: boolean;
    age: boolean;
    quote: boolean;
    status: boolean;
    clinic: boolean;
    views: boolean;
    implants: boolean;
    measurements: boolean;
    safety: boolean;
    boneQuality: boolean;
    disclaimer: boolean;
    landscape: boolean;
    viewsCols: number;
    /** data-vp keys to capture (null = every view on screen) */
    selectedViews: string[] | null;
    /** on-image info burned onto the view images (null = only the SVG overlays) */
    overlays: OverlayContent | null;
}
export declare const PDF_CONFIG_DEFAULTS: PdfConfig;
interface PdfExportOptions {
    t: (key: string, params?: Record<string, string | number>) => string;
    study: DicomStudyInfo | null;
    implants: ImplantData[];
    measurements: MeasurementLayer[];
    report?: ReportFields;
    anatomy?: AnatomyMarker[];
    archCurve?: [number, number][] | null;
    thresholds?: {
        nerve: number;
        sinus: number;
        neighbor: number;
    };
    /** implant id → bone quality label (e.g. "D2 · 712 GV" — uncalibrated CBCT gray values) */
    boneQuality?: Record<string, string>;
    lang: string;
    config?: Partial<PdfConfig>;
    /** resolved overlay strings, when config.overlays burns info onto the images */
    overlayData?: OverlayData;
}
export declare function exportViewPdf({ t, study, implants, measurements, report, anatomy, archCurve, thresholds, boneQuality, lang, config, overlayData }: PdfExportOptions): Promise<void>;
export {};
