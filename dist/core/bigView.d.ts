import { LayoutMode, ViewMode, PanelConfig, ViewKey, OpgView } from '../types/dicom';
/** The view shown in the big slot of the current layout. */
export declare function bigView(layout: LayoutMode, viewMode: ViewMode, panel: PanelConfig): ViewKey | OpgView;
/**
 * Cornerstone viewport id backing the big view, or null when the big view is
 * one of our own canvases (panoramic / cross-section), which are drawn
 * fit-to-pane and have no camera zoom.
 */
export declare function bigViewportId(layout: LayoutMode, viewMode: ViewMode, panel: PanelConfig): string | null;
