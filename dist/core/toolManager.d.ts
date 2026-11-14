import { ViewportTool } from '../types/dicom';
export declare function setupTools(): void;
export declare function setActiveTool(tool: ViewportTool): void;
export declare function addViewportToToolGroup(viewportId: string, renderingEngineId: string): void;
export declare function addViewportTo3DToolGroup(viewportId: string, renderingEngineId: string): void;
