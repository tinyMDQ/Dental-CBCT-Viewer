/**
 * SVG overlay on the cross-section viewport for placing and editing implants.
 *
 * Implants are true 3D objects (world position + 3D apex axis). The overlay
 * always shows a "ghost" silhouette of each visible implant (fading with its
 * distance from the plane, so it stays grabbable while browsing sections) and
 * highlights the actual plane∩body intersection strip on top of it: centered
 * on the plane the highlight covers the full body, a few mm away only the
 * edge of the cylinder lights up.
 */
interface ImplantOverlayProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    /** Physical width of the cross-section in mm */
    widthMm: number;
    /** zMin / zMax from CPR result */
    zMin: number;
    zMax: number;
}
export declare function ImplantOverlay({ containerRef, canvasRef, widthMm, zMin, zMax }: ImplantOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
