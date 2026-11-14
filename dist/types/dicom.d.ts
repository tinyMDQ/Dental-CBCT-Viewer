export interface DicomSeriesInfo {
    seriesInstanceUID: string;
    seriesDescription: string;
    seriesNumber: number;
    modality: string;
    imageCount: number;
    imageIds: string[];
    /** In-plane pixel dimensions (columns × rows) of a slice, if known. */
    columns?: number;
    rows?: number;
    /** In-plane pixel spacing in mm (row spacing), if known. */
    pixelSpacingMm?: number;
}
export interface DicomStudyInfo {
    studyInstanceUID: string;
    studyDescription: string;
    studyDate: string;
    patientName: string;
    patientId: string;
    patientBirthDate: string;
    institution: string;
    series: DicomSeriesInfo[];
}
export interface WindowLevelPreset {
    /** Translation key suffix (preset.<key>) */
    key: string;
    windowCenter: number;
    windowWidth: number;
}
export declare const WL_PRESETS: WindowLevelPreset[];
export type ViewportTool = 'windowLevel' | 'pan' | 'zoom' | 'scroll' | 'length' | 'angle' | 'ellipticalRoi' | 'circleRoi' | 'rectangleRoi' | 'freehandRoi' | 'bidirectional' | 'arrowAnnotate' | 'probe' | 'crosshairs';
/** 'IO3D' is the 3D view dedicated to intraoral scans — see ViewportGrid. */
export type LayoutMode = '1x1' | '2x2' | '1+3' | 'OPG2+1' | 'IO3D';
/** A view that can occupy a panel slot in the configurable 1+3 layout. */
export type ViewKey = 'AXIAL' | 'SAGITTAL' | 'CORONAL' | '3D';
export declare const VIEW_KEYS: ViewKey[];
/** Panel assignment for the "3D view" layout: one big slot + three small slots. */
/** Panes available in the Panoramic (OPG) layout; index 0 of `opgOrder` is big. */
export type OpgView = 'PANORAMA' | 'AXIAL' | 'CROSS' | '3D';
export declare const OPG_VIEWS: OpgView[];
export interface PanelConfig {
    big: ViewKey;
    small: [ViewKey, ViewKey, ViewKey];
    /** 'left' = big on the left, 3 stacked right; 'top' = big on top, 3 in a row below */
    arrangement: 'left' | 'top';
    /** '1+3' = one big + three small; '2x2' = four equal panels */
    grid: '1+3' | '2x2';
    /** Panoramic view arrangement: 'top' = big panoramic on top, 3 below; 'left' = big left */
    panoArrangement: 'left' | 'top';
    /** Panoramic layout pane order — index 0 occupies the big slot (swappable). */
    opgOrder: [OpgView, OpgView, OpgView, OpgView];
}
export declare const DEFAULT_PANEL: PanelConfig;
/**
 * Keep `opgOrder` a permutation of the four OPG panes: drop duplicates and fill
 * any gap with the unused views, so a malformed order can never blank a pane.
 */
export declare function normalizeOpgOrder(order: OpgView[] | undefined): [OpgView, OpgView, OpgView, OpgView];
/** Swap the pane at `index` into the big slot (index 0). Reversible. */
export declare function swapOpgBig(order: OpgView[], index: number): [OpgView, OpgView, OpgView, OpgView];
/**
 * Force the four 1+3 panels (big + 3 small) to show four DISTINCT views. Each
 * MPR/3D view maps to a single Cornerstone viewport id, so two panels showing
 * the same view would collide (one goes black). Duplicates are replaced with
 * whichever views are missing, keeping a stable bijection.
 */
export declare function normalizePanelViews(big: ViewKey, small: [ViewKey, ViewKey, ViewKey]): {
    big: ViewKey;
    small: [ViewKey, ViewKey, ViewKey];
};
export type ProjectionMode = 'AVG' | 'MIP';
export type MPROrientation = 'AXIAL' | 'SAGITTAL' | 'CORONAL';
export type ViewMode = MPROrientation | '3D';
/** Translation keys per view mode (use with t()) */
export declare const VIEW_LABEL_KEYS: Record<ViewMode, string>;
export interface ImplantData {
    id: string;
    /** Layer name shown in the layers panel */
    name: string;
    /** Layer visibility */
    visible: boolean;
    /** Entry point (platform center) in world coordinates, mm */
    position: [number, number, number];
    /** Diameter in mm (typical: 3.0–6.0) */
    diameter: number;
    /** Length in mm (typical: 6.0–16.0) */
    length: number;
    /**
     * Buccolingual apex rotation in degrees, in the cross-section plane.
     * Full ±180° range: 0 = apex down (lower jaw), ±180 = apex up (upper jaw).
     */
    angleBLDeg: number;
    /** Mesiodistal apex tilt in degrees (lean along the arch, visible on the panoramic) */
    angleMDDeg: number;
    /** Implant system catalog id (provides sleeve diameter + available sizes) */
    systemId?: string;
    /** Guided (template) surgery plan — drill sleeve + osteotomy protocol */
    guided?: GuidedPlan;
}
export declare const IMPLANT_DIAMETERS: number[];
export declare const IMPLANT_LENGTHS: number[];
/** An implant product line: available sizes + its guided drill sleeve. */
export interface ImplantSystem {
    id: string;
    brand: string;
    line: string;
    diameters: number[];
    lengths: number[];
    /** Persely (drill sleeve) working diameter in mm */
    sleeveDiameter: number;
}
export declare const IMPLANT_SYSTEMS: ImplantSystem[];
export declare const DEFAULT_IMPLANT_SYSTEM_ID = "generic";
/** Guided drill sleeve + osteotomy parameters for one implant. */
export interface GuidedPlan {
    /** Show the sleeve + drill axis on every view */
    enabled: boolean;
    /** Sleeve bottom → implant platform distance along the axis, mm (drill protocol offset) */
    sleeveOffset: number;
    /** Sleeve (bushing) height, mm */
    sleeveHeight: number;
    /** Planned osteotomy depth from the platform along the axis, mm (Fúró hossz) */
    drillLength: number;
}
export declare const SLEEVE_OFFSETS: number[];
/**
 * Drill-guide (surgical template) export parameters. Kept here (no manifold
 * import) so the context/Settings can reference the defaults without pulling in
 * the WASM Boolean kernel — that lives in `core/guideBuilder` (loaded on demand).
 */
