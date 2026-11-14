/**
 * Draws the cross-section cut plane inside the Cornerstone VOLUME_3D scene, so
 * the 3D view shows WHERE the panoramic cross-section is slicing. Renders
 * nothing itself — it just syncs a vtk actor into the 3D viewport.
 *
 * The quad follows the arch curve, the cross-section position and its tilt, so
 * dragging the cut on the panoramic moves this marker live.
 *
 * Toggled by the 3D view's "CS" slice-plane button.
 */
export declare function CrossSection3DActor({ enabled }?: {
    enabled?: boolean;
}): null;
