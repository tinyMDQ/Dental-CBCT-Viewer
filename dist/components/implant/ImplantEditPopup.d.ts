/**
 * Pop-up editor for one implant's properties. Opened from the layers panel
 * "módosítás" icon (replaces the old toolbar inline editor).
 */
interface ImplantEditPopupProps {
    implantId: string;
    onClose: () => void;
}
export declare function ImplantEditPopup({ implantId, onClose }: ImplantEditPopupProps): import("react/jsx-runtime").JSX.Element | null;
export {};
