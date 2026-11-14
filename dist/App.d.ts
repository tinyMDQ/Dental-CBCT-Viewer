import { SampleKind } from './hooks/useSampleLoad';
import { PlanData } from './core/planIO';
import { ImplantData, LayoutMode, ViewKey } from './types/dicom';
export interface DicomViewerProps {
    /** Optional patient identity shown in the report header. */
    patientId?: string;
    patientName?: string;
    /** Load a saved plan (implants, anatomy, arch, settings…) on mount. */
    initialPlan?: PlanData;
    /** Start in this layout ('1x1' | '1+3' | '2x2' | 'OPG2+1'). */
    initialLayout?: LayoutMode;
    /** UI language ('en' | 'de' | 'es' | 'hu'). */
    lang?: string;
    /** Called (debounced) whenever the plan changes — persist it host-side. */
    onPlanChange?: (plan: PlanData) => void;
    /** Called whenever the implant list changes. */
    onImplantsChange?: (implants: ImplantData[]) => void;
    /** Extra class name on the root element. */
    className?: string;
    /** Embed mode — the host owns page-level consent, so the built-in
     *  disclaimer banner is suppressed. */
    embedded?: boolean;
}
export interface DicomViewerHandle {
    getImplants(): ImplantData[];
    addImplant(implant: ImplantData): void;
    updateImplant(implant: ImplantData): void;
    removeImplant(id: string): void;
    getPlan(): PlanData;
    loadPlan(plan: PlanData): void;
    loadStudy(files: File[]): Promise<void>;
    /** Import surface scans (STL / OBJ / PLY) alongside the open study. The arch
     *  is guessed from each file name; upper/lower scans enable the 3D IO view. */
    loadScans(files: File[]): Promise<void>;
    /** 'ct' (default) is the CBCT alone; 'ctIo' also loads the paired intraoral
     *  scans. Both are served from the host's public/ — see the README. */
    loadSample(kind?: SampleKind): Promise<void>;
    setLayout(mode: LayoutMode): void;
    setActiveView(view: ViewKey): void;
    exportPdf(): Promise<void>;
    exportGuideStl(): Promise<boolean>;
}
/**
 * Embeddable DenCT (Dental CBCT Viewer). Render it (optionally with a ref for the
 * imperative API) and import `dental-cbct-viewer/style.css` once.
 */
declare const DicomViewer: import('react').ForwardRefExoticComponent<DicomViewerProps & import('react').RefAttributes<DicomViewerHandle>>;
export default DicomViewer;
