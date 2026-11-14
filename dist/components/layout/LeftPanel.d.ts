/**
 * Unified left panel: a thin always-visible rail that expands into a Tools
 * section (interaction modes + measurement/annotation tools) over the Layers
 * list. Lives in the shell's flex row, so expanding it shrinks the viewport
 * instead of covering it. Replaces the old top Toolbar + floating LayersPanel.
 */
export declare function LeftPanel({ embedded }?: {
    embedded?: boolean;
}): import("react/jsx-runtime").JSX.Element;
