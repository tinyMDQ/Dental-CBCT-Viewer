import { SliceAxis } from '../../core/slice3D';
export declare function Slice3DActors({ axes, preset, rebuildKey, indexOverride, }: {
    axes: Record<SliceAxis, boolean>;
    preset?: string;
    rebuildKey?: number;
    /**
     * Fixed slice index per axis, for layouts that show no MPR pane to follow
     * (the 3D IO view scrubs its sagittal plane from a slider instead).
     */
    indexOverride?: Partial<Record<SliceAxis, number>>;
}): null;
