import { getVolumeData as I } from "./cprEngine-XRs08qxT.js";
import { f as v, n as w, t as x } from "./boneQuality-CYRvtZJv.js";
import { m as C } from "./archCurve-DCaMAt3K.js";
import { scanTriangleSoupWorld as S } from "./scanMesh-NquU4Ro1.js";
import { f as g } from "./dicomUtils-BnzdyaEy.js";
const M = 1, L = 1.8, y = 2, d = (e) => (Math.round(e * 10) / 10).toFixed(1), p = (e, n) => [
  e.entry[0] + e.axis[0] * n,
  e.entry[1] + e.axis[1] * n,
  e.entry[2] + e.axis[2] * n
];
function h(e, n) {
  return (e.sleeveDiameter + n.channelTolMm) / 2;
}
function b(e, n) {
  return n.sleeveSeat ? (e.sleeveDiameter + 2 * n.sleeveWallMm) / 2 + n.seatClearanceMm : h(e, n);
}
function R(e) {
  const { implants: n, params: r } = e, o = e.thresholds ?? { nerve: 2, sinus: 1 }, i = [];
  r.wallMm < M && i.push({ code: "thinWall", severity: "warning", detail: `${d(r.wallMm)} mm` });
  for (const t of n) {
    const s = h(t, r) * 2;
    if (s < L) {
      i.push({ code: "narrowChannel", severity: "warning", detail: `${d(s)} mm` });
      break;
    }
  }
  for (let t = 0; t < n.length; t++)
    for (let s = t + 1; s < n.length; s++) {
      const m = n[t], a = n[s], u = p(m, m.length + y), l = p(a, a.length + y), f = v(m.entry, u, [a.entry, l]) - b(m, r) - b(a, r);
      f < M && i.push({ code: "boresClose", severity: f < 0 ? "error" : "warning", detail: `${d(Math.max(0, f))} mm` });
    }
  const c = (e.anatomy ?? []).filter((t) => t.points.length > 0);
  for (const t of n) {
    const s = p(t, t.length + y), m = h(t, r);
    for (const a of c) {
      const u = v(t.entry, s, a.points) - a.radius - m, l = a.type === "nerve" ? o.nerve : o.sinus;
      u < l && i.push({
        code: a.type === "nerve" ? "drillNerve" : "drillSinus",
        severity: u < 0 ? "error" : "warning",
        detail: `${d(u)} mm`
      });
    }
  }
  return i.sort((t, s) => t.severity === s.severity ? 0 : t.severity === "error" ? -1 : 1);
}
function O(e) {
  const n = e.study, r = e.report, o = r.patientBirthDate || n?.patientBirthDate || "";
  return {
    name: r.patientName || n?.patientName || "",
    birth: o ? g(o) : "",
    date: n?.studyDate ? g(n.studyDate) : "",
    clinic: r.clinic || n?.institution || "",
    series: n?.series.find((i) => i.seriesInstanceUID === e.activeSeriesUID)?.seriesDescription || "",
    modality: n?.series[0]?.modality || "",
    color: e.display.labelColor
  };
}
function P(e) {
  const n = {}, r = e.archCurveControlPoints, o = e.volumeId ? I(e.volumeId) : null;
  if (!r || !o) return n;
  for (const i of e.implants) {
    const c = w(r, i);
    if (!c) continue;
    const t = x(o, c.entry, c.apex, i.diameter / 2);
    t && (n[i.id] = `${t.bone} · ${Math.round(t.meanHU)} GV`);
  }
  return n;
}
async function B(e, n, r, o) {
  const { exportViewPdf: i } = await import("./pdfExport-DZh6Vx4P.js");
  await i({
    t: n,
    study: e.study,
    implants: e.implants,
    measurements: e.measurements,
    report: e.report,
    anatomy: e.anatomy,
    archCurve: e.archCurveControlPoints,
    thresholds: { nerve: e.safety.nerveMm, sinus: e.safety.sinusMm, neighbor: e.safety.neighborMm },
    boneQuality: P(e),
    lang: r,
    config: o,
    overlayData: O(e)
  });
}
function D(e) {
  const n = e.archCurveControlPoints, r = e.implants.filter((o) => o.guided?.enabled);
  return !n || r.length === 0 ? [] : r.flatMap((o) => {
    const i = w(n, o);
    if (!i) return [];
    const c = C(o.systemId);
    return [{
      entry: i.entry,
      axis: i.axis,
      length: o.length,
      sleeveDiameter: c.sleeveDiameter,
      sleeveOffset: o.guided.sleeveOffset,
      sleeveHeight: o.guided.sleeveHeight
    }];
  });
}
function G(e) {
  const n = D(e);
  return n.length === 0 ? [] : R({
    implants: n,
    params: e.guide,
    anatomy: e.anatomy,
    thresholds: { nerve: e.safety.nerveMm, sinus: e.safety.sinusMm }
  });
}
async function H(e) {
  const n = e.archCurveControlPoints, r = D(e);
  if (!n || r.length === 0) return { ok: !1, warnings: [] };
  const { buildDrillGuide: o } = await import("./guideBuilder-DT0fpxEB.js").then((l) => l.g), { triMeshToBinarySTL: i } = await import("./guideExport-DyP-i85F.js"), c = e.scans.filter((l) => l.visible).map((l) => S(l.id, l.transform)).filter((l) => !!l), t = await o({ controlPoints: n, implants: r, scanSoups: c, params: e.guide }), s = i(t.mesh), m = new Blob([s], { type: "model/stl" }), a = URL.createObjectURL(m), u = document.createElement("a");
  return u.download = `guide_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.stl`, u.href = a, u.click(), URL.revokeObjectURL(a), { ok: !0, warnings: t.warnings };
}
export {
  G as checkGuide,
  H as exportDrillGuideStl,
  B as exportPlanPdf,
  O as overlayDataFromState
};
//# sourceMappingURL=viewerExports-B33A0LLc.js.map
