import { g as y } from "./gzip-gNdLXDK7.js";
import { parseScanMesh as u, setScanPolyData as g, setScanBaseTransform as d } from "./scanMesh-NquU4Ro1.js";
import { S as w, e as $ } from "./archCurve-DCaMAt3K.js";
import { p as h } from "./index-Bc8SPET-.js";
function S(n) {
  if (typeof n?.file != "string" || !n.file) return null;
  const r = $.includes(n.type) ? n.type : "oral", s = Array.isArray(n.transform) && n.transform.length === 16 && n.transform.every((e) => typeof e == "number" && Number.isFinite(e)) ? n.transform : null;
  return s ? {
    file: n.file,
    type: r,
    nameKey: typeof n.nameKey == "string" && n.nameKey ? n.nameKey : `scan.${r}`,
    triangles: typeof n.triangles == "number" && n.triangles > 0 ? n.triangles : void 0,
    transform: s
  } : null;
}
const A = (n) => Math.max(4 << 20, (n ?? 0) * 64 + (1 << 20));
async function p(n) {
  const r = await fetch(n, { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${n}`);
  return r;
}
async function T(n, r = h("sample-io"), s) {
  const e = await (await p(`${r}/scans.json`)).json(), o = Array.isArray(e.scans) ? e.scans : [], f = [];
  for (let a = 0; a < o.length; a++) {
    const t = S(o[a]);
    if (!t) {
      console.warn(`[DQ-DICOM] sample scan entry ${a} is malformed — skipped`);
      continue;
    }
    const m = new Uint8Array(await (await p(`${r}/${t.file}`)).arrayBuffer()), c = u(t.file.replace(/\.gz$/, ""), (await y(m, A(t.triangles))).buffer);
    if (!c) {
      console.warn(`[DQ-DICOM] sample scan "${t.file}" could not be parsed — skipped`);
      continue;
    }
    const i = `scan_sample_${t.type}_${Date.now()}_${a}`;
    g(i, c), d(i, t.transform);
    const l = w[t.type];
    f.push({
      id: i,
      name: n(t.nameKey),
      type: t.type,
      color: l.color,
      opacity: l.opacity,
      visible: !0,
      transform: t.transform,
      fileName: t.file
    }), s?.((a + 1) / o.length);
  }
  return f;
}
export {
  T as loadSampleScans,
  S as validEntry
};
//# sourceMappingURL=sampleScans-BhxHmsgl.js.map
