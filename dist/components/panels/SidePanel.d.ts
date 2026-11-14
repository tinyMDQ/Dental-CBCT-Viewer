import { ReactNode } from 'react';
interface SidePanelProps {
    open: boolean;
    title: string;
    onClose: () => void;
    closeTitle: string;
    children: ReactNode;
}
export declare function SidePanel({ open, title, onClose, closeTitle, children }: SidePanelProps): import("react/jsx-runtime").JSX.Element;
export {};
