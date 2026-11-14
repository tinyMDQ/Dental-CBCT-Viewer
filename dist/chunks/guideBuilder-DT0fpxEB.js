var C = Object.defineProperty;
var W = (n, t, s) => t in n ? C(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s;
var k = (n, t, s) => W(n, typeof t != "symbol" ? t + "" : t, s);
import { f as Z, p as j, a as G } from "./boneQuality-CYRvtZJv.js";
const B = (n, t) => [n[0] - t[0], n[1] - t[1], n[2] - t[2]], _ = (n, t) => [
  n[1] * t[2] - n[2] * t[1],
  n[2] * t[0] - n[0] * t[2],
  n[0] * t[1] - n[1] * t[0]
], R = (n) => Math.hypot(n[0], n[1], n[2]), O = (n) => {
  const t = R(n) || 1;
  return [n[0] / t, n[1] / t, n[2] / t];
};
function I(n) {
  const t = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  return O(_(n, t));
}
class D {
  constructor() {
    k(this, "pos", []);
    k(this, "idx", []);
  }
  addVertex(t) {
    return this.pos.push(t[0], t[1], t[2]), this.pos.length / 3 - 1;
  }
  addTri(t, s, r) {
    this.idx.push(t, s, r);
  }
  /** Quad a→b→c→d (CCW) as two triangles. */
  addQuad(t, s, r, o) {
    this.idx.push(t, s, r, t, r, o);
  }
  build() {
    return { positions: new Float32Array(this.pos), indices: new Uint32Array(this.idx) };
  }
}
function A(n, t, s, r = 48) {
  const o = Math.max(3, Math.floor(r)), i = O(B(t, n)), e = I(i), l = O(_(i, e)), u = new D(), a = [], d = [];
  for (let h = 0; h < o; h++) {
    const c = h / o * Math.PI * 2, m = Math.cos(c) * s, w = Math.sin(c) * s, x = [e[0] * m + l[0] * w, e[1] * m + l[1] * w, e[2] * m + l[2] * w];
    a.push(u.addVertex([n[0] + x[0], n[1] + x[1], n[2] + x[2]])), d.push(u.addVertex([t[0] + x[0], t[1] + x[1], t[2] + x[2]]));
  }
  const f = u.addVertex(n), g = u.addVertex(t);
  for (let h = 0; h < o; h++) {
    const c = (h + 1) % o;
    u.addQuad(a[h], a[c], d[c], d[h]), u.addTri(g, d[h], d[c]), u.addTri(f, a[c], a[h]);
  }
  return u.build();
}
function q(n, t, s) {
  if (n.length < 2) return { positions: new Float32Array(), indices: new Uint32Array() };
  const r = t / 2, o = s / 2, i = [0, 0, 1], e = new D(), l = [], u = n.length;
  for (let f = 0; f < u; f++) {
    const g = n[Math.max(0, f - 1)], h = n[Math.min(u - 1, f + 1)];
    let c = O(B(h, g));
    R(c) < 1e-9 && (c = [1, 0, 0]);
    let m = _(i, c);
    R(m) < 1e-9 && (m = [1, 0, 0]), m = O(m);
    const w = n[f], x = (b, V) => [
      w[0] + m[0] * b * r,
      w[1] + m[1] * b * r,
      w[2] + V * o
    ], p = e.addVertex(x(-1, -1)), M = e.addVertex(x(1, -1)), T = e.addVertex(x(1, 1)), v = e.addVertex(x(-1, 1));
    l.push([p, M, T, v]);
  }
  for (let f = 0; f < u - 1; f++) {
    const g = l[f], h = l[f + 1];
    for (let c = 0; c < 4; c++) {
      const m = (c + 1) % 4;
      e.addQuad(g[c], g[m], h[m], h[c]);
    }
  }
  const a = l[0];
  e.addQuad(a[0], a[3], a[2], a[1]);
  const d = l[u - 1];
  return e.addQuad(d[0], d[1], d[2], d[3]), e.build();
}
function Y(n) {
  const t = n.positions, s = n.indices;
  let r = 0;
  for (let o = 0; o < s.length; o += 3) {
    const i = s[o] * 3, e = s[o + 1] * 3, l = s[o + 2] * 3, u = t[i], a = t[i + 1], d = t[i + 2], f = t[e], g = t[e + 1], h = t[e + 2], c = t[l], m = t[l + 1], w = t[l + 2];
    r += (u * (g * w - h * m) - a * (f * w - h * c) + d * (f * m - g * c)) / 6;
  }
  return r;
}
function tt(n) {
  const t = /* @__PURE__ */ new Map(), s = n.indices;
  for (let r = 0; r < s.length; r += 3) {
    const o = [s[r], s[r + 1], s[r + 2]];
    for (let i = 0; i < 3; i++) {
      const e = o[i], l = o[(i + 1) % 3];
      t.set(`${e}_${l}`, (t.get(`${e}_${l}`) ?? 0) + 1);
    }
  }
  for (const [r, o] of t) {
    if (o !== 1) return !1;
    const [i, e] = r.split("_");
    if ((t.get(`${e}_${i}`) ?? 0) !== 1) return !1;
  }
  return !0;
}
function J(n, t, s, r, o, i, e) {
  const l = (c) => [n[0] + t[0] * c, n[1] + t[1] * c, n[2] + t[2] * c], a = -(o + i), d = -o, f = (r + e.channelTolMm) / 2, h = (r + 2 * e.sleeveWallMm) / 2 + e.seatClearanceMm;
  return {
    seat: { a: l(a - 2), b: l(d), radius: h },
    channel: { a: l(s + 2), b: l(a - 2), radius: f },
    housingRadius: h + e.wallMm,
    shoulderT: d
  };
}
function E(n, t, s, r = 0.03, o = 40) {
  if (t.length === 0) return [];
  let i = 1, e = 0;
  for (const u of t) {
    const a = j(n, [u[0], u[1]]);
    a && (i = Math.min(i, a.s), e = Math.max(e, a.s));
  }
  i = Math.max(0, i - r), e = Math.min(1, e + r), e <= i && (e = Math.min(1, i + 1e-3));
  const l = [];
  for (let u = 0; u <= o; u++) {
    const a = i + (e - i) * (u / o), d = G(n, a);
    d && l.push([d.point[0], d.point[1], s]);
  }
  return l;
}
function $(n, t, s, r, o, i) {
  if (r.length < 2) return !1;
  const e = r[0][2], l = Math.min(n[2], t[2]);
  if (Math.max(n[2], t[2]) < e - i / 2 || l > e + i / 2) return !1;
  const a = s + Math.max(o, i) / 2;
  return Z(n, t, r) <= a;
}
let H = null;
async function Q() {
  return H || (H = (async () => {
    const [{ default: n }, { default: t }] = await Promise.all([
      import("./manifold-BbiljDGq.js"),
      import("./manifold-CiNyAqn_.js")
    ]), s = await n({ locateFile: () => t });
    return s.setup(), s;
  })()), H;
}
function S(n, t) {
  const s = new n.Mesh({
    numProp: 3,
    vertProperties: t.positions,
    triVerts: t.indices
  });
  return s.merge(), new n.Manifold(s);
}
function K(n) {
  const t = n.getMesh(), s = t.numProp, r = t.vertProperties, o = r.length / s;
  let i;
  if (s === 3)
    i = r;
  else {
    i = new Float32Array(o * 3);
    for (let e = 0; e < o; e++)
      i[3 * e] = r[s * e], i[3 * e + 1] = r[s * e + 1], i[3 * e + 2] = r[s * e + 2];
  }
  return { positions: i, indices: t.triVerts };
}
async function L(n) {
  const { controlPoints: t, implants: s, scanSoups: r, params: o } = n, i = [];
  if (s.length === 0) throw new Error("no-guided-implants");
  const e = await Q(), { Manifold: l } = e, u = [], a = (d) => (u.push(d), d);
  try {
    const d = s.reduce((p, M) => p + M.entry[2], 0) / s.length, f = E(t, s.map((p) => p.entry), d), g = [];
    f.length >= 2 && g.push(a(S(e, q(f, o.baseWidthMm, o.baseHeightMm))));
    const h = [];
    for (const p of s) {
      const { entry: M, axis: T } = p, v = (y) => [M[0] + T[0] * y, M[1] + T[1] * y, M[2] + T[2] * y], b = -(p.sleeveOffset + p.sleeveHeight);
      let V;
      const P = [];
      if (o.sleeveSeat) {
        const y = J(
          M,
          T,
          p.length,
          p.sleeveDiameter,
          p.sleeveOffset,
          p.sleeveHeight,
          o
        );
        V = y.housingRadius, P.push(A(y.seat.a, y.seat.b, y.seat.radius, o.segments)), P.push(A(y.channel.a, y.channel.b, y.channel.radius, o.segments));
      } else
        V = p.sleeveDiameter / 2 + o.wallMm, P.push(A(
          v(p.length + 2),
          v(b - 2),
          (p.sleeveDiameter + o.channelTolMm) / 2,
          o.segments
        ));
      const z = v(o.baseHeightMm), F = v(b), U = A(z, F, V, o.segments);
      f.length >= 2 && !$(z, F, V, f, o.baseWidthMm, o.baseHeightMm) && i.push("housing-disconnected"), g.push(a(S(e, U)));
      for (const y of P) h.push(a(S(e, y)));
    }
    let c = a(l.union(g));
    c = a(l.difference([c, ...h]));
    for (let p = 0; p < r.length; p++) {
      const M = r[p];
      if (!M || M.length < 9) continue;
      const T = Math.floor(M.length / 9), v = new Uint32Array(T * 3);
      for (let b = 0; b < v.length; b++) v[b] = b;
      try {
        const b = a(S(e, { positions: M, indices: v }));
        c = a(l.difference([c, b]));
      } catch {
        i.push("scan-not-watertight");
      }
    }
    if (c.isEmpty()) throw new Error("empty-result");
    const m = K(c), w = { volumeMm3: c.volume(), triangles: m.indices.length / 3 };
    return { mesh: {
      positions: new Float32Array(m.positions),
      indices: new Uint32Array(m.indices)
    }, warnings: i, stats: w };
  } finally {
    for (const d of u)
      try {
        d.delete?.();
      } catch {
      }
  }
}
const nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildDrillGuide: L,
  initManifold: Q,
  isHousingConnectedToBase: $,
  planBaseCenterline: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  tt as a,
  L as b,
  A as c,
  $ as d,
  J as e,
  nt as g,
  Q as i,
  Y as m,
  E as p,
  q as s
};
//# sourceMappingURL=guideBuilder-DT0fpxEB.js.map
