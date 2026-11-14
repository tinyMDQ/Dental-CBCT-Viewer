import { MPROrientation } from '../../types/dicom';
interface ViewportMPRProps {
    orientation: MPROrientation;
    volumeId: string;
}
export declare function ViewportMPR({ orientation, volumeId }: ViewportMPRProps): import("react/jsx-runtime").JSX.Element;
export {};
