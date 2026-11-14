interface SliceIndicatorProps {
    onJumpToSlice: (index: number) => void;
    sliceIndex?: number;
    totalSlices?: number;
}
export declare function SliceIndicator({ onJumpToSlice, sliceIndex, totalSlices }: SliceIndicatorProps): import("react/jsx-runtime").JSX.Element;
export {};
