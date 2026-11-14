import { volumeLoader as S, imageLoader as C, metaData as D } from "@cornerstonejs/core";
import { c as E } from "./constants-DMHmwL7Y.js";
import { g as I } from "./gzip-gNdLXDK7.js";
import { p as L } from "./index-Bc8SPET-.js";
const P = "sample", v = "sample-frame-of-ref", A = /^sample(\d+):(\d+)$/;
let x = !1, O = 0;
const w = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Set();
function $(e) {
  if (typeof e != "string") return null;
  const t = e.match(A);
  return t ? { key: `${P}${t[1]}`, index: parseInt(t[2], 10) } : null;
}
function k(e) {
  return { promise: new Promise((n, m) => {
    const s = $(e), c = s && w.get(s.key);
    if (!s || !c) return m(new Error(`sample volume not loaded: ${e}`));
    const { data: l, meta: i } = c, [d, a] = i.dimensions, r = d * a, o = l.subarray(s.index * r, (s.index + 1) * r);
    n({
      imageId: e,
      getPixelData: () => o,
      rows: a,
      columns: d,
      height: a,
      width: d,
      color: !1,
      numberOfComponents: 1,
      rgba: !1,
      sliceThickness: i.spacing[2],
      // DICOM convention: row spacing = Δ between rows (column direction) = sy.
      columnPixelSpacing: i.spacing[0],
      rowPixelSpacing: i.spacing[1],
      slope: 1,
      intercept: 0,
      minPixelValue: -1024,
      maxPixelValue: 3071,
      windowCenter: i.windowCenter,
      windowWidth: i.windowWidth,
      invert: !1,
      sizeInBytes: o.byteLength
    });
  }) };
}
function R(e, t) {
  const n = $(t), m = n && w.get(n.key);
  if (!n || !m) return;
  const { meta: s } = m, [c, l] = s.dimensions, [i, d, a] = s.spacing, [r, o, u] = s.origin, p = n.index;
  switch (e) {
    case "imagePixelModule":
      return { bitsAllocated: 16, bitsStored: 16, highBit: 15, samplesPerPixel: 1, pixelRepresentation: 1, photometricInterpretation: "MONOCHROME2", rows: l, columns: c };
    case "imagePlaneModule":
      return {
        imageOrientationPatient: [1, 0, 0, 0, 1, 0],
        imagePositionPatient: [r, o, u + p * a],
        rows: l,
        columns: c,
        rowCosines: [1, 0, 0],
        columnCosines: [0, 1, 0],
        pixelSpacing: [d, i],
        rowPixelSpacing: d,
        columnPixelSpacing: i,
        sliceThickness: a,
        sliceLocation: u + p * a,
        frameOfReferenceUID: v
      };
    case "voiLutModule":
      return { windowCenter: s.windowCenter, windowWidth: s.windowWidth };
    case "modalityLutModule":
      return { rescaleSlope: 1, rescaleIntercept: 0 };
    case "generalSeriesModule":
      return { modality: s.modality, seriesInstanceUID: "sample-series" };
    default:
      return;
  }
}
function B(e) {
  b.has(e) || (C.registerImageLoader(e, k), b.add(e)), !x && (D.addProvider(R, 1e4), x = !0);
}
function T(e) {
  const t = y.get(e) ?? e;
  y.delete(e), w.delete(t);
}
async function M(e) {
  let t;
  try {
    t = await fetch(e, { cache: "no-store" });
  } catch (n) {
    throw new Error(`fetch failed for ${e}: ${n.message}`);
  }
  if (!t.ok) throw new Error(`HTTP ${t.status} for ${e}`);
  return t;
}
async function U(e, t, n, m) {
  const s = n || Number(e.headers.get("Content-Length")) || 0, c = e.body?.getReader();
  if (!c) {
    const o = await I(new Uint8Array(await e.arrayBuffer()), t);
    return new Int16Array(o.buffer, o.byteOffset, o.byteLength / 2);
  }
  const l = [];
  let i = 0;
  for (; ; ) {
    const { done: o, value: u } = await c.read();
    if (o) break;
    l.push(u), i += u.length, s && m?.(Math.min(1, i / s));
  }
  const d = new Uint8Array(i);
  let a = 0;
  for (const o of l)
    d.set(o, a), a += o.length;
  m?.(1);
  const r = await I(d, t);
  return new Int16Array(r.buffer, r.byteOffset, r.byteLength / 2);
}
async function F(e = L("sample"), t) {
  t?.(0);
  const n = await (await M(`${e}/meta.json`)).json(), m = await M(`${e}/volume.raw.bin`), [s, c, l] = n.dimensions, i = s * c * l * 2 + 4096, d = await U(m, i, n.fileBytes, (f) => t?.(Math.round(f * 90)));
  t?.(92);
  const a = O++, r = `${P}${a}`;
  B(r), w.set(r, { data: d, meta: n });
  const o = Array.from({ length: l }, (f, g) => `${r}:${g}`), u = `${E}sample${a}`;
  y.set(u, r);
  const p = await S.createAndCacheVolume(u, { imageIds: o });
  return t?.(96), await new Promise((f, g) => {
    p.load((h) => {
      h && h.success === !1 ? g(new Error(`Failed to load sample volume (${h.imageId ?? "frame load error"})`)) : f();
    });
  }), t?.(100), { study: {
    studyInstanceUID: "sample-study",
    studyDescription: "CBCT sample",
    studyDate: n.studyDate,
    patientName: n.patientName,
    patientId: "SAMPLE",
    patientBirthDate: "",
    institution: n.institution,
    series: [{
      seriesInstanceUID: "sample-series",
      seriesDescription: n.seriesDescription,
      seriesNumber: 1,
      modality: n.modality,
      imageCount: l,
      imageIds: [],
      // volume is already built here; keep empty so the shell won't rebuild it
      columns: s,
      rows: c,
      pixelSpacingMm: n.spacing[0]
    }]
  }, volumeId: u, windowLevel: { wc: n.windowCenter, ww: n.windowWidth } };
}
export {
  T as disposeSampleVolume,
  F as loadSample
};
//# sourceMappingURL=sampleLoader-oSWzPOW8.js.map
