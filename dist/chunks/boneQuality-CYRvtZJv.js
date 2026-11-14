import { b as F, t as H } from "./cprMath-DBemhKEF.js";
function l(n, t) {
  return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
}
function C(n, t) {
  return [
    n[1] * t[2] - n[2] * t[1],
    n[2] * t[0] - n[0] * t[2],
    n[0] * t[1] - n[1] * t[0]
  ];
}
const j = /* @__PURE__ */ new WeakMap();
function O(n) {
  let t = j.get(n);
  return t || (t = F(n, 500), j.set(n, t)), t;
}
function Q(n, t) {
  const { curve: s, normals: r } = O(n);
  if (s.length < 2) return null;
  const e = Math.round(Math.max(0, Math.min(1, t)) * (s.length - 1)), o = r[e];
  return {
    s: e / (s.length - 1),
    point: s[e],
    normal: o,
    tangent: [o[1], -o[0]]
  };
}
function b(n, t) {
  const { curve: s, normals: r } = O(n);
  if (s.length < 2) return null;
  let e = 0, o = 1 / 0;
  for (let u = 0; u < s.length; u++) {
    const i = s[u][0] - t[0], h = s[u][1] - t[1], a = i * i + h * h;
    a < o && (o = a, e = u);
  }
  const c = r[e];
  return {
    s: e / (s.length - 1),
    point: s[e],
    normal: c,
    tangent: [c[1], -c[0]]
  };
}
function E(n, t, s) {
  const r = t * Math.PI / 180, e = s * Math.PI / 180, o = Math.sin(r), c = Math.cos(r), u = Math.sin(e), i = Math.cos(e), h = o, a = c * u, f = -c * i;
  return [
    h * n.normal[0] + a * n.tangent[0],
    h * n.normal[1] + a * n.tangent[1],
    f
  ];
}
function X(n, t) {
  const s = b(n, [t.position[0], t.position[1]]);
  if (!s) return null;
  const r = E(s, t.angleBLDeg, t.angleMDDeg), e = [
    t.position[0] + r[0] * t.length,
    t.position[1] + r[1] * t.length,
    t.position[2] + r[2] * t.length
  ];
  return { entry: t.position, apex: e, axis: r };
}
function L(n) {
  if (n <= 0.14) return 1;
  if (n <= 0.9) return 1 - 0.36 * ((n - 0.14) / 0.76);
  const t = (n - 0.9) / 0.1;
  return 0.64 * Math.sqrt(Math.max(0, 1 - t * t));
}
function Y(n, t) {
  const s = [n[0] - t.origin[0], n[1] - t.origin[1], n[2] - t.origin[2]], r = C(t.eU, t.eV);
  return [l(s, t.eU), l(s, t.eV), l(s, r)];
}
function R(n, t, s = () => 1, r = 24) {
  const e = C(t.eU, t.eV), o = n.diameter / 2, c = l(n.axis, t.eU), u = l(n.axis, t.eV), i = Math.hypot(c, u);
  if (i < 1e-4) return null;
  const h = -u / i, a = c / i, f = [
    n.entry[0] - t.origin[0],
    n.entry[1] - t.origin[1],
    n.entry[2] - t.origin[2]
  ], g = l(f, t.eU), d = l(f, t.eV), x = l(f, e), y = l(n.axis, e), M = [], m = [];
  let P = !1;
  for (let D = 0; D <= r; D++) {
    const U = D / r, S = U * n.length, I = o * s(U), V = x + y * S, w = I * I - V * V, k = w > 0 ? Math.sqrt(w) : 0;
    k > 0.01 && (P = !0);
    const z = g + c * S, A = d + u * S;
    M.push([z - k * h, A - k * a]), m.push([z + k * h, A + k * a]);
  }
  return P ? [...M, ...m.reverse()] : null;
}
function Z(n, t, s = 24) {
  return R(n, t, L, s);
}
function _(n, t) {
  const s = t.offset + t.height;
  return { entry: [
    n.entry[0] - n.axis[0] * s,
    n.entry[1] - n.axis[1] * s,
    n.entry[2] - n.axis[2] * s
  ], axis: n.axis, diameter: t.diameter, length: t.height };
}
function $(n, t, s) {
  const r = t.offset + t.height, e = [
    n.entry[0] - n.axis[0] * r,
    n.entry[1] - n.axis[1] * r,
    n.entry[2] - n.axis[2] * r
  ], o = [
    n.entry[0] + n.axis[0] * s,
    n.entry[1] + n.axis[1] * s,
    n.entry[2] + n.axis[2] * s
  ];
  return [e, o];
}
function B(n, t) {
  return [n[0] - t[0], n[1] - t[1], n[2] - t[2]];
}
function G(n, t, s) {
  const r = B(s, t), e = l(r, r);
  let o = e > 0 ? l(B(n, t), r) / e : 0;
  o = Math.max(0, Math.min(1, o));
  const c = [t[0] + r[0] * o, t[1] + r[1] * o, t[2] + r[2] * o];
  return Math.hypot(n[0] - c[0], n[1] - c[1], n[2] - c[2]);
}
function p(n, t, s, r) {
  const e = B(t, n), o = B(r, s), c = B(n, s), u = l(e, e), i = l(o, o), h = l(o, c), a = 1e-9;
  let f, g;
  if (u <= a && i <= a)
    return Math.hypot(c[0], c[1], c[2]);
  if (u <= a)
    f = 0, g = Math.max(0, Math.min(1, h / i));
  else {
    const y = l(e, c);
    if (i <= a)
      g = 0, f = Math.max(0, Math.min(1, -y / u));
    else {
      const M = l(e, o), m = u * i - M * M;
      f = m > a ? Math.max(0, Math.min(1, (M * h - y * i) / m)) : 0, g = (M * f + h) / i, g < 0 ? (g = 0, f = Math.max(0, Math.min(1, -y / u))) : g > 1 && (g = 1, f = Math.max(0, Math.min(1, (M - y) / u)));
    }
  }
  const d = [n[0] + e[0] * f, n[1] + e[1] * f, n[2] + e[2] * f], x = [s[0] + o[0] * g, s[1] + o[1] * g, s[2] + o[2] * g];
  return Math.hypot(d[0] - x[0], d[1] - x[1], d[2] - x[2]);
}
function q(n, t, s) {
  if (s.length === 0) return 1 / 0;
  if (s.length === 1) return G(s[0], n, t);
  let r = 1 / 0;
  for (let e = 0; e < s.length - 1; e++) {
    const o = p(n, t, s[e], s[e + 1]);
    o < r && (r = o);
  }
  return r;
}
function nn(n, t, s, r, e, o) {
  const u = q(n, t, r) - s - e;
  return { mm: u, ok: u >= o };
}
function tn(n, t, s, r, e) {
  const o = r.map((c) => {
    const u = q(n, t, c.points) - s - c.radius, i = c.type === "nerve" ? e.nerve : e.sinus;
    return { id: c.id, type: c.type, mm: u, ok: u >= i };
  });
  return { results: o, worstOk: o.every((c) => c.ok) };
}
function sn(n, t, s, r) {
  const e = s.map((i) => {
    const h = q(n.entry, n.apex, i.points) - n.radius - i.radius, a = i.type === "nerve" ? r.nerve : r.sinus;
    return { id: i.id, type: i.type, mm: h, ok: h >= a };
  });
  let o = null;
  for (const i of t) {
    if (i.id === n.id) continue;
    const h = p(n.entry, n.apex, i.entry, i.apex) - n.radius - i.radius;
    (o === null || h < o) && (o = h);
  }
  const c = o === null || o >= r.neighbor, u = e.every((i) => i.ok) && c;
  return { anatomy: e, neighborMm: o, neighborOk: c, worstOk: u };
}
function en(n, t, s, r, e, o, c) {
  const i = p(n, t, r, e) - s - o;
  return { mm: i, ok: i >= c };
}
function J(n) {
  return n > 1250 ? "D1" : n >= 850 ? "D2" : n >= 350 ? "D3" : n >= 150 ? "D4" : "D5";
}
function K(n) {
  const t = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / t, n[1] / t, n[2] / t];
}
function v(n, t, s, r) {
  const e = (t - n.origin[0]) * n.invSx, o = (s - n.origin[1]) * n.invSy, c = (r - n.origin[2]) * n.invSz;
  return e < 0 || o < 0 || c < 0 || e >= n.dims[0] - 1 || o >= n.dims[1] - 1 || c >= n.dims[2] - 1 ? null : H(n.getVoxel, n.dims, e, o, c);
}
function on(n, t, s, r, e = 12, o = 4) {
  const c = [s[0] - t[0], s[1] - t[1], s[2] - t[2]], u = Math.hypot(c[0], c[1], c[2]);
  if (u < 1e-6) return null;
  const i = [c[0] / u, c[1] / u, c[2] / u], h = Math.abs(i[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], a = K(C(i, h)), f = C(i, a), g = r * 0.6;
  let d = 0, x = 0;
  for (let M = 0; M <= e; M++) {
    const m = M / e, P = t[0] + c[0] * m, D = t[1] + c[1] * m, U = t[2] + c[2] * m, S = v(n, P, D, U);
    S !== null && (d += S, x++);
    for (let I = 0; I < o; I++) {
      const V = 2 * Math.PI * I / o, w = Math.cos(V) * g, k = Math.sin(V) * g, z = P + a[0] * w + f[0] * k, A = D + a[1] * w + f[1] * k, W = U + a[2] * w + f[2] * k, T = v(n, z, A, W);
      T !== null && (d += T, x++);
    }
  }
  if (x === 0) return null;
  const y = d / x;
  return { meanHU: y, bone: J(y), samples: x };
}
export {
  Q as a,
  C as b,
  J as c,
  R as d,
  G as e,
  q as f,
  p as g,
  l as h,
  $ as i,
  sn as j,
  tn as k,
  E as l,
  Z as m,
  X as n,
  nn as o,
  b as p,
  en as q,
  Y as r,
  L as s,
  on as t,
  _ as u
};
//# sourceMappingURL=boneQuality-CYRvtZJv.js.map
