import { n as C, s as w, i as A, u as T } from "./archCurve-DCaMAt3K.js";
const b = -1024;
function y(n, t, s, a, e) {
  if (s < 0 || s > t[0] - 1 || a < 0 || a > t[1] - 1 || e < 0 || e > t[2] - 1)
    return b;
  const o = Math.max(0, Math.min(s, t[0] - 1 - 1e-6)), M = Math.max(0, Math.min(a, t[1] - 1 - 1e-6)), i = Math.max(0, Math.min(e, t[2] - 1 - 1e-6)), c = Math.floor(o), r = Math.floor(M), h = Math.floor(i), f = c + 1, g = r + 1, u = h + 1, m = o - c, x = M - r, z = i - h, S = 1 - m, p = 1 - x, d = 1 - z;
  return n(c, r, h) * S * p * d + n(f, r, h) * m * p * d + n(c, g, h) * S * x * d + n(f, g, h) * m * x * d + n(c, r, u) * S * p * z + n(f, r, u) * m * p * z + n(c, g, u) * S * x * z + n(f, g, u) * m * x * z;
}
function D(n, t) {
  const s = Math.max(1, n.length - 1), a = Math.max(10, Math.ceil(t / s) * 2), e = C(n, a), o = w(e, t);
  if (o.length === 0) return { curve: o, normals: [], arcLen: 0 };
  const M = o.length < 2 ? [o[0], o[0]] : o, i = A(M), c = T(M);
  return { curve: M, normals: i, arcLen: c };
}
function L(n, t, s, a, e) {
  const { curve: o, normals: M } = D(n, 500);
  if (o.length < 2) return null;
  const i = Math.round(Math.max(0, Math.min(1, t)) * (o.length - 1)), c = o[i], r = M[i], h = [r[1], -r[0]], f = 30, u = Math.max(-f, Math.min(f, s)) * Math.PI / 180, m = Math.sin(u), x = Math.cos(u), z = (a + e) / 2;
  return {
    point: c,
    normal: r,
    tangent: h,
    origin: [c[0], c[1], z],
    eU: [r[0], r[1], 0],
    eV: [h[0] * m, h[1] * m, x]
  };
}
function j(n, t, s) {
  const { origin: a, eU: e, eV: o } = n, M = (i, c) => [
    a[0] + e[0] * i + o[0] * c,
    a[1] + e[1] * i + o[1] * c,
    a[2] + e[2] * i + o[2] * c
  ];
  return {
    origin: M(-t, -s),
    point1: M(t, -s),
    point2: M(-t, s)
  };
}
function k(n, t) {
  const s = L(t.controlPoints, t.position, t.tiltDeg, n.zMin, n.zMax);
  if (!s) return null;
  const { origin: a, eU: e, eV: o } = s, M = t.widthMm / 2, i = Math.max(1, Math.round(t.widthMm / t.resolution)), c = Math.max(1, Math.round((n.zMax - n.zMin) / n.vSpacing)), r = t.widthMm / Math.max(1, i - 1), h = (n.zMin + n.zMax) / 2, f = new Float32Array(i * c);
  for (let g = 0; g < c; g++) {
    const u = n.zMax - g * n.vSpacing - h, m = a[0] + o[0] * u, x = a[1] + o[1] * u, z = (a[2] + o[2] * u - n.origin[2]) * n.invSz;
    for (let S = 0; S < i; S++) {
      const p = -M + S * r, d = (m + e[0] * p - n.origin[0]) * n.invSx, l = (x + e[1] * p - n.origin[1]) * n.invSy;
      f[g * i + S] = y(n.getVoxel, n.dims, d, l, z);
    }
  }
  return { pixelData: f, width: i, height: c, horizontalSpacing: r, verticalSpacing: n.vSpacing, zMin: n.zMin, zMax: n.zMax };
}
export {
  L as a,
  D as b,
  k as c,
  j as d,
  y as t
};
//# sourceMappingURL=cprMath-DBemhKEF.js.map
