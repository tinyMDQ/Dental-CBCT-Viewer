export interface FeatureItem {
    icon: string;
    title: string;
    desc?: string;
}
export declare function FeatureGrid({ items, variant, }: {
    items: FeatureItem[];
    variant?: 'card' | 'chip';
}): import("react/jsx-runtime").JSX.Element;
