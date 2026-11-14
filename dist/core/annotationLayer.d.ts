/**
 * Cornerstone annotation helpers: per-annotation visibility and removal, plus
 * mapping Cornerstone tool names to our translation tool keys.
 */
export declare function setAnnotationVisible(annotationUID: string, visible: boolean): void;
export declare function removeAnnotationByUid(annotationUID: string): void;
export interface AnnotationMeasure {
    /** Formatted value string (mm / ° / HU), if stats are available yet. */
    value?: string;
    /** World-space handle points of the annotation. */
    points?: [number, number, number][];
}
/**
 * Read the formatted measured value + handle points from a Cornerstone
 * annotation. Stats are computed asynchronously by the tools, so `value` is
 * undefined until they are ready (ANNOTATION_MODIFIED fires once they are).
 */
export declare function readAnnotationMeasure(ann: any): AnnotationMeasure;
/** Cornerstone toolName → tool.<key> translation key suffix */
export declare const CS_TOOL_KEYS: Record<string, string>;