export interface GuideParams {
    /** Sleeve housing wall thickness (radial), mm */
    wallMm: number;
    /** Base bar cross-section width, mm */
    baseWidthMm: number;
    /** Base bar cross-section height (Z), mm */
    baseHeightMm: number;
    /** Extra diameter on the drill channel over the sleeve diameter, mm */
    channelTolMm: number;
    /** Angular tessellation of cylinders */
    segments: number;
    /**
     * Cut a stepped seat that accepts a real metal drill sleeve (else a plain
     * bore). Opt-in: enabling it changes the exported geometry, so a plan saved
     * before the seat existed keeps exporting exactly what it did.
     */
    sleeveSeat: boolean;
    /** Radial fit clearance of the sleeve outer Ø in the seat, mm */
    seatClearanceMm: number;
    /** Metal sleeve wall thickness (radial), mm — sets the inner drill channel Ø */
    sleeveWallMm: number;
}
export declare const GUIDE_DEFAULTS: GuideParams;
export declare function getImplantSystem(id: string | undefined): ImplantSystem;
export declare function defaultGuidedPlan(implant: {
    length: number;
}): GuidedPlan;
export type ScanType = 'upperJaw' | 'lowerJaw' | 'oral' | 'bite' | 'antagonist' | 'toothSetup';
/**
 * The two intraoral-scan arches. They get their own view ("3D IO view") and
 * their own visibility toggles, so they are distinguished from the generic
 * scan types (a bite record, an antagonist model, a wax-up).
 */
export declare const IO_SCAN_TYPES: readonly ["upperJaw", "lowerJaw"];
export declare const isIoScan: (type: ScanType) => boolean;
/** An imported surface mesh, aligned to the CBCT by a 4×4 transform. */
export interface ScanMesh {
    id: string;
    name: string;
    type: ScanType;
    color: string;
    opacity: number;
    visible: boolean;
    /** 4×4 column-major transform (vtk userMatrix); registration result */
    transform: number[];
    /** Source file name (the mesh geometry itself is kept in memory, not persisted) */
    fileName: string;
}
export declare const SCAN_DEFAULTS: Record<ScanType, {
    color: string;
    opacity: number;
}>;
export declare const SCAN_TYPES: ScanType[];
/**
 * Guess which arch a mesh file holds from its name. Intraoral scanners and CAD
 * exporters name their files consistently enough for this to be right nearly
 * always (exocad "…-UpperJaw.stl", Medit "…_maxilla", 3Shape "…Mandibular…"),
 * and the type stays editable in the Layers panel when it is not.
 */
export declare function detectScanType(fileName: string): ScanType;
export type AnatomyType = 'nerve' | 'sinus';
/** A traced anatomical boundary as a world-mm polyline with a safety tube. */
export interface AnatomyMarker {
    id: string;
    name: string;
    visible: boolean;
    type: AnatomyType;
    /** Display color */
    color: string;
    /** Safety tube radius, mm */
    radius: number;
    /** World polyline, mm */
    points: [number, number, number][];
}
export declare const ANATOMY_DEFAULTS: Record<AnatomyType, {
    color: string;
    radius: number;
}>;
/** One measurement shown as its own layer in the layers panel */
export interface MeasurementLayer {
    /** Cornerstone annotationUID or generated id for canvas measurements */
    id: string;
    /** 'annotation' = Cornerstone tool on MPR views; 'canvas' = drawn on panoramic/cross-section */
    kind: 'annotation' | 'canvas';
    /** Tool key suffix for tool.<key> translation */
    tool: string;
    name: string;
    visible: boolean;
    /** Canvas measurements: which custom viewport they belong to */
    viewport?: 'panoramic' | 'crossSection';
    /** Canvas measurements: points in normalized image coords (0-1) */
    points?: [number, number][];
    /** Formatted measured value (mm, °, HU) */
    value?: string;
    /** HU samples along a line measurement (for the profile sparkline) */
    profile?: number[];
}
export type Volume3DPreset = 'CT-Bone' | 'CT-Bones' | 'CT-Coronary-Arteries-3' | 'CT-MIP';
export declare const VOLUME_3D_PRESETS: {
    id: Volume3DPreset;
    labelKey: string;
}[];
