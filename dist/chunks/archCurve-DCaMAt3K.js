const p = [
  { key: "bone", windowCenter: 300, windowWidth: 1500 },
  { key: "soft", windowCenter: 40, windowWidth: 400 },
  { key: "lung", windowCenter: -600, windowWidth: 1500 },
  { key: "brain", windowCenter: 40, windowWidth: 80 },
  { key: "dental", windowCenter: 500, windowWidth: 3e3 },
  { key: "implant", windowCenter: 1e3, windowWidth: 4e3 }
], d = ["AXIAL", "SAGITTAL", "CORONAL", "3D"], f = ["PANORAMA", "AXIAL", "CROSS", "3D"], m = {
  big: "3D",
  small: ["AXIAL", "SAGITTAL", "CORONAL"],
  arrangement: "left",
  grid: "1+3",
  panoArrangement: "left",
  opgOrder: ["PANORAMA", "AXIAL", "CROSS", "3D"]
};
function h(t) {
  const o = [0, 1, 2, 3].map((n) => t?.[n] ?? null), e = /* @__PURE__ */ new Set();
  for (let n = 0; n < 4; n++) {
    const a = o[n];
    a && (e.has(a) || !f.includes(a)) ? o[n] = null : a && e.add(a);
  }
  const s = f.filter((n) => !e.has(n));
  let l = 0;
  for (let n = 0; n < 4; n++) o[n] == null && (o[n] = s[l++] ?? f[0]);
  return o;
}
function L(t, o) {
  const e = h(t);
  if (o <= 0 || o > 3) return e;
  const s = e[0];
  return e[0] = e[o], e[o] = s, e;
}
function b(t, o) {
  const e = [t, ...o], s = /* @__PURE__ */ new Set();
  for (let a = 0; a < 4; a++) {
    const i = e[a];
    i && s.has(i) ? e[a] = null : i && s.add(i);
  }
  const l = d.filter((a) => !s.has(a));
  let n = 0;
  for (let a = 0; a < 4; a++)
    e[a] == null && (e[a] = l[n++] ?? d[0]);
  return { big: e[0], small: [e[1], e[2], e[3]] };
}
const T = {
  AXIAL: "view.axial",
  SAGITTAL: "view.sagittal",
  CORONAL: "view.coronal",
  "3D": "view.3d"
}, A = [3, 3.3, 3.5, 3.75, 4, 4.2, 4.5, 5, 5.5, 6], g = [6, 7, 8, 8.5, 9, 10, 11, 11.5, 12, 13, 14, 15, 16], w = [
  {
    id: "generic",
    brand: "Generic",
    line: "Standard",
    diameters: A,
    lengths: g,
    sleeveDiameter: 5
  },
  {
    id: "alphabio-multineo-cs",
    brand: "Alpha-Bio",
    line: "MultiNeo CS",
    diameters: [3.5, 3.75, 4.2, 5, 6],
    lengths: [8, 10, 11.5, 13, 16],
    sleeveDiameter: 5.5
  },
  {
    id: "straumann-blx",
    brand: "Straumann",
    line: "BLX",
    diameters: [3.5, 3.75, 4, 4.5, 5, 5.5, 6.5],
    lengths: [6, 8, 10, 12, 14, 16],
    sleeveDiameter: 5
  },
  {
    id: "nobel-active",
    brand: "Nobel Biocare",
    line: "NobelActive",
    diameters: [3, 3.5, 4.3, 5],
    lengths: [8.5, 10, 11.5, 13, 15, 18],
    sleeveDiameter: 5
  }
], E = "generic", C = [8, 9, 10, 11, 12], y = {
  wallMm: 1.5,
  baseWidthMm: 5,
  baseHeightMm: 4,
  channelTolMm: 0.1,
  segments: 48,
  sleeveSeat: !1,
  seatClearanceMm: 0.05,
  sleeveWallMm: 0.9
};
function M(t) {
  return w.find((o) => o.id === t) ?? w[0];
}
function I(t) {
  return { enabled: !0, sleeveOffset: 9, sleeveHeight: 5, drillLength: t.length };
}
const _ = ["upperJaw", "lowerJaw"], O = (t) => t === "upperJaw" || t === "lowerJaw", D = {
  upperJaw: { color: "#e8c0a8", opacity: 1 },
  lowerJaw: { color: "#d9b49c", opacity: 1 },
  oral: { color: "#e8c0a8", opacity: 1 },
  bite: { color: "#c0c0ff", opacity: 0.85 },
  antagonist: { color: "#b0e0b0", opacity: 0.85 },
  toothSetup: { color: "#ffffff", opacity: 0.9 }
}, N = ["upperJaw", "lowerJaw", "oral", "bite", "antagonist", "toothSetup"];
function W(t) {
  const o = t.toLowerCase().replace(/\.[^.]+$/, ""), e = (s) => new RegExp(`(^|[^a-z])${s}([^a-z]|$)`).test(o);
  return /upper|maxill|oberkiefer/.test(o) || e("fels[oő]") || e("u") ? "upperJaw" : /lower|mandib|unterkiefer/.test(o) || e("als[oó]") || e("l") ? "lowerJaw" : /bite|occlus|buccal|harap/.test(o) ? "bite" : /antagon/.test(o) ? "antagonist" : /setup|wax|crown|tooth/.test(o) ? "toothSetup" : "oral";
}
const R = {
  nerve: { color: "#ff5577", radius: 1.5 },
  sinus: { color: "#55aaff", radius: 1 }
}, J = [
  { id: "CT-Bone", labelKey: "preset3d.bone" },
  { id: "CT-Bones", labelKey: "preset3d.bones" },
  { id: "CT-Coronary-Arteries-3", labelKey: "preset3d.dental" },
  { id: "CT-MIP", labelKey: "preset3d.mip" }
];
function S(t, o, e, s, l) {
  const n = l * l, a = n * l;
  return [
    0.5 * (2 * o[0] + (-t[0] + e[0]) * l + (2 * t[0] - 5 * o[0] + 4 * e[0] - s[0]) * n + (-t[0] + 3 * o[0] - 3 * e[0] + s[0]) * a),
    0.5 * (2 * o[1] + (-t[1] + e[1]) * l + (2 * t[1] - 5 * o[1] + 4 * e[1] - s[1]) * n + (-t[1] + 3 * o[1] - 3 * e[1] + s[1]) * a)
  ];
}
function k(t, o = 50) {
  const e = t.length;
  if (e < 2) return [...t];
  const s = [];
  for (let l = 0; l < e - 1; l++) {
    const n = t[Math.max(0, l - 1)], a = t[l], i = t[l + 1], c = t[Math.min(e - 1, l + 2)];
    for (let r = 0; r < o; r++)
      s.push(S(n, a, i, c, r / o));
  }
  return s.push(t[e - 1]), s;
}
function G(t) {
  return t.length < 2 ? t.map(() => [0, 1]) : t.map((o, e, s) => {
    let l, n;
    e === 0 ? (l = s[1][0] - s[0][0], n = s[1][1] - s[0][1]) : e === s.length - 1 ? (l = s[e][0] - s[e - 1][0], n = s[e][1] - s[e - 1][1]) : (l = s[e + 1][0] - s[e - 1][0], n = s[e + 1][1] - s[e - 1][1]);
    const a = Math.hypot(l, n);
    return a === 0 ? [0, 1] : [-n / a, l / a];
  });
}
function x(t) {
  let o = 0;
  for (let e = 1; e < t.length; e++)
    o += Math.hypot(t[e][0] - t[e - 1][0], t[e][1] - t[e - 1][1]);
  return o;
}
function B(t, o) {
  if (t.length < 2 || o < 2) return [...t];
  const e = [0];
  for (let a = 1; a < t.length; a++)
    e.push(e[a - 1] + Math.hypot(
      t[a][0] - t[a - 1][0],
      t[a][1] - t[a - 1][1]
    ));
  const s = e[e.length - 1];
  if (s === 0) return [t[0]];
  const l = [];
  let n = 0;
  for (let a = 0; a < o; a++) {
    const i = a / (o - 1) * s;
    for (; n < t.length - 2 && e[n + 1] < i; ) n++;
    const c = e[n], r = e[n + 1] - c, u = r > 0 ? (i - c) / r : 0;
    l.push([
      t[n][0] + u * (t[n + 1][0] - t[n][0]),
      t[n][1] + u * (t[n + 1][1] - t[n][1])
    ]);
  }
  return l;
}
function P(t, o) {
  const [e, s] = t, l = o[0] * 0.32, n = o[1] * 0.32;
  return [
    [e - l, s + n * 0.85],
    // right wisdom / posterior molar
    [e - l * 0.97, s + n * 0.35],
    // right molar
    [e - l * 0.85, s - n * 0.2],
    // right premolar
    [e - l * 0.55, s - n * 0.7],
    // right canine
    [e, s - n],
    // front incisors (most anterior)
    [e + l * 0.55, s - n * 0.7],
    // left canine
    [e + l * 0.85, s - n * 0.2],
    // left premolar
    [e + l * 0.97, s + n * 0.35],
    // left molar
    [e + l, s + n * 0.85]
    // left wisdom / posterior molar
  ];
}
function F(t, o, e) {
  return t.map((s, l) => [
    s[0] + o[l][0] * e,
    s[1] + o[l][1] * e
  ]);
}
export {
  R as A,
  E as D,
  y as G,
  A as I,
  f as O,
  D as S,
  d as V,
  p as W,
  m as a,
  g as b,
  w as c,
  _ as d,
  N as e,
  C as f,
  T as g,
  J as h,
  G as i,
  I as j,
  W as k,
  P as l,
  M as m,
  k as n,
  O as o,
  h as p,
  b as q,
  F as r,
  B as s,
  L as t,
  x as u
};
//# sourceMappingURL=archCurve-DCaMAt3K.js.map
