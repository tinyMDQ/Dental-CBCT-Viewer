import E from "@kitware/vtk.js/IO/Geometry/STLReader";
import V from "@kitware/vtk.js/IO/Geometry/PLYReader";
import W from "@kitware/vtk.js/IO/Misc/OBJReader";
import H from "@kitware/vtk.js/Rendering/Core/Actor";
import Y from "@kitware/vtk.js/Rendering/Core/Mapper";
import { a as J } from "./registration-CbdqkbzE.js";
function Q(n, t, o, c, a, e, s, r) {
  const l = n[t], i = n[t + 1], u = n[t + 2], m = n[t + 3], y = n[t + 4], p = n[t + 5], g = n[t + 6], f = n[t + 7], w = n[t + 8], b = (l - o) * e + (i - c) * s + (u - a) * r, h = (m - o) * e + (y - c) * s + (p - a) * r, d = (g - o) * e + (f - c) * s + (w - a) * r, I = [], S = (z, F, B, T, O, $, A, P) => {
    if (T < 0 && P >= 0 || T >= 0 && P < 0) {
      const D = T / (T - P);
      I.push([z + (O - z) * D, F + ($ - F) * D, B + (A - B) * D]);
    }
  };
  return S(l, i, u, b, m, y, p, h), S(m, y, p, h, g, f, w, d), S(g, f, w, d, l, i, u, b), I.length === 2 ? [I[0], I[1]] : null;
}
const U = 4;
function Z(n) {
  const t = Math.floor(n.length / 9);
  if (t === 0) return { root: null, count: 0 };
  const o = new Float64Array(t * 3), c = new Float64Array(t * 3), a = new Float64Array(t * 3);
  for (let r = 0; r < t; r++) {
    const l = r * 9;
    let i = n[l], u = n[l + 1], m = n[l + 2], y = i, p = u, g = m;
    for (let f = 1; f < 3; f++) {
      const w = l + f * 3, b = n[w], h = n[w + 1], d = n[w + 2];
      b < i && (i = b), h < u && (u = h), d < m && (m = d), b > y && (y = b), h > p && (p = h), d > g && (g = d);
    }
    o[r * 3] = i, o[r * 3 + 1] = u, o[r * 3 + 2] = m, c[r * 3] = y, c[r * 3 + 1] = p, c[r * 3 + 2] = g, a[r * 3] = (i + y) / 2, a[r * 3 + 1] = (u + p) / 2, a[r * 3 + 2] = (m + g) / 2;
  }
  const e = new Int32Array(t);
  for (let r = 0; r < t; r++) e[r] = r;
  const s = (r, l) => {
    let i = 1 / 0, u = 1 / 0, m = 1 / 0, y = -1 / 0, p = -1 / 0, g = -1 / 0;
    for (let M = r; M < l; M++) {
      const x = e[M];
      o[x * 3] < i && (i = o[x * 3]), o[x * 3 + 1] < u && (u = o[x * 3 + 1]), o[x * 3 + 2] < m && (m = o[x * 3 + 2]), c[x * 3] > y && (y = c[x * 3]), c[x * 3 + 1] > p && (p = c[x * 3 + 1]), c[x * 3 + 2] > g && (g = c[x * 3 + 2]);
    }
    const f = {
      cx: (i + y) / 2,
      cy: (u + p) / 2,
      cz: (m + g) / 2,
      hx: (y - i) / 2,
      hy: (p - u) / 2,
      hz: (g - m) / 2,
      left: null,
      right: null,
      tris: null
    }, w = l - r;
    if (w <= U)
      return f.tris = e.slice(r, l), f;
    let b = 1 / 0, h = 1 / 0, d = 1 / 0, I = -1 / 0, S = -1 / 0, z = -1 / 0;
    for (let M = r; M < l; M++) {
      const x = e[M], N = a[x * 3], C = a[x * 3 + 1], R = a[x * 3 + 2];
      N < b && (b = N), C < h && (h = C), R < d && (d = R), N > I && (I = N), C > S && (S = C), R > z && (z = R);
    }
    const F = I - b, B = S - h, T = z - d, O = F >= B && F >= T ? 0 : B >= T ? 1 : 2, $ = (O === 0 ? b + I : O === 1 ? h + S : d + z) / 2;
    let A = r, P = l - 1;
    for (; A <= P; )
      if (a[e[A] * 3 + O] < $)
        A++;
      else {
        const M = e[A];
        e[A] = e[P], e[P] = M, P--;
      }
    let D = A;
    return (D === r || D === l) && (D = r + (w >> 1)), f.left = s(r, D), f.right = s(D, l), f;
  };
  return { root: s(0, t), count: t };
}
function _(n, t, o, c) {
  const a = [];
  if (!t.root) return a;
  const [e, s, r] = c, [l, i, u] = o, m = Math.abs(e), y = Math.abs(s), p = Math.abs(r), g = [t.root];
  for (; g.length; ) {
    const f = g.pop(), w = (f.cx - l) * e + (f.cy - i) * s + (f.cz - u) * r, b = f.hx * m + f.hy * y + f.hz * p;
    if (!(Math.abs(w) > b))
      if (f.tris)
        for (let h = 0; h < f.tris.length; h++) {
          const d = Q(n, f.tris[h] * 9, l, i, u, e, s, r);
          d && a.push(d);
        }
      else
        f.left && g.push(f.left), f.right && g.push(f.right);
  }
  return a;
}
const k = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map(), rt = (n) => k.get(n) ?? null, at = (n, t) => {
  k.set(n, t);
}, it = (n) => {
  k.delete(n), v.delete(n), L.delete(n), j.delete(n);
}, lt = (n, t) => {
  L.set(n, t.slice());
}, ft = (n) => L.get(n) ?? null, ut = (n) => k.has(n);
function mt() {
  k.clear(), v.clear(), L.clear(), j.clear();
}
const yt = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
function pt(n, t, o) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n, t, o, 1];
}
function q(n) {
  const t = n?.getBounds?.();
  if (!t || t.length < 6) return null;
  const o = Math.max(t[1] - t[0], t[3] - t[2], t[5] - t[4]);
  return !Number.isFinite(o) || o <= 0 ? null : o < 5 ? `mesh extent is only ${o.toFixed(2)} units — far below mm-scale anatomy; the file may be in meters or wrongly scaled` : o > 2e3 ? `mesh extent is ${Math.round(o)} units — far above mm-scale anatomy; the file may be in micrometers or wrongly scaled` : null;
}
function G(n, t) {
  const o = (n.split(".").pop() || "").toLowerCase();
  try {
    let c = null;
    if (o === "obj") {
      const e = W.newInstance();
      e.parseAsText(new TextDecoder().decode(t)), c = e.getOutputData(0);
    } else if (o === "ply") {
      const e = V.newInstance();
      e.parseAsArrayBuffer(t), c = e.getOutputData(0);
    } else {
      const e = E.newInstance();
      if (e.parseAsArrayBuffer(t), c = e.getOutputData(0), !c || c.getNumberOfPoints() === 0) {
        const s = E.newInstance();
        s.parseAsText(new TextDecoder().decode(t)), c = s.getOutputData(0);
      }
    }
    if (!c || c.getNumberOfPoints() === 0) return null;
    const a = q(c);
    return a && console.warn(`[DQ-DICOM] Scan mesh "${n}": ${a}`), c;
  } catch {
    return null;
  }
}
async function gt(n) {
  try {
    return G(n.name, await n.arrayBuffer());
  } catch {
    return null;
  }
}
function K(n) {
  const t = n.replace("#", ""), o = t.length === 3 ? t.split("").map((s) => s + s).join("") : t, c = parseInt(o.slice(0, 2), 16) / 255, a = parseInt(o.slice(2, 4), 16) / 255, e = parseInt(o.slice(4, 6), 16) / 255;
  return [Number.isFinite(c) ? c : 1, Number.isFinite(a) ? a : 1, Number.isFinite(e) ? e : 1];
}
function ht(n) {
  const t = n.getBounds();
  return [(t[0] + t[1]) / 2, (t[2] + t[3]) / 2, (t[4] + t[5]) / 2];
}
function X(n, t) {
  const o = k.get(n);
  if (!o) return null;
  const c = o.getPoints()?.getData(), a = o.getPolys()?.getData();
  if (!c || !a) return null;
  const e = c.length / 3, s = new Float32Array(c.length);
  for (let i = 0; i < e; i++) {
    const u = J(t, [c[3 * i], c[3 * i + 1], c[3 * i + 2]]);
    s[3 * i] = u[0], s[3 * i + 1] = u[1], s[3 * i + 2] = u[2];
  }
  const r = [];
  let l = 0;
  for (; l < a.length; ) {
    const i = a[l++];
    if (i < 3) {
      l += i;
      continue;
    }
    const u = a[l];
    for (let m = 1; m < i - 1; m++) {
      const y = a[l + m], p = a[l + m + 1];
      r.push(
        s[3 * u],
        s[3 * u + 1],
        s[3 * u + 2],
        s[3 * y],
        s[3 * y + 1],
        s[3 * y + 2],
        s[3 * p],
        s[3 * p + 1],
        s[3 * p + 2]
      );
    }
    l += i;
  }
  return new Float32Array(r);
}
function xt(n, t, o, c) {
  const a = t.join(",");
  let e = v.get(n);
  if (!e || e.key !== a) {
    const s = X(n, t);
    if (!s)
      return v.delete(n), [];
    e = { key: a, soup: s, bvh: Z(s) }, v.set(n, e);
  }
  return _(e.soup, e.bvh, o, c);
}
const j = /* @__PURE__ */ new Map();
function dt(n) {
  const t = j.get(n);
  if (t) return t;
  const o = k.get(n);
  if (!o) return null;
  const c = o.getPoints?.()?.getNumberOfPoints?.() ?? 0, a = o.getPolys?.()?.getData?.();
  let e = 0;
  if (a)
    for (let l = 0; l < a.length; ) {
      const i = a[l];
      if (!Number.isFinite(i) || i < 3) break;
      e += i - 2, l += i + 1;
    }
  const s = o.getBounds?.(), r = {
    points: c,
    triangles: e,
    extentMm: s && s.length >= 6 ? [s[1] - s[0], s[3] - s[2], s[5] - s[4]] : [0, 0, 0]
  };
  return j.set(n, r), r;
}
function bt(n, t, o, c) {
  const a = Y.newInstance();
  a.setScalarVisibility(!1), a.setInputData(n);
  const e = H.newInstance();
  e.setMapper(a);
  const s = e.getProperty(), [r, l, i] = K(t);
  return s.setColor(r, l, i), s.setOpacity(o), c && c.length === 16 && e.setUserMatrix(c), e;
}
export {
  yt as IDENTITY16,
  bt as buildScanActor,
  mt as clearScanRegistry,
  ft as getScanBaseTransform,
  rt as getScanPolyData,
  ut as hasScanPolyData,
  gt as loadScanPolyData,
  q as meshScaleWarning,
  G as parseScanMesh,
  ht as polyDataCenter,
  it as removeScanPolyData,
  dt as scanMeshInfo,
  X as scanTriangleSoupWorld,
  lt as setScanBaseTransform,
  at as setScanPolyData,
  xt as sliceScanWorld,
  pt as translation16
};
//# sourceMappingURL=scanMesh-NquU4Ro1.js.map
