/**
 * 3D slice-plane actors — the orthogonal CT slices rendered as textured plane
 * meshes inside the Cornerstone VOLUME_3D scene (voxel-viewer style
 * "intersecting plains").
 *
 * IMPORTANT: these are ordinary textured vtkActor meshes (same pipeline as the
 * implant meshes), NOT vtkImageSlice. An ImageSlice added to the VOLUME_3D
 * volume-rendering viewport stalls the ray-caster and freezes the UI; a plane
 * mesh with a canvas texture renders safely alongside the volume.
 */
export type SliceAxis = 'AXIAL' | 'SAGITTAL' | 'CORONAL';
export declare const SLICE_AXES: SliceAxis[];
/** Slice-plane opacity in the 3D scene (semi-transparent so the volume shows through). */
export declare const SLICE_OPACITY = 0.7;
export interface VOI {
    wc: number;
    ww: number;
}
export interface VolumeInfo {
    /** Voxel accessor (i, j, k) — from Cornerstone's voxelManager (v2). */
    getVoxel: (i: number, j: number, k: number) => number;
    dims: [number, number, number];
    spacing: [number, number, number];
    origin: [number, number, number];
}
/** Middle slice index of the volume along an axis. */
export declare function centerSliceIndex(vi: VolumeInfo, axis: SliceAxis): number;
/** Number of slices along an axis. */
export declare function sliceCount(vi: VolumeInfo, axis: SliceAxis): number;
/** Slice index nearest a world point along an axis (clamped to the volume). */
export declare function sliceIndexAtWorld(vi: VolumeInfo, axis: SliceAxis, p: [number, number, number]): number;
/** Build a textured plane-mesh actor for one orthogonal slice at `index`. */
export declare function buildSliceActor(vi: VolumeInfo, axis: SliceAxis, index: number, voi: VOI, opacity?: number): any;
