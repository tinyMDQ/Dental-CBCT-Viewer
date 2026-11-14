interface ViewportOverlayProps {
    sliceIndex?: number;
    totalSlices?: number;
    /** Which view this overlay is on — used for the "main view only" scope */
    viewKey?: string;
}
export declare function ViewportOverlay({ sliceIndex, totalSlices, viewKey }?: ViewportOverlayProps): import("react/jsx-runtime").JSX.Element | null;
export {};
