import { Vec3 } from './implantGeometry';
export interface CropBox {
    /** Lower corner, normalized 0–1 of the volume bounds per axis */
    min: [number, number, number];
    /** Upper corner, normalized 0–1 */
    max: [number, number, number];
}
export declare const NO_CROP: CropBox;
export interface ClipPlaneParam {
    origin: Vec3;
    normal: Vec3;
}
/**
 * Clipping planes for the crop box within world bounds [bmin, bmax]. Only the
 * sides that actually cut (crop.min > 0 or crop.max < 1) produce a plane.
 */
export declare function clipPlanes(bmin: Vec3, bmax: Vec3, crop: CropBox): ClipPlaneParam[];
