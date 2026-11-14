/**
 * Custom "X-ray" translucent transfer function for the 3D volume — an
 * alternative to Cornerstone's opaque shaded presets (CT-Bone, …).
 *
 * The voxel-viewer look comes from a MIP / attenuation render: no surface
 * shading and no opacity occlusion, so bone stays see-through. We approximate it
 * in Cornerstone by disabling shading and using a low, linear opacity ramp
 * driven by the window/level, instead of a dense surface transfer function.
 */
export declare const XRAY_PRESET_ID = "X-Ray";
export type Volume3DQuality = 'low' | 'medium' | 'high';
/** Set the volume mapper's sampling density → a real low/medium/high quality difference. */
export declare function applyQuality3D(actor: any, quality: Volume3DQuality): void;
export type Volume3DColormap = 'grayscale' | 'cool' | 'warm' | 'spectral' | 'inverted';
export declare const VOLUME_3D_COLORMAPS: Volume3DColormap[];
/** Override the volume's RGB transfer function with a colormap across the W/L window. */
export declare function applyColormap3D(actor: any, colormap: Volume3DColormap, wl: {
    wc: number;
    ww: number;
}): void;
/** Apply preset (opacity/shape) + colormap (hue) + quality (sampling) to a VOLUME_3D viewport. */
export declare function applyVolumeStyle(viewport: any, opts: {
    preset: string;
    colormap: Volume3DColormap;
    quality: Volume3DQuality;
    wl: {
        wc: number;
        ww: number;
    };
}): void;
/**
 * Apply the translucent X-ray transfer function to a vtk volume actor, mapping
 * the window/level (HU) range to a soft grayscale, low-opacity ramp.
 * `maxOpacity` (0.05–0.5) controls how solid the densest tissue looks.
 */
export declare function applyXrayPreset(actor: any, wl: {
    wc: number;
    ww: number;
}, maxOpacity?: number): void;
