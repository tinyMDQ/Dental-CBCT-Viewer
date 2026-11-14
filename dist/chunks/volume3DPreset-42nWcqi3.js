import i from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";
import f from "@kitware/vtk.js/Common/DataModel/PiecewiseFunction";
const u = "X-Ray", m = { low: 1.6, medium: 0.7, high: 0.3 }, P = { low: 2e3, medium: 4e3, high: 8e3 };
function y(e, n) {
  const t = e?.getMapper?.();
  t && (t.setAutoAdjustSampleDistances?.(!1), t.setSampleDistance?.(m[n]), t.setMaximumSamplesPerRay?.(P[n]));
}
const D = ["grayscale", "cool", "warm", "spectral", "inverted"], S = {
  grayscale: [[0, 0, 0, 0], [1, 1, 1, 1]],
  inverted: [[0, 1, 1, 1], [1, 0, 0, 0]],
  cool: [[0, 0.03, 0.08, 0.35], [0.5, 0.2, 0.6, 0.9], [1, 0.85, 1, 1]],
  warm: [[0, 0.1, 0.02, 0], [0.4, 0.7, 0.2, 0.05], [0.72, 1, 0.6, 0.12], [1, 1, 1, 0.85]],
  spectral: [[0, 0.15, 0.1, 0.5], [0.25, 0.1, 0.55, 0.9], [0.5, 0.1, 0.8, 0.35], [0.75, 0.95, 0.85, 0.12], [1, 0.9, 0.15, 0.1]]
};
function w(e, n, t) {
  if (!e) return;
  const o = e.getProperty(), a = t.wc - t.ww / 2, s = t.wc + t.ww / 2, c = i.newInstance();
  for (const [r, p, l, d] of S[n]) c.addRGBPoint(a + (s - a) * r, p, l, d);
  o.setRGBTransferFunction(0, c);
}
function M(e, n) {
  const { preset: t, colormap: o, quality: a, wl: s } = n;
  t === u ? A(e.getDefaultActor?.()?.actor, s) : e.setProperties({ preset: t });
  const c = e.getDefaultActor?.()?.actor;
  w(c, o, s), y(c, a), e.render();
}
function A(e, n, t = 0.2) {
  if (!e) return;
  const o = e.getProperty(), a = n.wc - n.ww / 2, s = n.wc + n.ww / 2, c = i.newInstance();
  c.addRGBPoint(a, 0, 0, 0), c.addRGBPoint(s, 1, 1, 1);
  const r = f.newInstance();
  r.addPoint(a, 0), r.addPoint(a + (s - a) * 0.5, t * 0.3), r.addPoint(s, t), r.addPoint(s + (s - a) * 0.8, Math.min(0.9, t * 2.4)), o.setRGBTransferFunction(0, c), o.setScalarOpacity(0, r), o.setScalarOpacityUnitDistance(0, 1.5), o.setInterpolationTypeToLinear(), o.setShade(!1), o.setUseGradientOpacity(0, !1);
}
export {
  D as V,
  u as X,
  M as a,
  A as b,
  w as c,
  y as d
};
//# sourceMappingURL=volume3DPreset-42nWcqi3.js.map
