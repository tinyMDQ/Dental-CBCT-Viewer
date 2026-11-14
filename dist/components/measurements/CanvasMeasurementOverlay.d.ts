import { ViewportTool } from '../../types/dicom';
export declare function isMeasureTool(tool: ViewportTool): boolean;
interface CanvasMeasurementOverlayProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    viewport: 'panoramic' | 'crossSection';
    /** Physical extent of the full image in mm [width, height] (null while no image) */
    getExtentMm: () => [number, number] | null;
    /** Sample the underlying HU value at normalized image coords */
    sampleHU?: (u: number, v: number) => number | null;
}
export declare function CanvasMeasurementOverlay({ containerRef, canvasRef, viewport, getExtentMm, sampleHU, }: CanvasMeasurementOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
