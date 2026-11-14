import { Vec3 } from './implantGeometry';
/** Constant-radius tube actor for an anatomy polyline (nerve / sinus). */
export declare function buildAnatomyTube(points: Vec3[], radiusMm: number, colorHex: string, opacity?: number): any | null;
export interface Implant3DSleeve {
    diameter: number;
    offset: number;
    height: number;
}
export interface Implant3DInput {
    entry: Vec3;
    axis: Vec3;
    diameter: number;
    length: number;
    active: boolean;
    sleeve?: Implant3DSleeve;
}
export interface Implant3DLayers {
    implant: boolean;
    sleeve: boolean;
    axis: boolean;
}
/** Build the set of {key, actor} for one implant per the enabled 3D layers. */
export declare function buildImplantActors(imp: Implant3DInput, layers: Implant3DLayers): {
    key: string;
    actor: any;
}[];
