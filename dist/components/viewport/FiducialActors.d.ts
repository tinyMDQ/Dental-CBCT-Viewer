/**
 * Draws the detected radiopaque markers into the 3D scene while a registration
 * is running. Renders nothing itself.
 *
 * Without them the operator would be told "six markers found" and have no way
 * to aim at one. With them, picking the CBCT side of a pair stops being "click
 * the right voxel of a translucent volume" and becomes "click the bead you can
 * see" — which is the whole point of detecting them.
 *
 * A candidate that has already been assigned to a pair is drawn in the accent
 * colour, so what is left to do is obvious at a glance.
 */
export declare function FiducialActors(): null;
