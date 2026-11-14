/**
 * Syncs imported scan-mesh actors into the Cornerstone VOLUME_3D viewport.
 * Geometry comes from the scanMesh registry (by id); this component only
 * mirrors the ScanMesh metadata (color / opacity / visibility / transform)
 * onto vtk actors, rebuilding them when the scans change.
 */
export declare function ScanActors(): null;
