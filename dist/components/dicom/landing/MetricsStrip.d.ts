/** Four highlighted stats below the hero (value + short label). */
export interface Metric {
    value: string;
    label: string;
}
export declare function MetricsStrip({ items }: {
    items: Metric[];
}): import("react/jsx-runtime").JSX.Element;
