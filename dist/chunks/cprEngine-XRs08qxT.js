import { cache as Q } from "@cornerstonejs/core";
import { n as R, u as W } from "./archCurve-DCaMAt3K.js";
import { c as _, b as $, t as y } from "./cprMath-DBemhKEF.js";
function C(o) {
  const n = Q.getVolume(o);
  if (!n?.voxelManager) return null;
  const v = n.dimensions, i = n.spacing, r = n.origin, a = n.voxelManager, h = (e, x, S) => a.getAtIJK(e, x, S), l = r[2], t = r[2] + (v[2] - 1) * i[2];
  return {
    dims: v,
    origin: r,
    getVoxel: h,
    invSx: 1 / i[0],
    invSy: 1 / i[1],
    invSz: 1 / i[2],
    zMin: Math.min(l, t),
    zMax: Math.max(l, t),
    vSpacing: Math.abs(i[2])
  };
}
function T(o) {
  const n = C(o.volumeId);
  if (!n)
    return console.warn("[DQ-CPR] Volume not found:", o.volumeId), null;
  const v = R(o.controlPoints, 10), i = W(v), r = Math.max(50, Math.round(i / o.resolution)), { curve: a, normals: h, arcLen: l } = $(o.controlPoints, r);
  if (a.length < 2) return null;
  const t = a.length, e = Math.max(1, Math.round((n.zMax - n.zMin) / n.vSpacing)), x = l / Math.max(1, t - 1), S = o.slabWidth / 2, u = Math.max(1, Math.round(o.slabWidth / 1)), f = o.projection === "MIP";
  console.time("[DQ-CPR] Panoramic generation");
  const d = new Float32Array(t * e);
  for (let s = 0; s < t; s++) {
    const [P, p] = a[s], [I, w] = h[s];
    for (let g = 0; g < e; g++) {
      const b = n.zMax - g * n.vSpacing;
      if (u <= 1) {
        const c = (P - n.origin[0]) * n.invSx, m = (p - n.origin[1]) * n.invSy, M = (b - n.origin[2]) * n.invSz;
        d[g * t + s] = y(n.getVoxel, n.dims, c, m, M);
      } else {
        let c = f ? -1 / 0 : 0;
        for (let m = 0; m < u; m++) {
          const M = -S + m / (u - 1) * o.slabWidth, A = P + I * M, D = p + w * M, V = (A - n.origin[0]) * n.invSx, E = (D - n.origin[1]) * n.invSy, L = (b - n.origin[2]) * n.invSz, z = y(n.getVoxel, n.dims, V, E, L);
          f ? z > c && (c = z) : c += z;
        }
        f || (c /= u), d[g * t + s] = c;
      }
    }
  }
  return console.timeEnd("[DQ-CPR] Panoramic generation"), console.log(`[DQ-CPR] Output: ${t}x${e}, slab=${u} samples, arc=${l.toFixed(1)}mm`), { pixelData: d, width: t, height: e, horizontalSpacing: x, verticalSpacing: n.vSpacing, zMin: n.zMin, zMax: n.zMax };
}
function J(o) {
  const n = C(o.volumeId);
  return n ? _(n, o) : null;
}
export {
  J as generateCrossSection,
  T as generatePanoramic,
  C as getVolumeData
};
//# sourceMappingURL=cprEngine-XRs08qxT.js.map
