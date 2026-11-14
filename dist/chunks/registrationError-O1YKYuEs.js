import { j as g } from "./registration-CbdqkbzE.js";
const m = 1e-3, l = 0.1, h = (n, t) => [n[0] - t[0], n[1] - t[1], n[2] - t[2]], M = (n, t) => n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
function x(n, t) {
  const s = M(n, t);
  return Math.max(0, M(n, n) - s * s);
}
function p(n) {
  const t = n.length;
  if (t < 3) return null;
  const s = [0, 0, 0];
  for (const o of n)
    s[0] += o[0], s[1] += o[1], s[2] += o[2];
  s[0] /= t, s[1] /= t, s[2] /= t;
  const u = n.map((o) => h(o, s)), a = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const o of u)
    for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) a[r][i] += o[r] * o[i];
  for (let o = 0; o < 3; o++) for (let r = 0; r < 3; r++) a[o][r] /= t;
  const { vectors: e } = g(a, 3), c = [0, 1, 2].map((o) => {
    const r = [e[0][o], e[1][o], e[2][o]], i = Math.hypot(r[0], r[1], r[2]) || 1;
    return [r[0] / i, r[1] / i, r[2] / i];
  }), f = c.map((o) => {
    let r = 0;
    for (const i of u) r += x(i, o);
    return Math.sqrt(r / t);
  });
  return { count: t, centroid: s, axes: c, axisRms: f };
}
function q(n, t) {
  return !Number.isFinite(n) || n < 0 || t < 3 ? l : Math.max(l, n / Math.sqrt(1 - 2 / t));
}
function E(n, t, s) {
  const u = h(n, t.centroid);
  let a = 0;
  for (let e = 0; e < 3; e++) {
    const c = x(u, t.axes[e]), f = t.axisRms[e];
    if (f < m) {
      if (c > m * m) return 1 / 0;
      continue;
    }
    a += c / (f * f);
  }
  return Math.sqrt(s * s / t.count * (1 + a / 3));
}
function y(n, t, s) {
  const u = p(n);
  if (!u) return null;
  const a = q(t, u.count), e = s.map(({ target: c, point: f }) => ({ target: c, treMm: E(f, u, a) })).sort((c, f) => f.treMm - c.treMm);
  return {
    fleMm: a,
    targets: e,
    worstMm: e.length ? e[0].treMm : null,
    degenerate: u.axisRms.some((c) => c < m)
  };
}
export {
  l as M,
  q as e,
  p as f,
  E as p,
  y as r
};
//# sourceMappingURL=registrationError-O1YKYuEs.js.map
