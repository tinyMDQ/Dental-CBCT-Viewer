import b from "dicom-parser";
const w = new TextDecoder("utf-8"), g = [];
function N() {
  for (; g.length; )
    URL.revokeObjectURL(g.pop());
}
function p(e, i, t = !1) {
  if (t) {
    const c = e.elements[i];
    if (!c || c.length === 0) return "";
    const d = new Uint8Array(e.byteArray.buffer, e.byteArray.byteOffset + c.dataOffset, c.length);
    return w.decode(d).trim();
  }
  const r = e.string(i);
  return r ? r.trim() : "";
}
function h(e, i, t = 0) {
  const r = e.intString(i);
  return r !== void 0 ? r : t;
}
function M(e, i, t = 0) {
  const r = e.floatString(i);
  return r !== void 0 ? r : t;
}
function O(e) {
  const i = e.string("x00200032");
  if (!i) return 0;
  const t = i.split("\\");
  return t.length >= 3 ? parseFloat(t[2]) : 0;
}
function U(e, i) {
  const t = i[0].iop;
  if (t && i.some((o) => o.iop && o.iop !== t) && console.warn(
    `[DQ-DICOM] Series ${e}: inconsistent ImageOrientationPatient across slices — slice order may be unreliable`
  ), i.length < 3) return;
  const r = [];
  for (let o = 1; o < i.length; o++)
    r.push(Math.abs(i[o].ippZ - i[o - 1].ippZ));
  const c = r.reduce((o, u) => o + u, 0) / r.length;
  if (c <= 0) return;
  const d = Math.max(...r.map((o) => Math.abs(o - c)));
  d > Math.max(0.01, c * 0.05) && console.warn(
    `[DQ-DICOM] Series ${e}: irregular slice spacing (mean ${c.toFixed(3)} mm, max deviation ${d.toFixed(3)} mm) — possible missing slices`
  );
}
async function S(e, i) {
  const t = [];
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    i?.(a, e.length);
    try {
      const l = await n.arrayBuffer(), m = new Uint8Array(l), s = b.parseDicom(m), I = new Blob([m], { type: "application/dicom" }), D = URL.createObjectURL(I);
      g.push(D);
      const x = `wadouri:${D}`, f = (s.string("x00080005") || "").indexOf("ISO_IR 192") !== -1;
      t.push({
        imageId: x,
        seriesInstanceUID: p(s, "x0020000e"),
        studyInstanceUID: p(s, "x0020000d"),
        instanceNumber: h(s, "x00200013"),
        sliceLocation: M(s, "x00201041"),
        ippZ: O(s),
        iop: p(s, "x00200037"),
        seriesDescription: p(s, "x0008103e", f),
        seriesNumber: h(s, "x00200011"),
        modality: p(s, "x00080060"),
        // Rows/Columns are US (uint16) — binary, not IntegerString.
        rows: s.uint16("x00280010") ?? 0,
        columns: s.uint16("x00280011") ?? 0,
        pixelSpacing: parseFloat((s.string("x00280030") ?? "").split("\\")[0]) || 0,
        patientName: p(s, "x00100010", f),
        patientId: p(s, "x00100020", f),
        patientBirthDate: p(s, "x00100030", f),
        studyDescription: p(s, "x00081030", f),
        studyDate: p(s, "x00080020"),
        institution: p(s, "x00080080", f)
      });
    } catch (l) {
      console.warn(`[DQ-DICOM] Skipping ${n.name}:`, l);
    }
  }
  if (i?.(e.length, e.length), t.length === 0)
    return console.warn(`[DQ-DICOM] No readable DICOM files — all ${e.length} file(s) were skipped`), null;
  t.length < e.length && console.warn(`[DQ-DICOM] Loaded ${t.length}/${e.length} files — ${e.length - t.length} skipped`);
  const r = new Set(t.map((a) => a.patientId).filter(Boolean)), c = r.size > 1;
  c && console.warn(
    `[DQ-DICOM] Dropped files contain ${r.size} different PatientIDs — loading anyway; study metadata comes from the first parsed file`
  );
  const d = /* @__PURE__ */ new Map();
  for (const a of t) {
    const n = a.seriesInstanceUID || "unknown";
    d.has(n) || d.set(n, []), d.get(n).push(a);
  }
  const o = [];
  for (const [a, n] of d)
    n.sort((l, m) => l.ippZ !== m.ippZ ? l.ippZ - m.ippZ : l.sliceLocation !== m.sliceLocation ? l.sliceLocation - m.sliceLocation : l.instanceNumber - m.instanceNumber), U(a, n), o.push({
      seriesInstanceUID: a,
      seriesDescription: n[0].seriesDescription || `Series #${n[0].seriesNumber}`,
      seriesNumber: n[0].seriesNumber,
      modality: n[0].modality,
      imageCount: n.length,
      imageIds: n.map((l) => l.imageId),
      rows: n[0].rows || void 0,
      columns: n[0].columns || void 0,
      pixelSpacingMm: n[0].pixelSpacing || void 0
    });
  o.sort((a, n) => a.seriesNumber - n.seriesNumber);
  const u = t[0], y = u.studyDescription || "DICOM study";
  return {
    studyInstanceUID: u.studyInstanceUID,
    studyDescription: c ? `${y} [warning: ${r.size} PatientIDs in file set]` : u.studyDescription,
    studyDate: u.studyDate,
    patientName: u.patientName.replace(/\^/g, " "),
    patientId: u.patientId,
    patientBirthDate: u.patientBirthDate,
    institution: u.institution,
    series: o
  };
}
export {
  S as parseDicomFiles,
  N as revokeAllBlobUrls
};
//# sourceMappingURL=dicomLoader-B8VFrwB8.js.map
