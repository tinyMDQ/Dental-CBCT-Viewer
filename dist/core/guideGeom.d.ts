import { Vec3 } from './implantGeometry';
export interface TriMesh {
    /** xyz per vertex, length 3·V */
    positions: Float32Array;
    /** 3 vertex indices per triangle, length 3·T */
    indices: Uint32Array;
}
/**
 * Closed capped cylinder between world points `p0` and `p1` with `radius`.
 * `segments` (≥3) sets the angular tessellation. Outward-oriented.
 */
export declare function cylinderMesh(p0: Vec3, p1: Vec3, radius: number, segments?: number): TriMesh;
/**
 * Rectangular-section prism swept along `centerline` (≥2 world points). The
 * section is `width` wide (horizontal, perpendicular to the XY tangent) and
 * `height` tall (along world Z). End-capped, outward-oriented.
 */
export declare function sweptBarMesh(centerline: Vec3[], width: number, height: number): TriMesh;
/**
 * Signed volume of an indexed mesh via the divergence theorem (Σ of signed
 * tetrahedra from the origin). Positive for a closed, outward-oriented mesh.
 * Used by tests; also a cheap sanity gauge.
 */
export declare function meshVolume(m: TriMesh): number;
/**
 * True iff every directed edge appears exactly once — i.e. the mesh is a
 * closed, consistently-oriented 2-manifold (the precondition manifold-3d needs).
 */
export declare function isClosedOriented(m: TriMesh): boolean;
/** Cylinder segment: axis endpoints + radius. */
export interface BoreCylinder {
    a: Vec3;
    b: Vec3;
    radius: number;
}
export interface SleeveSeatPlan {
    /** Wide pocket the metal sleeve drops into (from the occlusal opening down). */
    seat: BoreCylinder;
    /** Narrow drill channel below the seat, continuing toward the apex. */
    channel: BoreCylinder;
    /** Housing outer radius (wall around the seat). */
    housingRadius: number;
    /** Axis parameter (mm from entry, +apical) of the seat floor the sleeve rests on. */
    shoulderT: number;
}
export interface SleeveSeatParams {
    wallMm: number;
    seatClearanceMm: number;
    sleeveWallMm: number;
    channelTolMm: number;
}
/**
 * Plan a stepped sleeve seat along an implant axis so the printed guide accepts
 * a real metal drill sleeve of outer diameter `sleeveOuterDiameter`:
 *
 *   ── occlusal opening ──┐  seat  Ø = working + 2·wall + 2·clearance
 *          shoulder  ─────┤  ← the sleeve rests here (repeatable drill stop)
 *                         │  channel  Ø = working + channelTol
 *                        apex
 *
 * `at(t) = entry + axis·t`; the sleeve occupies the occlusal region (negative t,
 * above the platform). Pure — no WASM.
 */
export declare function planSleeveSeat(entry: Vec3, axis: Vec3, implantLength: number, sleeveWorkingDiameter: number, sleeveOffset: number, sleeveHeight: number, p: SleeveSeatParams): SleeveSeatPlan;
