import { Vec3 } from './implantGeometry';
/**
 * A marker cloud reduced to what the TRE formula needs: where it sits and how
 * it is spread about each of its own principal axes.
 */
export interface FiducialSpread {
    /** How many markers the fit used. */
    count: number;
    centroid: Vec3;
    /** Principal axes of the marker cloud, unit length. */
    axes: [Vec3, Vec3, Vec3];
    /** RMS distance of the markers from each principal axis, mm. */
    axisRms: [number, number, number];
}
/**
 * Floor on the estimated localisation error. Three points can happen to fit a
 * rigid transform almost exactly, which drives the FRE — and with it the whole
 * estimate — to zero and would report a perfect registration from a fluke.
 * Nobody picks a cusp tip, or centres a bead, better than this, so the floor
 * keeps the estimate from claiming they did. It bounds the *estimate*; it is
 * not a measurement of this operator or this scanner.
 */
export declare const MIN_FLE_MM = 0.1;
/**
 * Reduce a marker cloud to its centroid, principal axes and per-axis spread.
 * Returns null below three markers, where a rigid fit has nothing to spare and
 * the error model does not apply.
 */
export declare function fiducialSpread(points: Vec3[]): FiducialSpread | null;
/**
 * Per-marker localisation error implied by the observed fit residual.
 *
 * A rigid fit absorbs part of every click error, so the residual it leaves
 * understates how badly each point was placed — by a factor that depends only
 * on how many points shared the work.
 */
export declare function estimateFle(freMm: number, count: number): number;
/**
 * Expected registration error at a world point, in mm.
 *
 * Infinite when the markers are collinear and the target is off that line:
 * that is not a numerical accident but the honest answer, since nothing in the
 * fit determines rotation about the line the markers lie on.
 */
export declare function predictTre(target: Vec3, spread: FiducialSpread, fleMm: number): number;
/** One target's predicted error, carried with whatever named it. */
export interface TargetError<T = string> {
    target: T;
    treMm: number;
}
export interface RegistrationAccuracy<T = string> {
    /** Localisation error per marker implied by the residual, mm. */
    fleMm: number;
    /** Predicted error at each target, worst first. */
    targets: TargetError<T>[];
    /** The worst predicted error, or null when there was nothing to evaluate. */
    worstMm: number | null;
    /** True when the markers are collinear, so rotation about that line is free. */
    degenerate: boolean;
}
/**
 * Predict the error at every target of a registration in one call: the shape
 * the UI wants, since it reports the worst case and names which target it is.
 */
export declare function registrationAccuracy<T = string>(fiducials: Vec3[], freMm: number, targets: {
    target: T;
    point: Vec3;
}[]): RegistrationAccuracy<T> | null;
