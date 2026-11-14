import { ReactNode, Dispatch } from 'react';
import { DicomStudyInfo, ViewportTool, LayoutMode, ViewMode, ProjectionMode, ImplantData, MeasurementLayer, AnatomyMarker, AnatomyType, ScanMesh, GuideParams, PanelConfig } from '../types/dicom';
import { JawSide } from '../core/jawSplit';
import { Fiducial } from '../core/fiducials';
import { ParsedPlan } from '../core/planIO';
import { Volume3DQuality, Volume3DColormap } from '../core/volume3DPreset';
export interface ViewerState {
    isInitialized: boolean;
    isLoading: boolean;
    loadProgress: {
        loaded: number;
        total: number;
    } | null;
    study: DicomStudyInfo | null;
    /** All loaded studies (the left-panel folder/series tree). `study` is the active one. */
    studies: DicomStudyInfo[];
    /** Per-study saved working set (volume + plan), so switching studies is instant and lossless. */
    studyPlans: Record<string, StudyPlan>;
    activeSeriesUID: string | null;
    activeTool: ViewportTool;
    layoutMode: LayoutMode;
    /** Panel assignment for the configurable 1+3 layout */
    panel: PanelConfig;
    volumeId: string | null;
    viewMode: ViewMode;
    currentSliceIndex: number;
    totalSlices: number;
    error: string | null;
    archCurveControlPoints: [number, number][] | null;
    panoramicSlabWidth: number;
    panoramicProjection: ProjectionMode;
    panoramicResolution: number;
    crossSectionPosition: number;
    crossSectionTiltDeg: number;
    implants: ImplantData[];
    activeImplantId: string | null;
    implantPlacementMode: boolean;
    /** Implant whose edit popup is open (null = closed) */
    editingImplantId: string | null;
    activePanel: 'layers' | 'settings' | 'help' | 'patients' | 'intro' | null;
    patientOpen: boolean;
    toolsOpen: boolean;
    layersOpen: boolean;
    seriesOpen: boolean;
    windowLevel: {
        wc: number;
        ww: number;
    };
    safety: {
        marginMm: number;
        color: string;
        nerveMm: number;
        sinusMm: number;
        neighborMm: number;
    };
    anatomy: AnatomyMarker[];
    anatomyDrawMode: AnatomyType | null;
    activeAnatomyId: string | null;
    guide: GuideParams;
    defaultSystemId: string;
    scans: ScanMesh[];
    registration: RegistrationSession | null;
    report: ReportFields;
    display: DisplayConfig;
    /**
     * Which jaw the 3D view shows. Lives in shared state rather than in the
     * viewport because landmark picking has to respect the same cut — clicking a
     * jaw that has been clipped away must not return a point on it.
     */
    jawSide: JawSide;
    measurements: MeasurementLayer[];
    /** Set when a plan file recorded for a different study was ignored (UI may warn) */
    planMismatch: boolean;
}
/** The per-study working set that is snapshotted/restored when switching studies. */
export type StudyPlan = Pick<ViewerState, 'volumeId' | 'activeSeriesUID' | 'windowLevel' | 'implants' | 'anatomy' | 'measurements' | 'archCurveControlPoints' | 'scans' | 'registration' | 'activeImplantId' | 'editingImplantId' | 'activeAnatomyId' | 'anatomyDrawMode'>;
export interface ReportFields {
    patientName: string;
    patientAge: string;
    patientBirthDate: string;
    quoteNumber: string;
    statusDescription: string;
    /** On-image text overrides (empty = use the DICOM value) */
    clinic: string;
    studyDate: string;
    seriesName: string;
}
/** On-image display + overlay styling preferences (Settings → General). */
export interface DisplayConfig {
    showName: boolean;
    showBirth: boolean;
    showDate: boolean;
    showClinic: boolean;
    /** Orientation label color (Axial/Sagittal/Coronal) */
    labelColor: string;
    /** Orientation label font size, px — separate for the main and the side views */
    labelSizeMain: number;
    labelSizeSide: number;
    labelAlign: 'left' | 'center' | 'right';
    /** On-image series/modality/slice-number toggles */
    showSeries: boolean;
    showModality: boolean;
    showSlice: boolean;
    /** Whether on-image data shows on the main (big) view only, or every view */
    scope: 'main' | 'all';
    /** 3D slice-plane opacity (0.05–1) */
    sliceOpacity: number;
    /** Default 3D volume preset (CT-Bone, …, or the custom "X-Ray") */
    preset3d: string;
    /** 3D render quality (volume-mapper sampling density) */
    quality3d: Volume3DQuality;
    /** 3D colormap (RGB transfer function tint) */
    colormap3d: Volume3DColormap;
}
export declare const DISPLAY_DEFAULTS: DisplayConfig;
/** One landmark pair (scan point + corresponding CBCT point), world mm. */
export interface RegPair {
    scan: [number, number, number] | null;
    cbct: [number, number, number] | null;
}
/** Active 3-point landmark registration session for one scan. */
export interface RegistrationSession {
    scanId: string;
    pairs: RegPair[];
    /** Which slot/side is currently awaiting a click, if any */
    picking: {
        slot: number;
        kind: 'scan' | 'cbct';
    } | null;
    /**
     * Radiopaque marker candidates found in the CT. They are proposals, not
     * answers — a restoration can look just like a bead — so they are drawn for
     * the operator to click, and a CBCT pick near one snaps to its centre.
     */
    fiducials: Fiducial[];
}
export type ViewerAction = {
    type: 'SET_INITIALIZED';
} | {
    type: 'SET_LOADING';
    payload: boolean;
} | {
    type: 'SET_LOAD_PROGRESS';
    payload: {
        loaded: number;
        total: number;
    };
} | {
    type: 'SET_STUDY';
    payload: DicomStudyInfo;
} | {
    type: 'ADD_STUDIES';
    payload: DicomStudyInfo[];
} | {
    type: 'SET_ACTIVE_STUDY';
    payload: string;
} | {
    type: 'REMOVE_STUDY';
    payload: string;
} | {
    type: 'SET_ACTIVE_SERIES';
    payload: string;
} | {
    type: 'SET_ACTIVE_TOOL';
    payload: ViewportTool;
} | {
    type: 'SET_LAYOUT_MODE';
    payload: LayoutMode;
} | {
    type: 'SET_PANEL';
    payload: Partial<PanelConfig>;
} | {
    type: 'SET_VOLUME_ID';
    payload: string;
} | {
    type: 'SET_VIEW_MODE';
    payload: ViewMode;
} | {
    type: 'SET_SLICE_INFO';
    payload: {
        index: number;
        total: number;
    };
} | {
    type: 'SET_ERROR';
    payload: string | null;
} | {
    type: 'SET_ARCH_CURVE';
    payload: [number, number][];
} | {
    type: 'SET_PANORAMIC_SLAB';
    payload: number;
} | {
    type: 'SET_PANORAMIC_PROJECTION';
    payload: ProjectionMode;
} | {
    type: 'SET_PANORAMIC_RESOLUTION';
    payload: number;
} | {
    type: 'SET_CROSS_SECTION_POSITION';
    payload: number;
} | {
    type: 'SET_CROSS_SECTION_TILT';
    payload: number;
} | {
    type: 'ADD_IMPLANT';
    payload: ImplantData;
} | {
    type: 'UPDATE_IMPLANT';
    payload: ImplantData;
} | {
    type: 'REMOVE_IMPLANT';
    payload: string;
} | {
    type: 'SET_ACTIVE_IMPLANT';
    payload: string | null;
} | {
    type: 'SET_IMPLANT_PLACEMENT_MODE';
    payload: boolean;
} | {
    type: 'SET_EDITING_IMPLANT';
    payload: string | null;
} | {
    type: 'SET_ACTIVE_PANEL';
    payload: 'layers' | 'settings' | 'help' | 'patients' | 'intro' | null;
} | {
    type: 'TOGGLE_PANEL';
    payload: 'layers' | 'settings' | 'help' | 'patients' | 'intro';
} | {
    type: 'TOGGLE_PATIENT';
} | {
    type: 'TOGGLE_TOOLS';
} | {
    type: 'TOGGLE_LAYERS';
} | {
    type: 'TOGGLE_SERIES';
} | {
    type: 'SET_WINDOW_LEVEL';
    payload: {
        wc: number;
        ww: number;
    };
} | {
    type: 'SET_SAFETY';
    payload: Partial<{
        marginMm: number;
        color: string;
        nerveMm: number;
        sinusMm: number;
        neighborMm: number;
    }>;
} | {
    type: 'SET_GUIDE';
    payload: Partial<GuideParams>;
} | {
    type: 'SET_DEFAULT_SYSTEM';
    payload: string;
} | {
    type: 'SET_REPORT';
    payload: Partial<ReportFields>;
} | {
    type: 'SET_DISPLAY';
    payload: Partial<DisplayConfig>;
} | {
    type: 'SET_JAW_SIDE';
    payload: JawSide;
} | {
    type: 'ADD_ANATOMY';
    payload: AnatomyMarker;
} | {
    type: 'UPDATE_ANATOMY';
    payload: AnatomyMarker;
} | {
    type: 'REMOVE_ANATOMY';
    payload: string;
} | {
    type: 'SET_ANATOMY_DRAW_MODE';
    payload: AnatomyType | null;
} | {
    type: 'SET_ACTIVE_ANATOMY';
    payload: string | null;
} | {
    type: 'ADD_SCAN';
    payload: ScanMesh;
} | {
    type: 'UPDATE_SCAN';
    payload: ScanMesh;
} | {
    type: 'REMOVE_SCAN';
    payload: string;
} | {
    type: 'START_REGISTRATION';
    payload: string;
} | {
    type: 'SET_REG_PICKING';
    payload: {
        slot: number;
        kind: 'scan' | 'cbct';
    } | null;
} | {
    type: 'SET_REG_POINT';
    payload: {
        slot: number;
        kind: 'scan' | 'cbct';
        point: [number, number, number];
    };
} | {
    type: 'SET_REG_FIDUCIALS';
    payload: Fiducial[];
} | {
    type: 'ADD_REG_PAIR';
} | {
    type: 'REMOVE_REG_PAIR';
    payload: number;
} | {
    type: 'END_REGISTRATION';
} | {
    type: 'LOAD_PLAN';
    payload: ParsedPlan;
} | {
    type: 'ADD_MEASUREMENT';
    payload: MeasurementLayer;
} | {
    type: 'UPDATE_MEASUREMENT';
    payload: MeasurementLayer;
} | {
    type: 'REMOVE_MEASUREMENT';
    payload: string;
} | {
    type: 'RESET';
};
/**
 * Landmark pairs a registration may use. Three is the minimum a rigid transform
 * needs; more is better, because each pair carries the operator's click error
 * and a least-squares fit averages it down.
 */
export declare const MIN_REG_PAIRS = 3;
export declare const MAX_REG_PAIRS = 8;
/**
 * Apply a plan's saved scans to the ones this session already has.
 *
 * A plan stores descriptors, not geometry, so loading one must not simply
 * replace the list: the common case is a plan reopened *after* the meshes have
 * been imported again, and overwriting would drop the loaded geometry in favour
 * of entries pointing at nothing. Matching on the file name instead means the
 * saved registration lands back on the mesh it was measured for, whatever id it
 * was given this time.
 *
 * A saved scan with no file loaded is kept anyway, as a placeholder: it is how
 * the UI can say which file to re-import to get the registration back. A loaded
 * scan the plan has never heard of is left alone.
 *
 * Exported for unit tests.
 */
export declare function mergePlanScans(current: ScanMesh[], saved: ScanMesh[]): ScanMesh[];
/** Exported for unit tests. */
export declare const initialState: ViewerState;
export declare function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState;
export declare function ViewerProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useViewer(): {
    state: ViewerState;
    dispatch: Dispatch<ViewerAction>;
};
