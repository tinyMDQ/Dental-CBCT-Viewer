/**
 * Reusable SVG dental implant silhouette: straight collar, tapered threaded
 * body, rounded apex. Origin (0,0) is the entry point (top-center, platform);
 * the body extends downward to heightPx. Rotation pivots at the entry point.
 */
interface ImplantShapeProps {
    /** Entry point position in SVG pixel coordinates */
    x: number;
    y: number;
    widthPx: number;
    heightPx: number;
    angleDeg?: number;
    active?: boolean;
    label?: string;
    /** Group opacity (e.g. depth fade on the panoramic) */
    opacity?: number;
    /** When true, the whole body (with padding) is a grab target */
    interactive?: boolean;
    /** Faint safety-margin halo around the body, horizontal extent in px */
    safetyXPx?: number;
    /** Vertical safety-margin extent in px (defaults to safetyXPx) */
    safetyYPx?: number;
    /** Safety halo color (any CSS color); defaults to red */
    safetyColor?: string;
    /** Draw a red alert ring when a safety clearance is violated */
    warn?: boolean;
    onPointerDown?: (e: React.PointerEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
}
export declare function ImplantShape({ x, y, widthPx, heightPx, angleDeg, active, label, opacity, interactive, safetyXPx, safetyYPx, safetyColor, warn, onPointerDown, onDoubleClick, }: ImplantShapeProps): import("react/jsx-runtime").JSX.Element;
export {};
