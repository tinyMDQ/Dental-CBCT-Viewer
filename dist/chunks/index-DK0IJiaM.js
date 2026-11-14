import { b as g, g as S } from "./gzip-gNdLXDK7.js";
import { volumeLoader as H, imageLoader as j, metaData as J } from "@cornerstonejs/core";
import { c as Q } from "./constants-DMHmwL7Y.js";
const F = /_vol_0$/i, v = /_vol_0_(\d+)$/i, V = 2048, C = 2e3, T = 2 ** 30, q = 1024 * 1024;
function K(e) {
  return e.some((n) => F.test(g(n))) && e.some((n) => v.test(g(n)));
}
function Y(e, n) {
  const r = [], t = (a, d, m) => {
    const u = e.match(a), w = u ? parseFloat(u[1]) : NaN;
    return Number.isFinite(w) ? w : (r.push(`${m} missing from header — assuming ${d}`), d);
  }, l = Math.round(t(/(?:sizex|columns|width|dimx|nx)\D{0,4}(\d{2,4})/i, 512, "columns")), s = Math.round(t(/(?:sizey|rows|height|dimy|ny)\D{0,4}(\d{2,4})/i, 512, "rows")), i = t(/(?:voxelsize|spacing|resolution|pixelsize)\D{0,6}([0-9]*\.?[0-9]+)/i, 0.16, "voxel size"), o = Math.round(t(/(?:maxvalue|rangemax|max)\D{0,6}(\d{3,5})/i, 4095, "max value")), c = i > 0 && i < 5 ? i : 0.16;
  return c !== i && r.push(`implausible voxel size ${i} — assuming 0.16 mm`), { cols: l, rows: s, sp: c, maxValue: o, depth: n, warnings: r };
}
function N(e, n) {
  return e.match(new RegExp(`<(?:${n.source})[^>]*>\\s*([^<]+?)\\s*<`, "i"))?.[1];
}
async function Z(e, n) {
  const r = e.find((p) => F.test(g(p))), t = e.filter((p) => v.test(g(p))).sort((p, x) => Number(g(p).match(v)[1]) - Number(g(x).match(v)[1]));
  if (!r || t.length === 0) throw new Error("GALILEOS: missing *_vol_0 header or slice files");
  const l = new TextDecoder().decode(await S(new Uint8Array(await r.arrayBuffer()), q)), { cols: s, rows: i, sp: o, maxValue: c, depth: a, warnings: d } = Y(l, t.length);
  if (s < 1 || i < 1 || s > V || i > V)
    throw new Error(`GALILEOS: implausible dimensions ${s}×${i} (per-axis limit ${V})`);
  if (a > C) throw new Error(`GALILEOS: implausible depth ${a} (limit ${C})`);
  if (s * i * a > T)
    throw new Error(`GALILEOS: volume ${s}×${i}×${a} exceeds the ${T} voxel limit`);
  const m = s * i, u = m * 2 + 4096, w = new Int16Array(m * a);
  for (let p = 0; p < t.length; p++) {
    const x = await S(new Uint8Array(await t[p].arrayBuffer()), u);
    if (x.byteLength < m * 2)
      throw new Error(
        `GALILEOS: slice ${g(t[p])} too short — header declares ${s}×${i} (${m * 2} bytes) but the decompressed payload has ${x.byteLength} bytes`
      );
    w.set(new Uint16Array(x.buffer, x.byteOffset, m), p * m), n?.(Math.round(p / t.length * 85));
  }
  return {
    data: w,
    dimensions: [s, i, a],
    spacing: [o, o, o],
    windowCenter: Math.round(c * 0.35),
    windowWidth: c,
    modality: "CT",
    minValue: 0,
    maxValue: c,
    patientName: N(l, /patient_?name/i),
    patientId: N(l, /patient_?id/i),
    seriesDescription: "GALILEOS CBCT",
    warnings: d.length ? d : void 0
  };
}
const I = /(^|\/)CT_0\.vol$/i, P = -32768, z = "JmVolumeVersion=1", M = 2048, R = 2e3, U = 2 ** 30;
function ee(e) {
  return e.some((n) => I.test(g(n)) || I.test(n.webkitRelativePath || ""));
}
function $(e, n, r) {
  const t = n.match(e), l = t ? parseFloat(t[1]) : NaN;
  return Number.isFinite(l) ? l : r;
}
async function te(e, n) {
  const r = e.find((h) => I.test(g(h)) || I.test(h.webkitRelativePath || ""));
  if (!r) throw new Error("OneVolume: CT_0.vol not found");
  const t = await r.arrayBuffer(), l = new DataView(t), i = new TextDecoder("latin1").decode(new Uint8Array(t, 0, Math.min(512, t.byteLength))).indexOf(z);
  if (i < 0) throw new Error("OneVolume: version marker not found");
  let o = i + z.length;
  l.getUint8(o) === 0 && (o += 1);
  const c = l.getUint32(o, !0);
  if (o += 4, c <= 0 || o + c > t.byteLength) throw new Error("OneVolume: bad XML length");
  const a = new TextDecoder().decode(new Uint8Array(t, o, c));
  o += c, o += 36;
  const d = Math.round($(/(?:sizex|columns|width|dimx|nx)\D{0,4}(\d{2,4})/i, a, 0)), m = Math.round($(/(?:sizey|rows|height|dimy|ny)\D{0,4}(\d{2,4})/i, a, 0));
  let u = Math.round($(/(?:sizez|slices|depth|dimz|nz)\D{0,4}(\d{2,4})/i, a, 0));
  const w = $(/(?:voxelsize|spacing|gridspacing|resolution|pixelsize)\D{0,6}([0-9]*\.?[0-9]+)/i, a, 0.125), p = $(/(?:slope|rescaleslope)\D{0,6}([0-9]*\.?[0-9]+)/i, a, 1), x = $(/(?:intercept|rescaleintercept)\D{0,6}(-?[0-9]*\.?[0-9]+)/i, a, 0);
  if (!d || !m) throw new Error("OneVolume: could not read dimensions from header");
  if (d > M || m > M)
    throw new Error(`OneVolume: implausible dimensions ${d}×${m} (per-axis limit ${M})`);
  const E = t.byteLength - o >> 1;
  if (u || (u = Math.floor(E / (d * m))), u < 1) throw new Error("OneVolume: no slice data in payload");
  if (u > R) throw new Error(`OneVolume: implausible depth ${u} (limit ${R})`);
  const y = d * m * u;
  if (y > U)
    throw new Error(`OneVolume: volume ${d}×${m}×${u} exceeds the ${U} voxel limit`);
  if (E < y)
    throw new Error(
      `OneVolume: payload too short — header declares ${d}×${m}×${u} (${y} voxels) but only ${E} samples remain`
    );
  const W = o % 2 === 0 ? new Int16Array(t, o, y) : new Int16Array(t.slice(o, o + y * 2)), D = w > 0 && w < 5 ? w : 0.125, _ = new Int16Array(y);
  let L = 32767, b = -32768;
  for (let h = 0; h < y; h++) {
    const O = W[h];
    let f = O === P ? -1e3 : Math.round(O * p + x);
    f < -32768 ? f = -32768 : f > 32767 && (f = 32767), _[h] = f, O !== P && (f < L && (L = f), f > b && (b = f)), h & 4194303 || n?.(Math.round(h / y * 85));
  }
  return {
    data: _,
    dimensions: [d, m, u],
    spacing: [D, D, D],
    windowCenter: 300,
    windowWidth: 2500,
    modality: "CT",
    minValue: L,
    maxValue: b,
    seriesDescription: "OneVolume CT"
  };
}
const G = "importvol", ne = "importvol-frame-of-ref", ie = /^importvol(\d+):(\d+)$/;
let X = !1, oe = 0;
const A = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Set();
function k(e) {
  if (typeof e != "string") return null;
  const n = e.match(ie);
  return n ? { key: `${G}${n[1]}`, index: parseInt(n[2], 10) } : null;
}
function re(e) {
  return { promise: new Promise((r, t) => {
    const l = k(e), s = l && A.get(l.key);
    if (!l || !s) return t(new Error(`import volume not loaded: ${e}`));
    const [i, o] = s.dimensions, c = i * o, a = s.data.subarray(l.index * c, (l.index + 1) * c);
    r({
      imageId: e,
      getPixelData: () => a,
      rows: o,
      columns: i,
      height: o,
      width: i,
      color: !1,
      numberOfComponents: 1,
      rgba: !1,
      sliceThickness: s.spacing[2],
      // DICOM convention: row spacing = Δ between rows (column direction) = sy.
      columnPixelSpacing: s.spacing[0],
      rowPixelSpacing: s.spacing[1],
      slope: 1,
      intercept: 0,
      minPixelValue: s.minValue,
      maxPixelValue: s.maxValue,
      windowCenter: s.windowCenter,
      windowWidth: s.windowWidth,
      invert: !1,
      sizeInBytes: a.byteLength
    });
  }) };
}
function ae(e, n) {
  const r = k(n), t = r && A.get(r.key);
  if (!r || !t) return;
  const [l, s] = t.dimensions, [i, o, c] = t.spacing, a = t.origin ?? [-(l * i) / 2, -(s * o) / 2, -(t.dimensions[2] * c) / 2], d = r.index;
  switch (e) {
    case "imagePixelModule":
      return { bitsAllocated: 16, bitsStored: 16, highBit: 15, samplesPerPixel: 1, pixelRepresentation: 1, photometricInterpretation: "MONOCHROME2", rows: s, columns: l };
    case "imagePlaneModule":
      return {
        imageOrientationPatient: [1, 0, 0, 0, 1, 0],
        imagePositionPatient: [a[0], a[1], a[2] + d * c],
        rows: s,
        columns: l,
        rowCosines: [1, 0, 0],
        columnCosines: [0, 1, 0],
        pixelSpacing: [o, i],
        rowPixelSpacing: o,
        columnPixelSpacing: i,
        sliceThickness: c,
        sliceLocation: a[2] + d * c,
        frameOfReferenceUID: ne
      };
    case "voiLutModule":
      return { windowCenter: t.windowCenter, windowWidth: t.windowWidth };
    case "modalityLutModule":
      return { rescaleSlope: 1, rescaleIntercept: 0 };
    case "generalSeriesModule":
      return { modality: t.modality, seriesInstanceUID: "import-series" };
    default:
      return;
  }
}
function le(e) {
  B.has(e) || (j.registerImageLoader(e, re), B.add(e)), !X && (J.addProvider(ae, 1e4), X = !0);
}
async function ce(e, n) {
  const r = oe++, t = `${G}${r}`;
  le(t), A.set(t, e), n?.(90);
  const l = e.dimensions[2], s = Array.from({ length: l }, (m, u) => `${t}:${u}`), i = `${Q}import${r}`;
  if (se.set(i, t), e.warnings?.length)
    for (const m of e.warnings) console.warn(`[DQ-DICOM] Import: ${m}`);
  const o = await H.createAndCacheVolume(i, { imageIds: s });
  n?.(96), await new Promise((m, u) => {
    o.load((w) => {
      w && w.success === !1 ? u(new Error(`Failed to load imported volume (${w.imageId ?? "frame load error"})`)) : m();
    });
  }), n?.(100);
  const c = e.seriesDescription ?? "Imported CT", a = e.warnings?.length ? `${c} [warning: ${e.warnings.join("; ")}]` : c;
  return { study: {
    studyInstanceUID: `import-study-${r}`,
    studyDescription: a,
    studyDate: "",
    patientName: e.patientName ?? "Imported",
    patientId: e.patientId ?? "IMPORT",
    patientBirthDate: "",
    institution: "",
    series: [{
      seriesInstanceUID: "import-series",
      seriesDescription: a,
      seriesNumber: 1,
      modality: e.modality,
      imageCount: l,
      imageIds: []
    }]
  }, volumeId: i, windowLevel: { wc: e.windowCenter, ww: e.windowWidth } };
}
function me(e) {
  return ee(e) ? "onevolume" : K(e) ? "galileos" : null;
}
async function we(e, n) {
  const r = me(e);
  if (!r) return null;
  n?.(1);
  const t = r === "onevolume" ? await te(e, n) : await Z(e, n);
  return ce(t, n);
}
export {
  me as detectFormat,
  we as importNativeVolume
};
//# sourceMappingURL=index-DK0IJiaM.js.map
