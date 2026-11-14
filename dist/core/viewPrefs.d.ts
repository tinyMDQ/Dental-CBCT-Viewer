import { LayoutMode, PanelConfig } from '../types/dicom';
import { JawSide } from './jawSplit';
export interface ViewPrefs {
    layoutMode: LayoutMode;
    panel: PanelConfig;
    /** Which cutting slice planes the 3D view shows. */
    sliceAxes: {
        AXIAL: boolean;
        SAGITTAL: boolean;
        CORONAL: boolean;
    };
    /** The 3D "CS" marker showing where the cross-section cuts. */
    showCrossSection: boolean;
    /** Which jaw the 3D view is cut down to. */
    jawSide: JawSide;
    /** The 3D IO view's sagittal check slice. */
    ioSagittal: boolean;
}
export declare const DEFAULT_VIEW_PREFS: ViewPrefs;
/** Read the stored preferences, falling back to the defaults field by field. */
export declare function loadViewPrefs(): ViewPrefs;
/** Merge a partial update into the stored preferences. */
export declare function saveViewPrefs(patch: Partial<ViewPrefs>): void;
