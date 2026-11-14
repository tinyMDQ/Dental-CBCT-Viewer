import { Point2 } from './cprMath';
export type Vec3 = [number, number, number];
export declare function dot3(a: Vec3, b: Vec3): number;
export declare function cross3(a: Vec3, b: Vec3): Vec3;
export interface ArchFrame {
    /** Normalized arch position 0-1 */
    s: number;
    /** Curve point (XY world) */
    point: Point2;
    /** Unit buccolingual normal */
    normal: Point2;
    /** Unit tangent toward increasing s */
    tangent: Point2;
}
/** Frame of the arch at normalized position s (0-1). */
export declare function archFrameAt(controlPoints: Point2[], s: number): ArchFrame | null;
/** Frame of the arch at the curve point nearest (in XY) to `p`. */
export declare function nearestArchFrame(controlPoints: Point2[], p: Point2): ArchFrame | null;
/**
 * Apex direction from the arch frame and the two clinical angles.
 * BL (buccolingual) is a FULL rotation in the cross-section plane: 0 = apex
 * down (lower jaw), ±180 = apex up (upper jaw). MD (mesiodistal) then leans
 * the body along the arch tangent (visible on the panoramic).
 * Composition: rotate -Z by BL about the tangent, then by MD about the normal.
 */
export declare function implantAxis(frame: ArchFrame, angleBLDeg: number, angleMDDeg: number): Vec3;
/**
 * World entry → apex segment of an implant, resolving its axis from the arch
 * frame and the two clinical angles. Used by all views and the safety checks.
 */
export declare function implantWorldAxis(controlPoints: Point2[], imp: {
    position: Vec3;
    angleBLDeg: number;
    angleMDDeg: number;
    length: number;
}): {
    entry: Vec3;
    apex: Vec3;
    axis: Vec3;
} | null;
/**
 * Radius multiplier along the implant (0 = platform, 1 = apex tip).
 * Matches the ImplantShape silhouette: collar, taper to 64%, rounded apex.
 */
export declare function radiusProfile(t01: number): number;
export interface PlaneFrame {
    /** Plane origin in world mm */
    origin: Vec3;
    /** In-plane horizontal unit axis */
    eU: Vec3;
    /** In-plane vertical unit axis (pointing up) */
    eV: Vec3;
}
export interface ImplantBody {
    entry: Vec3;
    axis: Vec3;
    diameter: number;
    length: number;
}
/** Project a world point onto the plane: [u, v, w] (w = out-of-plane). */
export declare function projectToPlane(p: Vec3, frame: PlaneFrame): [number, number, number];
/**
 * Intersection strip of a (thin) plane with a cylinder/cone body whose radius
 * varies along the axis as `radiusFn(t01) · (diameter/2)`. Returned as a closed
 * polygon in plane (u, v) coordinates: each axis sample is a disc, the plane
 * cuts a chord of half-width sqrt(r² − w²) where w is the disc center's
 * distance from the plane. Returns null when the body does not reach the plane.
 */
export declare function cylinderPlaneStrip(body: ImplantBody, frame: PlaneFrame, radiusFn?: (t01: number) => number, samples?: number): [number, number][] | null;
/**
 * Intersection strip of the implant body with a plane (uses the threaded
 * silhouette radius profile). Thin wrapper over {@link cylinderPlaneStrip}.
 */
export declare function implantPlaneStrip(body: ImplantBody, frame: PlaneFrame, samples?: number): [number, number][] | null;
export interface SleeveSpec {
    /** Sleeve working diameter, mm */
    diameter: number;
    /** Sleeve bottom → implant platform distance along the axis, mm */
    offset: number;
    /** Sleeve (bushing) height, mm */
    height: number;
}
/**
 * The drill sleeve as a constant-radius cylinder coaxial with the implant,
 * sitting `offset` mm coronal of (above) the platform. Returned as an
 * {@link ImplantBody} so it can be fed to {@link cylinderPlaneStrip}; sampling
 * runs from the sleeve top (t=0) down toward the platform (t=height).
 */
export declare function sleeveBody(implant: ImplantBody, sleeve: SleeveSpec): ImplantBody;
/**
 * Osteotomy / drill axis as a world segment, from the sleeve top down to the
 * planned drill depth (`drillLength` mm apical of the platform).
 */
export declare function drillSegment(implant: ImplantBody, sleeve: SleeveSpec, drillLength: number): [Vec3, Vec3];
