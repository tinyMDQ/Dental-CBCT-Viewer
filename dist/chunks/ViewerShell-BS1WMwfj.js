import { jsxs as f, jsx as r, Fragment as Ie } from "react/jsx-runtime";
import { useState as Z, useRef as ne, useCallback as Q, useEffect as J, useMemo as je } from "react";
import { getRenderingEngine as ie, cache as He, Enums as ge, utilities as Qn, setVolumesForViewports as Sn, volumeLoader as er, RenderingEngine as tr, eventTarget as Je } from "@cornerstonejs/core";
import { annotation as En, Enums as Ze } from "@cornerstonejs/tools";
import { u as le, a as fe, c as nr, d as rr, l as bt, s as or, N as qt, j as An, e as ar, f as Dn, J as wt, M as Mt, g as sr, h as ir, i as lr } from "./index-Bc8SPET-.js";
import { setActiveTool as ut, setupTools as pt, addViewportToToolGroup as Tn, addViewportTo3DToolGroup as cr } from "./toolManager-DUPAU9IU.js";
import { R as se, f as Ue, d as Ot, e as Rt, V as Ee, b as ye, c as dr } from "./constants-DMHmwL7Y.js";
import { getScanBaseTransform as ur, getScanPolyData as Pn, removeScanPolyData as _n, scanTriangleSoupWorld as Tt, scanMeshInfo as pr, buildScanActor as hr, sliceScanWorld as Ln, clearScanRegistry as mr } from "./scanMesh-NquU4Ro1.js";
import { m as Xe, a as Pt, j as gr, k as Jt, p as fr } from "./registration-CbdqkbzE.js";
import { p as $e, n as ht, j as $t, t as yr, s as On, l as mt, a as Zt, b as kt, r as Pe, h as Nt, m as xr, d as vr, u as br, i as wr } from "./boneQuality-CYRvtZJv.js";
import { t as gt, a as Vt, d as Mr, b as kr } from "./cprMath-DBemhKEF.js";
import { getVolumeData as Te, generatePanoramic as Nr, generateCrossSection as Ir } from "./cprEngine-XRs08qxT.js";
import { e as Cr, S as Sr, m as Fe, c as Er, j as Qt, f as Ar, g as _t, o as Dr, h as en, A as Tr, s as Pr, l as _r, n as Lr, i as Or, r as tn, V as Rr, W as nn, q as $r, p as Vr, t as zr } from "./archCurve-DCaMAt3K.js";
import { f as dt } from "./dicomUtils-BnzdyaEy.js";
import ft from "@kitware/vtk.js/Rendering/Core/Actor";
import yt from "@kitware/vtk.js/Rendering/Core/Mapper";
import Wr from "@kitware/vtk.js/Common/DataModel/PolyData";
import Ur from "@kitware/vtk.js/Common/Core/DataArray";
import Br from "@kitware/vtk.js/Filters/General/TubeFilter";
import Rn from "@kitware/vtk.js/Filters/Sources/PlaneSource";
import jr from "@kitware/vtk.js/Rendering/Core/Texture";
import Fr from "@kitware/vtk.js/Filters/Sources/SphereSource";
import rn from "@kitware/vtk.js/Common/DataModel/Plane";
import { X as Qe, b as Gr, c as Yr, d as Xr, a as on, V as Hr } from "./volume3DPreset-42nWcqi3.js";
import { r as Kr } from "./registrationError-O1YKYuEs.js";
import { revokeAllBlobUrls as qr } from "./dicomLoader-B8VFrwB8.js";
const Ne = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, zt = {
  windowLevel: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ r("path", { d: "M12 3a9 9 0 0 1 0 18z", fill: "currentColor", stroke: "none" })
  ] }),
  pan: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("polyline", { points: "5 9 2 12 5 15" }),
    /* @__PURE__ */ r("polyline", { points: "9 5 12 2 15 5" }),
    /* @__PURE__ */ r("polyline", { points: "15 19 12 22 9 19" }),
    /* @__PURE__ */ r("polyline", { points: "19 9 22 12 19 15" }),
    /* @__PURE__ */ r("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "2", x2: "12", y2: "22" })
  ] }),
  zoom: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ r("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }),
    /* @__PURE__ */ r("line", { x1: "11", y1: "8", x2: "11", y2: "14" }),
    /* @__PURE__ */ r("line", { x1: "8", y1: "11", x2: "14", y2: "11" })
  ] }),
  scroll: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("polyline", { points: "7 7 12 2 17 7" }),
    /* @__PURE__ */ r("polyline", { points: "7 17 12 22 17 17" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "2", x2: "12", y2: "22" })
  ] }),
  crosshairs: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "1", x2: "12", y2: "7" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "17", x2: "12", y2: "23" }),
    /* @__PURE__ */ r("line", { x1: "1", y1: "12", x2: "7", y2: "12" }),
    /* @__PURE__ */ r("line", { x1: "17", y1: "12", x2: "23", y2: "12" })
  ] }),
  length: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("line", { x1: "4", y1: "20", x2: "20", y2: "4" }),
    /* @__PURE__ */ r("line", { x1: "3", y1: "17", x2: "7", y2: "21" }),
    /* @__PURE__ */ r("line", { x1: "17", y1: "3", x2: "21", y2: "7" })
  ] }),
  angle: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("line", { x1: "4", y1: "20", x2: "20", y2: "20" }),
    /* @__PURE__ */ r("line", { x1: "4", y1: "20", x2: "16", y2: "6" }),
    /* @__PURE__ */ r("path", { d: "M11 20a8 8 0 0 0-2.5-5.5" })
  ] }),
  ellipse: () => /* @__PURE__ */ r("svg", { ...Ne, children: /* @__PURE__ */ r("ellipse", { cx: "12", cy: "12", rx: "9", ry: "6" }) }),
  circle: () => /* @__PURE__ */ r("svg", { ...Ne, children: /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "8" }) }),
  rectangle: () => /* @__PURE__ */ r("svg", { ...Ne, children: /* @__PURE__ */ r("rect", { x: "4", y: "6", width: "16", height: "12", rx: "1" }) }),
  freehand: () => /* @__PURE__ */ r("svg", { ...Ne, children: /* @__PURE__ */ r("path", { d: "M3 17c3-6 5 4 8-2s5 2 10-8" }) }),
  bidirectional: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "4", x2: "12", y2: "20" }),
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
  ] }),
  probe: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "7", strokeDasharray: "2 3" })
  ] }),
  arrow: () => /* @__PURE__ */ f("svg", { ...Ne, children: [
    /* @__PURE__ */ r("line", { x1: "20", y1: "4", x2: "6", y2: "18" }),
    /* @__PURE__ */ r("polyline", { points: "6 12 6 18 12 18" })
  ] })
};
function $n() {
  ie(se)?.render();
}
function Jr(e, t) {
  En.visibility.setAnnotationVisibility(e, t), $n();
}
function Zr(e) {
  En.state.removeAnnotation(e), $n();
}
function Qr(e) {
  const t = e?.metadata?.toolName, n = e?.data?.cachedStats, a = n ? Object.values(n)[0] : null, o = { points: e?.data?.handles?.points ?? void 0 };
  if (!a) return o;
  const s = (c) => (Math.round(c * 10) / 10).toFixed(1), l = (c) => Math.round(c).toString();
  switch (t) {
    case "Length":
      a.length != null && (o.value = `${s(a.length)} mm`);
      break;
    case "Angle":
      a.angle != null && (o.value = `${s(a.angle)}°`);
      break;
    case "Bidirectional":
      a.length != null && (o.value = `${s(a.length)} × ${s(a.width)} mm`);
      break;
    case "Probe":
      a.value != null && (o.value = `${l(a.value)} HU`);
      break;
    case "EllipticalROI":
    case "CircleROI":
    case "RectangleROI":
    case "PlanarFreehandROI":
      a.mean != null && (o.value = `${l(a.mean)} ± ${l(a.stdDev)} HU · ${l(a.min)}–${l(a.max)}`);
      break;
  }
  return o;
}
const eo = {
  Length: "length",
  Angle: "angle",
  EllipticalROI: "ellipse",
  CircleROI: "circle",
  RectangleROI: "rectangle",
  PlanarFreehandROI: "freehand",
  Bidirectional: "bidirectional",
  Probe: "probe",
  ArrowAnnotate: "arrow"
}, to = 0.25, no = 1, ro = { x: 0, y: 1, z: 2 };
function Lt(e) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e[0], e[1], e[2], 1];
}
function oo(e, t) {
  const n = t * Math.PI / 180, a = Math.cos(n), i = Math.sin(n);
  switch (e) {
    case "x":
      return [1, 0, 0, 0, 0, a, i, 0, 0, -i, a, 0, 0, 0, 0, 1];
    case "y":
      return [a, 0, -i, 0, 0, 1, 0, 0, i, 0, a, 0, 0, 0, 0, 1];
    case "z":
      return [a, i, 0, 0, -i, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
}
function ao(e, t, n) {
  const a = [0, 0, 0];
  return a[ro[t]] = n, Xe(Lt(a), e);
}
function so(e, t, n, a) {
  const i = Lt([a[0], a[1], a[2]]), o = Lt([-a[0], -a[1], -a[2]]);
  return Xe(Xe(i, Xe(oo(t, n), o)), e);
}
function io(e, t) {
  return !t || t.length < 6 ? Pt(e, [0, 0, 0]) : Pt(e, [
    (t[0] + t[1]) / 2,
    (t[2] + t[3]) / 2,
    (t[4] + t[5]) / 2
  ]);
}
const an = ["x", "y", "z"], lo = [0.1, 0.25, 1], co = [0.5, 1, 5];
function et({ label: e, title: t, onClick: n }) {
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: n,
      title: t,
      className: "w-6 h-5 flex items-center justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 text-[11px] leading-none transition-colors",
      children: e
    }
  );
}
function uo({ scan: e }) {
  const { dispatch: t } = le(), { t: n } = fe(), [a, i] = Z(to), [o, s] = Z(no), l = (g) => t({ type: "UPDATE_SCAN", payload: { ...e, transform: g } }), c = (g, m) => l(ao(e.transform, g, m * a)), d = (g, m) => {
    const x = io(e.transform, Pn(e.id)?.getBounds?.());
    l(so(e.transform, g, m * o, x));
  }, p = ur(e.id);
  return /* @__PURE__ */ f("div", { className: "mt-1 ml-2 mr-1 rounded-md border border-gray-200 dark:border-gray-700 p-1.5 space-y-1.5", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r("span", { className: "text-[10px] uppercase tracking-wide text-gray-500 select-none", children: n("scanAdjust.move") }),
      /* @__PURE__ */ r(
        "select",
        {
          value: a,
          onChange: (g) => i(Number(g.target.value)),
          className: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-[10px] rounded px-1 py-0.5 border",
          children: lo.map((g) => /* @__PURE__ */ f("option", { value: g, children: [
            g,
            " mm"
          ] }, g))
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: an.map((g) => /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
      /* @__PURE__ */ r("span", { className: "w-3 text-[10px] font-semibold text-gray-500 uppercase select-none", children: g }),
      /* @__PURE__ */ r(et, { label: "−", title: `${g.toUpperCase()} −${a} mm`, onClick: () => c(g, -1) }),
      /* @__PURE__ */ r(et, { label: "+", title: `${g.toUpperCase()} +${a} mm`, onClick: () => c(g, 1) })
    ] }, g)) }),
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2 pt-0.5", children: [
      /* @__PURE__ */ r("span", { className: "text-[10px] uppercase tracking-wide text-gray-500 select-none", children: n("scanAdjust.rotate") }),
      /* @__PURE__ */ r(
        "select",
        {
          value: o,
          onChange: (g) => s(Number(g.target.value)),
          className: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-[10px] rounded px-1 py-0.5 border",
          children: co.map((g) => /* @__PURE__ */ f("option", { value: g, children: [
            g,
            "°"
          ] }, g))
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: an.map((g) => /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
      /* @__PURE__ */ r("span", { className: "w-3 text-[10px] font-semibold text-gray-500 uppercase select-none", children: g }),
      /* @__PURE__ */ r(et, { label: "↺", title: `${g.toUpperCase()} −${o}°`, onClick: () => d(g, -1) }),
      /* @__PURE__ */ r(et, { label: "↻", title: `${g.toUpperCase()} +${o}°`, onClick: () => d(g, 1) })
    ] }, g)) }),
    /* @__PURE__ */ r(
      "button",
      {
        onClick: () => p && l(p),
        disabled: !p,
        title: n("scanAdjust.resetHint"),
        className: "w-full py-0.5 text-[10px] rounded bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-40",
        children: n("scanAdjust.reset")
      }
    )
  ] });
}
function po(e) {
  const t = Math.floor(e.length / 3);
  if (t < 3) return null;
  let n = 0, a = 0, i = 0;
  for (let k = 0; k < t; k++)
    n += e[3 * k], a += e[3 * k + 1], i += e[3 * k + 2];
  n /= t, a /= t, i /= t;
  let o = 0, s = 0, l = 0, c = 0, d = 0, p = 0;
  for (let k = 0; k < t; k++) {
    const O = e[3 * k] - n, L = e[3 * k + 1] - a, q = e[3 * k + 2] - i;
    o += O * O, s += L * L, l += q * q, c += O * L, d += O * q, p += L * q;
  }
  const g = [
    [o / t, c / t, d / t],
    [c / t, s / t, p / t],
    [d / t, p / t, l / t]
  ], { values: m, vectors: x } = gr(g, 3);
  let I = 0;
  for (let k = 1; k < 3; k++) m[k] > m[I] && (I = k);
  let w = x[0][I], P = x[1][I], v = x[2][I];
  const h = Math.hypot(w, P, v) || 1;
  w /= h, P /= h, v /= h;
  let D = 1 / 0, C = -1 / 0;
  for (let k = 0; k < t; k++) {
    const O = (e[3 * k] - n) * w + (e[3 * k + 1] - a) * P + (e[3 * k + 2] - i) * v;
    O < D && (D = O), O > C && (C = O);
  }
  return { centroid: [n, a, i], axis: [w, P, v], extent: C - D };
}
function ho(e, t) {
  const n = t[0] * e.normal[0] + t[1] * e.normal[1], a = t[0] * e.tangent[0] + t[1] * e.tangent[1], i = t[2];
  let o = Math.sqrt(Math.max(0, 1 - n * n));
  i > 0 && (o = -o);
  const s = Math.atan2(n, o), l = o !== 0 ? a / o : 0, c = o !== 0 ? -i / o : 1, d = Math.atan2(l, c);
  return { angleBLDeg: s * 180 / Math.PI, angleMDDeg: d * 180 / Math.PI };
}
function mo(e, t, n, a) {
  let i = 0, o = 0;
  const s = n / 2;
  for (let l = 2; l <= 8; l += 2) {
    const c = s + l;
    i += a([e[0] + t[0] * c, e[1] + t[1] * c, e[2] + t[2] * c]), o += a([e[0] - t[0] * c, e[1] - t[1] * c, e[2] - t[2] * c]);
  }
  return i >= o ? t : [-t[0], -t[1], -t[2]];
}
const go = 25, fo = 60;
function yo(e, t, n = {}) {
  const a = po(t);
  if (!a || a.extent > (n.maxExtentMm ?? go) || Math.abs(a.axis[2]) < Math.cos(fo * Math.PI / 180)) return null;
  let i = a.axis;
  if (n.vol) {
    const x = n.vol, I = (w) => gt(
      x.getVoxel,
      x.dims,
      (w[0] - x.origin[0]) * x.invSx,
      (w[1] - x.origin[1]) * x.invSy,
      (w[2] - x.origin[2]) * x.invSz
    );
    i = mo(a.centroid, i, a.extent, I);
  } else {
    const x = !n.apexUp;
    (x && i[2] > 0 || !x && i[2] < 0) && (i = [-i[0], -i[1], -i[2]]);
  }
  const [o, s, l] = i, c = a.extent / 2, d = [
    a.centroid[0] + o * c,
    a.centroid[1] + s * c,
    a.centroid[2] + l * c
  ], p = $e(e, [d[0], d[1]]);
  if (!p) return null;
  const { angleBLDeg: g, angleMDDeg: m } = ho(p, i);
  return { position: d, angleBLDeg: g, angleMDDeg: m };
}
function xo({ off: e = !1 }) {
  return /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ r("path", { d: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" }),
    /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "3" }),
    e && /* @__PURE__ */ r("line", { x1: "2", y1: "2", x2: "22", y2: "22", stroke: "currentColor" })
  ] });
}
function vo() {
  return /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ r("line", { x1: "4", y1: "21", x2: "4", y2: "14" }),
    /* @__PURE__ */ r("line", { x1: "4", y1: "10", x2: "4", y2: "3" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "21", x2: "12", y2: "12" }),
    /* @__PURE__ */ r("line", { x1: "12", y1: "8", x2: "12", y2: "3" }),
    /* @__PURE__ */ r("line", { x1: "20", y1: "21", x2: "20", y2: "16" }),
    /* @__PURE__ */ r("line", { x1: "20", y1: "12", x2: "20", y2: "3" }),
    /* @__PURE__ */ r("line", { x1: "1", y1: "14", x2: "7", y2: "14" }),
    /* @__PURE__ */ r("line", { x1: "9", y1: "8", x2: "15", y2: "8" }),
    /* @__PURE__ */ r("line", { x1: "17", y1: "16", x2: "23", y2: "16" })
  ] });
}
function bo() {
  return /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ r("polyline", { points: "3 6 5 6 21 6" }),
    /* @__PURE__ */ r("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
  ] });
}
function wo() {
  return /* @__PURE__ */ r("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) });
}
function Mo() {
  return /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ r("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }),
    /* @__PURE__ */ r("polyline", { points: "2 17 12 22 22 17" }),
    /* @__PURE__ */ r("polyline", { points: "2 12 12 17 22 12" })
  ] });
}
function tt({
  title: e,
  onClick: t,
  disabled: n = !1,
  danger: a = !1,
  children: i
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: t,
      disabled: n,
      title: e,
      className: `
        w-6 h-6 flex items-center justify-center rounded transition-colors
        ${n ? "text-gray-400 dark:text-gray-600 cursor-not-allowed" : a ? "text-gray-500 hover:text-white hover:bg-red-700 dark:text-gray-400" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"}
      `,
      children: i
    }
  );
}
function nt({ name: e, visible: t, active: n = !1, onToggleVisible: a, onEdit: i, onDelete: o, onRename: s, onSelect: l }) {
  const { t: c } = fe(), [d, p] = Z(!1), [g, m] = Z(e), x = () => {
    p(!1);
    const I = g.trim();
    I && I !== e && s?.(I);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `
        flex items-center gap-1 px-2 py-1.5 rounded border
        ${n ? "border-dental-500 bg-gray-200/80 dark:bg-gray-700/60" : "border-transparent hover:bg-gray-200/50 dark:hover:bg-gray-700/40"}
      `,
      onClick: l,
      children: [
        d ? /* @__PURE__ */ r(
          "input",
          {
            autoFocus: !0,
            value: g,
            onChange: (I) => m(I.target.value),
            onBlur: x,
            onKeyDown: (I) => {
              I.key === "Enter" && x(), I.key === "Escape" && (m(e), p(!1));
            },
            className: "flex-1 min-w-0 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 text-xs rounded px-1 py-0.5 border border-dental-500 outline-none",
            onClick: (I) => I.stopPropagation()
          }
        ) : /* @__PURE__ */ r("span", { className: `flex-1 min-w-0 truncate text-xs select-none ${t ? "text-gray-800 dark:text-gray-200" : "text-gray-500 line-through"}`, children: e }),
        /* @__PURE__ */ r(tt, { title: c(t ? "layers.hide" : "layers.show"), onClick: a, children: /* @__PURE__ */ r(xo, { off: !t }) }),
        /* @__PURE__ */ r(tt, { title: c("layers.edit"), onClick: i, disabled: !i, children: /* @__PURE__ */ r(vo, {}) }),
        /* @__PURE__ */ r(tt, { title: c("layers.delete"), onClick: o, disabled: !o, danger: !0, children: /* @__PURE__ */ r(bo, {}) }),
        /* @__PURE__ */ r(
          tt,
          {
            title: c("layers.rename"),
            onClick: s ? () => {
              m(e), p(!0);
            } : void 0,
            disabled: !s,
            children: /* @__PURE__ */ r(wo, {})
          }
        )
      ]
    }
  );
}
function ko() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), [a, i] = Z(null), o = (s) => {
    const l = e.archCurveControlPoints;
    if (!l) {
      window.alert(n("crown.needArch"));
      return;
    }
    const c = Tt(s.id, s.transform), d = e.volumeId ? Te(e.volumeId) ?? void 0 : void 0, p = c && yo(l, c, { vol: d });
    if (!p) {
      window.alert(n("crown.failed"));
      return;
    }
    const g = {
      id: `imp_${Date.now()}`,
      name: n("implant.defaultName", { n: e.implants.length + 1 }),
      visible: !0,
      position: p.position,
      diameter: 4,
      length: 10,
      angleBLDeg: p.angleBLDeg,
      angleMDDeg: p.angleMDDeg,
      systemId: e.defaultSystemId
    };
    t({ type: "ADD_IMPLANT", payload: g }), t({ type: "SET_ACTIVE_IMPLANT", payload: g.id });
  };
  return /* @__PURE__ */ f("div", { className: "space-y-1", children: [
    e.implants.length > 0 && /* @__PURE__ */ r("div", { className: "text-[10px] uppercase tracking-wide text-gray-500 px-1 pt-1 select-none", children: n("layers.implants") }),
    e.implants.map((s) => /* @__PURE__ */ r(
      nt,
      {
        name: s.name,
        visible: s.visible,
        active: e.activeImplantId === s.id,
        onSelect: () => t({ type: "SET_ACTIVE_IMPLANT", payload: s.id }),
        onToggleVisible: () => t({ type: "UPDATE_IMPLANT", payload: { ...s, visible: !s.visible } }),
        onEdit: () => {
          t({ type: "SET_ACTIVE_IMPLANT", payload: s.id }), t({ type: "SET_EDITING_IMPLANT", payload: s.id });
        },
        onDelete: () => t({ type: "REMOVE_IMPLANT", payload: s.id }),
        onRename: (l) => t({ type: "UPDATE_IMPLANT", payload: { ...s, name: l } })
      },
      s.id
    )),
    e.implants.length === 0 && /* @__PURE__ */ r("div", { className: "text-xs text-gray-500 px-1 py-2 select-none", children: n("layers.none") }),
    e.anatomy.length > 0 && /* @__PURE__ */ r("div", { className: "text-[10px] uppercase tracking-wide text-gray-500 px-1 pt-2 select-none", children: n("layers.anatomy") }),
    e.anatomy.map((s) => /* @__PURE__ */ r(
      nt,
      {
        name: `${s.name} · ${s.points.length}p`,
        visible: s.visible,
        active: e.activeAnatomyId === s.id,
        onSelect: () => t({ type: "SET_ACTIVE_ANATOMY", payload: s.id }),
        onToggleVisible: () => t({ type: "UPDATE_ANATOMY", payload: { ...s, visible: !s.visible } }),
        onDelete: () => t({ type: "REMOVE_ANATOMY", payload: s.id }),
        onRename: (l) => t({ type: "UPDATE_ANATOMY", payload: { ...s, name: l } })
      },
      s.id
    )),
    e.scans.length > 0 && /* @__PURE__ */ r("div", { className: "text-[10px] uppercase tracking-wide text-gray-500 px-1 pt-2 select-none", children: n("layers.scans") }),
    e.scans.map((s) => /* @__PURE__ */ f("div", { className: "rounded border border-transparent px-1 pb-1", children: [
      /* @__PURE__ */ r(
        nt,
        {
          name: s.name,
          visible: s.visible,
          onToggleVisible: () => t({ type: "UPDATE_SCAN", payload: { ...s, visible: !s.visible } }),
          onDelete: () => {
            _n(s.id), t({ type: "REMOVE_SCAN", payload: s.id });
          },
          onRename: (l) => t({ type: "UPDATE_SCAN", payload: { ...s, name: l } })
        }
      ),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 px-2 pt-0.5", children: [
        /* @__PURE__ */ r(
          "select",
          {
            value: s.type,
            onChange: (l) => {
              const c = l.target.value;
              t({ type: "UPDATE_SCAN", payload: { ...s, type: c, color: Sr[c].color } });
            },
            className: "flex-1 min-w-0 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-[11px] rounded px-1 py-0.5 border",
            children: Cr.map((l) => /* @__PURE__ */ r("option", { value: l, children: n(`scan.${l}`) }, l))
          }
        ),
        /* @__PURE__ */ r(
          "input",
          {
            type: "color",
            value: s.color,
            onChange: (l) => t({ type: "UPDATE_SCAN", payload: { ...s, color: l.target.value } }),
            className: "h-5 w-6 rounded border border-gray-300 dark:border-gray-600 bg-transparent cursor-pointer",
            title: n("safety.color")
          }
        ),
        /* @__PURE__ */ r(
          "input",
          {
            type: "range",
            min: 0.1,
            max: 1,
            step: 0.05,
            value: s.opacity,
            onChange: (l) => t({ type: "UPDATE_SCAN", payload: { ...s, opacity: Number(l.target.value) } }),
            className: "w-14 h-1 accent-dental-400",
            title: `${Math.round(s.opacity * 100)}%`
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 mt-1 ml-2", children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => {
              t({ type: "SET_LAYOUT_MODE", payload: "2x2" }), t({ type: "START_REGISTRATION", payload: s.id });
            },
            className: "px-2 py-0.5 text-[11px] rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors",
            children: n("reg.start")
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => i((l) => l === s.id ? null : s.id),
            title: n("scanAdjust.hint"),
            className: `px-2 py-0.5 text-[11px] rounded transition-colors ${a === s.id ? "bg-dental-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}`,
            children: n("scanAdjust.button")
          }
        ),
        s.type === "toothSetup" && /* @__PURE__ */ r(
          "button",
          {
            onClick: () => o(s),
            title: n("crown.planHint"),
            className: "px-2 py-0.5 text-[11px] rounded bg-dental-600 text-white hover:bg-dental-700 transition-colors",
            children: n("crown.plan")
          }
        )
      ] }),
      a === s.id && /* @__PURE__ */ r(uo, { scan: s })
    ] }, s.id)),
    e.measurements.length > 0 && /* @__PURE__ */ r("div", { className: "text-[10px] uppercase tracking-wide text-gray-500 px-1 pt-2 select-none", children: n("layers.measurements") }),
    e.measurements.map((s) => /* @__PURE__ */ f("div", { children: [
      /* @__PURE__ */ r(
        nt,
        {
          name: s.value ? `${s.name} · ${s.value}` : s.name,
          visible: s.visible,
          onToggleVisible: () => {
            const l = !s.visible;
            s.kind === "annotation" && Jr(s.id, l), t({ type: "UPDATE_MEASUREMENT", payload: { ...s, visible: l } });
          },
          onDelete: () => {
            s.kind === "annotation" && Zr(s.id), t({ type: "REMOVE_MEASUREMENT", payload: s.id });
          },
          onRename: (l) => t({ type: "UPDATE_MEASUREMENT", payload: { ...s, name: l } })
        }
      ),
      s.visible && s.profile && s.profile.length > 1 && /* @__PURE__ */ r(No, { data: s.profile })
    ] }, s.id))
  ] });
}
function No({ data: e }) {
  let a = 1 / 0, i = -1 / 0;
  for (const l of e)
    l < a && (a = l), l > i && (i = l);
  const o = i - a || 1, s = e.map((l, c) => `${(c / (e.length - 1) * 180).toFixed(1)},${(28 - (l - a) / o * 28).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ f("div", { className: "px-2 pb-1 -mt-1", children: [
    /* @__PURE__ */ r("svg", { viewBox: "0 0 180 28", className: "w-full h-7", preserveAspectRatio: "none", children: /* @__PURE__ */ r(
      "polyline",
      {
        points: s,
        fill: "none",
        stroke: "rgb(96,165,250)",
        strokeWidth: 1,
        vectorEffect: "non-scaling-stroke"
      }
    ) }),
    /* @__PURE__ */ f("div", { className: "text-[9px] text-gray-500 leading-none", children: [
      "HU ",
      Math.round(a),
      "–",
      Math.round(i)
    ] })
  ] });
}
function Io(e) {
  const t = [];
  return e.columns && e.rows && t.push(`${e.columns}×${e.rows}`), e.pixelSpacingMm && t.push(`${Number(e.pixelSpacingMm.toFixed(4))} mm`), t.length ? t.join(" · ") : null;
}
function Co({ embedded: e } = {}) {
  const { state: t, dispatch: n } = le(), { t: a } = fe(), { loadFiles: i } = nr(), o = rr(), s = ne(null), l = ne(null), [c, d] = Z({}), [p, g] = Z(!1);
  if (t.studies.length === 0) return null;
  const m = t.study?.studyInstanceUID ?? null, x = (v) => {
    const h = v.target.files;
    h && h.length && i(Array.from(h)), v.target.value = "";
  }, I = async (v) => {
    const h = v.target.files;
    if (v.target.value = "", !!h?.length) {
      g(!0);
      try {
        await o(Array.from(h));
      } finally {
        g(!1);
      }
    }
  }, w = (v, h) => {
    v.studyInstanceUID !== m && n({ type: "SET_ACTIVE_STUDY", payload: v.studyInstanceUID }), n({ type: "SET_ACTIVE_SERIES", payload: h.seriesInstanceUID });
  }, P = (v) => {
    const h = v.studyInstanceUID === m ? t.volumeId : t.studyPlans[v.studyInstanceUID]?.volumeId ?? null;
    if (h)
      try {
        He.removeVolumeLoadObject(h);
      } catch {
      }
    n({ type: "REMOVE_STUDY", payload: v.studyInstanceUID });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-0.5 p-2", children: [
    /* @__PURE__ */ f("div", { className: "px-1 mb-1.5", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ r("h3", { className: "text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider", children: a("series.panel") }),
        !e && /* @__PURE__ */ f(
          "button",
          {
            onClick: () => s.current?.click(),
            className: "flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-dental-500 text-dental-600 dark:text-dental-400 hover:bg-dental-50 dark:hover:bg-dental-900/30 transition-colors",
            children: [
              /* @__PURE__ */ r("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M12 5v14M5 12h14", strokeLinecap: "round" }) }),
              a("series.load")
            ]
          }
        )
      ] }),
      !e && /* @__PURE__ */ f(
        "button",
        {
          onClick: () => l.current?.click(),
          disabled: p,
          title: a("series.loadScanHint"),
          className: "mt-1.5 w-full flex items-center justify-center gap-1.5 text-[11px] px-2 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50",
          children: [
            /* @__PURE__ */ f("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M12 2 21 7v10l-9 5-9-5V7l9-5z" }),
              /* @__PURE__ */ r("path", { d: "M3 7l9 5 9-5M12 12v10" })
            ] }),
            a(p ? "series.loadScanBusy" : "series.loadScan")
          ]
        }
      ),
      /* @__PURE__ */ r(
        "input",
        {
          ref: s,
          type: "file",
          onChange: x,
          className: "hidden",
          multiple: !0,
          webkitdirectory: "",
          directory: ""
        }
      ),
      /* @__PURE__ */ r(
        "input",
        {
          ref: l,
          type: "file",
          accept: ".stl,.obj,.ply,model/stl,model/obj",
          className: "hidden",
          multiple: !0,
          onChange: I
        }
      )
    ] }),
    t.studies.map((v) => {
      const h = v.studyInstanceUID === m, D = c[v.studyInstanceUID];
      return /* @__PURE__ */ f("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ f(
          "div",
          {
            className: `group flex items-center gap-1 rounded-lg pr-1 transition-colors ${h ? "" : "hover:bg-gray-200/70 dark:hover:bg-gray-700/50"}`,
            children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => {
                    h || n({ type: "SET_ACTIVE_STUDY", payload: v.studyInstanceUID }), d((C) => ({ ...C, [v.studyInstanceUID]: !C[v.studyInstanceUID] }));
                  },
                  className: `flex items-center gap-1.5 flex-1 min-w-0 text-left px-2 py-1.5 text-sm ${h ? "text-dental-700 dark:text-dental-200 font-semibold" : "text-gray-700 dark:text-gray-300"}`,
                  children: [
                    /* @__PURE__ */ r("svg", { className: `w-3 h-3 shrink-0 transition-transform ${D ? "-rotate-90" : ""}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                    /* @__PURE__ */ r("svg", { className: "w-4 h-4 shrink-0 text-dental-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: /* @__PURE__ */ r("path", { d: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                    /* @__PURE__ */ r("span", { className: "truncate", children: v.studyDescription || a("series.study") })
                  ]
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => P(v),
                  title: a("series.remove"),
                  className: "shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
                  children: /* @__PURE__ */ r("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M6 6l12 12M18 6L6 18", strokeLinecap: "round" }) })
                }
              )
            ]
          }
        ),
        (v.studyDate || v.series[0]?.modality) && /* @__PURE__ */ r("div", { className: "pl-8 -mt-0.5 mb-0.5 text-[10px] text-gray-400 dark:text-gray-500", children: [v.studyDate, v.series[0]?.modality].filter(Boolean).join(" · ") }),
        !D && v.series.map((C) => {
          const k = h && C.seriesInstanceUID === t.activeSeriesUID, O = Io(C);
          return /* @__PURE__ */ f(
            "button",
            {
              onClick: () => w(v, C),
              className: `ml-4 text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors border ${k ? "bg-dental-100 text-dental-800 border-dental-400 dark:bg-dental-700/50 dark:text-dental-200 dark:border-dental-600" : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700/50 border-transparent"}`,
              children: [
                /* @__PURE__ */ r("div", { className: "font-medium truncate", children: C.seriesDescription || `Series #${C.seriesNumber}` }),
                /* @__PURE__ */ f("div", { className: "text-[11px] text-gray-500 mt-0.5", children: [
                  C.modality,
                  " · ",
                  a("series.images", { n: C.imageCount })
                ] }),
                O && /* @__PURE__ */ r("div", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: O })
              ]
            },
            C.seriesInstanceUID
          );
        }),
        !D && h && t.scans.length > 0 && /* @__PURE__ */ f("div", { className: "ml-4 mt-1 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ r("div", { className: "px-1 text-[10px] uppercase tracking-wide text-gray-500 select-none", children: a("layers.scans") }),
          t.scans.map((C) => /* @__PURE__ */ r(So, { scan: C }, C.id))
        ] })
      ] }, v.studyInstanceUID);
    })
  ] });
}
function So({ scan: e }) {
  const { dispatch: t } = le(), { t: n } = fe(), a = pr(e.id), i = a && a.extentMm.some((o) => o > 0) ? a.extentMm.map((o) => Math.round(o)).join(" × ") + " mm" : null;
  return /* @__PURE__ */ f("div", { className: "group flex items-start gap-1 rounded-lg px-2 py-1 hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition-colors", children: [
    /* @__PURE__ */ r(
      "span",
      {
        className: "mt-0.5 w-2.5 h-2.5 shrink-0 rounded-sm border border-black/20 dark:border-white/20",
        style: { backgroundColor: e.color },
        "aria-hidden": !0
      }
    ),
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ r("div", { className: `text-sm truncate ${e.visible ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500 line-through"}`, children: e.name }),
      /* @__PURE__ */ f("div", { className: "text-[11px] text-gray-500 truncate", children: [
        n(`scan.${e.type}`),
        a && ` · ${n("series.triangles", { n: a.triangles.toLocaleString() })}`
      ] }),
      !a && /* @__PURE__ */ r("div", { className: "text-[10px] text-amber-600 dark:text-amber-400 leading-tight", children: e.fileName ? /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("div", { children: n("scan.reimport") }),
        /* @__PURE__ */ r("div", { className: "font-mono truncate", title: e.fileName, children: e.fileName })
      ] }) : n("scan.notLoaded") }),
      i && /* @__PURE__ */ r("div", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: i })
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        onClick: () => t({ type: "UPDATE_SCAN", payload: { ...e, visible: !e.visible } }),
        title: e.visible ? n("layers.hide") : n("layers.show"),
        className: "shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
        children: e.visible ? /* @__PURE__ */ f("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
          /* @__PURE__ */ r("path", { d: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" }),
          /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "3" })
        ] }) : /* @__PURE__ */ f("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
          /* @__PURE__ */ r("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }),
          /* @__PURE__ */ r("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
        ] })
      }
    ),
    /* @__PURE__ */ r(
      "button",
      {
        onClick: () => {
          _n(e.id), t({ type: "REMOVE_SCAN", payload: e.id });
        },
        title: n("series.remove"),
        className: "shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
        children: /* @__PURE__ */ r("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M6 6l12 12M18 6L6 18", strokeLinecap: "round" }) })
      }
    )
  ] });
}
const rt = "w-full bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 text-xs rounded-md px-2 py-1.5 border outline-none focus:border-dental-500";
function Re({ label: e, value: t }) {
  return /* @__PURE__ */ f("div", { className: "flex justify-between gap-2 text-xs", children: [
    /* @__PURE__ */ r("span", { className: "text-slate-500 dark:text-slate-400", children: e }),
    /* @__PURE__ */ r("span", { className: "text-slate-800 dark:text-slate-200 font-medium text-right truncate", children: t })
  ] });
}
function Eo() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = e.study, i = a?.series.find((s) => s.seriesInstanceUID === e.activeSeriesUID) ?? a?.series[0], o = (s) => t({ type: "SET_REPORT", payload: s });
  return /* @__PURE__ */ f("div", { className: "space-y-4", children: [
    /* @__PURE__ */ f("div", { className: "space-y-2", children: [
      /* @__PURE__ */ r("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: n("patients.fileInfo") }),
      a ? /* @__PURE__ */ f("div", { className: "space-y-1.5 rounded-lg border border-slate-200 dark:border-slate-700/60 p-2.5", children: [
        /* @__PURE__ */ r(Re, { label: n("report.patientName"), value: a.patientName || "—" }),
        a.patientBirthDate && /* @__PURE__ */ r(Re, { label: n("report.birthDate"), value: dt(a.patientBirthDate) }),
        /* @__PURE__ */ r(Re, { label: n("settings.studyDate"), value: a.studyDate ? dt(a.studyDate) : "—" }),
        a.institution && /* @__PURE__ */ r(Re, { label: n("settings.clinic"), value: a.institution }),
        i && /* @__PURE__ */ r(Re, { label: n("viewport.slices"), value: String(i.imageCount ?? i.imageIds?.length ?? "—") }),
        i && /* @__PURE__ */ r(Re, { label: "Modality", value: i.modality || "—" }),
        i?.seriesDescription && /* @__PURE__ */ r(Re, { label: "Series", value: i.seriesDescription })
      ] }) : /* @__PURE__ */ r("p", { className: "text-xs text-slate-500", children: n("patients.noStudy") })
    ] }),
    /* @__PURE__ */ f("div", { className: "space-y-2", children: [
      /* @__PURE__ */ r("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: n("patients.patientData") }),
      /* @__PURE__ */ r("p", { className: "text-[11px] leading-snug text-slate-500 dark:text-slate-400", children: n("settings.help.patient") }),
      /* @__PURE__ */ f("label", { className: "block space-y-1", children: [
        /* @__PURE__ */ r("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-300", children: n("report.patientName") }),
        /* @__PURE__ */ r("input", { className: rt, value: e.report.patientName, onChange: (s) => o({ patientName: s.target.value }) })
      ] }),
      /* @__PURE__ */ f("label", { className: "block space-y-1", children: [
        /* @__PURE__ */ r("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-300", children: n("report.birthDate") }),
        /* @__PURE__ */ r("input", { type: "date", className: rt, value: e.report.patientBirthDate, onChange: (s) => o({ patientBirthDate: s.target.value }) })
      ] }),
      /* @__PURE__ */ f("label", { className: "block space-y-1", children: [
        /* @__PURE__ */ r("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-300", children: n("report.quoteNumber") }),
        /* @__PURE__ */ r("input", { className: rt, value: e.report.quoteNumber, onChange: (s) => o({ quoteNumber: s.target.value }) })
      ] }),
      /* @__PURE__ */ f("label", { className: "block space-y-1", children: [
        /* @__PURE__ */ r("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-300", children: n("report.status") }),
        /* @__PURE__ */ r("textarea", { rows: 2, className: `${rt} resize-none`, value: e.report.statusDescription, onChange: (s) => o({ statusDescription: s.target.value }) })
      ] })
    ] })
  ] });
}
const Ao = {
  D1: "text-green-600 dark:text-green-400",
  D2: "text-green-600 dark:text-green-400",
  D3: "text-amber-600 dark:text-amber-400",
  D4: "text-red-600 dark:text-red-400",
  D5: "text-red-600 dark:text-red-400 font-bold"
};
function sn(e, t) {
  return t.reduce((n, a) => Math.abs(a - e) < Math.abs(n - e) ? a : n, t[0]);
}
function Do({ implantId: e, onClose: t }) {
  const { state: n, dispatch: a } = le(), { t: i } = fe(), o = n.implants.find((h) => h.id === e);
  if (!o) return null;
  const s = (h) => {
    a({ type: "UPDATE_IMPLANT", payload: { ...o, ...h } });
  }, l = Fe(o.systemId), c = o.guided, d = n.anatomy.filter((h) => h.visible), p = n.archCurveControlPoints, g = p ? n.implants.filter((h) => h.visible).flatMap((h) => {
    const D = ht(p, h);
    return D ? [{ id: h.id, entry: D.entry, apex: D.apex, radius: h.diameter / 2 }] : [];
  }) : [], m = g.find((h) => h.id === o.id), x = m && (d.length || g.length > 1) ? $t(
    m,
    g,
    d,
    { nerve: n.safety.nerveMm, sinus: n.safety.sinusMm, neighbor: n.safety.neighborMm }
  ) : null, I = n.volumeId ? Te(n.volumeId) : null, w = I && m ? yr(I, m.entry, m.apex, m.radius) : null, P = (h) => {
    const D = Fe(h);
    s({
      systemId: h,
      diameter: sn(o.diameter, D.diameters),
      length: sn(o.length, D.lengths)
    });
  }, v = (h) => {
    const D = o.guided ?? Qt(o);
    s({ guided: { ...D, ...h } });
  };
  return /* @__PURE__ */ f(Ie, { children: [
    /* @__PURE__ */ r("div", { className: "fixed inset-0 z-40", onClick: t }),
    /* @__PURE__ */ f("div", { className: "fixed left-[20rem] top-24 z-50 w-64 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-xl p-3 space-y-3", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ r("span", { className: "text-sm font-bold text-dental-600 dark:text-dental-400 select-none", children: o.name }),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: t,
            className: "w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 rounded",
            title: i("implant.close"),
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 w-16 select-none", children: i("implant.system") }),
        /* @__PURE__ */ r(
          "select",
          {
            value: o.systemId ?? "generic",
            onChange: (h) => P(h.target.value),
            className: "flex-1 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-xs rounded px-1 py-1 border",
            children: Er.map((h) => /* @__PURE__ */ f("option", { value: h.id, children: [
              h.brand,
              " ",
              h.line
            ] }, h.id))
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 w-16 select-none", children: i("implant.diameter") }),
        /* @__PURE__ */ r(
          "select",
          {
            value: o.diameter,
            onChange: (h) => s({ diameter: Number(h.target.value) }),
            className: "flex-1 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-xs rounded px-1 py-1 border",
            children: l.diameters.map((h) => /* @__PURE__ */ f("option", { value: h, children: [
              "⌀ ",
              h,
              " mm"
            ] }, h))
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 w-16 select-none", children: i("implant.length") }),
        /* @__PURE__ */ r(
          "select",
          {
            value: o.length,
            onChange: (h) => s({ length: Number(h.target.value) }),
            className: "flex-1 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-xs rounded px-1 py-1 border",
            children: l.lengths.map((h) => /* @__PURE__ */ f("option", { value: h, children: [
              h,
              " mm"
            ] }, h))
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { children: [
        /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 select-none", title: i("implant.blHint"), children: i("implant.blRotation") }),
          /* @__PURE__ */ f("span", { className: "text-xs text-gray-700 dark:text-gray-300 font-mono", children: [
            o.angleBLDeg,
            "°"
          ] })
        ] }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "range",
            min: -180,
            max: 180,
            step: 1,
            value: o.angleBLDeg,
            onChange: (h) => s({ angleBLDeg: Number(h.target.value) }),
            className: "w-full h-1 accent-dental-400"
          }
        ),
        /* @__PURE__ */ f("div", { className: "flex gap-1 mt-1", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => s({ angleBLDeg: 0 }),
              className: "flex-1 px-1 py-0.5 text-[10px] bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded",
              title: i("implant.lowerJaw"),
              children: i("implant.lowerJaw")
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => s({ angleBLDeg: 180 }),
              className: "flex-1 px-1 py-0.5 text-[10px] bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded",
              title: i("implant.upperJaw"),
              children: i("implant.upperJaw")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ f("div", { children: [
        /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 select-none", title: i("implant.mdHint"), children: i("implant.mdTilt") }),
          /* @__PURE__ */ f("span", { className: "text-xs text-gray-700 dark:text-gray-300 font-mono", children: [
            o.angleMDDeg,
            "°"
          ] })
        ] }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "range",
            min: -60,
            max: 60,
            step: 1,
            value: o.angleMDDeg,
            onChange: (h) => s({ angleMDDeg: Number(h.target.value) }),
            className: "w-full h-1 accent-dental-400"
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-2 space-y-2", children: [
        /* @__PURE__ */ f("label", { className: "flex items-center justify-between cursor-pointer select-none", children: [
          /* @__PURE__ */ r("span", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300", children: i("guided.title") }),
          /* @__PURE__ */ r(
            "input",
            {
              type: "checkbox",
              checked: !!c?.enabled,
              onChange: (h) => h.target.checked ? s({ guided: Qt(o) }) : v({ enabled: !1 }),
              className: "accent-dental-500"
            }
          )
        ] }),
        c?.enabled && /* @__PURE__ */ f(Ie, { children: [
          /* @__PURE__ */ f("div", { className: "flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ r("span", { children: i("guided.sleeveDiameter") }),
            /* @__PURE__ */ f("span", { className: "font-mono text-gray-700 dark:text-gray-300", children: [
              "⌀ ",
              l.sleeveDiameter,
              " mm"
            ] })
          ] }),
          /* @__PURE__ */ f("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 w-20 select-none", title: i("guided.offsetHint"), children: i("guided.offset") }),
            /* @__PURE__ */ r(
              "select",
              {
                value: c.sleeveOffset,
                onChange: (h) => v({ sleeveOffset: Number(h.target.value) }),
                className: "flex-1 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 text-xs rounded px-1 py-1 border",
                children: Ar.map((h) => /* @__PURE__ */ f("option", { value: h, children: [
                  h,
                  " mm"
                ] }, h))
              }
            )
          ] }),
          /* @__PURE__ */ f("div", { children: [
            /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ r("label", { className: "text-xs text-gray-600 dark:text-gray-400 select-none", children: i("guided.drillLength") }),
              /* @__PURE__ */ f("span", { className: "text-xs text-gray-700 dark:text-gray-300 font-mono", children: [
                c.drillLength,
                " mm"
              ] })
            ] }),
            /* @__PURE__ */ r(
              "input",
              {
                type: "range",
                min: o.length,
                max: o.length + 6,
                step: 0.5,
                value: c.drillLength,
                onChange: (h) => v({ drillLength: Number(h.target.value) }),
                className: "w-full h-1 accent-dental-400"
              }
            )
          ] })
        ] })
      ] }),
      x && /* @__PURE__ */ f("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-2 space-y-1", children: [
        /* @__PURE__ */ r("span", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300", children: i("safety.title") }),
        x.anatomy.map((h) => {
          const D = d.find((C) => C.id === h.id)?.name ?? "";
          return /* @__PURE__ */ f("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ r("span", { className: "text-gray-600 dark:text-gray-400 truncate mr-2", children: D }),
            /* @__PURE__ */ f("span", { className: `font-mono ${h.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400 font-bold"}`, children: [
              h.mm.toFixed(1),
              " mm ",
              h.ok ? "✓" : "⚠"
            ] })
          ] }, h.id);
        }),
        x.anatomy.some((h) => h.type === "nerve") && /* @__PURE__ */ r("p", { className: "text-[10px] leading-snug text-amber-600 dark:text-amber-400", children: i("safety.nerveCaveat") }),
        x.neighborMm !== null && /* @__PURE__ */ f("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ r("span", { className: "text-gray-600 dark:text-gray-400 truncate mr-2", children: i("safety.neighbor") }),
          /* @__PURE__ */ f("span", { className: `font-mono ${x.neighborOk ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400 font-bold"}`, children: [
            x.neighborMm.toFixed(1),
            " mm ",
            x.neighborOk ? "✓" : "⚠"
          ] })
        ] }),
        /* @__PURE__ */ r("p", { className: "text-[10px] leading-snug text-gray-500 dark:text-gray-400", children: i("safety.notChecked") })
      ] }),
      w && /* @__PURE__ */ f("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-2 space-y-1", children: [
        /* @__PURE__ */ f("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ r("span", { className: "text-gray-700 dark:text-gray-300 font-semibold", children: i("bone.title") }),
          /* @__PURE__ */ f("span", { className: `font-mono ${Ao[w.bone]}`, children: [
            w.bone,
            " · ",
            Math.round(w.meanHU),
            " GV"
          ] })
        ] }),
        /* @__PURE__ */ r("p", { className: "text-[10px] leading-snug text-gray-500 dark:text-gray-400", children: i("bone.uncalibrated") })
      ] })
    ] })
  ] });
}
function To() {
  return /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ r("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ r("path", { d: "M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" })
  ] });
}
function Po() {
  return /* @__PURE__ */ r("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: /* @__PURE__ */ r("path", { d: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function _o() {
  return /* @__PURE__ */ r("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: /* @__PURE__ */ r("path", { d: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.1-.4-.4-2.1 2.6-2.6z", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ot({ icon: e, label: t, active: n, onClick: a }) {
  return /* @__PURE__ */ f(
    "button",
    {
      onClick: a,
      title: t,
      className: `flex flex-col items-center gap-2 py-3 transition-colors ${n ? "bg-dental-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`,
      children: [
        e,
        /* @__PURE__ */ r("span", { className: "text-[10px] tracking-wide select-none [writing-mode:vertical-rl] rotate-180", children: t })
      ]
    }
  );
}
const Lo = [
  { id: "windowLevel", key: "tool.windowLevel", sc: "W" },
  { id: "pan", key: "tool.pan", sc: "P" },
  { id: "zoom", key: "tool.zoom", sc: "Z" },
  { id: "scroll", key: "tool.scroll", sc: "S" }
], Oo = [
  { id: "length", key: "tool.length", sc: "L" },
  { id: "angle", key: "tool.angle", sc: "A" },
  { id: "ellipticalRoi", key: "tool.ellipse", sc: "E" },
  { id: "circleRoi", key: "tool.circle", sc: "C" },
  { id: "rectangleRoi", key: "tool.rectangle", sc: "R" },
  { id: "freehandRoi", key: "tool.freehand", sc: "F" },
  { id: "bidirectional", key: "tool.bidirectional", sc: "B" },
  { id: "probe", key: "tool.probe", sc: "H" },
  { id: "arrowAnnotate", key: "tool.arrow", sc: "N" }
];
function It({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 select-none", children: e });
}
function Ct({
  iconKey: e,
  label: t,
  active: n,
  disabled: a,
  title: i,
  onClick: o
}) {
  const s = zt[e];
  return /* @__PURE__ */ f(
    "button",
    {
      onClick: o,
      disabled: a,
      title: i,
      className: `flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md border transition-colors ${a ? "border-transparent text-slate-400 dark:text-slate-600 cursor-not-allowed" : n ? "border-dental-500 bg-dental-600 text-white" : "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
      children: [
        s && /* @__PURE__ */ r(s, {}),
        /* @__PURE__ */ r("span", { className: "truncate", children: t })
      ]
    }
  );
}
function Ro({ embedded: e } = {}) {
  const { state: t, dispatch: n } = le(), { t: a } = fe(), i = t.patientOpen, o = t.toolsOpen, s = t.layersOpen, l = t.seriesOpen, c = o || s, d = i || l, p = t.studies.length > 0, g = t.layoutMode === "2x2" || t.layoutMode === "1+3", m = (x) => {
    ut(x), n({ type: "SET_ACTIVE_TOOL", payload: x });
  };
  return /* @__PURE__ */ f("div", { className: "flex h-full shrink-0", children: [
    /* @__PURE__ */ f("div", { className: "w-10 shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90", children: [
      !e && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r(
          ot,
          {
            icon: /* @__PURE__ */ r(To, {}),
            label: a("topbar.patients"),
            active: i,
            onClick: () => n({ type: "TOGGLE_PATIENT" })
          }
        ),
        /* @__PURE__ */ r("div", { className: "border-t border-slate-200 dark:border-slate-700/60" })
      ] }),
      p && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r(
          ot,
          {
            icon: /* @__PURE__ */ r(Po, {}),
            label: a("series.panel"),
            active: l,
            onClick: () => n({ type: "TOGGLE_SERIES" })
          }
        ),
        /* @__PURE__ */ r("div", { className: "border-t border-slate-200 dark:border-slate-700/60" })
      ] }),
      /* @__PURE__ */ r(
        ot,
        {
          icon: /* @__PURE__ */ r(Mo, {}),
          label: a("layers.title"),
          active: s,
          onClick: () => n({ type: "TOGGLE_LAYERS" })
        }
      ),
      /* @__PURE__ */ r("div", { className: "border-t border-slate-200 dark:border-slate-700/60" }),
      /* @__PURE__ */ r(
        ot,
        {
          icon: /* @__PURE__ */ r(_o, {}),
          label: a("panel.tools"),
          active: o,
          onClick: () => n({ type: "TOGGLE_TOOLS" })
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: `h-full overflow-hidden border-r border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/85 backdrop-blur-sm shadow-xl transition-all duration-200 ${c ? "w-72" : "w-0"}`,
        children: /* @__PURE__ */ f("div", { className: "w-72 h-full overflow-y-auto p-3 space-y-3", children: [
          o && /* @__PURE__ */ f("div", { className: "space-y-2 rounded-lg border border-slate-200 dark:border-slate-700/60 p-2", children: [
            /* @__PURE__ */ r(It, { children: a("toolbar.view") }),
            /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-1", children: [
              Lo.map((x) => /* @__PURE__ */ r(
                Ct,
                {
                  iconKey: x.id,
                  label: a(x.key),
                  active: t.activeTool === x.id,
                  title: `${a(x.key)} (${x.sc})`,
                  onClick: () => m(x.id)
                },
                x.id
              )),
              /* @__PURE__ */ r(
                Ct,
                {
                  iconKey: "crosshairs",
                  label: a("tool.crosshairs"),
                  active: t.activeTool === "crosshairs",
                  disabled: !g,
                  title: g ? `${a("tool.crosshairs")} (X)` : a("toolbar.crosshairsOnlyMulti"),
                  onClick: () => m("crosshairs")
                }
              )
            ] }),
            /* @__PURE__ */ r(It, { children: a("toolbar.tools") }),
            /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-1", children: Oo.map((x) => /* @__PURE__ */ r(
              Ct,
              {
                iconKey: x.key.replace("tool.", ""),
                label: a(x.key),
                active: t.activeTool === x.id,
                title: `${a(x.key)} (${x.sc})`,
                onClick: () => m(x.id)
              },
              x.id
            )) }),
            t.layoutMode === "OPG2+1" && /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-1 pt-1", children: [
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => n({ type: "SET_IMPLANT_PLACEMENT_MODE", payload: !t.implantPlacementMode }),
                  title: a("opg.addImplantTitle"),
                  className: `px-2 py-1 text-[11px] rounded-md border transition-colors ${t.implantPlacementMode ? "border-dental-500 bg-dental-600 text-white" : "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: a("opg.addImplant")
                }
              ),
              ["nerve", "sinus"].map((x) => /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    const I = t.anatomyDrawMode === x;
                    n({ type: "SET_ANATOMY_DRAW_MODE", payload: I ? null : x }), I || n({ type: "SET_ACTIVE_ANATOMY", payload: null });
                  },
                  title: a(`anatomy.${x}Title`),
                  className: `px-2 py-1 text-[11px] rounded-md border transition-colors ${t.anatomyDrawMode === x ? "border-dental-500 bg-dental-600 text-white" : "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: a(`anatomy.${x}`)
                },
                x
              ))
            ] })
          ] }),
          s && /* @__PURE__ */ f("div", { className: "space-y-2 rounded-lg border border-slate-200 dark:border-slate-700/60 p-2", children: [
            /* @__PURE__ */ r(It, { children: a("layers.title") }),
            /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-1", children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => m("arrowAnnotate"),
                  className: `flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] rounded-md border transition-colors ${t.activeTool === "arrowAnnotate" ? "border-dental-500 bg-dental-600 text-white" : "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: [
                    /* @__PURE__ */ r("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: /* @__PURE__ */ r("path", { d: "M4 7h16M4 12h10M4 17h7", strokeLinecap: "round" }) }),
                    a("layers.addText")
                  ]
                }
              ),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => n({ type: "SET_IMPLANT_PLACEMENT_MODE", payload: !t.implantPlacementMode }),
                  className: `flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] rounded-md border transition-colors ${t.implantPlacementMode ? "border-dental-500 bg-dental-600 text-white" : "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: [
                    /* @__PURE__ */ r("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: /* @__PURE__ */ r("path", { d: "M12 3v6m0 0l3.5 8.5a2 2 0 01-1.8 2.5h-3.4a2 2 0 01-1.8-2.5L12 9zM9 6h6", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                    a("layers.addImplant")
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ r(ko, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: `h-full overflow-hidden border-r border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800 transition-all duration-200 ${d ? "w-56" : "w-0"}`,
        children: /* @__PURE__ */ f("div", { className: "w-56 h-full overflow-y-auto", children: [
          i && /* @__PURE__ */ f("div", { className: "p-2", children: [
            /* @__PURE__ */ r("div", { className: "text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-1 mb-2", children: a("topbar.patients") }),
            /* @__PURE__ */ r("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700/60 p-2.5", children: /* @__PURE__ */ r(Eo, {}) })
          ] }),
          p && l && /* @__PURE__ */ r(Co, { embedded: e })
        ] })
      }
    ),
    t.editingImplantId && /* @__PURE__ */ r(
      Do,
      {
        implantId: t.editingImplantId,
        onClose: () => n({ type: "SET_EDITING_IMPLANT", payload: null })
      }
    )
  ] });
}
function Wt({ sliceIndex: e, totalSlices: t, viewKey: n } = {}) {
  const { state: a } = le(), { study: i, activeSeriesUID: o } = a, s = a.display, l = e ?? a.currentSliceIndex, c = t ?? a.totalSlices;
  if (!i) return null;
  let d = !0;
  a.layoutMode === "1x1" ? d = n === a.viewMode : a.layoutMode === "1+3" ? d = a.panel.grid === "2x2" ? !0 : n === a.panel.big : a.layoutMode === "OPG2+1" && (d = !1);
  const p = s.scope !== "main" || d, g = i.series.find((C) => C.seriesInstanceUID === o), m = s.showSlice && c > 0 ? `${l + 1} / ${c}` : null, x = a.report, I = x.patientName.trim() || i.patientName, w = x.patientBirthDate.trim() || (i.patientBirthDate ? dt(i.patientBirthDate) : ""), P = x.studyDate.trim() || (i.studyDate ? dt(i.studyDate) : ""), v = x.clinic.trim() || i.institution || "", h = x.seriesName.trim() || g?.seriesDescription || "", D = p && (s.showSeries || s.showModality) && g;
  return /* @__PURE__ */ f(Ie, { children: [
    p && (s.showName || s.showBirth) && /* @__PURE__ */ f("div", { className: "absolute top-2 left-2 text-white text-xs font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: [
      s.showName && /* @__PURE__ */ r("div", { className: "font-semibold", children: I }),
      s.showBirth && w && /* @__PURE__ */ r("div", { children: w })
    ] }),
    p && (s.showDate || s.showClinic) && /* @__PURE__ */ f("div", { className: "absolute top-2 right-2 text-white text-xs font-mono text-right pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: [
      s.showDate && P && /* @__PURE__ */ r("div", { children: P }),
      s.showClinic && v && /* @__PURE__ */ r("div", { children: v })
    ] }),
    (D || m && d) && /* @__PURE__ */ f("div", { className: "absolute bottom-2 left-2 text-white text-xs font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: [
      D && s.showSeries && h && /* @__PURE__ */ r("div", { children: h }),
      D && s.showModality || m && d ? /* @__PURE__ */ f("div", { children: [
        D && s.showModality && g.modality,
        D && s.showModality && m && d && " · ",
        m && d && m
      ] }) : null
    ] }),
    m && !d && /* @__PURE__ */ r("div", { className: "absolute bottom-2 left-2 text-white text-xs font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: m })
  ] });
}
const at = 20;
function Vn({ onJumpToSlice: e, sliceIndex: t, totalSlices: n }) {
  const { state: a } = le(), i = t ?? a.currentSliceIndex, o = n ?? a.totalSlices, s = Math.round(i / Math.max(o - 1, 1) * (at - 1)), l = Q(
    (c) => {
      const d = Math.round(c / (at - 1) * (o - 1));
      e(d);
    },
    [o, e]
  );
  return /* @__PURE__ */ r("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-auto z-10", children: Array.from({ length: at }, (c, d) => /* @__PURE__ */ r(
    "button",
    {
      onClick: () => l(d),
      className: `
            w-2.5 h-3 rounded-[2px] border transition-colors
            ${d === s ? "bg-dental-400 border-dental-300" : "bg-gray-700/60 border-gray-600/40 hover:bg-gray-500/60"}
          `,
      title: `Szelet ${Math.round(d / (at - 1) * (o - 1)) + 1} / ${o}`
    },
    d
  )) });
}
function St() {
  const { t: e } = fe(), { state: t, dispatch: n } = le(), a = ne(null), i = ne(!1), o = ne(!1), s = Q(() => {
    ie(se)?.resize(!0, !1);
  }, []);
  J(() => {
    const c = a.current, d = ie(se);
    if (!c || !d) return;
    o.current = !1, pt(), d.enableElement({
      viewportId: Ue,
      type: ge.ViewportType.STACK,
      element: c
    }), Tn(Ue, se), i.current = !0;
    const p = requestAnimationFrame(() => {
      o.current || d.resize(!0, !1);
    }), g = (x) => {
      const I = x.detail;
      if (I?.imageIdIndex !== void 0) {
        const P = d.getStackViewports().find((v) => v.id === Ue)?.getImageIds()?.length ?? 0;
        n({ type: "SET_SLICE_INFO", payload: { index: I.imageIdIndex, total: P } });
      }
    };
    c.addEventListener(ge.Events.STACK_NEW_IMAGE, g);
    const m = new ResizeObserver(s);
    return m.observe(c), () => {
      if (o.current = !0, cancelAnimationFrame(p), c.removeEventListener(ge.Events.STACK_NEW_IMAGE, g), m.disconnect(), i.current) {
        try {
          d.disableElement(Ue);
        } catch {
        }
        i.current = !1;
      }
    };
  }, [t.isInitialized, s, n]), J(() => {
    if (!t.study || !t.activeSeriesUID) return;
    const c = ie(se);
    if (!c || !i.current) return;
    const d = t.study.series.find(
      (x) => x.seriesInstanceUID === t.activeSeriesUID
    );
    if (!d || d.imageIds.length === 0) return;
    const p = c.getStackViewports().find(
      (x) => x.id === Ue
    );
    if (!p) return;
    let g = !1;
    async function m() {
      try {
        if (console.log("[DQ-DICOM] Loading series:", d.imageIds.length, "images"), await p.setStack(d.imageIds), g || o.current) return;
        const x = Math.floor(d.imageIds.length / 2);
        p.setImageIdIndex(x), n({ type: "SET_SLICE_INFO", payload: { index: x, total: d.imageIds.length } }), c.resize(!0, !1), p.render(), console.log("[DQ-DICOM] Series loaded, showing slice", x);
      } catch (x) {
        !g && !o.current && console.error("[DQ-DICOM] Failed to load series:", x);
      }
    }
    return m(), () => {
      g = !0;
    };
  }, [t.study, t.activeSeriesUID, n]);
  const l = Q((c) => {
    const d = ie(se);
    if (!d) return;
    const p = d.getStackViewports().find((g) => g.id === Ue);
    p && (p.setImageIdIndex(c), p.render());
  }, []);
  return /* @__PURE__ */ f("div", { className: "relative w-full h-full bg-black", children: [
    /* @__PURE__ */ r(
      "div",
      {
        ref: a,
        className: "w-full h-full",
        onContextMenu: (c) => c.preventDefault()
      }
    ),
    /* @__PURE__ */ r(Wt, {}),
    t.viewMode !== "3D" && /* @__PURE__ */ r("div", { className: "absolute top-1 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-mono font-bold pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: e(_t[t.viewMode]) }),
    t.totalSlices > 1 && /* @__PURE__ */ r(Vn, { onJumpToSlice: l })
  ] });
}
function $o(e, t, n) {
  return !n || e === "1x1" ? !0 : e === "OPG2+1" ? n === "PANORAMA" : n === t;
}
function xt({ text: e, viewKey: t }) {
  const { state: n } = le(), { labelColor: a, labelSizeMain: i, labelSizeSide: o, labelAlign: s } = n.display, c = $o(n.layoutMode, n.panel.big, t) ? i : o;
  return /* @__PURE__ */ r(
    "div",
    {
      className: `absolute top-1 ${s === "left" ? "left-2" : s === "right" ? "right-2" : "left-1/2 -translate-x-1/2"} font-mono font-bold pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]`,
      style: { color: a, fontSize: `${c}px` },
      children: e
    }
  );
}
const Vo = {
  AXIAL: { top: "A", bottom: "P", left: "R", right: "L" },
  SAGITTAL: { top: "S", bottom: "I", left: "A", right: "P" },
  CORONAL: { top: "S", bottom: "I", left: "R", right: "L" }
};
function zo({ orientation: e }) {
  const { state: t } = le(), n = Vo[e], a = { color: t.display.labelColor, fontSize: "10px" }, i = "absolute font-mono pointer-events-none select-none opacity-80 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]";
  return /* @__PURE__ */ f(Ie, { children: [
    /* @__PURE__ */ r("span", { className: `${i} top-5 left-1/2 -translate-x-1/2`, style: a, children: n.top }),
    /* @__PURE__ */ r("span", { className: `${i} bottom-1 left-1/2 -translate-x-1/2`, style: a, children: n.bottom }),
    /* @__PURE__ */ r("span", { className: `${i} left-1 top-1/2 -translate-y-1/2`, style: a, children: n.left }),
    /* @__PURE__ */ r("span", { className: `${i} right-1 top-1/2 -translate-y-1/2`, style: a, children: n.right })
  ] });
}
const Wo = {
  AXIAL: Ee,
  SAGITTAL: Rt,
  CORONAL: Ot
}, Uo = {
  AXIAL: ge.OrientationAxis.AXIAL,
  SAGITTAL: ge.OrientationAxis.SAGITTAL,
  CORONAL: ge.OrientationAxis.CORONAL
};
function Be({ orientation: e, volumeId: t }) {
  const { t: n } = fe(), a = ne(null), i = ne(!1), o = ne(!1), [s, l] = Z(0), [c, d] = Z(0), p = Wo[e], g = Q(() => {
    ie(se)?.resize(!0, !1);
  }, []);
  J(() => {
    const x = a.current, I = ie(se);
    if (!x || !I) return;
    o.current = !1, pt(), I.enableElement({
      viewportId: p,
      type: ge.ViewportType.ORTHOGRAPHIC,
      element: x,
      defaultOptions: {
        orientation: Uo[e]
      }
    }), Tn(p, se), i.current = !0;
    const w = () => {
      const v = I.getViewport(p);
      if (v && "getSliceIndex" in v) {
        const h = v.getSliceIndex(), D = v.getNumberOfSlices();
        l(h), d(D);
      }
    };
    x.addEventListener(ge.Events.VOLUME_NEW_IMAGE, w);
    const P = new ResizeObserver(g);
    return P.observe(x), () => {
      if (o.current = !0, x.removeEventListener(ge.Events.VOLUME_NEW_IMAGE, w), P.disconnect(), i.current) {
        try {
          I.disableElement(p);
        } catch {
        }
        i.current = !1;
      }
    };
  }, [p, e, g]), J(() => {
    if (!t || !i.current) return;
    const x = ie(se);
    if (!x) return;
    let I = !1;
    async function w() {
      try {
        if (await Sn(x, [{ volumeId: t }], [p]), I || o.current) return;
        const P = x.getViewport(p);
        if (P && (P.render(), "getSliceIndex" in P)) {
          const v = P.getSliceIndex(), h = P.getNumberOfSlices();
          l(v), d(h);
        }
      } catch (P) {
        !I && !o.current && console.error(`[DQ-DICOM] Failed to set volume on ${e}:`, P);
      }
    }
    return w(), () => {
      I = !0;
    };
  }, [t, p, e]);
  const m = Q(
    (x) => {
      const I = ie(se);
      if (!I) return;
      const w = I.getViewport(p);
      if (!w || !("setSliceIndex" in w)) return;
      const P = w.getSliceIndex(), v = x - P;
      v !== 0 && Qn.scroll(w, { delta: v });
    },
    [p]
  );
  return /* @__PURE__ */ f("div", { className: "relative w-full h-full bg-black", "data-vp": e, "data-vp-title": n(_t[e]), children: [
    /* @__PURE__ */ r(
      "div",
      {
        ref: a,
        className: "w-full h-full",
        onContextMenu: (x) => x.preventDefault()
      }
    ),
    /* @__PURE__ */ r(Wt, { sliceIndex: s, totalSlices: c, viewKey: e }),
    /* @__PURE__ */ r(xt, { text: n(_t[e]), viewKey: e }),
    /* @__PURE__ */ r(zo, { orientation: e }),
    c > 1 && /* @__PURE__ */ r(
      Vn,
      {
        onJumpToSlice: m,
        sliceIndex: s,
        totalSlices: c
      }
    )
  ] });
}
const Bo = 3;
function jo(e, t, n) {
  return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n, e[2] + (t[2] - e[2]) * n];
}
function ct(e, t, n, a, i = 24, o, s = !0) {
  const l = e.length, c = Wr.newInstance(), d = new Float32Array(l * 3);
  for (let w = 0; w < l; w++)
    d[3 * w] = e[w][0], d[3 * w + 1] = e[w][1], d[3 * w + 2] = e[w][2];
  c.getPoints().setData(d, 3);
  const p = new Uint32Array(l + 1);
  p[0] = l;
  for (let w = 0; w < l; w++) p[w + 1] = w;
  c.getLines().setData(p), c.getPointData().setScalars(
    Ur.newInstance({ name: "radius", values: Float32Array.from(t) })
  );
  const g = Br.newInstance({ capping: s, numberOfSides: i, radius: 1 });
  g.setVaryRadius(Bo), g.setInputData(c);
  const m = yt.newInstance();
  m.setScalarVisibility(!1), m.setInputConnection(g.getOutputPort());
  const x = ft.newInstance();
  x.setMapper(m);
  const I = x.getProperty();
  return I.setColor(n[0], n[1], n[2]), I.setOpacity(a), x;
}
function Fo(e) {
  const t = e.replace("#", ""), n = t.length === 3 ? t.split("").map((s) => s + s).join("") : t, a = parseInt(n.slice(0, 2), 16) / 255, i = parseInt(n.slice(2, 4), 16) / 255, o = parseInt(n.slice(4, 6), 16) / 255;
  return [Number.isFinite(a) ? a : 1, Number.isFinite(i) ? i : 0, Number.isFinite(o) ? o : 0];
}
function Go(e, t, n, a = 0.5) {
  return e.length < 2 ? null : ct(e, e.map(() => t), Fo(n), a, 16);
}
function Yo(e, t) {
  const n = [], a = e.active ? [1, 0.78, 0] : [0, 0.7, 1], { axis: i } = e, o = [
    e.entry[0] + i[0] * e.length,
    e.entry[1] + i[1] * e.length,
    e.entry[2] + i[2] * e.length
  ];
  if (t.implant) {
    const l = [], c = [];
    for (let d = 0; d < 18; d++) {
      const p = d / 17;
      l.push(jo(e.entry, o, p)), c.push(Math.max(0.08, e.diameter / 2 * On(p)));
    }
    n.push({ key: "body", actor: ct(l, c, a, 0.6) });
  }
  if (t.axis) {
    const s = [e.entry[0] - i[0] * 3, e.entry[1] - i[1] * 3, e.entry[2] - i[2] * 3], l = [o[0] + i[0] * 2, o[1] + i[1] * 2, o[2] + i[2] * 2];
    n.push({
      key: "axis",
      actor: ct([s, l], [0.15, 0.15], e.active ? [1, 0.9, 0.4] : [0.6, 0.85, 1], 0.9, 8)
    });
  }
  if (t.sleeve && e.sleeve) {
    const s = e.sleeve.offset + e.sleeve.height, l = [e.entry[0] - i[0] * s, e.entry[1] - i[1] * s, e.entry[2] - i[2] * s], c = [
      e.entry[0] - i[0] * e.sleeve.offset,
      e.entry[1] - i[1] * e.sleeve.offset,
      e.entry[2] - i[2] * e.sleeve.offset
    ], d = e.sleeve.diameter / 2;
    n.push({ key: "sleeve", actor: ct([l, c], [d, d], [0.5, 0.92, 0.6], 0.45, 40, void 0, !1) });
  }
  return n;
}
function Xo({ layers: e }) {
  const { state: t } = le(), n = ne([]);
  return J(() => {
    const i = ie(se)?.getViewport(ye);
    if (!i) return;
    if (n.current.length) {
      try {
        i.removeActors(n.current);
      } catch {
      }
      n.current = [];
    }
    const o = t.archCurveControlPoints;
    if (o)
      for (const s of t.implants) {
        if (!s.visible) continue;
        const l = $e(o, [s.position[0], s.position[1]]);
        if (!l) continue;
        const c = mt(l, s.angleBLDeg, s.angleMDDeg), d = s.guided?.enabled ? {
          diameter: Fe(s.systemId).sleeveDiameter,
          offset: s.guided.sleeveOffset,
          height: s.guided.sleeveHeight
        } : void 0, p = Yo(
          {
            entry: s.position,
            axis: c,
            diameter: s.diameter,
            length: s.length,
            active: t.activeImplantId === s.id,
            sleeve: d
          },
          e
        );
        for (const { key: g, actor: m } of p) {
          const x = `implant3d:${s.id}:${g}`;
          i.addActor({ uid: x, actor: m }), n.current.push(x);
        }
      }
    for (const s of t.anatomy) {
      if (!s.visible || s.points.length < 2) continue;
      const l = Go(s.points, s.radius, s.color, 0.5);
      if (!l) continue;
      const c = `anatomy3d:${s.id}`;
      i.addActor({ uid: c, actor: l }), n.current.push(c);
    }
    return i.render(), () => {
      const l = ie(se)?.getViewport(ye);
      if (l && n.current.length) {
        try {
          l.removeActors(n.current), l.render();
        } catch {
        }
        n.current = [];
      }
    };
  }, [t.implants, t.activeImplantId, t.archCurveControlPoints, t.anatomy, e]), null;
}
function Ho() {
  const { state: e } = le(), t = ne([]), a = e.registration?.picking?.kind === "cbct" ? e.registration?.scanId : null;
  return J(() => {
    const o = ie(se)?.getViewport(ye);
    if (o) {
      if (t.current.length) {
        try {
          o.removeActors(t.current);
        } catch {
        }
        t.current = [];
      }
      for (const s of e.scans) {
        if (!s.visible || s.id === a) continue;
        const l = Pn(s.id);
        if (!l) continue;
        const c = hr(l, s.color, s.opacity, s.transform), d = `scan3d:${s.id}`;
        o.addActor({ uid: d, actor: c }), t.current.push(d);
      }
      return o.render(), () => {
        const l = ie(se)?.getViewport(ye);
        if (l && t.current.length) {
          try {
            l.removeActors(t.current), l.render();
          } catch {
          }
          t.current = [];
        }
      };
    }
  }, [e.scans, a]), null;
}
const zn = ["AXIAL", "SAGITTAL", "CORONAL"], Ko = 0.7;
function qo(e, t) {
  const n = t === "AXIAL" ? e.dims[2] : t === "SAGITTAL" ? e.dims[0] : e.dims[1];
  return Math.floor(n / 2);
}
function Jo(e, t, n) {
  const a = t === "AXIAL" ? 2 : t === "SAGITTAL" ? 0 : 1, i = e.dims[a], o = Math.round((n[a] - e.origin[a]) / (e.spacing[a] || 1));
  return o < 0 ? 0 : o > i - 1 ? i - 1 : o;
}
function Zo(e, t, n, a) {
  const [i, o, s] = e.dims, l = e.getVoxel, c = a.wc - a.ww / 2, d = 255 / (a.ww || 1);
  let p, g, m;
  t === "AXIAL" ? (p = i, g = o, m = (v, h) => l(v, h, n)) : t === "SAGITTAL" ? (p = o, g = s, m = (v, h) => l(n, v, h)) : (p = i, g = s, m = (v, h) => l(v, n, h));
  const x = document.createElement("canvas");
  x.width = p, x.height = g;
  const I = x.getContext("2d"), w = I.createImageData(p, g), P = w.data;
  for (let v = 0; v < g; v++)
    for (let h = 0; h < p; h++) {
      let D = (m(h, v) - c) * d;
      D = D < 0 ? 0 : D > 255 ? 255 : D;
      const C = (v * p + h) * 4;
      P[C] = P[C + 1] = P[C + 2] = D, P[C + 3] = D;
    }
  return I.putImageData(w, 0, 0), x;
}
function Qo(e, t, n) {
  const [a, i, o] = e.origin, [s, l, c] = e.spacing, [d, p, g] = e.dims, m = a + (d - 1) * s, x = i + (p - 1) * l, I = o + (g - 1) * c;
  if (t === "AXIAL") {
    const P = o + n * c;
    return { origin: [a, i, P], point1: [m, i, P], point2: [a, x, P] };
  }
  if (t === "SAGITTAL") {
    const P = a + n * s;
    return { origin: [P, i, o], point1: [P, x, o], point2: [P, i, I] };
  }
  const w = i + n * l;
  return { origin: [a, w, o], point1: [m, w, o], point2: [a, w, I] };
}
function ea(e, t, n, a, i = Ko) {
  const o = Qo(e, t, n), s = Rn.newInstance({ xResolution: 1, yResolution: 1 });
  s.setOrigin(o.origin), s.setPoint1(o.point1), s.setPoint2(o.point2);
  const l = yt.newInstance();
  l.setInputConnection(s.getOutputPort()), l.setScalarVisibility(!1);
  const c = jr.newInstance();
  c.setInterpolate(!0), c.setImage(Zo(e, t, n, a));
  const d = ft.newInstance();
  d.setMapper(l), d.addTexture(c);
  const p = d.getProperty();
  return p.setAmbient(1), p.setDiffuse(0), p.setOpacity(i), d;
}
const ln = {
  AXIAL: Ee,
  SAGITTAL: Rt,
  CORONAL: Ot
};
function ta({
  axes: e,
  preset: t,
  rebuildKey: n,
  indexOverride: a
}) {
  const { state: i } = le(), o = ne([]);
  return J(() => {
    const s = ie(se), l = s?.getViewport(ye);
    if (!l) return;
    if (o.current.length) {
      try {
        l.removeActors(o.current);
      } catch {
      }
      o.current = [];
    }
    let c = null;
    try {
      const v = i.volumeId ? Te(i.volumeId) : null;
      v && (c = {
        getVoxel: v.getVoxel,
        dims: v.dims,
        spacing: [1 / v.invSx, 1 / v.invSy, 1 / v.invSz],
        origin: v.origin
      });
    } catch (v) {
      console.error("[slice3d] volume info failed", v);
    }
    if (!c) {
      console.warn("[slice3d] no volume data available");
      return;
    }
    const d = { wc: i.windowLevel.wc, ww: i.windowLevel.ww }, p = zn.filter((v) => e[v]);
    if (!p.length) return;
    const g = {}, m = (v) => {
      const h = a?.[v];
      if (h != null) return h;
      const C = s?.getViewport(ln[v])?.getCamera()?.focalPoint;
      return C ? Jo(c, v, C) : qo(c, v);
    }, x = (v, h) => {
      const D = ea(c, v, h, d, i.display.sliceOpacity), C = `slice3d:${v}`;
      l.addActor({ uid: C, actor: D }), o.current.push(C), g[v] = h;
    };
    try {
      for (const v of p) x(v, m(v));
      l.render();
    } catch (v) {
      console.error("[slice3d] build failed", v);
    }
    let I = !1;
    const w = () => {
      if (!I) {
        I = !0;
        try {
          let v = !1;
          for (const h of p) {
            const D = m(h);
            if (g[h] === D) continue;
            const C = `slice3d:${h}`;
            try {
              l.removeActors([C]);
            } catch {
            }
            o.current = o.current.filter((k) => k !== C), x(h, D), v = !0;
          }
          v && l.render();
        } catch (v) {
          console.error("[slice3d] sync failed", v);
        } finally {
          I = !1;
        }
      }
    }, P = [];
    for (const v of p) {
      const D = s?.getViewport(ln[v])?.element;
      if (!D) continue;
      const C = () => w();
      D.addEventListener(ge.Events.CAMERA_MODIFIED, C), P.push(() => D.removeEventListener(ge.Events.CAMERA_MODIFIED, C));
    }
    return () => {
      P.forEach((D) => D());
      const h = ie(se)?.getViewport(ye);
      if (h && o.current.length) {
        try {
          h.removeActors(o.current), h.render();
        } catch {
        }
        o.current = [];
      }
    };
  }, [e, a, i.windowLevel, i.volumeId, i.layoutMode, i.panel, i.display.sliceOpacity, t, n]), null;
}
const cn = "crossSection3d", na = 25;
function ra({ enabled: e = !0 } = {}) {
  const { state: t } = le(), n = t.archCurveControlPoints, { crossSectionPosition: a, crossSectionTiltDeg: i, volumeId: o } = t;
  return J(() => {
    const l = ie(se)?.getViewport(ye);
    if (!l) return;
    const c = () => {
      try {
        l.removeActors([cn]);
      } catch {
      }
    };
    c();
    const d = o && e ? Te(o) : null;
    if (!e || !n || !d) {
      l.render();
      return;
    }
    const p = Vt(n, a, i, d.zMin, d.zMax);
    if (!p) {
      l.render();
      return;
    }
    const g = Mr(p, na, (d.zMax - d.zMin) / 2), m = Rn.newInstance({ xResolution: 1, yResolution: 1 });
    m.setOrigin(g.origin), m.setPoint1(g.point1), m.setPoint2(g.point2);
    const x = yt.newInstance();
    x.setInputConnection(m.getOutputPort()), x.setScalarVisibility(!1);
    const I = ft.newInstance();
    I.setMapper(x);
    const w = I.getProperty();
    w.setColor(0.39, 0.78, 1), w.setOpacity(0.22), w.setAmbient(1), w.setDiffuse(0), w.setEdgeVisibility(!0), w.setEdgeColor(0.39, 0.78, 1), w.setLineWidth(2);
    try {
      l.addActor({ uid: cn, actor: I }), l.render();
    } catch {
    }
    return c;
  }, [n, a, i, o, e]), null;
}
const oa = 1.6, aa = 0.7;
function sa(e, t, n, a) {
  const i = Fr.newInstance({
    center: [e[0], e[1], e[2]],
    radius: t,
    phiResolution: 16,
    thetaResolution: 16
  }), o = yt.newInstance();
  o.setInputConnection(i.getOutputPort());
  const s = ft.newInstance();
  s.setMapper(o);
  const l = s.getProperty();
  return l.setColor(...n), l.setOpacity(a), l.setAmbient(1), l.setDiffuse(0), s;
}
function dn(e) {
  return e.map((t) => t.cbct).filter(Boolean);
}
const ia = (e, t) => t.some((n) => Math.hypot(n[0] - e.center[0], n[1] - e.center[1], n[2] - e.center[2]) < 0.4);
function la() {
  const { state: e } = le(), t = ne([]), n = e.registration, a = n?.fiducials ?? [], i = JSON.stringify([a.map((o) => o.center), dn(n?.pairs ?? [])]);
  return J(() => {
    const s = ie(se)?.getViewport(ye);
    if (!s) return;
    if (t.current.length) {
      try {
        s.removeActors(t.current);
      } catch {
      }
      t.current = [];
    }
    const l = dn(n?.pairs ?? []);
    return a.forEach((c, d) => {
      const p = Math.max(aa, c.diameterMm / 2 * oa), g = ia(c, l), m = sa(c.center, p, g ? [0.25, 0.8, 0.45] : [1, 0.85, 0.2], g ? 0.85 : 0.95), x = `fiducial3d:${d}`;
      s.addActor({ uid: x, actor: m }), t.current.push(x);
    }), s.render(), () => {
      const d = ie(se)?.getViewport(ye);
      if (d && t.current.length) {
        try {
          d.removeActors(t.current), d.render();
        } catch {
        }
        t.current = [];
      }
    };
  }, [i, e.volumeId]), null;
}
const un = { min: [0, 0, 0], max: [1, 1, 1] }, ca = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
function da(e, t, n) {
  const a = [];
  for (let i = 0; i < 3; i++) {
    const o = t[i] - e[i], s = ca[i], l = [-s[0], -s[1], -s[2]];
    if (n.min[i] > 1e-3) {
      const c = [e[0], e[1], e[2]];
      c[i] = e[i] + n.min[i] * o, a.push({ origin: c, normal: s });
    }
    if (n.max[i] < 0.999) {
      const c = [e[0], e[1], e[2]];
      c[i] = e[i] + n.max[i] * o, a.push({ origin: c, normal: l });
    }
  }
  return a;
}
function ua({
  crop: e,
  enabled: t,
  jawPlane: n
}) {
  const { state: a } = le();
  return J(() => {
    const o = ie(se)?.getViewport(ye);
    if (!o) return;
    const s = o.getDefaultActor?.()?.actor, l = s?.getMapper?.();
    if (l) {
      try {
        if (l.removeAllClippingPlanes(), n && l.addClippingPlane(rn.newInstance({ origin: n.origin, normal: n.normal })), t) {
          const c = s.getBounds?.();
          if (c) {
            const d = [c[0], c[2], c[4]], p = [c[1], c[3], c[5]];
            for (const g of da(d, p, e))
              l.addClippingPlane(rn.newInstance({ origin: g.origin, normal: g.normal }));
          }
        }
        o.render();
      } catch (c) {
        console.error("[crop] apply failed", c);
      }
      return () => {
        try {
          l.removeAllClippingPlanes(), o.render();
        } catch {
        }
      };
    }
  }, [e, t, n, a.volumeId]), null;
}
const pa = 0.2, ha = 10, ma = 15e-4, ga = 16, fa = 800;
function ya(e, t, n = 0) {
  if (!Number.isFinite(e) || e <= 0) return 1;
  const a = n === 1 ? t * ga : n === 2 ? t * fa : t, i = e * Math.exp(-a * ma);
  return Math.min(ha, Math.max(pa, i));
}
const st = ["low", "medium", "high"];
function Ye({ volumeId: e }) {
  const { t } = fe(), { state: n, dispatch: a } = le(), i = ne(null), o = ne(!1), s = ne(!1), [l, c] = Z(n.display.preset3d), [d, p] = Z(n.display.quality3d), [g, m] = Z(n.display.colormap3d), [x, I] = Z(!1), [w, P] = Z(0), [v, h] = Z(!1), [D, C] = Z({ implant: !0, sleeve: !0, axis: !0 }), [k, O] = Z(() => bt().sliceAxes), [L, q] = Z(() => bt().showCrossSection), [W, F] = Z(() => bt().ioSagittal), [j, K] = Z(null), [E, T] = Z(0);
  J(() => {
    or({ sliceAxes: k, showCrossSection: L, ioSagittal: W });
  }, [k, L, W]);
  const A = n.layoutMode === "OPG2+1" ? "compact" : n.layoutMode === "IO3D" ? "io" : "full", y = A !== "full", b = je(() => A === "io" ? { AXIAL: !1, SAGITTAL: W, CORONAL: !1 } : A === "compact" ? { ...k, SAGITTAL: !1, CORONAL: !1 } : k, [A, W, k]), u = je(() => A === "io" && j != null ? { SAGITTAL: j } : void 0, [A, j]), N = n.scans.filter((M) => Dr(M.type)), S = (M) => N.filter((V) => V.type === M), _ = (M) => {
    const V = S(M), H = !V.every((re) => re.visible);
    for (const re of V) a({ type: "UPDATE_SCAN", payload: { ...re, visible: H } });
  }, z = (M) => {
    a({ type: "SET_JAW_SIDE", payload: M });
    for (const V of N) {
      const H = M === "both" || V.type === (M === "upper" ? "upperJaw" : "lowerJaw");
      V.visible !== H && a({ type: "UPDATE_SCAN", payload: { ...V, visible: H } });
    }
  }, [U, G] = Z(qt), [ee, oe] = Z(!1);
  J(() => {
    if (!v || !e) {
      G(qt), oe(!1);
      return;
    }
    let M = !1;
    const V = window.setTimeout(async () => {
      const { getVolumeData: H } = await import("./cprEngine-XRs08qxT.js");
      if (M) return;
      const re = H(e);
      G(An(e, re));
      const he = re?.dims[0] ?? 0;
      T(he), K((te) => te != null && te < he ? te : Math.floor(he / 2)), oe(!0);
    }, 0);
    return () => {
      M = !0, window.clearTimeout(V);
    };
  }, [v, e]);
  const ae = n.jawSide, ce = ar(U), me = je(() => Dn(U, ae), [U, ae]);
  J(() => {
    ee && !ce && ae !== "both" && a({ type: "SET_JAW_SIDE", payload: "both" });
  }, [ee, ce, ae, a]);
  const ke = ne(!1);
  J(() => {
    ke.current || !ee || N.length === 0 || (ke.current = !0, ce && ae !== "both" && z(ae));
  }, [ee, ce, ae, N.length]);
  const [we, Me] = Z(!1), [de, be] = Z(un), [pe, ve] = Z(!1), [Ae, Se] = Z(!1), [Ve, Le] = Z(0), Oe = (M, V, H) => {
    be((re) => {
      const he = { min: [...re.min], max: [...re.max] };
      return V === "min" ? he.min[M] = Math.min(H, re.max[M] - 0.02) : he.max[M] = Math.max(H, re.min[M] + 0.02), he;
    });
  }, R = Q(() => {
    ie(se)?.resize(!0, !1);
  }, []);
  J(() => {
    const M = i.current, V = ie(se);
    if (!M || !V) return;
    s.current = !1, pt(), V.enableElement({
      viewportId: ye,
      type: ge.ViewportType.VOLUME_3D,
      element: M,
      defaultOptions: {
        orientation: ge.OrientationAxis.CORONAL
      }
    }), cr(ye, se), o.current = !0;
    const H = new ResizeObserver(R);
    return H.observe(M), () => {
      if (s.current = !0, H.disconnect(), o.current) {
        try {
          V.disableElement(ye);
        } catch {
        }
        o.current = !1;
      }
    };
  }, [R]), J(() => {
    if (!e || !o.current) return;
    const M = ie(se);
    if (!M) return;
    let V = !1;
    h(!1);
    async function H() {
      try {
        if (await Sn(
          M,
          [{ volumeId: e, blendMode: ge.BlendModes.COMPOSITE }],
          [ye]
        ), V || s.current) return;
        const re = M.getViewport(ye);
        if (!re) return;
        on(re, { preset: l, colormap: g, quality: d, wl: n.windowLevel }), re.resetCamera({ resetPan: !0, resetZoom: !0, resetToCenter: !0 });
        try {
          const he = re.getRenderer?.()?.getActiveCamera?.();
          he && (he.azimuth(30), he.elevation(20), he.orthogonalizeViewUp?.(), re.getRenderer?.()?.resetCameraClippingRange?.());
        } catch {
        }
        re.render(), h(!0);
      } catch (re) {
        !V && !s.current && console.error("[DQ-DICOM] Failed to set volume on 3D viewport:", re);
      }
    }
    return H(), () => {
      V = !0, h(!1);
    };
  }, [e, l]), J(() => {
    if (!v) return;
    const V = ie(se)?.getViewport(ye);
    if (!V) return;
    const H = V.getDefaultActor?.()?.actor;
    l === Qe && Gr(H, n.windowLevel), Yr(H, g, n.windowLevel), Xr(H, d), V.render();
  }, [n.windowLevel, l, g, d, v]);
  const $ = Q(
    (M) => {
      c(M);
      const V = ie(se);
      if (!V) return;
      const H = V.getViewport(ye);
      H && (on(H, { preset: M, colormap: g, quality: d, wl: n.windowLevel }), requestAnimationFrame(() => Le((re) => re + 1)));
    },
    [n.windowLevel, g, d]
  ), B = Q((M) => {
    p(M), a({ type: "SET_DISPLAY", payload: { quality3d: M } });
  }, [a]), Y = Q((M) => {
    m(M), a({ type: "SET_DISPLAY", payload: { colormap3d: M } });
  }, [a]), X = Q(
    (M) => {
      P(M);
      const V = ie(se);
      if (!V) return;
      const H = V.getViewport(ye);
      !H || !("setSlabThickness" in H) || (M === 0 ? H.resetSlabThickness() : H.setSlabThickness(M), H.render());
    },
    []
  );
  return J(() => {
    if (!v) return;
    const M = ie(se)?.getViewport(ye), V = M?.element;
    if (!M || !V) return;
    const H = (re) => {
      if (re.deltaY !== 0) {
        re.preventDefault();
        try {
          M.setZoom(ya(M.getZoom(), re.deltaY, re.deltaMode)), M.render();
        } catch {
        }
      }
    };
    return V.addEventListener("wheel", H, { passive: !1 }), () => V.removeEventListener("wheel", H);
  }, [v]), /* @__PURE__ */ f("div", { className: "relative w-full h-full bg-black", "data-vp": "3D", "data-vp-title": "3D", children: [
    /* @__PURE__ */ r(
      "div",
      {
        ref: i,
        className: "w-full h-full",
        onContextMenu: (M) => M.preventDefault()
      }
    ),
    /* @__PURE__ */ r(Wt, { sliceIndex: 0, totalSlices: 0, viewKey: "3D" }),
    v && /* @__PURE__ */ r(Xo, { layers: D }),
    v && /* @__PURE__ */ r(Ho, {}),
    v && n.registration && /* @__PURE__ */ r(la, {}),
    v && /* @__PURE__ */ r(ta, { axes: b, preset: l, rebuildKey: Ve, indexOverride: u }),
    v && /* @__PURE__ */ r(ra, { enabled: A === "compact" && L }),
    v && /* @__PURE__ */ r(ua, { crop: de, enabled: we, jawPlane: me }),
    /* @__PURE__ */ r(xt, { text: A === "io" ? t("layout.viewIo3d") : "3D", viewKey: "3D" }),
    A === "io" && N.length > 0 && /* @__PURE__ */ r("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5", children: ["upperJaw", "lowerJaw"].map((M) => {
      const V = S(M);
      if (V.length === 0) return null;
      const H = V.every((re) => re.visible);
      return /* @__PURE__ */ r(
        "button",
        {
          onClick: () => _(M),
          title: t(`scan.${M}`),
          className: `px-2.5 py-1.5 rounded-lg text-[11px] font-medium border backdrop-blur-sm transition-colors whitespace-nowrap ${H ? "bg-dental-600 text-white border-dental-500" : "bg-slate-900/70 text-slate-300 border-slate-700/60 hover:bg-slate-800/80"}`,
          children: t(`scan.${M}`)
        },
        M
      );
    }) }),
    n.implants.length > 0 && /* @__PURE__ */ r("div", { className: "absolute bottom-2 right-2 z-10 flex flex-col gap-1 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 p-1.5", children: [
      ["implant", t("view3d.implant")],
      ["sleeve", t("view3d.sleeve")],
      ["axis", t("view3d.axis")]
    ].map(([M, V]) => /* @__PURE__ */ f("label", { className: "flex items-center gap-1.5 text-[10px] text-slate-200 cursor-pointer select-none", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "checkbox",
          checked: D[M],
          onChange: (H) => C((re) => ({ ...re, [M]: H.target.checked })),
          className: "accent-dental-400 w-3 h-3"
        }
      ),
      V
    ] }, M)) }),
    n.volumeId && /* @__PURE__ */ f("div", { className: `absolute ${n.layoutMode === "1x1" ? "bottom-14" : "bottom-2"} left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 px-2 py-1.5 shadow-lg`, children: [
      /* @__PURE__ */ f("div", { className: "relative", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => {
              ve((M) => !M), Se(!1);
            },
            title: t("view3d.preset"),
            className: "flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-slate-200 hover:bg-slate-700/60 transition-colors whitespace-nowrap",
            children: [
              /* @__PURE__ */ f("svg", { className: "w-3.5 h-3.5 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round", children: [
                /* @__PURE__ */ r("path", { d: "M12 2 21 7v10l-9 5-9-5V7l9-5z" }),
                /* @__PURE__ */ r("path", { d: "M3 7l9 5 9-5M12 12v10" })
              ] }),
              /* @__PURE__ */ r("span", { className: "whitespace-nowrap", children: t(l === Qe ? "preset3d.xray" : en.find((M) => M.id === l)?.labelKey ?? "preset3d.bone") })
            ]
          }
        ),
        pe && /* @__PURE__ */ f("div", { className: "absolute bottom-9 left-0 w-36 rounded-lg bg-slate-900/95 border border-slate-700 shadow-xl p-1 z-20", children: [
          en.map((M) => /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                $(M.id), ve(!1);
              },
              className: `w-full text-left px-2 py-1 text-[11px] rounded transition-colors ${l === M.id ? "bg-dental-600 text-white" : "text-slate-300 hover:bg-slate-700/60"}`,
              children: t(M.labelKey)
            },
            M.id
          )),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                $(Qe), ve(!1);
              },
              className: `w-full text-left px-2 py-1 text-[11px] rounded transition-colors ${l === Qe ? "bg-dental-600 text-white" : "text-slate-300 hover:bg-slate-700/60"}`,
              children: t("preset3d.xray")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => B(st[(st.indexOf(d) + 1) % st.length]),
          title: `${t("view3d.quality")}: ${t(`quality.${d}`)}`,
          className: "flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-slate-200 hover:bg-slate-700/60 transition-colors whitespace-nowrap",
          children: [
            /* @__PURE__ */ r("svg", { className: "w-3.5 h-3.5 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", children: [0, 1, 2].map((M) => /* @__PURE__ */ r(
              "line",
              {
                x1: 6 + M * 6,
                y1: 20,
                x2: 6 + M * 6,
                y2: 14 - M * 5,
                opacity: M <= st.indexOf(d) ? 1 : 0.3
              },
              M
            )) }),
            /* @__PURE__ */ r("span", { children: t(`quality.${d}`) })
          ]
        }
      ),
      A === "io" && E > 0 && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => F((M) => !M),
              title: t("view3d.ioSagittal"),
              className: `px-1.5 py-1 rounded text-[10px] font-semibold transition-colors ${W ? "bg-dental-600 text-white" : "bg-slate-800/60 text-slate-300 hover:bg-slate-700"}`,
              children: "S"
            }
          ),
          /* @__PURE__ */ r(
            "input",
            {
              type: "range",
              min: 0,
              max: Math.max(0, E - 1),
              step: 1,
              value: j ?? 0,
              disabled: !W,
              onChange: (M) => K(Number(M.target.value)),
              className: "w-24 h-1 accent-dental-400 disabled:opacity-40",
              title: `${(j ?? 0) + 1} / ${E}`
            }
          )
        ] })
      ] }),
      ce && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => z(wt[(wt.indexOf(ae) + 1) % wt.length]),
            title: t("jaw.hint"),
            className: `flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-colors whitespace-nowrap ${ae === "both" ? "text-slate-200 hover:bg-slate-700/60" : "bg-dental-600 text-white"}`,
            children: [
              /* @__PURE__ */ f("svg", { className: "w-3.5 h-3.5 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", children: [
                /* @__PURE__ */ r("path", { d: "M5 7c2-2.5 12-2.5 14 0", opacity: ae === "lower" ? 0.3 : 1 }),
                /* @__PURE__ */ r("path", { d: "M5 17c2 2.5 12 2.5 14 0", opacity: ae === "upper" ? 0.3 : 1 }),
                /* @__PURE__ */ r("line", { x1: "3", y1: "12", x2: "21", y2: "12", strokeDasharray: "2 2" })
              ] }),
              /* @__PURE__ */ r("span", { children: t(`jaw.${ae}`) })
            ]
          }
        )
      ] }),
      !y && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f("div", { className: "relative", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => {
                I((M) => !M), ve(!1), Se(!1);
              },
              title: t("view3d.color"),
              className: "flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-slate-200 hover:bg-slate-700/60 transition-colors",
              children: [
                /* @__PURE__ */ f("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
                  /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "9" }),
                  /* @__PURE__ */ r("circle", { cx: "8.5", cy: "10", r: "1.2", fill: "currentColor", stroke: "none" }),
                  /* @__PURE__ */ r("circle", { cx: "15.5", cy: "10", r: "1.2", fill: "currentColor", stroke: "none" }),
                  /* @__PURE__ */ r("circle", { cx: "12", cy: "15", r: "1.2", fill: "currentColor", stroke: "none" })
                ] }),
                /* @__PURE__ */ r("span", { children: t(`colormap.${g}`) })
              ]
            }
          ),
          x && /* @__PURE__ */ r("div", { className: "absolute bottom-9 left-0 w-36 rounded-lg bg-slate-900/95 border border-slate-700 shadow-xl p-1 z-20", children: Hr.map((M) => /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                Y(M), I(!1);
              },
              className: `w-full text-left px-2 py-1 text-[11px] rounded transition-colors ${g === M ? "bg-dental-600 text-white" : "text-slate-300 hover:bg-slate-700/60"}`,
              children: t(`colormap.${M}`)
            },
            M
          )) })
        ] })
      ] }),
      A !== "io" && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ r("span", { className: "text-[10px] text-slate-400 select-none", children: t("view3d.slices") }),
          (y ? ["AXIAL"] : zn).map((M) => /* @__PURE__ */ r(
            "button",
            {
              onClick: () => O((V) => ({ ...V, [M]: !V[M] })),
              title: t(`view.${M.toLowerCase()}`),
              className: `px-1.5 py-1 rounded text-[10px] font-semibold transition-colors ${k[M] ? "bg-dental-600 text-white" : "bg-slate-800/60 text-slate-300 hover:bg-slate-700"}`,
              children: M[0]
            },
            M
          )),
          y && /* @__PURE__ */ r(
            "button",
            {
              onClick: () => q((M) => !M),
              title: t("viewport.crossSection"),
              className: `px-1.5 py-1 rounded text-[10px] font-semibold transition-colors ${L ? "bg-dental-600 text-white" : "bg-slate-800/60 text-slate-300 hover:bg-slate-700"}`,
              children: "CS"
            }
          )
        ] })
      ] }),
      !y && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f("div", { className: "relative", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                Se((M) => !M), ve(!1);
              },
              title: t("view3d.crop"),
              className: `px-2 py-1 rounded-md text-[11px] transition-colors ${we ? "bg-dental-600 text-white" : "text-slate-200 hover:bg-slate-700/60"}`,
              children: t("view3d.crop")
            }
          ),
          Ae && /* @__PURE__ */ f("div", { className: "absolute bottom-9 left-0 w-52 rounded-lg bg-slate-900/95 border border-slate-700 shadow-xl p-2.5 space-y-2 z-20", children: [
            /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ f("label", { className: "flex items-center gap-1.5 text-[11px] text-slate-200 cursor-pointer select-none", children: [
                /* @__PURE__ */ r("input", { type: "checkbox", checked: we, onChange: (M) => Me(M.target.checked), className: "accent-dental-400 w-3 h-3" }),
                t("view3d.crop")
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => be(un),
                  disabled: !we,
                  className: "text-[10px] text-slate-400 hover:text-slate-200 disabled:opacity-40",
                  children: t("common.reset")
                }
              )
            ] }),
            /* @__PURE__ */ r("p", { className: "text-[9px] text-slate-500 leading-tight", children: t("view3d.cropHint") }),
            ["X", "Y", "Z"].map((M, V) => /* @__PURE__ */ f("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ f("div", { className: "flex justify-between text-[9px] text-slate-400 select-none", children: [
                /* @__PURE__ */ r("span", { className: "font-semibold text-slate-300", children: M }),
                /* @__PURE__ */ f("span", { children: [
                  Math.round(de.min[V] * 100),
                  "–",
                  Math.round(de.max[V] * 100),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ r(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  step: 1,
                  disabled: !we,
                  value: Math.round(de.min[V] * 100),
                  onChange: (H) => Oe(V, "min", Number(H.target.value) / 100),
                  className: "w-full h-1 accent-dental-400 disabled:opacity-40"
                }
              ),
              /* @__PURE__ */ r(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  step: 1,
                  disabled: !we,
                  value: Math.round(de.max[V] * 100),
                  onChange: (H) => Oe(V, "max", Number(H.target.value) / 100),
                  className: "w-full h-1 accent-dental-400 disabled:opacity-40"
                }
              )
            ] }, M))
          ] })
        ] }),
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ r("span", { className: "text-[10px] text-slate-400 select-none", children: t("view3d.slab") }),
          /* @__PURE__ */ r(
            "input",
            {
              type: "range",
              min: 0,
              max: 200,
              step: 5,
              value: w,
              onChange: (M) => X(Number(M.target.value)),
              className: "w-16 h-1 accent-dental-400",
              title: w === 0 ? t("common.off") : `${w} mm`
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const Wn = {
  length: "length",
  angle: "angle",
  ellipticalRoi: "ellipse",
  circleRoi: "circle",
  rectangleRoi: "rectangle",
  freehandRoi: "freehand",
  bidirectional: "bidirectional",
  probe: "probe",
  arrowAnnotate: "arrow"
};
function Un(e) {
  return e in Wn;
}
const xa = {
  length: 2,
  angle: 3,
  ellipse: 2,
  circle: 2,
  rectangle: 2,
  bidirectional: 4,
  probe: 1,
  arrow: 2
}, pn = "rgb(130, 220, 130)";
function hn(e, t) {
  const n = e.clientWidth, a = e.clientHeight, i = t.width || 1, o = t.height || 1, s = Math.min(n / i, a / o), l = i * s, c = o * s;
  return { left: (n - l) / 2, top: (a - c) / 2, width: l, height: c };
}
function Bn({
  containerRef: e,
  canvasRef: t,
  viewport: n,
  getExtentMm: a,
  sampleHU: i
}) {
  const { state: o, dispatch: s } = le(), { t: l } = fe(), c = Wn[o.activeTool] ?? null, [d, p] = Z([]), [g, m] = Z(null), x = ne(!1), I = ne(o.measurements);
  I.current = o.measurements, J(() => {
    p([]), x.current = !1;
  }, [o.activeTool]), J(() => {
    if (d.length === 0) return;
    const E = (T) => {
      T.key === "Escape" && p([]);
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [d.length]);
  const w = Q((E, T) => {
    const A = e.current, y = t.current;
    if (!A || !y) return null;
    const b = A.getBoundingClientRect(), u = hn(A, y), N = (E - b.left - u.left) / u.width, S = (T - b.top - u.top) / u.height;
    return [Math.max(0, Math.min(1, N)), Math.max(0, Math.min(1, S))];
  }, [e, t]), P = Q((E, T, A) => Math.hypot((T[0] - E[0]) * A[0], (T[1] - E[1]) * A[1]), []), v = Q((E, T) => {
    const A = a();
    if (!A) return "";
    switch (E) {
      case "length":
      case "arrow":
        return `${P(T[0], T[1], A).toFixed(1)} mm`;
      case "angle": {
        const [y, b, u] = T, N = [(y[0] - b[0]) * A[0], (y[1] - b[1]) * A[1]], S = [(u[0] - b[0]) * A[0], (u[1] - b[1]) * A[1]], _ = N[0] * S[0] + N[1] * S[1], z = N[0] * S[1] - N[1] * S[0];
        return `${Math.abs(Math.atan2(z, _) * (180 / Math.PI)).toFixed(1)}°`;
      }
      case "ellipse":
      case "rectangle": {
        const y = Math.abs((T[1][0] - T[0][0]) * A[0]), b = Math.abs((T[1][1] - T[0][1]) * A[1]);
        return `${y.toFixed(1)} × ${b.toFixed(1)} mm`;
      }
      case "circle":
        return `r = ${P(T[0], T[1], A).toFixed(1)} mm`;
      case "bidirectional":
        return `${P(T[0], T[1], A).toFixed(1)} × ${P(T[2], T[3], A).toFixed(1)} mm`;
      case "probe": {
        const y = i?.(T[0][0], T[0][1]);
        return y == null ? "" : `${Math.round(y)} GV`;
      }
      case "freehand": {
        let y = 0;
        for (let b = 1; b < T.length; b++) y += P(T[b - 1], T[b], A);
        return `${y.toFixed(1)} mm`;
      }
      default:
        return "";
    }
  }, [a, P, i]), h = Q((E, T) => {
    const A = I.current.filter((b) => b.tool === E).length, y = {
      id: `meas_${Date.now()}_${Math.round(Math.random() * 1e6)}`,
      kind: "canvas",
      tool: E,
      name: `${l(`tool.${E}`)} ${A + 1}`,
      visible: !0,
      viewport: n,
      points: T,
      value: v(E, T)
    };
    s({ type: "ADD_MEASUREMENT", payload: y }), p([]);
  }, [v, s, l, n]), D = Q((E) => {
    if (!c || E.button !== 0) return;
    E.stopPropagation(), E.preventDefault();
    const T = w(E.clientX, E.clientY);
    if (!T) return;
    if (c === "freehand") {
      x.current = !0, p([T]);
      return;
    }
    const A = [...d, T];
    A.length >= xa[c] ? h(c, A) : p(A);
  }, [c, w, d, h]), C = Q((E) => {
    if (!c) return;
    const T = w(E.clientX, E.clientY);
    if (T) {
      if (c === "freehand" && x.current) {
        p((A) => {
          const y = A[A.length - 1];
          return y && Math.hypot(T[0] - y[0], T[1] - y[1]) < 4e-3 ? A : [...A, T];
        });
        return;
      }
      d.length > 0 && m(T);
    }
  }, [c, w, d.length]), k = Q(() => {
    c === "freehand" && x.current && (x.current = !1, p((E) => (E.length >= 2 && h("freehand", E), [])));
  }, [c, h]), O = e.current, L = t.current, q = O && L ? hn(O, L) : null, W = (E) => q ? [q.left + E[0] * q.width, q.top + E[1] * q.height] : [0, 0], F = (E, T, A, y, b = !1) => {
    const u = T.map(W), N = b ? "rgba(130, 220, 130, 0.7)" : pn, S = { stroke: N, strokeWidth: 1.5, fill: "none" }, _ = A && u[0] ? /* @__PURE__ */ r(
      "text",
      {
        x: u[0][0] + 8,
        y: u[0][1] - 8,
        fill: pn,
        fontSize: 11,
        fontFamily: "monospace",
        style: { paintOrder: "stroke", stroke: "rgba(0,0,0,0.7)", strokeWidth: 3 },
        children: A
      }
    ) : null, z = u.map((G, ee) => /* @__PURE__ */ r("circle", { cx: G[0], cy: G[1], r: 2.5, fill: N }, `d${ee}`));
    let U = null;
    switch (E) {
      case "length":
        u.length >= 2 && (U = /* @__PURE__ */ r("line", { x1: u[0][0], y1: u[0][1], x2: u[1][0], y2: u[1][1], ...S }));
        break;
      case "arrow":
        if (u.length >= 2) {
          const [G, ee] = u, oe = Math.atan2(ee[1] - G[1], ee[0] - G[0]), ae = 9;
          U = /* @__PURE__ */ f("g", { children: [
            /* @__PURE__ */ r("line", { x1: G[0], y1: G[1], x2: ee[0], y2: ee[1], ...S }),
            /* @__PURE__ */ r(
              "polygon",
              {
                points: `${ee[0]},${ee[1]} ${ee[0] - ae * Math.cos(oe - 0.4)},${ee[1] - ae * Math.sin(oe - 0.4)} ${ee[0] - ae * Math.cos(oe + 0.4)},${ee[1] - ae * Math.sin(oe + 0.4)}`,
                fill: N
              }
            )
          ] });
        }
        break;
      case "angle":
        U = /* @__PURE__ */ f("g", { children: [
          u.length >= 2 && /* @__PURE__ */ r("line", { x1: u[0][0], y1: u[0][1], x2: u[1][0], y2: u[1][1], ...S }),
          u.length >= 3 && /* @__PURE__ */ r("line", { x1: u[1][0], y1: u[1][1], x2: u[2][0], y2: u[2][1], ...S })
        ] });
        break;
      case "ellipse":
        u.length >= 2 && (U = /* @__PURE__ */ r(
          "ellipse",
          {
            cx: (u[0][0] + u[1][0]) / 2,
            cy: (u[0][1] + u[1][1]) / 2,
            rx: Math.abs(u[1][0] - u[0][0]) / 2,
            ry: Math.abs(u[1][1] - u[0][1]) / 2,
            ...S
          }
        ));
        break;
      case "circle":
        u.length >= 2 && (U = /* @__PURE__ */ r("circle", { cx: u[0][0], cy: u[0][1], r: Math.hypot(u[1][0] - u[0][0], u[1][1] - u[0][1]), ...S }));
        break;
      case "rectangle":
        u.length >= 2 && (U = /* @__PURE__ */ r(
          "rect",
          {
            x: Math.min(u[0][0], u[1][0]),
            y: Math.min(u[0][1], u[1][1]),
            width: Math.abs(u[1][0] - u[0][0]),
            height: Math.abs(u[1][1] - u[0][1]),
            ...S
          }
        ));
        break;
      case "bidirectional":
        U = /* @__PURE__ */ f("g", { children: [
          u.length >= 2 && /* @__PURE__ */ r("line", { x1: u[0][0], y1: u[0][1], x2: u[1][0], y2: u[1][1], ...S }),
          u.length >= 4 && /* @__PURE__ */ r("line", { x1: u[2][0], y1: u[2][1], x2: u[3][0], y2: u[3][1], ...S })
        ] });
        break;
      case "freehand":
        u.length >= 2 && (U = /* @__PURE__ */ r("polyline", { points: u.map((G) => `${G[0]},${G[1]}`).join(" "), ...S }));
        break;
      case "probe":
        U = u[0] ? /* @__PURE__ */ f("g", { ...S, children: [
          /* @__PURE__ */ r("line", { x1: u[0][0] - 6, y1: u[0][1], x2: u[0][0] + 6, y2: u[0][1] }),
          /* @__PURE__ */ r("line", { x1: u[0][0], y1: u[0][1] - 6, x2: u[0][0], y2: u[0][1] + 6 })
        ] }) : null;
        break;
    }
    return /* @__PURE__ */ f("g", { children: [
      U,
      z,
      _
    ] }, y);
  }, j = o.measurements.filter((E) => E.kind === "canvas" && E.viewport === n && E.visible && E.points), K = g && d.length > 0 && c !== "freehand" ? [...d, g] : d;
  return /* @__PURE__ */ f(
    "div",
    {
      className: "absolute inset-0",
      style: {
        zIndex: 23,
        pointerEvents: c ? "auto" : "none",
        cursor: c ? "crosshair" : "default"
      },
      onPointerDown: D,
      onPointerMove: C,
      onPointerUp: k,
      children: [
        /* @__PURE__ */ f("svg", { className: "w-full h-full", children: [
          j.map((E) => F(E.tool, E.points, E.value, E.id)),
          c && K.length > 0 && F(c, K, void 0, "draft", !0)
        ] }),
        n === "panoramic" && (c !== null || j.length > 0) && /* @__PURE__ */ r("div", { className: "absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[9px] font-mono text-amber-300/90 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: l("measure.panoCaveat") })
      ]
    }
  );
}
function jn({
  x: e,
  y: t,
  widthPx: n,
  heightPx: a,
  angleDeg: i = 0,
  active: o = !1,
  label: s,
  opacity: l = 1,
  interactive: c = !1,
  safetyXPx: d,
  safetyYPx: p,
  safetyColor: g = "#ff3c3c",
  warn: m = !1,
  onPointerDown: x,
  onDoubleClick: I
}) {
  const w = n / 2, P = n * 0.32, v = a * 0.14, h = a * 0.1, D = a - h, C = [
    `M ${-w} 0`,
    `L ${w} 0`,
    `L ${w} ${v}`,
    `L ${P} ${D}`,
    `Q ${P} ${a} 0 ${a}`,
    `Q ${-P} ${a} ${-P} ${D}`,
    `L ${-w} ${v}`,
    "Z"
  ].join(" "), k = [], O = Math.max(3, Math.min(8, Math.round(a / (n * 0.55))));
  for (let W = 1; W <= O; W++) {
    const F = W / (O + 1), j = v + F * (D - v), K = w + (P - w) * F, E = Math.min(2, a * 0.02);
    k.push(/* @__PURE__ */ r("line", { x1: -K, y1: j + E, x2: K, y2: j - E }, W));
  }
  const L = o ? "rgb(255, 200, 0)" : "rgb(0, 180, 255)", q = o ? "rgba(255, 200, 0, 0.25)" : "rgba(0, 180, 255, 0.22)";
  return /* @__PURE__ */ f(
    "g",
    {
      transform: `translate(${e}, ${t}) rotate(${i})`,
      opacity: l,
      style: c ? { pointerEvents: "auto", cursor: "move" } : { pointerEvents: "none" },
      onPointerDown: x,
      onDoubleClick: I,
      children: [
        c && /* @__PURE__ */ r(
          "rect",
          {
            x: -w - 4,
            y: -4,
            width: n + 8,
            height: a + 8,
            fill: "transparent",
            style: { pointerEvents: "all" }
          }
        ),
        d ? (() => {
          const W = p ?? d;
          return /* @__PURE__ */ r(
            "rect",
            {
              x: -w - d,
              y: -W,
              width: n + 2 * d,
              height: a + 2 * W,
              rx: Math.min(d, 5),
              fill: g,
              fillOpacity: 0.08,
              stroke: g,
              strokeOpacity: 0.6,
              strokeWidth: 1,
              style: { pointerEvents: "none" }
            }
          );
        })() : null,
        m && /* @__PURE__ */ r(
          "rect",
          {
            x: -w - 3,
            y: -3,
            width: n + 6,
            height: a + 6,
            rx: 4,
            fill: "none",
            stroke: "#ff2d2d",
            strokeWidth: 2,
            strokeDasharray: "5 3",
            style: { pointerEvents: "none" }
          }
        ),
        /* @__PURE__ */ r("path", { d: C, fill: q, stroke: L, strokeWidth: 1.5 }),
        /* @__PURE__ */ r("g", { stroke: L, strokeWidth: 1, opacity: 0.85, style: { pointerEvents: "none" }, children: k }),
        /* @__PURE__ */ r("line", { x1: -w, y1: v, x2: w, y2: v, stroke: L, strokeWidth: 1, opacity: 0.85 }),
        s && /* @__PURE__ */ r(
          "text",
          {
            x: w + 5,
            y: a / 2,
            fill: o ? "rgb(255, 200, 0)" : "rgb(100, 200, 255)",
            fontSize: 10,
            fontFamily: "monospace",
            style: { pointerEvents: "none", userSelect: "none" },
            children: s
          }
        )
      ]
    }
  );
}
function Fn({ show: e }) {
  const { t } = fe();
  return e ? /* @__PURE__ */ f("div", { className: "absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/60 pointer-events-none select-none", children: [
    /* @__PURE__ */ r("div", { className: "w-12 h-12 border-4 border-dental-400 border-t-transparent rounded-full animate-spin" }),
    /* @__PURE__ */ r("span", { className: "text-dental-200 text-xl font-semibold [text-shadow:_0_1px_4px_rgb(0_0_0)]", children: t("viewport.computing") })
  ] }) : null;
}
function mn(e, t, n, a, i, o, s, l) {
  const c = n * i, d = a * o, g = 1024 / Math.max(c, d), m = Math.round(c * g), x = Math.round(d * g);
  e.width = m, e.height = x;
  const I = e.getContext("2d");
  if (!I) return;
  const w = I.createImageData(m, x), P = w.data, v = s - l / 2, h = 255 / l, D = (n - 1) / Math.max(1, m - 1), C = (a - 1) / Math.max(1, x - 1);
  for (let k = 0; k < x; k++) {
    const O = k * C, L = Math.floor(O), q = Math.min(L + 1, a - 1), W = O - L;
    for (let F = 0; F < m; F++) {
      const j = F * D, K = Math.floor(j), E = Math.min(K + 1, n - 1), T = j - K, A = t[L * n + K], y = t[L * n + E], b = t[q * n + K], u = t[q * n + E], N = A * (1 - T) * (1 - W) + y * T * (1 - W) + b * (1 - T) * W + u * T * W, S = Math.max(0, Math.min(255, (N - v) * h)), _ = k * m + F << 2;
      P[_] = S, P[_ + 1] = S, P[_ + 2] = S, P[_ + 3] = 255;
    }
  }
  I.putImageData(w, 0, 0);
}
function _e(e, t) {
  const n = e.clientWidth, a = e.clientHeight, i = t.width || 1, o = t.height || 1, s = Math.min(n / i, a / o), l = i * s, c = o * s;
  return { left: (n - l) / 2, top: (a - c) / 2, width: l, height: c };
}
function va({ volumeId: e, showCrossSectionLine: t = !1 }) {
  const { state: n, dispatch: a } = le(), { t: i } = fe(), o = ne(null), s = ne(null), l = ne(null), c = ne(null), [d, p] = Z(!1), g = n.windowLevel.wc, m = n.windowLevel.ww, x = ne(g), I = ne(m);
  x.current = g, I.current = m;
  const [w, P] = Z(null), [v, h] = Z(null), [D, C] = Z(!1), [k, O] = Z(null), [L, q] = Z(!1), [W, F] = Z(!1), j = ne(null), K = ne(n.implants);
  K.current = n.implants;
  const [E, T] = Z(null), A = ne(n.anatomy);
  A.current = n.anatomy;
  const [y, b] = Z(null), u = Q(() => {
    const R = l.current, $ = s.current;
    !R || !$ || mn($, R.pixelData, R.width, R.height, R.horizontalSpacing, R.verticalSpacing, g, m);
  }, [g, m]);
  J(() => {
    u();
  }, [u]), J(() => {
    if (!e || !n.archCurveControlPoints) return;
    p(!0), c.current && clearTimeout(c.current);
    const R = n.panoramicResolution <= 0.3 ? 400 : 250;
    return c.current = setTimeout(() => {
      try {
        const $ = Nr({
          volumeId: e,
          controlPoints: n.archCurveControlPoints,
          slabWidth: n.panoramicSlabWidth,
          projection: n.panoramicProjection,
          resolution: n.panoramicResolution
        });
        if ($) {
          l.current = $;
          const B = s.current;
          B && mn(B, $.pixelData, $.width, $.height, $.horizontalSpacing, $.verticalSpacing, x.current, I.current), console.log(`[DQ-OPG] Rendered ${$.width}x${$.height}`);
        }
      } catch ($) {
        console.error("[DQ-OPG] Panoramic generation failed:", $);
      } finally {
        p(!1);
      }
    }, R), () => {
      c.current && clearTimeout(c.current);
    };
  }, [e, n.archCurveControlPoints, n.panoramicSlabWidth, n.panoramicProjection, n.panoramicResolution]);
  const N = Q((R) => {
    const $ = l.current, B = s.current, Y = o.current;
    if (!$ || !B || !Y) return null;
    const X = ($.zMax - R) / ($.zMax - $.zMin);
    if (X < 0 || X > 1) return null;
    const M = _e(Y, B);
    return M.top + X * M.height;
  }, []), S = Q((R) => {
    const $ = l.current, B = s.current, Y = o.current;
    if (!$ || !B || !Y) return null;
    const X = Y.getBoundingClientRect(), M = R - X.top, V = _e(Y, B), H = Math.max(0, Math.min(1, (M - V.top) / V.height));
    return $.zMax - H * ($.zMax - $.zMin);
  }, []), _ = Q((R) => {
    const $ = s.current, B = o.current;
    if (!$ || !B) return null;
    const Y = _e(B, $);
    return Y.left + R * Y.width;
  }, []), z = Q((R) => {
    const $ = s.current, B = o.current;
    if (!$ || !B) return 0.5;
    const Y = B.getBoundingClientRect(), X = R - Y.left, M = _e(B, $);
    return Math.max(0, Math.min(1, (X - M.left) / M.width));
  }, []), U = Q((R) => {
    P(R), h(N(R));
  }, [N]);
  J(() => {
    let R = !1, $ = null, B = null, Y = 0, X;
    const M = () => {
      if (R) return;
      const H = ie(se)?.getViewport(Ee);
      if (!H) {
        Y++ < 40 && (X = setTimeout(M, 150));
        return;
      }
      B = () => {
        const re = H.getCamera().focalPoint?.[2] ?? 0;
        U(re);
      }, B(), $ = H.element, $.addEventListener(ge.Events.CAMERA_MODIFIED, B);
    };
    return M(), () => {
      R = !0, X && clearTimeout(X), $ && B && $.removeEventListener(ge.Events.CAMERA_MODIFIED, B);
    };
  }, [U, e, n.layoutMode, n.panel.panoArrangement]), J(() => {
    w !== null && h(N(w)), O(_(n.crossSectionPosition));
  }, [d, w, N, _, n.crossSectionPosition]);
  const G = Q((R) => {
    const B = ie(se)?.getViewport(Ee);
    if (!B) return;
    const Y = B.getCamera(), X = Y.focalPoint, M = Y.position, V = R - X[2];
    B.setCamera({
      focalPoint: [X[0], X[1], R],
      position: [M[0], M[1], M[2] + V]
    }), B.render(), U(R);
  }, [U]), ee = Q((R) => {
    R.stopPropagation(), R.preventDefault(), C(!0);
  }, []);
  J(() => {
    if (!D) return;
    const R = (B) => {
      const Y = S(B.clientY);
      Y !== null && G(Y);
    }, $ = () => C(!1);
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", $), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", $);
    };
  }, [D, S, G]);
  const oe = ne(0), ae = Q((R) => {
    R.stopPropagation(), R.preventDefault();
    const $ = o.current;
    if ($ && k !== null) {
      const B = $.getBoundingClientRect();
      oe.current = R.clientX - (B.left + k);
    } else
      oe.current = 0;
    q(!0);
  }, [k]);
  J(() => {
    if (!L) return;
    const R = (B) => {
      const Y = z(B.clientX - oe.current);
      a({ type: "SET_CROSS_SECTION_POSITION", payload: Y }), O(_(Y));
    }, $ = () => q(!1);
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", $), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", $);
    };
  }, [L, z, _, a]);
  const ce = Q((R) => {
    R.stopPropagation(), R.preventDefault(), F(!0);
  }, []);
  J(() => {
    if (!W) return;
    const R = (B) => {
      const Y = s.current, X = o.current;
      if (!Y || !X || k === null) return;
      const M = X.getBoundingClientRect(), V = _e(X, Y), H = k, re = V.top + V.height / 2, he = B.clientX - M.left, te = B.clientY - M.top, ue = he - H, xe = -(te - re), Ce = Math.atan2(ue, xe) * (180 / Math.PI), ze = Math.max(-30, Math.min(30, Ce));
      a({ type: "SET_CROSS_SECTION_TILT", payload: Math.round(ze) });
    }, $ = () => F(!1);
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", $), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", $);
    };
  }, [W, k, a]), J(() => {
    O(_(n.crossSectionPosition));
  }, [n.crossSectionPosition, _]), J(() => {
    if (!E) return;
    const R = n.archCurveControlPoints;
    if (!R) return;
    const $ = (Y) => {
      const X = K.current.find((ue) => ue.id === E.id);
      if (!X) return;
      const M = z(Y.clientX - E.offsetPx[0]), V = S(Y.clientY - E.offsetPx[1]);
      if (V === null) return;
      const H = Zt(R, M);
      if (!H) return;
      const re = $e(R, [X.position[0], X.position[1]]), he = re ? (X.position[0] - re.point[0]) * re.normal[0] + (X.position[1] - re.point[1]) * re.normal[1] : 0, te = [
        H.point[0] + H.normal[0] * he,
        H.point[1] + H.normal[1] * he,
        V
      ];
      a({ type: "UPDATE_IMPLANT", payload: { ...X, position: te } });
    }, B = () => T(null);
    return window.addEventListener("pointermove", $), window.addEventListener("pointerup", B), () => {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", B);
    };
  }, [E, n.archCurveControlPoints, z, S, a]);
  const me = Q((R, $) => {
    const B = n.archCurveControlPoints;
    if (!B) return null;
    const Y = z(R), X = S($);
    if (X === null) return null;
    const M = Zt(B, Y);
    return M ? [M.point[0], M.point[1], X] : null;
  }, [n.archCurveControlPoints, z, S]), ke = Q((R) => {
    if (!n.anatomyDrawMode || R.target !== R.currentTarget) return;
    R.stopPropagation();
    const $ = me(R.clientX, R.clientY);
    if (!$) return;
    const B = A.current.find((Y) => Y.id === n.activeAnatomyId);
    if (B && B.type === n.anatomyDrawMode)
      a({ type: "UPDATE_ANATOMY", payload: { ...B, points: [...B.points, $] } });
    else {
      const Y = n.anatomyDrawMode, X = Tr[Y], M = A.current.filter((H) => H.type === Y).length + 1, V = {
        id: `anat_${Date.now()}`,
        name: `${i(`anatomy.${Y}`)} ${M}`,
        visible: !0,
        type: Y,
        color: X.color,
        radius: X.radius,
        points: [$]
      };
      a({ type: "ADD_ANATOMY", payload: V });
    }
  }, [n.anatomyDrawMode, n.activeAnatomyId, me, a, i]);
  J(() => {
    if (!y) return;
    const R = (B) => {
      const Y = me(B.clientX, B.clientY);
      if (!Y) return;
      const X = A.current.find((V) => V.id === y.id);
      if (!X) return;
      const M = X.points.slice();
      M[y.index] = Y, a({ type: "UPDATE_ANATOMY", payload: { ...X, points: M } });
    }, $ = () => b(null);
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", $), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", $);
    };
  }, [y, me, a]), J(() => {
    if (!n.anatomyDrawMode) return;
    const R = ($) => {
      $.key === "Escape" && a({ type: "SET_ANATOMY_DRAW_MODE", payload: null });
    };
    return window.addEventListener("keydown", R), () => window.removeEventListener("keydown", R);
  }, [n.anatomyDrawMode, a]);
  const we = Q((R) => {
    R.button === 0 && (j.current = { startX: R.clientX, startY: R.clientY, startWc: g, startWw: m });
  }, [g, m]), Me = Q((R) => {
    const $ = j.current;
    $ && a({
      type: "SET_WINDOW_LEVEL",
      payload: {
        ww: Math.max(1, $.startWw + (R.clientX - $.startX) * 5),
        wc: $.startWc + (R.clientY - $.startY) * 5
      }
    });
  }, [a]), de = Q(() => {
    j.current = null;
  }, []), be = Q(() => {
    const R = s.current, $ = o.current;
    if (!R || !$ || k === null) return null;
    const B = _e($, R), Y = k, X = B.top + B.height / 2, M = B.height / 2, V = n.crossSectionTiltDeg * Math.PI / 180;
    return {
      x1: Y + Math.sin(V) * M,
      y1: X - Math.cos(V) * M,
      x2: Y - Math.sin(V) * M,
      y2: X + Math.cos(V) * M
    };
  }, [k, n.crossSectionTiltDeg]), pe = t ? be() : null, ve = l.current, Se = (ve ? ve.horizontalSpacing * Math.max(1, ve.width - 1) : 0) * n.crossSectionPosition, Ve = ve && w !== null ? ve.zMax - w : null, Le = () => {
    if (n.implants.length === 0 || !n.archCurveControlPoints) return null;
    const R = l.current, $ = s.current, B = o.current;
    if (!R || !$ || !B) return null;
    const X = _e(B, $).height / (R.zMax - R.zMin), M = Math.max(1, n.panoramicSlabWidth / 2), V = n.archCurveControlPoints, H = n.anatomy.filter((te) => te.visible), re = { nerve: n.safety.nerveMm, sinus: n.safety.sinusMm, neighbor: n.safety.neighborMm }, he = n.implants.filter((te) => te.visible).flatMap((te) => {
      const ue = ht(V, te);
      return ue ? [{ id: te.id, entry: ue.entry, apex: ue.apex, radius: te.diameter / 2 }] : [];
    });
    return /* @__PURE__ */ r("svg", { className: "absolute inset-0 w-full h-full", style: { pointerEvents: "none", zIndex: 22 }, children: n.implants.filter((te) => te.visible).map((te) => {
      const ue = $e(n.archCurveControlPoints, [te.position[0], te.position[1]]);
      if (!ue) return null;
      const xe = _(ue.s), Ce = N(te.position[2]);
      if (xe === null || Ce === null) return null;
      const ze = mt(ue, te.angleBLDeg, te.angleMDDeg), Ut = ze[0] * ue.tangent[0] + ze[1] * ue.tangent[1], vt = Math.atan2(-Ut, -ze[2]) * (180 / Math.PI), Yn = te.length * Math.hypot(Ut, ze[2]);
      let Bt = !1;
      const jt = he.find((De) => De.id === te.id);
      jt && (H.length || he.length > 1) && (Bt = !$t(jt, he, H, re).worstOk);
      const Xn = (te.position[0] - ue.point[0]) * ue.normal[0] + (te.position[1] - ue.point[1]) * ue.normal[1], Hn = Math.max(0, Math.abs(Xn) - M), Ft = Math.max(0.15, Math.min(1, 1 - Hn / M));
      let Gt = null;
      if (te.guided?.enabled) {
        const De = vt * Math.PI / 180, Ge = [-Math.sin(De), Math.cos(De)], Ke = [Math.sin(De), -Math.cos(De)], { sleeveOffset: qe, sleeveHeight: We, drillLength: Yt } = te.guided, Xt = Fe(te.systemId).sleeveDiameter, Ht = xe + Ke[0] * (qe + We / 2) * X, Kt = Ce + Ke[1] * (qe + We / 2) * X, Kn = xe + Ke[0] * (qe + We) * X, qn = Ce + Ke[1] * (qe + We) * X, Jn = xe + Ge[0] * Yt * X, Zn = Ce + Ge[1] * Yt * X;
        Gt = /* @__PURE__ */ f("g", { style: { pointerEvents: "none" }, opacity: Ft, children: [
          /* @__PURE__ */ r(
            "line",
            {
              x1: Kn,
              y1: qn,
              x2: Jn,
              y2: Zn,
              stroke: "rgba(120, 230, 140, 0.85)",
              strokeWidth: 1,
              strokeDasharray: "4 3"
            }
          ),
          /* @__PURE__ */ r(
            "rect",
            {
              x: Ht - Xt * X / 2,
              y: Kt - We * X / 2,
              width: Xt * X,
              height: We * X,
              transform: `rotate(${vt} ${Ht} ${Kt})`,
              fill: "rgba(120, 230, 140, 0.18)",
              stroke: "rgb(120, 230, 140)",
              strokeWidth: 1.5,
              rx: 1.5
            }
          )
        ] });
      }
      return /* @__PURE__ */ f("g", { children: [
        Gt,
        /* @__PURE__ */ r(
          jn,
          {
            x: xe,
            y: Ce,
            widthPx: te.diameter * X,
            heightPx: Yn * X,
            angleDeg: vt,
            active: n.activeImplantId === te.id,
            opacity: Ft,
            interactive: !Un(n.activeTool),
            safetyXPx: X * n.safety.marginMm,
            safetyYPx: X * n.safety.marginMm,
            safetyColor: n.safety.color,
            warn: Bt,
            onPointerDown: (De) => {
              De.stopPropagation(), De.preventDefault(), a({ type: "SET_ACTIVE_IMPLANT", payload: te.id });
              const Ge = B.getBoundingClientRect();
              T({
                id: te.id,
                offsetPx: [De.clientX - (Ge.left + xe), De.clientY - (Ge.top + Ce)]
              });
            },
            onDoubleClick: () => {
              a({ type: "SET_ACTIVE_IMPLANT", payload: te.id }), a({ type: "SET_EDITING_IMPLANT", payload: te.id });
            }
          }
        )
      ] }, te.id);
    }) });
  }, Oe = () => {
    if (!n.archCurveControlPoints) return null;
    const R = l.current, $ = s.current, B = o.current;
    if (!R || !$ || !B) return null;
    const X = _e(B, $).height / (R.zMax - R.zMin), M = n.anatomyDrawMode !== null;
    return /* @__PURE__ */ r(
      "svg",
      {
        className: "absolute inset-0 w-full h-full",
        style: { pointerEvents: M ? "auto" : "none", zIndex: 24, cursor: M ? "crosshair" : "default" },
        onPointerDown: ke,
        children: n.anatomy.filter((V) => V.visible).map((V) => {
          const H = V.points.map((te) => {
            const ue = $e(n.archCurveControlPoints, [te[0], te[1]]);
            if (!ue) return null;
            const xe = _(ue.s), Ce = N(te[2]);
            return xe === null || Ce === null ? null : [xe, Ce];
          }).filter((te) => te !== null);
          if (H.length === 0) return null;
          const re = H.map((te) => `${te[0].toFixed(1)},${te[1].toFixed(1)}`).join(" "), he = n.activeAnatomyId === V.id;
          return /* @__PURE__ */ f("g", { children: [
            H.length >= 2 && /* @__PURE__ */ r(
              "polyline",
              {
                points: re,
                fill: "none",
                stroke: V.color,
                strokeOpacity: 0.25,
                strokeWidth: Math.max(2, V.radius * 2 * X),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            H.length >= 2 && /* @__PURE__ */ r(
              "polyline",
              {
                points: re,
                fill: "none",
                stroke: V.color,
                strokeWidth: 1.5,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            H.map((te, ue) => /* @__PURE__ */ r(
              "circle",
              {
                cx: te[0],
                cy: te[1],
                r: he ? 4 : 3,
                fill: V.color,
                stroke: "white",
                strokeWidth: 1,
                style: { pointerEvents: M ? "none" : "auto", cursor: "grab" },
                onPointerDown: (xe) => {
                  M || (xe.stopPropagation(), a({ type: "SET_ACTIVE_ANATOMY", payload: V.id }), b({ id: V.id, index: ue }));
                }
              },
              ue
            ))
          ] }, V.id);
        })
      }
    );
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ref: o,
      "data-panoramic-view": !0,
      "data-vp": "PANORAMA",
      "data-vp-title": i("viewport.panorama"),
      className: "relative w-full h-full bg-black overflow-hidden select-none",
      onPointerDown: we,
      onPointerMove: Me,
      onPointerUp: de,
      onPointerLeave: de,
      onContextMenu: (R) => R.preventDefault(),
      children: [
        /* @__PURE__ */ r(
          "canvas",
          {
            ref: s,
            "data-panoramic-canvas": !0,
            className: "w-full h-full",
            style: { objectFit: "contain", imageRendering: "auto" }
          }
        ),
        /* @__PURE__ */ r(
          Bn,
          {
            containerRef: o,
            canvasRef: s,
            viewport: "panoramic",
            getExtentMm: () => {
              const R = l.current;
              return R ? [R.width * R.horizontalSpacing, R.height * R.verticalSpacing] : null;
            },
            sampleHU: (R, $) => {
              const B = l.current;
              if (!B) return null;
              const Y = Math.round(R * (B.width - 1)), X = Math.round($ * (B.height - 1));
              return Y < 0 || Y >= B.width || X < 0 || X >= B.height ? null : B.pixelData[X * B.width + Y];
            }
          }
        ),
        v !== null && /* @__PURE__ */ f(
          "div",
          {
            className: "absolute left-0 right-0",
            style: { top: `${v}px`, height: "13px", marginTop: "-6.5px", cursor: "ns-resize", pointerEvents: "auto", zIndex: 20 },
            onPointerDown: ee,
            children: [
              /* @__PURE__ */ r("div", { className: "w-full", style: { height: "2px", marginTop: "5.5px", background: "rgba(255, 235, 60, 0.9)", boxShadow: "0 0 5px rgba(255, 235, 60, 0.6)" } }),
              /* @__PURE__ */ f(
                "span",
                {
                  className: "absolute right-1 -top-4 px-1 rounded text-[10px] font-medium select-none",
                  style: { color: "rgb(255,235,60)", background: "rgba(0,0,0,0.45)" },
                  children: [
                    i("view.axial"),
                    Ve !== null ? ` · ${Ve.toFixed(0)} mm` : ""
                  ]
                }
              )
            ]
          }
        ),
        pe && /* @__PURE__ */ f(
          "svg",
          {
            className: "absolute inset-0 w-full h-full",
            style: { pointerEvents: "none", zIndex: 21 },
            children: [
              /* @__PURE__ */ r(
                "line",
                {
                  x1: pe.x1,
                  y1: pe.y1,
                  x2: pe.x2,
                  y2: pe.y2,
                  stroke: "transparent",
                  strokeWidth: 14,
                  style: { pointerEvents: "auto", cursor: "ew-resize" },
                  onPointerDown: ae
                }
              ),
              /* @__PURE__ */ r(
                "line",
                {
                  x1: pe.x1,
                  y1: pe.y1,
                  x2: pe.x2,
                  y2: pe.y2,
                  stroke: "rgba(100, 200, 255, 0.95)",
                  strokeWidth: 2,
                  style: { pointerEvents: "none", filter: "drop-shadow(0 0 3px rgba(100,200,255,0.6))" }
                }
              ),
              /* @__PURE__ */ f(
                "text",
                {
                  x: pe.x1 + 8,
                  y: pe.y1 + 30,
                  fontSize: 10,
                  fontWeight: 500,
                  fill: "rgb(150,215,255)",
                  stroke: "black",
                  strokeWidth: 0.5,
                  paintOrder: "stroke",
                  style: { pointerEvents: "none", userSelect: "none" },
                  children: [
                    Se.toFixed(0),
                    " mm"
                  ]
                }
              ),
              /* @__PURE__ */ r(
                "circle",
                {
                  cx: pe.x1,
                  cy: pe.y1,
                  r: 6,
                  fill: W ? "rgb(80,200,255)" : "rgb(100,200,255)",
                  stroke: "white",
                  strokeWidth: 1.5,
                  style: { pointerEvents: "auto", cursor: "grab" },
                  onPointerDown: ce
                }
              ),
              /* @__PURE__ */ r(
                "circle",
                {
                  cx: pe.x2,
                  cy: pe.y2,
                  r: 6,
                  fill: W ? "rgb(80,200,255)" : "rgb(100,200,255)",
                  stroke: "white",
                  strokeWidth: 1.5,
                  style: { pointerEvents: "auto", cursor: "grab" },
                  onPointerDown: ce
                }
              )
            ]
          }
        ),
        Oe(),
        Le(),
        /* @__PURE__ */ r(xt, { text: i("viewport.panorama"), viewKey: "PANORAMA" }),
        /* @__PURE__ */ f("div", { className: "absolute bottom-1 left-2 text-gray-400 text-[10px] font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: [
          "WC: ",
          Math.round(g),
          " / WW: ",
          Math.round(m)
        ] }),
        /* @__PURE__ */ r(Fn, { show: d })
      ]
    }
  );
}
function it(e, t) {
  const n = e.clientWidth, a = e.clientHeight, i = t.width || 1, o = t.height || 1, s = Math.min(n / i, a / o), l = i * s, c = o * s;
  return { left: (n - l) / 2, top: (a - c) / 2, width: l, height: c };
}
function ba({ containerRef: e, canvasRef: t, widthMm: n, zMin: a, zMax: i }) {
  const { state: o, dispatch: s } = le(), { t: l } = fe(), c = ne(o.implants);
  c.current = o.implants;
  const d = n / 2, p = i - a, g = (a + i) / 2, m = je(
    () => o.archCurveControlPoints ? Vt(
      o.archCurveControlPoints,
      o.crossSectionPosition,
      o.crossSectionTiltDeg,
      a,
      i
    ) : null,
    [o.archCurveControlPoints, o.crossSectionPosition, o.crossSectionTiltDeg, a, i]
  ), x = je(() => {
    if (!m) return [];
    const y = kt(m.eU, m.eV);
    return o.scans.filter((b) => b.visible).map((b) => ({
      id: b.id,
      color: b.color,
      segs: Ln(b.id, b.transform, m.origin, y)
    }));
  }, [o.scans, m]), I = Q((y, b) => {
    const u = e.current, N = t.current;
    if (!u || !N) return null;
    const S = it(u, N), _ = (y + d) / n, z = (i - b) / p;
    return [S.left + _ * S.width, S.top + z * S.height];
  }, [e, t, d, n, i, p]), w = Q((y, b) => {
    const u = e.current, N = t.current;
    if (!u || !N) return null;
    const S = it(u, N), _ = u.getBoundingClientRect(), z = y - _.left, U = b - _.top, G = (z - S.left) / S.width, ee = (U - S.top) / S.height, oe = G * n - d, ae = i - ee * p;
    return [oe, ae];
  }, [e, t, d, n, i, p]), P = Q(() => {
    const y = e.current, b = t.current;
    return !y || !b ? 1 : it(y, b).width / n;
  }, [e, t, n]), v = Q(() => {
    const y = e.current, b = t.current;
    return !y || !b ? 1 : it(y, b).height / p;
  }, [e, t, p]), h = Q((y, b, u = 0) => {
    if (!m) return null;
    const N = kt(m.eU, m.eV), S = b - g;
    return [
      m.origin[0] + m.eU[0] * y + m.eV[0] * S + N[0] * u,
      m.origin[1] + m.eU[1] * y + m.eV[1] * S + N[1] * u,
      m.origin[2] + m.eU[2] * y + m.eV[2] * S + N[2] * u
    ];
  }, [m, g]);
  J(() => {
    if (!o.implantPlacementMode) return;
    const y = (b) => {
      b.key === "Escape" && s({ type: "SET_IMPLANT_PLACEMENT_MODE", payload: !1 });
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [o.implantPlacementMode, s]);
  const D = Q((y) => {
    if (!o.implantPlacementMode || y.target !== y.currentTarget) return;
    y.stopPropagation();
    const b = w(y.clientX, y.clientY);
    if (!b) return;
    const u = h(b[0], b[1], 0);
    if (!u) return;
    const N = {
      id: `imp_${Date.now()}`,
      name: l("implant.defaultName", { n: o.implants.length + 1 }),
      visible: !0,
      position: u,
      diameter: 4,
      length: 10,
      angleBLDeg: 0,
      angleMDDeg: 0,
      systemId: o.defaultSystemId
    };
    s({ type: "ADD_IMPLANT", payload: N });
  }, [o.implantPlacementMode, o.implants.length, o.defaultSystemId, w, h, s, l]), [C, k] = Z(null), O = Q((y, b) => {
    if (y.stopPropagation(), y.preventDefault(), s({ type: "SET_ACTIVE_IMPLANT", payload: b.id }), !m) return;
    const [u, N, S] = Pe(b.position, m), _ = w(y.clientX, y.clientY);
    k({
      id: b.id,
      grabOffsetMm: _ ? [_[0] - u, _[1] - (g + N)] : [0, 0],
      w0: S
    });
  }, [s, m, w, g]);
  J(() => {
    if (!C) return;
    const y = (u) => {
      const N = w(u.clientX, u.clientY);
      if (!N) return;
      const S = c.current.find((z) => z.id === C.id);
      if (!S) return;
      const _ = h(
        N[0] - C.grabOffsetMm[0],
        N[1] - C.grabOffsetMm[1],
        C.w0
      );
      _ && s({ type: "UPDATE_IMPLANT", payload: { ...S, position: _ } });
    }, b = () => k(null);
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", b), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b);
    };
  }, [C, w, h, s]);
  const [L, q] = Z(null), W = Q((y, b) => {
    y.stopPropagation(), y.preventDefault(), s({ type: "SET_ACTIVE_IMPLANT", payload: b.id }), q(b.id);
  }, [s]);
  J(() => {
    if (!L || !m) return;
    const y = (u) => {
      const N = c.current.find((oe) => oe.id === L);
      if (!N) return;
      const S = w(u.clientX, u.clientY);
      if (!S) return;
      const [_, z] = Pe(N.position, m), U = S[0] - _, G = g + z - S[1];
      if (Math.abs(U) < 0.01 && Math.abs(G) < 0.01) return;
      const ee = Math.atan2(U, G) * (180 / Math.PI);
      s({ type: "UPDATE_IMPLANT", payload: { ...N, angleBLDeg: Math.round(ee) } });
    }, b = () => q(null);
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", b), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b);
    };
  }, [L, m, w, g, s]);
  const F = o.archCurveControlPoints, j = o.anatomy.filter((y) => y.visible), K = { nerve: o.safety.nerveMm, sinus: o.safety.sinusMm, neighbor: o.safety.neighborMm }, E = F ? o.implants.filter((y) => y.visible).flatMap((y) => {
    const b = ht(F, y);
    return b ? [{ id: y.id, entry: b.entry, apex: b.apex, radius: y.diameter / 2 }] : [];
  }) : [], T = Un(o.activeTool), A = !T && (o.implantPlacementMode || o.implants.length > 0);
  return /* @__PURE__ */ f(
    "svg",
    {
      className: "absolute inset-0 w-full h-full",
      style: {
        pointerEvents: A ? "auto" : "none",
        zIndex: 25,
        cursor: o.implantPlacementMode ? "crosshair" : "default"
      },
      onPointerDown: D,
      children: [
        m && x.map((y) => /* @__PURE__ */ r("g", { style: { pointerEvents: "none" }, children: y.segs.map((b, u) => {
          const N = Pe(b[0], m), S = Pe(b[1], m), _ = I(N[0], g + N[1]), z = I(S[0], g + S[1]);
          return !_ || !z ? null : /* @__PURE__ */ r("line", { x1: _[0], y1: _[1], x2: z[0], y2: z[1], stroke: y.color, strokeWidth: 1.5, strokeOpacity: 0.9 }, u);
        }) }, `scan-${y.id}`)),
        m && o.anatomy.filter((y) => y.visible).map((y) => {
          const b = y.points.map((u, N) => {
            const [S, _, z] = Pe(u, m);
            if (Math.abs(z) >= y.radius) return null;
            const U = Math.sqrt(y.radius * y.radius - z * z), G = I(S, g + _);
            if (!G) return null;
            const ee = U * P();
            return /* @__PURE__ */ r("circle", { cx: G[0], cy: G[1], r: Math.max(1, ee), fill: y.color, fillOpacity: 0.4, stroke: y.color, strokeWidth: 1 }, N);
          }).filter(Boolean);
          return /* @__PURE__ */ r("g", { style: { pointerEvents: "none" }, children: b }, y.id);
        }),
        m && F && o.implants.filter((y) => y.visible).map((y) => {
          const b = $e(F, [y.position[0], y.position[1]]);
          if (!b) return null;
          const u = mt(b, y.angleBLDeg, y.angleMDDeg);
          let N = !1;
          const S = E.find((Y) => Y.id === y.id);
          S && (j.length || E.length > 1) && (N = !$t(S, E, j, K).worstOk);
          const [_, z, U] = Pe(y.position, m), G = I(_, g + z);
          if (!G) return null;
          const ee = P(), oe = v(), ae = Nt(u, m.eU), ce = Nt(u, m.eV), me = Math.atan2(-ae, -ce) * (180 / Math.PI), ke = y.length * Math.hypot(ae, ce), we = kt(m.eU, m.eV), Me = Nt(u, we);
          let de;
          if (Math.abs(Me) < 1e-6)
            de = Math.abs(U);
          else {
            const Y = -U / Me;
            de = Y >= 0 && Y <= y.length ? 0 : Math.min(Math.abs(U), Math.abs(U + Me * y.length));
          }
          const pe = Math.max(0, Math.min(1, 1 - Math.max(0, de - y.diameter / 2) / 4));
          if (pe <= 0.02) return null;
          const Ae = xr(
            { entry: y.position, axis: u, diameter: y.diameter, length: y.length },
            m
          )?.map(([Y, X]) => I(Y, g + X)).filter((Y) => Y !== null).map((Y) => `${Y[0].toFixed(1)},${Y[1].toFixed(1)}`).join(" "), Se = o.activeImplantId === y.id, Ve = Se ? "rgb(255, 200, 0)" : "rgb(0, 180, 255)", Le = I(_ + ae * y.length, g + z + ce * y.length), Oe = 10, R = I(_ - ae * Oe, g + z - ce * Oe);
          let $, B;
          if (y.guided?.enabled) {
            const Y = { entry: y.position, axis: u, diameter: y.diameter, length: y.length }, X = {
              diameter: Fe(y.systemId).sleeveDiameter,
              offset: y.guided.sleeveOffset,
              height: y.guided.sleeveHeight
            };
            $ = vr(br(Y, X), m, () => 1)?.map(([xe, Ce]) => I(xe, g + Ce)).filter((xe) => xe !== null).map((xe) => `${xe[0].toFixed(1)},${xe[1].toFixed(1)}`).join(" ");
            const [V, H] = wr(Y, X, y.guided.drillLength), re = Pe(V, m), he = Pe(H, m), te = I(re[0], g + re[1]), ue = I(he[0], g + he[1]);
            te && ue && (B = { x1: te[0], y1: te[1], x2: ue[0], y2: ue[1] });
          }
          return /* @__PURE__ */ f("g", { children: [
            /* @__PURE__ */ r(
              jn,
              {
                x: G[0],
                y: G[1],
                widthPx: y.diameter * ee,
                heightPx: ke * oe,
                angleDeg: me,
                active: Se,
                opacity: pe,
                interactive: !T,
                safetyXPx: ee * o.safety.marginMm,
                safetyYPx: oe * o.safety.marginMm,
                safetyColor: o.safety.color,
                warn: N,
                onPointerDown: (Y) => O(Y, y),
                onDoubleClick: () => {
                  s({ type: "SET_ACTIVE_IMPLANT", payload: y.id }), s({ type: "SET_EDITING_IMPLANT", payload: y.id });
                }
              }
            ),
            Ae && /* @__PURE__ */ r(
              "polygon",
              {
                points: Ae,
                fill: Se ? "rgba(255, 200, 0, 0.30)" : "rgba(0, 180, 255, 0.28)",
                stroke: Ve,
                strokeWidth: 1.5,
                style: { pointerEvents: "none" }
              }
            ),
            B && /* @__PURE__ */ r(
              "line",
              {
                x1: B.x1,
                y1: B.y1,
                x2: B.x2,
                y2: B.y2,
                stroke: "rgba(120, 230, 140, 0.85)",
                strokeWidth: 1,
                strokeDasharray: "4 3",
                style: { pointerEvents: "none" }
              }
            ),
            $ && /* @__PURE__ */ r(
              "polygon",
              {
                points: $,
                fill: "rgba(120, 230, 140, 0.18)",
                stroke: "rgb(120, 230, 140)",
                strokeWidth: 1.5,
                style: { pointerEvents: "none" }
              }
            ),
            Se && R && /* @__PURE__ */ f("g", { style: { pointerEvents: "none" }, children: [
              /* @__PURE__ */ r(
                "line",
                {
                  x1: G[0],
                  y1: G[1],
                  x2: R[0],
                  y2: R[1],
                  stroke: "rgb(255, 200, 0)",
                  strokeWidth: 1.25,
                  strokeDasharray: "3 3",
                  opacity: 0.8
                }
              ),
              /* @__PURE__ */ r("circle", { cx: R[0], cy: R[1], r: 2.5, fill: "none", stroke: "rgb(255, 200, 0)", strokeWidth: 1.25, opacity: 0.9 })
            ] }),
            Se && /* @__PURE__ */ f(
              "text",
              {
                x: G[0] + y.diameter * ee / 2 + 6,
                y: G[1],
                fill: "rgb(255, 200, 0)",
                fontSize: 10,
                fontFamily: "monospace",
                style: { pointerEvents: "none", userSelect: "none" },
                children: [
                  y.name,
                  " · ⌀",
                  y.diameter,
                  " × ",
                  y.length,
                  "mm"
                ]
              }
            ),
            Se && !T && Le && /* @__PURE__ */ r(
              "circle",
              {
                cx: Le[0],
                cy: Le[1],
                r: 6,
                fill: L === y.id ? "rgb(255, 220, 80)" : "rgba(255, 200, 0, 0.85)",
                stroke: "white",
                strokeWidth: 1.5,
                style: { pointerEvents: "auto", cursor: "grab" },
                onPointerDown: (Y) => W(Y, y)
              }
            )
          ] }, y.id);
        })
      ]
    }
  );
}
const gn = 50;
function fn(e, t, n, a, i, o, s, l) {
  const c = n * i, d = a * o, g = 1024 / Math.max(c, d), m = Math.round(c * g), x = Math.round(d * g);
  e.width = m, e.height = x;
  const I = e.getContext("2d");
  if (!I) return;
  const w = I.createImageData(m, x), P = w.data, v = s - l / 2, h = 255 / l, D = (n - 1) / Math.max(1, m - 1), C = (a - 1) / Math.max(1, x - 1);
  for (let k = 0; k < x; k++) {
    const O = k * C, L = Math.floor(O), q = Math.min(L + 1, a - 1), W = O - L;
    for (let F = 0; F < m; F++) {
      const j = F * D, K = Math.floor(j), E = Math.min(K + 1, n - 1), T = j - K, A = t[L * n + K], y = t[L * n + E], b = t[q * n + K], u = t[q * n + E], N = A * (1 - T) * (1 - W) + y * T * (1 - W) + b * (1 - T) * W + u * T * W, S = Math.max(0, Math.min(255, (N - v) * h)), _ = k * m + F << 2;
      P[_] = S, P[_ + 1] = S, P[_ + 2] = S, P[_ + 3] = 255;
    }
  }
  I.putImageData(w, 0, 0);
}
function yn(e, t) {
  const n = e.clientWidth, a = e.clientHeight, i = t.width || 1, o = t.height || 1, s = Math.min(n / i, a / o), l = i * s, c = o * s;
  return { left: (n - l) / 2, top: (a - c) / 2, width: l, height: c };
}
function wa({ volumeId: e }) {
  const { state: t, dispatch: n } = le(), { t: a } = fe(), i = ne(null), o = ne(null), s = ne(null), l = ne(null), [c, d] = Z(!1), p = t.windowLevel.wc, g = t.windowLevel.ww, m = ne(p), x = ne(g), [I, w] = Z(null);
  m.current = p, x.current = g;
  const [P, v] = Z(null), [h, D] = Z(!1), C = ne(null), k = Q(() => {
    const E = s.current, T = o.current;
    !E || !T || fn(T, E.pixelData, E.width, E.height, E.horizontalSpacing, E.verticalSpacing, p, g);
  }, [p, g]);
  J(() => {
    k();
  }, [k]), J(() => {
    if (!(!e || !t.archCurveControlPoints))
      return d(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        const E = Ir({
          volumeId: e,
          controlPoints: t.archCurveControlPoints,
          position: t.crossSectionPosition,
          tiltDeg: t.crossSectionTiltDeg,
          widthMm: gn,
          resolution: t.panoramicResolution
        });
        if (E) {
          s.current = E, w(E);
          const T = o.current;
          T && fn(T, E.pixelData, E.width, E.height, E.horizontalSpacing, E.verticalSpacing, m.current, x.current);
        }
        d(!1);
      }, 100), () => {
        l.current && clearTimeout(l.current);
      };
  }, [e, t.archCurveControlPoints, t.crossSectionPosition, t.crossSectionTiltDeg, t.panoramicResolution]);
  const O = Q((E) => {
    const T = s.current, A = o.current, y = i.current;
    if (!T || !A || !y) return null;
    const b = (T.zMin + T.zMax) / 2, u = Math.cos(t.crossSectionTiltDeg * Math.PI / 180), N = (E - b) / u, S = (T.zMax - b - N) / (T.zMax - T.zMin);
    if (S < 0 || S > 1) return null;
    const _ = yn(y, A);
    return _.top + S * _.height;
  }, [t.crossSectionTiltDeg]), L = Q((E) => {
    const T = s.current, A = o.current, y = i.current;
    if (!T || !A || !y) return null;
    const b = y.getBoundingClientRect(), u = E - b.top, N = yn(y, A), S = Math.max(0, Math.min(1, (u - N.top) / N.height)), _ = (T.zMin + T.zMax) / 2, z = Math.cos(t.crossSectionTiltDeg * Math.PI / 180), U = T.zMax - _ - S * (T.zMax - T.zMin);
    return _ + U * z;
  }, [t.crossSectionTiltDeg]), q = Q((E) => {
    const A = ie(se)?.getViewport(Ee);
    if (!A) return;
    const y = A.getCamera(), b = y.focalPoint, u = y.position, N = E - b[2];
    A.setCamera({
      focalPoint: [b[0], b[1], E],
      position: [u[0], u[1], u[2] + N]
    }), A.render();
  }, []);
  J(() => {
    let E = !1, T = null, A = null, y = 0, b;
    const u = () => {
      if (E) return;
      const S = ie(se)?.getViewport(Ee);
      if (!S) {
        y++ < 40 && (b = setTimeout(u, 150));
        return;
      }
      A = () => {
        const _ = S.getCamera().focalPoint?.[2] ?? 0;
        v(O(_));
      }, A(), T = S.element, T.addEventListener(ge.Events.CAMERA_MODIFIED, A);
    };
    return u(), () => {
      E = !0, b && clearTimeout(b), T && A && T.removeEventListener(ge.Events.CAMERA_MODIFIED, A);
    };
  }, [O, e, t.layoutMode]), J(() => {
    const T = ie(se)?.getViewport(Ee);
    if (!T) return;
    const A = T.getCamera().focalPoint?.[2] ?? 0;
    v(O(A));
  }, [c, O]);
  const W = Q((E) => {
    E.stopPropagation(), E.preventDefault(), D(!0);
  }, []);
  J(() => {
    if (!h) return;
    const E = (A) => {
      const y = L(A.clientY);
      y !== null && (q(y), v(O(y)));
    }, T = () => D(!1);
    return window.addEventListener("pointermove", E), window.addEventListener("pointerup", T), () => {
      window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", T);
    };
  }, [h, L, q, O]);
  const F = Q((E) => {
    E.button === 0 && (t.implantPlacementMode || (C.current = { startX: E.clientX, startY: E.clientY, startWc: p, startWw: g }));
  }, [p, g, t.implantPlacementMode]), j = Q((E) => {
    const T = C.current;
    T && n({
      type: "SET_WINDOW_LEVEL",
      payload: {
        ww: Math.max(1, T.startWw + (E.clientX - T.startX) * 5),
        wc: T.startWc + (E.clientY - T.startY) * 5
      }
    });
  }, [n]), K = Q(() => {
    C.current = null;
  }, []);
  return /* @__PURE__ */ f(
    "div",
    {
      ref: i,
      "data-crosssection-view": !0,
      "data-vp": "CROSS",
      "data-vp-title": a("viewport.crossSection"),
      className: "relative w-full h-full bg-black overflow-hidden select-none",
      style: t.implantPlacementMode ? { cursor: "crosshair" } : void 0,
      onPointerDown: F,
      onPointerMove: j,
      onPointerUp: K,
      onPointerLeave: K,
      onContextMenu: (E) => E.preventDefault(),
      children: [
        /* @__PURE__ */ r(
          "canvas",
          {
            ref: o,
            "data-crosssection-canvas": !0,
            className: "w-full h-full",
            style: { objectFit: "contain", imageRendering: "auto" }
          }
        ),
        /* @__PURE__ */ r(
          Bn,
          {
            containerRef: i,
            canvasRef: o,
            viewport: "crossSection",
            getExtentMm: () => {
              const E = s.current;
              return E ? [E.width * E.horizontalSpacing, E.height * E.verticalSpacing] : null;
            },
            sampleHU: (E, T) => {
              const A = s.current;
              if (!A) return null;
              const y = Math.round(E * (A.width - 1)), b = Math.round(T * (A.height - 1));
              return y < 0 || y >= A.width || b < 0 || b >= A.height ? null : A.pixelData[b * A.width + y];
            }
          }
        ),
        P !== null && /* @__PURE__ */ r(
          "div",
          {
            className: "absolute left-0 right-0",
            style: { top: `${P}px`, height: "11px", marginTop: "-5.5px", cursor: "ns-resize", pointerEvents: "auto", zIndex: 20 },
            onPointerDown: W,
            children: /* @__PURE__ */ r("div", { className: "w-full", style: { height: "1px", marginTop: "5px", background: "rgba(255, 255, 50, 0.6)", boxShadow: "0 0 4px rgba(255, 255, 50, 0.4)" } })
          }
        ),
        /* @__PURE__ */ r(xt, { text: a("viewport.crossSection"), viewKey: "CROSS" }),
        t.crossSectionTiltDeg !== 0 && /* @__PURE__ */ r("div", { className: "absolute top-5 left-1/2 -translate-x-1/2 text-gray-400 text-[10px] font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: a("viewport.tilt", { deg: t.crossSectionTiltDeg.toFixed(0) }) }),
        /* @__PURE__ */ f("div", { className: "absolute bottom-1 left-2 text-gray-400 text-[10px] font-mono pointer-events-none select-none [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: [
          "WC: ",
          Math.round(p),
          " / WW: ",
          Math.round(g)
        ] }),
        /* @__PURE__ */ r(Fn, { show: c }),
        t.implantPlacementMode && /* @__PURE__ */ r("div", { className: "absolute top-1 right-2 text-yellow-400 text-xs font-mono font-bold pointer-events-none select-none animate-pulse [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]", children: a("viewport.placeImplantHint") }),
        t.implantPlacementMode && /* @__PURE__ */ r("div", { className: "absolute inset-0 pointer-events-none border-2 border-yellow-400/50 rounded", style: { zIndex: 30 } }),
        I && /* @__PURE__ */ r(
          ba,
          {
            containerRef: i,
            canvasRef: o,
            widthMm: gn,
            zMin: I.zMin,
            zMax: I.zMax
          }
        )
      ]
    }
  );
}
function Ma(e, t = {}) {
  const {
    slabHalfMm: n = 6,
    boneThreshold: a = 400,
    numControlPoints: i = 9,
    angularSpanDeg: o = 115
  } = t, [s, l, c] = e.dims, [d, p, g] = e.origin, m = 1 / e.invSx, x = 1 / e.invSy, I = 1 / e.invSz;
  if (s < 4 || l < 4 || c < 1) return null;
  const w = t.focalWorldZ ?? (e.zMin + e.zMax) / 2, P = Math.round((w - g) / I), v = Math.max(0, Math.round(n / Math.abs(I))), h = Math.max(0, P - v), D = Math.min(c - 1, P + v);
  if (h > D) return null;
  const C = new Float32Array(s * l);
  for (let _ = h; _ <= D; _++)
    for (let z = 0; z < l; z++) {
      const U = z * s;
      for (let G = 0; G < s; G++) {
        const ee = e.getVoxel(G, z, _);
        ee > C[U + G] && (C[U + G] = ee);
      }
    }
  let k = 0, O = 0, L = 0;
  for (let _ = 0; _ < l; _++) {
    const z = _ * s;
    for (let U = 0; U < s; U++)
      C[z + U] > a && (k += U, O += _, L++);
  }
  if (L < Math.max(50, s * l * 2e-3)) return null;
  const q = k / L, W = O / L, F = d + q * m, j = p + W * x, K = (_, z) => {
    if (_ < 0 || z < 0 || _ > s - 1 || z > l - 1) return 0;
    const U = Math.floor(_), G = Math.floor(z), ee = Math.min(s - 1, U + 1), oe = Math.min(l - 1, G + 1), ae = _ - U, ce = z - G, me = C[G * s + U], ke = C[G * s + ee], we = C[oe * s + U], Me = C[oe * s + ee];
    return (me * (1 - ae) + ke * ae) * (1 - ce) + (we * (1 - ae) + Me * ae) * ce;
  }, E = o * Math.PI / 180, T = 1.5 * Math.PI / 180, A = 4, y = 0.48 * Math.min(s * m, l * x), b = Math.max(0.5, Math.min(m, x)), u = [];
  for (let _ = -E; _ <= E + 1e-6; _ += T) {
    const z = Math.sin(_), U = -Math.cos(_);
    let G = -1, ee = a;
    for (let oe = A; oe <= y; oe += b) {
      const ae = F + oe * z, ce = j + oe * U, me = K((ae - d) / m, (ce - p) / x);
      me > ee && (ee = me, G = oe);
    }
    G > 0 && u.push([F + G * z, j + G * U]);
  }
  if (u.length < 5) return null;
  const N = ka(u, 2), S = Pr(N, i);
  return S.length === i ? S : null;
}
function ka(e, t) {
  const n = e.length;
  if (n < 3) return e;
  const a = [];
  for (let i = 0; i < n; i++) {
    let o = 0, s = 0, l = 0;
    for (let c = -t; c <= t; c++) {
      const d = i + c;
      d < 0 || d >= n || (o += e[d][0], s += e[d][1], l++);
    }
    a.push([o / l, s / l]);
  }
  return a;
}
const lt = 25;
function Na(e, t, n) {
  const { curve: a } = kr(e, 500);
  if (a.length < 2) return 0.5;
  let i = 0, o = 1 / 0;
  for (let s = 0; s < a.length; s++) {
    const l = a[s][0] - t, c = a[s][1] - n, d = l * l + c * c;
    d < o && (o = d, i = s);
  }
  return i / (a.length - 1);
}
function Et(e) {
  return e.length === 0 ? "" : e.map((t, n) => `${n === 0 ? "M" : "L"}${t[0].toFixed(1)},${t[1].toFixed(1)}`).join(" ");
}
function Ia() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = ne(null), i = ne(null), [o, s] = Z(null), l = ne(!1), [c, d] = Z(!1), [p, g] = Z(null);
  J(() => {
    if (e.archCurveControlPoints || !e.volumeId) return;
    const h = He.getVolume(e.volumeId);
    if (!h) {
      console.warn("[DQ-OPG] Volume not in cache yet, retrying in 500ms...");
      const C = setTimeout(() => {
        const k = He.getVolume(e.volumeId);
        k && D(k);
      }, 500);
      return () => clearTimeout(C);
    }
    D(h);
    function D(C) {
      const k = C.origin, O = C.dimensions, L = C.spacing, q = [k[0] + O[0] * L[0] / 2, k[1] + O[1] * L[1] / 2], W = [O[0] * L[0], O[1] * L[1]], F = _r(q, W);
      console.log("[DQ-OPG] Default arch curve generated, center:", q, "size:", W), t({ type: "SET_ARCH_CURVE", payload: F });
    }
  }, [e.archCurveControlPoints, e.volumeId, t]);
  const m = Q(() => ie(se)?.getViewport(Ee) ?? null, []), x = Q(() => {
    const h = m();
    return h ? h.getCamera().focalPoint?.[2] ?? 0 : 0;
  }, [m]), I = Q(() => {
    const h = e.volumeId ? Te(e.volumeId) : null, D = h ? Ma(h, { focalWorldZ: x() }) : null;
    if (!D) {
      window.alert(n("arch.autoFailed"));
      return;
    }
    t({ type: "SET_ARCH_CURVE", payload: D });
  }, [e.volumeId, x, t, n]), w = Q(() => {
    const h = m();
    if (!h || !e.archCurveControlPoints) return;
    const D = x(), C = e.archCurveControlPoints.map(([b, u]) => {
      const N = h.worldToCanvas([b, u, D]);
      return [N[0], N[1]];
    }), k = Lr(e.archCurveControlPoints, 20), O = k.map(([b, u]) => {
      const N = h.worldToCanvas([b, u, D]);
      return [N[0], N[1]];
    }), L = Or(k), q = e.panoramicSlabWidth / 2, W = tn(k, L, -q), F = tn(k, L, q), j = W.map(([b, u]) => {
      const N = h.worldToCanvas([b, u, D]);
      return [N[0], N[1]];
    }), K = F.map(([b, u]) => {
      const N = h.worldToCanvas([b, u, D]);
      return [N[0], N[1]];
    });
    let E = null, T = null, A = null;
    const y = Vt(e.archCurveControlPoints, e.crossSectionPosition, 0, 0, 1);
    if (y) {
      const [b, u] = y.point, [N, S] = y.normal, _ = h.worldToCanvas([b - N * lt, u - S * lt, D]), z = h.worldToCanvas([b + N * lt, u + S * lt, D]), U = h.worldToCanvas([b, u, D]);
      E = [_[0], _[1]], T = [z[0], z[1]], A = [U[0], U[1]];
    }
    g({
      controlPts: C,
      curvePath: Et(O),
      innerPath: Et(j),
      outerPath: Et(K),
      csA: E,
      csB: T,
      csMid: A
    });
  }, [e.archCurveControlPoints, e.panoramicSlabWidth, e.crossSectionPosition, m, x]);
  J(() => {
    const h = m();
    if (!h) return;
    const D = h.element, C = () => w();
    return D.addEventListener(ge.Events.CAMERA_MODIFIED, C), w(), () => D.removeEventListener(ge.Events.CAMERA_MODIFIED, C);
  }, [w, m]);
  const P = Q((h) => (D) => {
    D.stopPropagation(), D.preventDefault(), s(h), i.current = h;
  }, []);
  J(() => {
    if (o === null) return;
    const h = (C) => {
      const k = i.current;
      if (k === null || !a.current || !e.archCurveControlPoints) return;
      const O = m();
      if (!O) return;
      const L = a.current.getBoundingClientRect(), q = C.clientX - L.left, W = C.clientY - L.top, F = O.canvasToWorld([q, W]), j = e.archCurveControlPoints.map((K) => [...K]);
      j[k] = [F[0], F[1]], t({ type: "SET_ARCH_CURVE", payload: j });
    }, D = () => {
      s(null), i.current = null;
    };
    return window.addEventListener("pointermove", h), window.addEventListener("pointerup", D), () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", D);
    };
  }, [o, e.archCurveControlPoints, t, m]);
  const v = Q((h) => {
    h.stopPropagation(), h.preventDefault(), d(!0), l.current = !0;
  }, []);
  return J(() => {
    if (!c) return;
    const h = (C) => {
      if (!l.current || !a.current || !e.archCurveControlPoints) return;
      const k = m();
      if (!k) return;
      const O = a.current.getBoundingClientRect(), L = k.canvasToWorld([C.clientX - O.left, C.clientY - O.top]), q = Na(e.archCurveControlPoints, L[0], L[1]);
      t({ type: "SET_CROSS_SECTION_POSITION", payload: q });
    }, D = () => {
      d(!1), l.current = !1;
    };
    return window.addEventListener("pointermove", h), window.addEventListener("pointerup", D), () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", D);
    };
  }, [c, e.archCurveControlPoints, t, m]), !p || !e.archCurveControlPoints ? null : /* @__PURE__ */ f("div", { ref: a, className: "absolute inset-0", style: { zIndex: 10, pointerEvents: "none" }, children: [
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: I,
        title: n("arch.autoTitle"),
        className: "absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium bg-slate-800/70 hover:bg-slate-700/80 text-white backdrop-blur-sm border border-white/10",
        style: { pointerEvents: "auto" },
        children: [
          "⟳ ",
          n("arch.auto")
        ]
      }
    ),
    /* @__PURE__ */ f("svg", { className: "w-full h-full", children: [
      /* @__PURE__ */ r("path", { d: p.innerPath, fill: "none", stroke: "rgba(255,80,80,0.4)", strokeWidth: 1 }),
      /* @__PURE__ */ r("path", { d: p.outerPath, fill: "none", stroke: "rgba(255,80,80,0.4)", strokeWidth: 1 }),
      /* @__PURE__ */ r("path", { d: p.curvePath, fill: "none", stroke: "rgba(255,80,80,0.85)", strokeWidth: 2 }),
      p.csA && p.csB && p.csMid && /* @__PURE__ */ f("g", { children: [
        /* @__PURE__ */ r(
          "line",
          {
            x1: p.csA[0],
            y1: p.csA[1],
            x2: p.csB[0],
            y2: p.csB[1],
            stroke: "transparent",
            strokeWidth: 16,
            style: { pointerEvents: "auto", cursor: "move" },
            onPointerDown: v
          }
        ),
        /* @__PURE__ */ r(
          "line",
          {
            x1: p.csA[0],
            y1: p.csA[1],
            x2: p.csB[0],
            y2: p.csB[1],
            stroke: "rgb(100,200,255)",
            strokeWidth: 2,
            style: { pointerEvents: "none", filter: "drop-shadow(0 0 3px rgba(100,200,255,0.7))" }
          }
        ),
        /* @__PURE__ */ r(
          "circle",
          {
            cx: p.csMid[0],
            cy: p.csMid[1],
            r: 6,
            fill: c ? "rgb(80,200,255)" : "rgb(100,200,255)",
            stroke: "white",
            strokeWidth: 1.5,
            style: { pointerEvents: "auto", cursor: "move" },
            onPointerDown: v
          }
        )
      ] }),
      p.controlPts.map((h, D) => /* @__PURE__ */ r(
        "circle",
        {
          cx: h[0],
          cy: h[1],
          r: 7,
          fill: o === D ? "rgb(80,200,255)" : "rgb(50,140,255)",
          stroke: "white",
          strokeWidth: 2,
          style: { pointerEvents: "auto", cursor: o === D ? "grabbing" : "grab" },
          onPointerDown: P(D)
        },
        D
      ))
    ] })
  ] });
}
function xn() {
  const { state: e } = le(), [, t] = Z(0), n = Q(() => ie(se)?.getViewport(Ee) ?? null, []);
  if (J(() => {
    const o = n();
    if (!o) return;
    const s = () => t((c) => c + 1), l = o.element;
    return l.addEventListener(ge.Events.CAMERA_MODIFIED, s), () => l.removeEventListener(ge.Events.CAMERA_MODIFIED, s);
  }, [n]), e.implants.length === 0 && e.anatomy.length === 0 && e.scans.length === 0 || !e.archCurveControlPoints) return null;
  const a = n();
  if (!a) return null;
  const i = a.getCamera().focalPoint?.[2];
  return i === void 0 ? null : /* @__PURE__ */ r("div", { className: "absolute inset-0", style: { zIndex: 11, pointerEvents: "none" }, children: /* @__PURE__ */ f("svg", { className: "w-full h-full", children: [
    e.scans.filter((o) => o.visible).map((o) => {
      const s = Ln(o.id, o.transform, [0, 0, i], [0, 0, 1]);
      return s.length === 0 ? null : /* @__PURE__ */ r("g", { children: s.map((l, c) => {
        const d = a.worldToCanvas([l[0][0], l[0][1], i]), p = a.worldToCanvas([l[1][0], l[1][1], i]);
        return /* @__PURE__ */ r("line", { x1: d[0], y1: d[1], x2: p[0], y2: p[1], stroke: o.color, strokeWidth: 1.25, strokeOpacity: 0.9 }, c);
      }) }, `scan-${o.id}`);
    }),
    e.anatomy.filter((o) => o.visible && o.points.length >= 2).map((o) => {
      const s = [];
      for (let l = 0; l < o.points.length - 1; l++) {
        const c = o.points[l], d = o.points[l + 1], p = d[2] - c[2];
        if (Math.abs(p) < 1e-6) continue;
        const g = (i - c[2]) / p;
        if (g < 0 || g > 1) continue;
        const m = c[0] + (d[0] - c[0]) * g, x = c[1] + (d[1] - c[1]) * g, I = a.worldToCanvas([m, x, i]), w = a.worldToCanvas([m + o.radius, x, i]), P = Math.hypot(w[0] - I[0], w[1] - I[1]);
        s.push(
          /* @__PURE__ */ r(
            "circle",
            {
              cx: I[0],
              cy: I[1],
              r: Math.max(1.5, P),
              fill: o.color,
              fillOpacity: 0.35,
              stroke: o.color,
              strokeWidth: 1.5
            },
            l
          )
        );
      }
      return /* @__PURE__ */ r("g", { children: s }, o.id);
    }),
    e.implants.filter((o) => o.visible).map((o) => {
      const s = $e(e.archCurveControlPoints, [o.position[0], o.position[1]]);
      if (!s) return null;
      const l = mt(s, o.angleBLDeg, o.angleMDDeg);
      if (Math.abs(l[2]) < 0.1) return null;
      const c = (i - o.position[2]) / l[2];
      if (c < 0 || c > o.length) return null;
      const d = o.position[0] + l[0] * c, p = o.position[1] + l[1] * c, g = o.diameter / 2 * On(c / o.length);
      if (g <= 0.01) return null;
      const m = a.worldToCanvas([d, p, i]), x = a.worldToCanvas([d + g, p, i]), I = Math.hypot(x[0] - m[0], x[1] - m[1]), w = e.activeImplantId === o.id, P = w ? "rgb(255, 200, 0)" : "rgb(0, 180, 255)";
      let v = null;
      if (o.guided?.enabled) {
        const h = (i - o.position[2]) / l[2];
        if (h <= -o.guided.sleeveOffset && h >= -(o.guided.sleeveOffset + o.guided.sleeveHeight)) {
          const D = o.position[0] + l[0] * h, C = o.position[1] + l[1] * h, k = Fe(o.systemId).sleeveDiameter / 2, O = a.worldToCanvas([D, C, i]), L = a.worldToCanvas([D + k, C, i]);
          v = { cx: O[0], cy: O[1], r: Math.hypot(L[0] - O[0], L[1] - O[1]) };
        }
      }
      return /* @__PURE__ */ f("g", { children: [
        v && /* @__PURE__ */ r(
          "circle",
          {
            cx: v.cx,
            cy: v.cy,
            r: v.r,
            fill: "rgba(120, 230, 140, 0.15)",
            stroke: "rgb(120, 230, 140)",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ r(
          "circle",
          {
            cx: m[0],
            cy: m[1],
            r: I,
            fill: w ? "rgba(255, 200, 0, 0.25)" : "rgba(0, 180, 255, 0.2)",
            stroke: P,
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ r("circle", { cx: m[0], cy: m[1], r: 1.5, fill: P })
      ] }, o.id);
    })
  ] }) });
}
const Ca = [
  { id: "windowLevel", icon: "windowLevel", key: "tool.windowLevel" },
  { id: "pan", icon: "pan", key: "tool.pan" },
  { id: "zoom", icon: "zoom", key: "tool.zoom" },
  { id: "scroll", icon: "scroll", key: "tool.scroll" }
], Sa = [
  { id: "length", icon: "length", key: "tool.length" },
  { id: "angle", icon: "angle", key: "tool.angle" },
  { id: "probe", icon: "probe", key: "tool.probe" },
  { id: "arrowAnnotate", icon: "arrow", key: "tool.arrow" }
];
function vn({ icon: e, active: t, title: n, onClick: a }) {
  const i = zt[e];
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: a,
      title: n,
      className: `w-7 h-7 flex items-center justify-center rounded-md transition-colors ${t ? "bg-dental-600 text-white" : "text-slate-200 hover:bg-slate-700/60"}`,
      children: i ? /* @__PURE__ */ r(i, {}) : n[0]
    }
  );
}
function Ea({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "text-[9px] font-semibold uppercase tracking-wider text-slate-400 select-none px-0.5", children: e });
}
function Aa() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = e.viewMode === "3D", i = (o) => {
    ut(o), t({ type: "SET_ACTIVE_TOOL", payload: o });
  };
  return /* @__PURE__ */ f(Ie, { children: [
    /* @__PURE__ */ f("div", { className: "absolute top-2 left-2 z-20 flex flex-col gap-1 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 px-1.5 py-1 shadow-lg", children: [
      /* @__PURE__ */ r(Ea, { children: n("panel.tools") }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-0.5", children: Ca.map((o) => /* @__PURE__ */ r(vn, { icon: o.icon, active: e.activeTool === o.id, title: n(o.key), onClick: () => i(o.id) }, o.id)) }),
      !a && /* @__PURE__ */ r("div", { className: "flex items-center gap-0.5", children: Sa.map((o) => /* @__PURE__ */ r(vn, { icon: o.icon, active: e.activeTool === o.id, title: n(o.key), onClick: () => i(o.id) }, o.id)) })
    ] }),
    /* @__PURE__ */ f("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 px-1.5 py-1 shadow-lg", children: [
      Rr.map((o) => /* @__PURE__ */ r(
        "button",
        {
          onClick: () => t({ type: "SET_VIEW_MODE", payload: o }),
          className: `px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${e.viewMode === o ? "bg-dental-600 text-white" : "text-slate-200 hover:bg-slate-700/60"}`,
          children: n(`view.${o.toLowerCase()}`)
        },
        o
      )),
      !a && /* @__PURE__ */ f(Ie, { children: [
        /* @__PURE__ */ r("span", { className: "w-px h-4 bg-slate-700/60" }),
        /* @__PURE__ */ f(
          "select",
          {
            value: "",
            onChange: (o) => {
              const s = nn.find((l) => l.key === o.target.value);
              s && t({ type: "SET_WINDOW_LEVEL", payload: { wc: s.windowCenter, ww: s.windowWidth } });
            },
            title: n("settings.wlPresets"),
            className: "bg-slate-800/70 text-slate-200 text-[11px] rounded-md px-1.5 py-1 border border-slate-700/60 outline-none",
            children: [
              /* @__PURE__ */ r("option", { value: "", children: "W/L" }),
              nn.map((o) => /* @__PURE__ */ r("option", { value: o.key, children: n(`preset.${o.key}`) }, o.key))
            ]
          }
        ),
        /* @__PURE__ */ r(
          "input",
          {
            type: "range",
            min: 100,
            max: 4e3,
            step: 50,
            value: e.windowLevel.ww,
            onChange: (o) => t({ type: "SET_WINDOW_LEVEL", payload: { wc: e.windowLevel.wc, ww: Number(o.target.value) } }),
            className: "w-20 h-1 accent-dental-400",
            title: `${n("settings.wlPresets")} — WW ${e.windowLevel.ww}`
          }
        )
      ] })
    ] })
  ] });
}
const Da = [
  { id: "windowLevel", icon: "windowLevel", key: "tool.windowLevel" },
  { id: "pan", icon: "pan", key: "tool.pan" },
  { id: "zoom", icon: "zoom", key: "tool.zoom" },
  { id: "scroll", icon: "scroll", key: "tool.scroll" }
], Ta = [
  { id: "length", icon: "length", key: "tool.length" },
  { id: "angle", icon: "angle", key: "tool.angle" },
  { id: "probe", icon: "probe", key: "tool.probe" },
  { id: "arrowAnnotate", icon: "arrow", key: "tool.arrow" }
];
function bn({ icon: e, active: t, title: n, onClick: a }) {
  const i = zt[e];
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: a,
      title: n,
      className: `w-7 h-7 flex items-center justify-center rounded-md transition-colors ${t ? "bg-dental-600 text-white" : "text-slate-200 hover:bg-slate-700/60"}`,
      children: i ? /* @__PURE__ */ r(i, {}) : n[0]
    }
  );
}
function wn({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "text-[9px] font-semibold uppercase tracking-wider text-slate-400 select-none px-0.5", children: e });
}
function At({ active: e, label: t, title: n, onClick: a }) {
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: a,
      title: n,
      className: `px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${e ? "bg-dental-600 text-white" : "text-slate-200 hover:bg-slate-700/60"}`,
      children: t
    }
  );
}
function Pa() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = (o) => {
    ut(o), t({ type: "SET_ACTIVE_TOOL", payload: o });
  }, i = (o) => {
    const s = e.anatomyDrawMode === o;
    t({ type: "SET_ANATOMY_DRAW_MODE", payload: s ? null : o }), s || t({ type: "SET_ACTIVE_ANATOMY", payload: null });
  };
  return /* @__PURE__ */ f("div", { className: "absolute top-2 right-2 z-30 flex flex-col items-end gap-2", children: [
    /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 px-1.5 py-1 shadow-lg", children: [
      /* @__PURE__ */ r(wn, { children: n("panel.tools") }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-0.5", children: Da.map((o) => /* @__PURE__ */ r(bn, { icon: o.icon, active: e.activeTool === o.id, title: n(o.key), onClick: () => a(o.id) }, o.id)) }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-0.5", children: Ta.map((o) => /* @__PURE__ */ r(bn, { icon: o.icon, active: e.activeTool === o.id, title: n(o.key), onClick: () => a(o.id) }, o.id)) })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 rounded-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 px-1.5 py-1 shadow-lg", children: [
      /* @__PURE__ */ r(wn, { children: n("opg.planning") }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ r(
          At,
          {
            active: e.implantPlacementMode,
            label: n("opg.addImplant"),
            title: n("opg.addImplantTitle"),
            onClick: () => t({ type: "SET_IMPLANT_PLACEMENT_MODE", payload: !e.implantPlacementMode })
          }
        ),
        /* @__PURE__ */ r(At, { active: e.anatomyDrawMode === "nerve", label: n("anatomy.nerve"), title: n("anatomy.nerveTitle"), onClick: () => i("nerve") }),
        /* @__PURE__ */ r(At, { active: e.anatomyDrawMode === "sinus", label: n("anatomy.sinus"), title: n("anatomy.sinusTitle"), onClick: () => i("sinus") })
      ] })
    ] })
  ] });
}
function _a() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = e.volumeId;
  if (e.layoutMode === "1x1")
    return a ? /* @__PURE__ */ f("div", { className: "relative w-full h-full", children: [
      e.viewMode === "3D" ? /* @__PURE__ */ r(Ye, { volumeId: a }) : /* @__PURE__ */ r(Be, { orientation: e.viewMode, volumeId: a }),
      e.viewMode === "AXIAL" && /* @__PURE__ */ r(xn, {}),
      /* @__PURE__ */ r(Aa, {})
    ] }) : /* @__PURE__ */ r(St, {});
  if (!a) return /* @__PURE__ */ r(St, {});
  if (e.layoutMode === "2x2")
    return /* @__PURE__ */ f("div", { className: "grid grid-cols-2 grid-rows-2 w-full h-full gap-px bg-gray-700", children: [
      /* @__PURE__ */ r(Be, { orientation: "AXIAL", volumeId: a }),
      /* @__PURE__ */ r(Be, { orientation: "SAGITTAL", volumeId: a }),
      /* @__PURE__ */ r(Be, { orientation: "CORONAL", volumeId: a }),
      /* @__PURE__ */ r(Ye, { volumeId: a })
    ] });
  if (e.layoutMode === "IO3D")
    return /* @__PURE__ */ r(Ye, { volumeId: a });
  if (e.layoutMode === "1+3") {
    const i = (d) => d === "3D" ? /* @__PURE__ */ r(Ye, { volumeId: a }) : /* @__PURE__ */ r(Be, { orientation: d, volumeId: a }), { arrangement: o, grid: s } = e.panel, { big: l, small: c } = $r(e.panel.big, e.panel.small);
    if (s === "2x2") {
      const d = [l, ...c];
      return /* @__PURE__ */ r("div", { className: "grid grid-cols-2 grid-rows-2 w-full h-full gap-px bg-gray-700", children: d.map((p) => /* @__PURE__ */ r("div", { className: "min-w-0 min-h-0", children: i(p) }, p)) });
    }
    return o === "top" ? /* @__PURE__ */ f("div", { className: "flex flex-col w-full h-full gap-px bg-gray-700", children: [
      /* @__PURE__ */ r("div", { className: "flex-1 min-h-0", children: i(l) }, l),
      /* @__PURE__ */ r("div", { className: "h-1/3 flex gap-px min-h-0", children: c.map((d) => /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: i(d) }, d)) })
    ] }) : /* @__PURE__ */ f("div", { className: "flex w-full h-full gap-px bg-gray-700", children: [
      /* @__PURE__ */ r("div", { className: "flex-1 h-full min-w-0", children: i(l) }, l),
      /* @__PURE__ */ r("div", { className: "w-1/3 h-full flex flex-col gap-px", children: c.map((d) => /* @__PURE__ */ r("div", { className: "flex-1 min-h-0", children: i(d) }, d)) })
    ] });
  }
  if (e.layoutMode === "OPG2+1") {
    const i = Vr(e.panel.opgOrder), o = (d, p) => {
      switch (d) {
        case "PANORAMA":
          return /* @__PURE__ */ f("div", { className: "relative w-full h-full", children: [
            /* @__PURE__ */ r(va, { volumeId: a, showCrossSectionLine: !0 }),
            p && /* @__PURE__ */ r(Pa, {})
          ] });
        case "AXIAL":
          return /* @__PURE__ */ f("div", { className: "relative w-full h-full", children: [
            /* @__PURE__ */ r(Be, { orientation: "AXIAL", volumeId: a }),
            /* @__PURE__ */ r(Ia, {}),
            /* @__PURE__ */ r(xn, {})
          ] });
        case "CROSS":
          return /* @__PURE__ */ r(wa, { volumeId: a });
        case "3D":
          return /* @__PURE__ */ r(Ye, { volumeId: a });
      }
    }, s = (d, p) => /* @__PURE__ */ f("div", { className: "relative w-full h-full min-w-0 min-h-0", children: [
      o(d, p === 0),
      p > 0 && /* @__PURE__ */ r(
        "button",
        {
          onClick: () => t({ type: "SET_PANEL", payload: { opgOrder: zr(i, p) } }),
          title: n("view.swapBig"),
          "aria-label": n("view.swapBig"),
          className: "absolute top-1 right-1 z-40 w-6 h-6 flex items-center justify-center rounded bg-slate-900/70 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60 backdrop-blur-sm transition-colors",
          children: /* @__PURE__ */ f("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ r("polyline", { points: "15 3 21 3 21 9" }),
            /* @__PURE__ */ r("polyline", { points: "9 21 3 21 3 15" }),
            /* @__PURE__ */ r("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
            /* @__PURE__ */ r("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
          ] })
        }
      )
    ] }, d), l = s(i[0], 0), c = [1, 2, 3].map((d) => /* @__PURE__ */ r("div", { className: "flex-1 min-w-0 min-h-0", children: s(i[d], d) }, i[d]));
    return e.panel.panoArrangement === "left" ? /* @__PURE__ */ f("div", { className: "flex w-full h-full gap-px bg-gray-700", children: [
      /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: l }),
      /* @__PURE__ */ r("div", { className: "w-1/3 flex flex-col gap-px", children: c })
    ] }) : /* @__PURE__ */ f("div", { className: "flex flex-col w-full h-full gap-px bg-gray-700", children: [
      /* @__PURE__ */ r("div", { className: "flex-1 min-h-0", children: l }),
      /* @__PURE__ */ r("div", { className: "h-1/3 flex gap-px min-h-0", children: c })
    ] });
  }
  return /* @__PURE__ */ r(St, {});
}
const La = 800;
function Mn(e, t) {
  if (!t?.length) return !0;
  for (const n of t)
    if ((e[0] - n.origin[0]) * n.normal[0] + (e[1] - n.origin[1]) * n.normal[1] + (e[2] - n.origin[2]) * n.normal[2] < 0) return !1;
  return !0;
}
function Oa(e, t, n, a) {
  let i = -1 / 0, o = 1 / 0;
  for (let s = 0; s < 3; s++) {
    if (Math.abs(t[s]) < 1e-12) {
      if (e[s] < n[s] || e[s] > a[s]) return null;
      continue;
    }
    const l = 1 / t[s];
    let c = (n[s] - e[s]) * l, d = (a[s] - e[s]) * l;
    if (c > d) {
      const p = c;
      c = d, d = p;
    }
    if (c > i && (i = c), d < o && (o = d), i > o) return null;
  }
  return o < 0 ? null : [Math.max(i, 0), o];
}
function Ra(e) {
  const t = [e.origin[0], e.origin[1], e.origin[2]], n = [
    e.origin[0] + (e.dims[0] - 1) / e.invSx,
    e.origin[1] + (e.dims[1] - 1) / e.invSy,
    e.origin[2] + (e.dims[2] - 1) / e.invSz
  ];
  return [t, n];
}
const Dt = (e, t) => gt(
  e.getVoxel,
  e.dims,
  (t[0] - e.origin[0]) * e.invSx,
  (t[1] - e.origin[1]) * e.invSy,
  (t[2] - e.origin[2]) * e.invSz
);
function $a(e, t, n, a = {}) {
  const i = Math.hypot(n[0], n[1], n[2]);
  if (!Number.isFinite(i) || i < 1e-12) return null;
  const o = [n[0] / i, n[1] / i, n[2] / i], [s, l] = Ra(e), c = Oa(t, o, s, l);
  if (!c) return null;
  const d = a.threshold ?? La, p = Math.min(1 / e.invSx, 1 / e.invSy, 1 / e.invSz), g = a.stepMm ?? Math.max(0.1, p / 2), m = (v) => [t[0] + o[0] * v, t[1] + o[1] * v, t[2] + o[2] * v], [x, I] = c;
  let w = x, P = Mn(m(x), a.clipPlanes);
  if (P && Dt(e, m(x)) >= d) return m(x);
  for (let v = x + g; v <= I; v += g) {
    const h = m(v);
    if (!Mn(h, a.clipPlanes)) {
      w = v, P = !1;
      continue;
    }
    if (Dt(e, h) >= d) {
      if (!P) return h;
      let C = w, k = v;
      for (let O = 0; O < 16; O++) {
        const L = (C + k) / 2;
        Dt(e, m(L)) >= d ? k = L : C = L;
      }
      return m(k);
    }
    w = v, P = !0;
  }
  return null;
}
const Va = {
  threshold: 2200,
  minDiameterMm: 0.8,
  maxDiameterMm: 4.5,
  latticeMm: 0.3,
  maxResults: 12
}, za = Math.sqrt(3 / 5), Wa = 0.62, Ua = 0.92, Gn = (e, t) => gt(
  e.getVoxel,
  e.dims,
  (t[0] - e.origin[0]) * e.invSx,
  (t[1] - e.origin[1]) * e.invSy,
  (t[2] - e.origin[2]) * e.invSz
);
function Ba(e) {
  return [
    [e.origin[0], e.origin[1], e.origin[2]],
    [
      e.origin[0] + (e.dims[0] - 1) / e.invSx,
      e.origin[1] + (e.dims[1] - 1) / e.invSy,
      e.origin[2] + (e.dims[2] - 1) / e.invSz
    ]
  ];
}
const ja = (e, t) => {
  const n = Math.round((t[0] - e.origin[0]) * e.invSx), a = Math.round((t[1] - e.origin[1]) * e.invSy), i = Math.round((t[2] - e.origin[2]) * e.invSz);
  return n < 0 || a < 0 || i < 0 || n >= e.dims[0] || a >= e.dims[1] || i >= e.dims[2] ? -1024 : e.getVoxel(n, a, i);
};
function Fa(e, t, n, a, i) {
  const o = Math.max(3, Math.ceil(2 * n / a) + 1), s = [t[0] - n, t[1] - n, t[2] - n], l = new Uint8Array(o * o * o), c = (A, y, b) => b * o * o + y * o + A;
  for (let A = 0; A < o; A++)
    for (let y = 0; y < o; y++)
      for (let b = 0; b < o; b++)
        Gn(e, [s[0] + b * a, s[1] + y * a, s[2] + A * a]) > i && (l[c(b, y, A)] = 1);
  const d = Math.floor(o / 2);
  let p = -1;
  for (let A = 0; A < d && p < 0; A++)
    for (let y = -A; y <= A && p < 0; y++)
      for (let b = -A; b <= A && p < 0; b++)
        for (let u = -A; u <= A && p < 0; u++) {
          const N = d + u, S = d + b, _ = d + y;
          N < 0 || S < 0 || _ < 0 || N >= o || S >= o || _ >= o || l[c(N, S, _)] === 1 && (p = c(N, S, _));
        }
  if (p < 0) return null;
  const g = new Int32Array(o * o * o);
  let m = 0, x = 0;
  g[x++] = p, l[p] = 2;
  let I = o, w = -1, P = o, v = -1, h = o, D = -1, C = !1;
  for (; m < x; ) {
    const A = g[m++], y = A % o, b = Math.floor(A / o) % o, u = Math.floor(A / (o * o));
    (y === 0 || b === 0 || u === 0 || y === o - 1 || b === o - 1 || u === o - 1) && (C = !0), y < I && (I = y), y > w && (w = y), b < P && (P = b), b > v && (v = b), u < h && (h = u), u > D && (D = u);
    const N = (S, _, z) => {
      if (S < 0 || _ < 0 || z < 0 || S >= o || _ >= o || z >= o) return;
      const U = c(S, _, z);
      l[U] === 1 && (l[U] = 2, g[x++] = U);
    };
    N(y - 1, b, u), N(y + 1, b, u), N(y, b - 1, u), N(y, b + 1, u), N(y, b, u - 1), N(y, b, u + 1);
  }
  if (C) return null;
  const k = x, O = k * a * a * a;
  let L = 0, q = 0, W = 0;
  for (let A = 0; A < k; A++) {
    const y = g[A];
    L += y % o, q += Math.floor(y / o) % o, W += Math.floor(y / (o * o));
  }
  L /= k, q /= k, W /= k;
  let F = 0;
  for (let A = 0; A < k; A++) {
    const y = g[A], b = y % o - L, u = Math.floor(y / o) % o - q, N = Math.floor(y / (o * o)) - W;
    F += (b * b + u * u + N * N) * a * a;
  }
  const j = (w - I + 1) * a, K = (v - P + 1) * a, E = (D - h + 1) * a, T = Math.cbrt(3 * O / (4 * Math.PI));
  return {
    center: [s[0] + L * a, s[1] + q * a, s[2] + W * a],
    volumeMm3: O,
    aspect: Math.max(j, K, E) / Math.max(1e-6, Math.min(j, K, E)),
    radial: Math.sqrt(F / k) / Math.max(1e-9, T)
  };
}
function Ga(e, t = {}) {
  const n = { ...Va, ...t }, a = Math.min(n.latticeMm, n.minDiameterMm / 2), [i, o] = Ba(e), s = [i[0], i[1], Math.max(i[2], t.zRange?.[0] ?? -1 / 0)], l = [o[0], o[1], Math.min(o[2], t.zRange?.[1] ?? 1 / 0)], c = Math.floor((l[0] - s[0]) / a) + 1, d = Math.floor((l[1] - s[1]) / a) + 1, p = Math.floor((l[2] - s[2]) / a) + 1;
  if (c < 2 || d < 2 || p < 2) return [];
  const g = new Uint8Array(c * d * p), m = (k, O, L) => L * c * d + O * c + k;
  for (let k = 0; k < p; k++)
    for (let O = 0; O < d; O++)
      for (let L = 0; L < c; L++)
        ja(e, [s[0] + L * a, s[1] + O * a, s[2] + k * a]) > n.threshold && (g[m(L, O, k)] = 1);
  const x = Math.PI / 6 * n.minDiameterMm ** 3, I = Math.PI / 6 * n.maxDiameterMm ** 3, w = Math.ceil(I * 4 / (a * a * a)) + 64, P = new Int32Array(Math.min(c * d * p, w)), v = n.maxDiameterMm / 2 + 1.5, h = Math.min(0.15, n.minDiameterMm / 5), D = [];
  for (let k = 0; k < p; k++)
    for (let O = 0; O < d; O++)
      for (let L = 0; L < c; L++) {
        if (g[m(L, O, k)] !== 1) continue;
        let q = 0, W = 0;
        P[W++] = m(L, O, k), g[m(L, O, k)] = 2;
        let F = 0, j = 0, K = 0, E = !1;
        for (; q < W; ) {
          const u = P[q++], N = u % c, S = Math.floor(u / c) % d, _ = Math.floor(u / (c * d));
          F += N, j += S, K += _;
          const z = (U, G, ee) => {
            if (U < 0 || G < 0 || ee < 0 || U >= c || G >= d || ee >= p) return;
            const oe = m(U, G, ee);
            if (g[oe] === 1) {
              if (W >= P.length) {
                E = !0;
                return;
              }
              g[oe] = 2, P[W++] = oe;
            }
          };
          z(N - 1, S, _), z(N + 1, S, _), z(N, S - 1, _), z(N, S + 1, _), z(N, S, _ - 1), z(N, S, _ + 1);
        }
        if (E) continue;
        const T = [s[0] + F / W * a, s[1] + j / W * a, s[2] + K / W * a], A = Fa(e, T, v, h, n.threshold);
        if (!A || A.volumeMm3 < x || A.volumeMm3 > I || A.aspect > 2.2 || A.radial < Wa || A.radial > Ua) continue;
        const y = Math.cbrt(3 * A.volumeMm3 / (4 * Math.PI)), b = Ya(e, A.center, y + 2 * h, h, n.threshold);
        D.push({
          center: b.center,
          diameterMm: 2 * y,
          // 1 for a perfect sphere, falling off with both elongation and an
          // unsphere-like spread of material.
          sphericity: Math.max(0, 1 - Math.abs(A.radial - za) / 0.3) / Math.max(1, A.aspect / 1.2),
          meanValue: b.meanValue
        });
      }
  D.sort((k, O) => O.sphericity - k.sphericity);
  const C = [];
  for (const k of D)
    if (C.some((L) => Math.hypot(L.center[0] - k.center[0], L.center[1] - k.center[1], L.center[2] - k.center[2]) < Math.max(0.8, 0.6 * Math.max(L.diameterMm, k.diameterMm))) || C.push(k), C.length >= n.maxResults) break;
  return C;
}
function Ya(e, t, n, a, i) {
  let o = 0, s = 0, l = 0, c = 0, d = 0, p = 0;
  for (let g = -n; g <= n; g += a)
    for (let m = -n; m <= n; m += a)
      for (let x = -n; x <= n; x += a) {
        const I = [t[0] + x, t[1] + m, t[2] + g], w = Gn(e, I);
        if (w <= i) continue;
        const P = w - i;
        o += P, s += P * I[0], l += P * I[1], c += P * I[2], d += w, p++;
      }
  return o <= 0 || p === 0 ? { center: t, meanValue: 0 } : { center: [s / o, l / o, c / o], meanValue: d / p };
}
function Xa(e) {
  if (e.length < 8) return null;
  const t = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], n = [0, 0, 0, 0];
  for (const c of e) {
    const d = [2 * c[0], 2 * c[1], 2 * c[2], 1], p = c[0] * c[0] + c[1] * c[1] + c[2] * c[2];
    for (let g = 0; g < 4; g++) {
      n[g] += d[g] * p;
      for (let m = 0; m < 4; m++) t[g][m] += d[g] * d[m];
    }
  }
  const a = Ha(t, n);
  if (!a) return null;
  const i = [a[0], a[1], a[2]], o = a[3] + i[0] ** 2 + i[1] ** 2 + i[2] ** 2;
  if (!(o > 0)) return null;
  const s = Math.sqrt(o);
  let l = 0;
  for (const c of e) {
    const d = Math.hypot(c[0] - i[0], c[1] - i[1], c[2] - i[2]) - s;
    l += d * d;
  }
  return { center: i, radiusMm: s, rmsMm: Math.sqrt(l / e.length) };
}
function Ha(e, t) {
  const n = t.length, a = e.map((i, o) => [...i, t[o]]);
  for (let i = 0; i < n; i++) {
    let o = i;
    for (let l = i + 1; l < n; l++) Math.abs(a[l][i]) > Math.abs(a[o][i]) && (o = l);
    if (Math.abs(a[o][i]) < 1e-12) return null;
    [a[i], a[o]] = [a[o], a[i]];
    const s = a[i][i];
    for (let l = i; l <= n; l++) a[i][l] /= s;
    for (let l = 0; l < n; l++) {
      if (l === i) continue;
      const c = a[l][i];
      if (c !== 0)
        for (let d = i; d <= n; d++) a[l][d] -= c * a[i][d];
    }
  }
  return a.map((i) => i[n]);
}
function Ka(e, t, n = {}) {
  const a = n.gatherMm ?? 2.2, i = n.minRadiusMm ?? 0.4, o = n.maxRadiusMm ?? 3, s = n.maxRmsMm ?? 0.25, l = [];
  for (const d of e)
    Math.abs(d[0] - t[0]) > a || Math.abs(d[1] - t[1]) > a || Math.abs(d[2] - t[2]) > a || Math.hypot(d[0] - t[0], d[1] - t[1], d[2] - t[2]) <= a && l.push(d);
  const c = Xa(l);
  return !c || c.radiusMm < i || c.radiusMm > o || c.rmsMm > s ? { point: t, snapped: !1 } : Math.hypot(c.center[0] - t[0], c.center[1] - t[1], c.center[2] - t[2]) > o ? { point: t, snapped: !1 } : { point: c.center, snapped: !0, radiusMm: c.radiusMm };
}
function qa(e, t, n, a = 2.5) {
  const i = Math.hypot(n[0], n[1], n[2]);
  if (i < 1e-9) return null;
  const o = [n[0] / i, n[1] / i, n[2] / i];
  let s = null, l = 1 / 0;
  for (const c of e) {
    const d = [c.center[0] - t[0], c.center[1] - t[1], c.center[2] - t[2]], p = d[0] * o[0] + d[1] * o[1] + d[2] * o[2];
    p <= 0 || Math.hypot(d[0] - o[0] * p, d[1] - o[1] * p, d[2] - o[2] * p) > Math.max(a, c.diameterMm) || p < l && (l = p, s = c);
  }
  return s;
}
function kn(e) {
  return e.map((t) => e.map((n) => Math.hypot(t[0] - n[0], t[1] - n[1], t[2] - n[2])));
}
function Ja(e, t, n = 1.5) {
  const a = e.length;
  if (a < 3 || a !== t.length || a > 8) return null;
  const i = kn(e), o = kn(t);
  let s = null, l = 1 / 0;
  const c = [], d = new Array(a).fill(!1), p = (g) => {
    if (g === a) {
      let m = 0, x = 0;
      for (let I = 0; I < a; I++)
        for (let w = I + 1; w < a; w++)
          m += Math.abs(i[I][w] - o[c[I]][c[w]]), x++;
      m /= x, m < l && (l = m, s = [...c]);
      return;
    }
    for (let m = 0; m < a; m++) {
      if (d[m]) continue;
      let x = !0;
      for (let I = 0; I < g && x; I++)
        Math.abs(i[I][g] - o[c[I]][m]) > n * 3 && (x = !1);
      x && (d[m] = !0, c[g] = m, p(g + 1), d[m] = !1);
    }
  };
  return p(0), s && l <= n ? s : null;
}
const Za = { threshold: 3e3, latticeMm: 1, minSiteMm3: 10, maxSites: 8 }, Qa = 20, es = 200;
function ts(e, t = {}) {
  const { threshold: n, latticeMm: a, minSiteMm3: i, maxSites: o } = { ...Za, ...t }, [s, l, c] = e.dims, d = 1 / e.invSx, p = 1 / e.invSy, g = 1 / e.invSz, m = Math.max(1, Math.round(a / d)), x = Math.max(1, Math.round(a / p)), I = Math.max(1, Math.round(a / g)), w = m * d * x * p * I * g, P = Math.ceil(s / m), v = Math.ceil(l / x), h = Math.ceil(c / I), D = new Uint8Array(P * v * h), C = (F, j, K) => (K * v + j) * P + F;
  let k = !1;
  for (let F = 0; F < h; F++)
    for (let j = 0; j < v; j++)
      for (let K = 0; K < P; K++)
        e.getVoxel(K * m, j * x, F * I) > n && (D[C(K, j, F)] = 1, k = !0);
  if (!k) return { volumeMm3: 0, sites: [], severity: "none" };
  const O = new Uint8Array(D.length), L = [];
  let q = 0;
  const W = [];
  for (let F = 0; F < h; F++)
    for (let j = 0; j < v; j++)
      for (let K = 0; K < P; K++) {
        const E = C(K, j, F);
        if (!D[E] || O[E]) continue;
        O[E] = 1, W.push(K, j, F);
        let T = 0, A = 0, y = 0, b = 0;
        for (; W.length; ) {
          const N = W.pop(), S = W.pop(), _ = W.pop();
          T++, A += e.origin[0] + _ * m * d, y += e.origin[1] + S * x * p, b += e.origin[2] + N * I * g;
          for (let z = -1; z <= 1; z++)
            for (let U = -1; U <= 1; U++)
              for (let G = -1; G <= 1; G++) {
                const ee = _ + G, oe = S + U, ae = N + z;
                if (ee < 0 || oe < 0 || ae < 0 || ee >= P || oe >= v || ae >= h) continue;
                const ce = C(ee, oe, ae);
                D[ce] && !O[ce] && (O[ce] = 1, W.push(ee, oe, ae));
              }
        }
        const u = T * w;
        q += u, u >= i && L.push({ center: [A / T, y / T, b / T], volumeMm3: u });
      }
  return L.sort((F, j) => j.volumeMm3 - F.volumeMm3), {
    volumeMm3: q,
    sites: L.slice(0, o),
    severity: q >= es ? "severe" : q >= Qa ? "minor" : "none"
  };
}
function Nn(e) {
  return !Number.isFinite(e) || e > 1 ? "text-red-600 dark:text-red-400" : e > 0.5 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400";
}
const In = (e) => Number.isFinite(e) ? `±${e.toFixed(2)} mm` : "—";
function ns() {
  const { state: e, dispatch: t } = le(), { t: n } = fe(), a = e.registration, i = a ? e.scans.find((u) => u.id === a.scanId) : void 0, [o, s] = Z(null), [l, c] = Z(null), [d, p] = Z(!1), [g, m] = Z(null), [x, I] = Z(null), w = !!a;
  J(() => {
    w && (s(null), c(null), m(null));
  }, [w]), J(() => {
    if (!w || !e.volumeId) {
      I(null);
      return;
    }
    const u = Te(e.volumeId);
    I(u ? ts(u) : null);
  }, [w, e.volumeId]);
  const P = async () => {
    if (e.volumeId) {
      p(!0), m(null);
      try {
        await new Promise((S) => setTimeout(S, 30));
        const u = Te(e.volumeId);
        if (!u) return;
        const N = Ga(u);
        t({ type: "SET_REG_FIDUCIALS", payload: N }), m(N.length ? n("reg.fid.found", { n: N.length }) : n("reg.fid.none"));
      } finally {
        p(!1);
      }
    }
  };
  J(() => {
    if (!a?.picking || !i) return;
    const { slot: u, kind: N } = a.picking, S = ie(se), _ = N === "cbct" ? [Ee, ye] : [ye], z = (G, ee) => {
      const oe = G.canvasToWorld(ee), ae = G.getCamera?.();
      if (!oe || !ae?.position) return null;
      const ce = ae.position, me = [oe[0] - ce[0], oe[1] - ce[1], oe[2] - ce[2]], ke = Math.hypot(me[0], me[1], me[2]) || 1;
      return { origin: ce, dir: [me[0] / ke, me[1] / ke, me[2] / ke] };
    }, U = [];
    for (const G of _) {
      const ee = S?.getViewport(G);
      if (!ee?.element) continue;
      const oe = ee.element, ae = (me) => {
        const ke = oe.getBoundingClientRect(), we = [me.clientX - ke.left, me.clientY - ke.top];
        let Me = null;
        if (N === "cbct" && G === Ee) {
          const de = ee.canvasToWorld(we);
          de && (Me = [de[0], de[1], de[2]]);
        } else if (N === "cbct") {
          const de = z(ee, we), be = e.volumeId ? Te(e.volumeId) : null;
          if (de) {
            const pe = qa(a.fiducials, de.origin, de.dir);
            if (pe) Me = pe.center;
            else if (be) {
              const ve = Dn(An(e.volumeId, be), e.jawSide);
              Me = $a(be, de.origin, de.dir, { clipPlanes: ve ? [ve] : void 0 });
            }
          }
        } else {
          const de = z(ee, we), be = de && Tt(i.id, i.transform), pe = de && be ? fr(de.origin, de.dir, be) : null;
          if (pe && be) {
            const ve = [];
            for (let Ae = 0; Ae < be.length; Ae += 3) ve.push([be[Ae], be[Ae + 1], be[Ae + 2]]);
            Me = Ka(ve, pe).point;
          }
        }
        Me && (me.preventDefault(), me.stopPropagation(), t({ type: "SET_REG_POINT", payload: { slot: u, kind: N, point: Me } }));
      };
      oe.addEventListener("click", ae, !0);
      const ce = oe.style.cursor;
      oe.style.cursor = "crosshair", U.push(() => {
        oe.removeEventListener("click", ae, !0), oe.style.cursor = ce;
      });
    }
    return () => {
      for (const G of U) G();
    };
  }, [a?.picking, i, e.volumeId, e.jawSide, t]);
  const v = i?.id, h = i?.transform, D = je(() => {
    const u = [];
    for (const z of e.implants) {
      const U = ht(e.archCurveControlPoints ?? [], z);
      U && u.push({ target: z.name, point: U.apex });
    }
    if (u.length || !v || !h) return u;
    const N = Tt(v, h);
    if (!N?.length) return u;
    const S = [1 / 0, 1 / 0, 1 / 0], _ = [-1 / 0, -1 / 0, -1 / 0];
    for (let z = 0; z < N.length; z += 3)
      for (let U = 0; U < 3; U++) {
        const G = N[z + U];
        G < S[U] && (S[U] = G), G > _[U] && (_[U] = G);
      }
    for (let z = 0; z < 8; z++)
      u.push({
        target: "",
        point: [z & 1 ? _[0] : S[0], z & 2 ? _[1] : S[1], z & 4 ? _[2] : S[2]]
      });
    return u;
  }, [e.implants, e.archCurveControlPoints, v, h]);
  if (!a || !i) {
    if (o === null) return null;
    const u = o > 1;
    return /* @__PURE__ */ f("div", { className: "absolute top-2 left-12 z-40 w-64 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-xl p-3 space-y-1.5", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ r("span", { className: `text-xs font-semibold font-mono ${u ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`, children: n("reg.rms", { rms: o.toFixed(2) }) }),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => s(null),
            className: "w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 rounded",
            children: "✕"
          }
        )
      ] }),
      l !== null && /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ r("span", { className: "text-[10px] text-gray-500 dark:text-gray-400", children: n("reg.tre.short") }),
        /* @__PURE__ */ r("span", { className: `text-[11px] font-mono font-semibold ${Nn(l)}`, children: In(l) })
      ] }),
      u && /* @__PURE__ */ r("p", { className: "text-[11px] text-red-600 dark:text-red-400", children: n("reg.rmsHigh") })
    ] });
  }
  const C = a.pairs.map((u, N) => ({ ...u, i: N })).filter((u) => u.scan && u.cbct), k = C.length >= Mt, O = () => k ? Jt(
    C.map((u) => u.scan),
    C.map((u) => u.cbct)
  ) : null, L = O(), q = /* @__PURE__ */ new Map();
  if (L)
    for (const u of C) {
      const N = Pt(L.matrix, u.scan), S = u.cbct;
      q.set(u.i, Math.hypot(N[0] - S[0], N[1] - S[1], N[2] - S[2]));
    }
  const W = q.size ? Math.max(...q.values()) : 0, F = L ? Kr(C.map((u) => u.cbct), L.rmsMm, D) : null, j = F?.worstMm ?? null, K = F?.targets[0]?.target ?? "", E = L != null && j != null && Number.isFinite(j) && L.rmsMm <= 1 && j > 3 * Math.max(L.rmsMm, 0.05) && j > 0.5, T = (() => {
    if (C.length < Mt || !L || L.rmsMm < 0.5) return null;
    const u = Ja(
      C.map((S) => S.scan),
      C.map((S) => S.cbct)
    );
    if (!u || u.every((S, _) => S === _)) return null;
    const N = Jt(
      C.map((S) => S.scan),
      u.map((S) => C[S].cbct)
    );
    return N && N.rmsMm < L.rmsMm * 0.6 ? u : null;
  })(), A = (u) => {
    const N = u.map((S) => C[S].cbct);
    C.forEach((S, _) => {
      t({ type: "SET_REG_POINT", payload: { slot: S.i, kind: "cbct", point: N[_] } });
    }), t({ type: "SET_REG_PICKING", payload: null });
  }, y = () => {
    const u = O();
    u && (t({ type: "UPDATE_SCAN", payload: { ...i, transform: Xe(u.matrix, i.transform) } }), s(u.rmsMm), c(j), t({ type: "END_REGISTRATION" }));
  }, b = (u, N, S) => {
    const _ = a.picking?.slot === u && a.picking?.kind === N;
    return /* @__PURE__ */ f(
      "button",
      {
        onClick: () => t({ type: "SET_REG_PICKING", payload: _ ? null : { slot: u, kind: N } }),
        className: `
          flex-1 px-1.5 py-1 text-[11px] rounded transition-colors border
          ${_ ? "bg-dental-600 text-white border-dental-700 animate-pulse" : S ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700" : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"}
        `,
        children: [
          n(N === "scan" ? "reg.scanPoint" : "reg.cbctPoint"),
          " ",
          S ? "✓" : ""
        ]
      }
    );
  };
  return /* @__PURE__ */ f("div", { className: "absolute top-2 left-12 z-40 w-64 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-xl p-3 space-y-2", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ r("span", { className: "text-sm font-bold text-dental-600 dark:text-dental-400", children: n("reg.title") }),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: () => t({ type: "END_REGISTRATION" }),
          className: "w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 rounded",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ r("p", { className: "text-[11px] text-gray-500 dark:text-gray-400", children: n("reg.hint") }),
    x && x.severity !== "none" && /* @__PURE__ */ f("div", { className: `rounded px-2 py-1.5 text-[10px] leading-snug ${x.severity === "severe" ? "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" : "bg-gray-100 text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"}`, children: [
      /* @__PURE__ */ r("span", { className: "font-semibold", children: n("reg.metal.found", { mm3: Math.round(x.volumeMm3), n: x.sites.length }) }),
      " ",
      n(x.severity === "severe" ? "reg.metal.severe" : "reg.metal.minor")
    ] }),
    a.pairs.map((u, N) => {
      const S = q.get(N), _ = S != null && S > 0.8 && S >= W - 1e-9 && W > 0.8;
      return /* @__PURE__ */ f("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ r("span", { className: "text-[11px] font-mono text-gray-500 w-4", children: N + 1 }),
        b(N, "cbct", !!u.cbct),
        b(N, "scan", !!u.scan),
        /* @__PURE__ */ r("span", { className: `w-10 text-right text-[10px] font-mono ${_ ? "text-red-600 dark:text-red-400 font-semibold" : "text-gray-400"}`, children: S != null ? `${S.toFixed(2)}` : "" }),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => t({ type: "REMOVE_REG_PAIR", payload: N }),
            disabled: a.pairs.length <= Mt,
            title: n("reg.removePair"),
            className: "w-4 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 disabled:opacity-0 transition-colors",
            children: /* @__PURE__ */ r("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ r("path", { d: "M6 6l12 12M18 6L6 18", strokeLinecap: "round" }) })
          }
        )
      ] }, N);
    }),
    /* @__PURE__ */ f("div", { className: "flex items-center gap-2 pt-0.5", children: [
      /* @__PURE__ */ r(
        "button",
        {
          onClick: P,
          disabled: d || !e.volumeId,
          title: n("reg.fid.hint"),
          className: "px-2 py-1 text-[11px] rounded bg-dental-600 text-white hover:bg-dental-700 transition-colors disabled:opacity-50",
          children: n(d ? "reg.fid.busy" : "reg.fid.detect")
        }
      ),
      g && /* @__PURE__ */ r("span", { className: "text-[10px] text-gray-500 dark:text-gray-400", children: g })
    ] }),
    T && /* @__PURE__ */ r(
      "button",
      {
        onClick: () => A(T),
        className: "w-full px-2 py-1 text-[11px] rounded bg-amber-500 text-white hover:bg-amber-600 transition-colors",
        children: n("reg.fixOrder")
      }
    ),
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => t({ type: "ADD_REG_PAIR" }),
          disabled: a.pairs.length >= sr,
          title: n("reg.addPairHint"),
          className: "px-2 py-1 text-[11px] rounded border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-40",
          children: [
            "+ ",
            n("reg.addPair")
          ]
        }
      ),
      L && /* @__PURE__ */ r("span", { className: `text-[11px] font-mono ${L.rmsMm > 1 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`, children: n("reg.rms", { rms: L.rmsMm.toFixed(2) }) })
    ] }),
    F && j !== null && /* @__PURE__ */ f("div", { className: "rounded px-2 py-1.5 bg-gray-50 dark:bg-gray-700/50 space-y-1", children: [
      /* @__PURE__ */ f("div", { className: "flex items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ r("span", { className: "text-[10px] leading-tight text-gray-500 dark:text-gray-400", children: n(K ? "reg.tre.atImplant" : "reg.tre.atScan") }),
        /* @__PURE__ */ r("span", { className: `text-[11px] font-mono font-semibold whitespace-nowrap ${Nn(j)}`, children: In(j) })
      ] }),
      K && /* @__PURE__ */ r("p", { className: "text-[10px] font-mono truncate text-gray-400 dark:text-gray-500", title: K, children: n("reg.tre.worst", { name: K }) }),
      F.degenerate ? /* @__PURE__ */ r("p", { className: "text-[10px] leading-snug text-red-600 dark:text-red-400", children: n("reg.tre.collinear") }) : E ? /* @__PURE__ */ r("p", { className: "text-[10px] leading-snug text-amber-700 dark:text-amber-400", children: n("reg.tre.spread") }) : null
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        onClick: y,
        disabled: !k,
        className: `
          w-full px-2 py-1.5 text-xs rounded transition-colors
          ${k ? "bg-dental-600 text-white hover:bg-dental-700" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"}
        `,
        children: n("reg.align")
      }
    )
  ] });
}
const Cn = [Ee, Rt, Ot];
function rs() {
  const { state: e, dispatch: t } = le(), n = ne(e.windowLevel);
  n.current = e.windowLevel;
  const a = ne(!1);
  return J(() => {
    const i = ie(se);
    if (!i) return;
    const { wc: o, ww: s } = e.windowLevel;
    a.current = !0;
    const l = { lower: o - s / 2, upper: o + s / 2 };
    for (const d of Cn) {
      const p = i.getViewport(d);
      try {
        p?.setProperties?.({ voiRange: l }), p?.render?.();
      } catch {
      }
    }
    const c = window.setTimeout(() => {
      a.current = !1;
    }, 60);
    return () => window.clearTimeout(c);
  }, [e.windowLevel.wc, e.windowLevel.ww]), J(() => {
    const i = ie(se);
    if (!i) return;
    const o = [];
    for (const s of Cn) {
      const l = i.getViewport(s), c = l?.element;
      if (!c) continue;
      const d = () => {
        if (a.current) return;
        const p = l.getProperties?.()?.voiRange;
        if (!p) return;
        const g = p.upper - p.lower, m = (p.upper + p.lower) / 2, x = n.current;
        (Math.abs(g - x.ww) > 2 || Math.abs(m - x.wc) > 2) && (a.current = !0, t({ type: "SET_WINDOW_LEVEL", payload: { wc: m, ww: g } }), window.setTimeout(() => {
          a.current = !1;
        }, 60));
      };
      c.addEventListener(ge.Events.VOI_MODIFIED, d), o.push(() => c.removeEventListener(ge.Events.VOI_MODIFIED, d));
    }
    return () => o.forEach((s) => s());
  }, [t, e.volumeId, e.layoutMode]), null;
}
let os = 0;
async function as(e) {
  const t = `${dr}${os++}`, n = await er.createAndCacheVolume(t, { imageIds: e });
  return new Promise((a, i) => {
    n.load((...o) => {
      const s = o[0];
      s && s.success === !1 ? i(new Error(`Failed to load volume frame ${s.imageId ?? ""} — image data could not be read`)) : a(t);
    });
  });
}
function ss(e, t, n, a = 64) {
  const i = Math.max(2, Math.floor(a)), [o, s, l] = e.origin, c = new Array(i);
  for (let d = 0; d < i; d++) {
    const p = d / (i - 1), g = t[0] + (n[0] - t[0]) * p, m = t[1] + (n[1] - t[1]) * p, x = t[2] + (n[2] - t[2]) * p;
    c[d] = gt(
      e.getVoxel,
      e.dims,
      (g - o) * e.invSx,
      (m - s) * e.invSy,
      (x - l) * e.invSz
    );
  }
  return c;
}
function _s({ embedded: e } = {}) {
  const { state: t, dispatch: n } = le(), { t: a } = fe(), i = ne(t.measurements);
  i.current = t.measurements;
  const o = ne(t.volumeId);
  o.current = t.volumeId;
  const s = ne(null), l = ne(null), [c, d] = Z(!1);
  J(() => {
    if (!t.isInitialized) return;
    pt();
    const C = new tr(se);
    return s.current = C, d(!0), () => {
      C.destroy(), s.current = null, d(!1);
    };
  }, [t.isInitialized]), J(() => {
    const C = (W) => {
      const F = o.current;
      if (!F || !W || W.length < 2) return;
      const j = Te(F);
      return j ? ss(j, W[0], W[W.length - 1], 64) : void 0;
    }, k = (W, F) => {
      const j = W?.annotationUID, K = eo[W?.metadata?.toolName];
      if (!j || !K) return;
      const E = i.current.find((b) => b.id === j);
      if (!E && !F) return;
      const { value: T, points: A } = Qr(W), y = K === "length" ? C(A) : void 0;
      if (E) {
        if (E.value === T && !y) return;
        n({
          type: "UPDATE_MEASUREMENT",
          payload: { ...E, value: T ?? E.value, profile: y ?? E.profile }
        });
      } else {
        const b = i.current.filter((u) => u.tool === K).length;
        n({
          type: "ADD_MEASUREMENT",
          payload: { id: j, kind: "annotation", tool: K, name: `${a(`tool.${K}`)} ${b + 1}`, visible: !0, value: T, profile: y }
        });
      }
    }, O = (W) => k(W.detail?.annotation, !0), L = /* @__PURE__ */ new Map(), q = (W) => {
      const F = W.detail?.annotation, j = F?.annotationUID;
      if (!j) return;
      const K = L.get(j);
      K && clearTimeout(K), L.set(j, setTimeout(() => {
        L.delete(j), k(F, !1);
      }, 200));
    };
    return Je.addEventListener(Ze.Events.ANNOTATION_COMPLETED, O), Je.addEventListener(Ze.Events.ANNOTATION_MODIFIED, q), () => {
      Je.removeEventListener(Ze.Events.ANNOTATION_COMPLETED, O), Je.removeEventListener(Ze.Events.ANNOTATION_MODIFIED, q), L.forEach(clearTimeout);
    };
  }, [n, a]);
  const p = !0, g = ne(t.activeSeriesUID);
  g.current = t.activeSeriesUID;
  const [m, x] = Z(0);
  J(() => {
    const C = t.activeSeriesUID;
    if (!C || !t.study || t.volumeId && He.getVolume(t.volumeId) || l.current === C) return;
    const k = t.study.series.find(
      (O) => O.seriesInstanceUID === C
    );
    !k || k.imageIds.length < 3 || (l.current = C, as(k.imageIds).then((O) => {
      if (g.current !== C) {
        l.current = null, x((L) => L + 1);
        return;
      }
      l.current = null, n({ type: "SET_VOLUME_ID", payload: O }), console.log("[DQ-DICOM] Volume created:", O);
    }).catch((O) => {
      l.current = null, console.error("[DQ-DICOM] Volume creation failed:", O), g.current !== C && x((L) => L + 1);
    }));
  }, [p, t.activeSeriesUID, t.study, t.volumeId, m, n]);
  const I = ne(null);
  J(() => {
    if (!c || !t.volumeId || !(t.layoutMode === "1+3" || t.layoutMode === "2x2") || I.current === t.volumeId) return;
    I.current = t.volumeId;
    const k = setTimeout(() => {
      ut("crosshairs"), n({ type: "SET_ACTIVE_TOOL", payload: "crosshairs" });
    }, 300);
    return () => clearTimeout(k);
  }, [c, t.volumeId, t.layoutMode, n]);
  const w = () => {
    try {
      He.purgeCache();
    } catch {
    }
    qr(), mr();
  }, P = ne({ uid: null, volumeId: null });
  J(() => {
    const C = t.study?.studyInstanceUID ?? null, k = P.current;
    P.current = { uid: C, volumeId: t.volumeId }, !(!k.uid || k.uid === C) && (C || w());
  }, [t.study?.studyInstanceUID, t.volumeId]);
  const v = ne(null);
  J(() => (v.current && (clearTimeout(v.current), v.current = null), () => {
    v.current = setTimeout(() => w(), 0);
  }), []);
  const h = t.study?.studyInstanceUID ?? null, D = ne(null);
  return J(() => {
    if (!(!h || D.current === h) && (D.current = h, !(t.implants.length || t.anatomy.length || t.measurements.length)))
      try {
        const C = `rdcv-plan-${h}`;
        localStorage.removeItem(C);
        const k = sessionStorage.getItem(C);
        if (!k) return;
        const O = ir(JSON.parse(k));
        O && n({ type: "LOAD_PLAN", payload: O });
      } catch {
      }
  }, [h, t.implants.length, t.anatomy.length, t.measurements.length, n]), J(() => {
    if (!h) return;
    const C = setTimeout(() => {
      try {
        const k = lr(
          { ...t, report: { ...t.report, patientName: "", patientBirthDate: "" } },
          {
            savedAt: (/* @__PURE__ */ new Date()).toISOString(),
            studyInstanceUID: h,
            patientId: t.study?.patientId ?? null
          }
        );
        sessionStorage.setItem(`rdcv-plan-${h}`, JSON.stringify(k));
      } catch {
      }
    }, 800);
    return () => clearTimeout(C);
  }, [
    h,
    t.implants,
    t.anatomy,
    t.measurements,
    t.archCurveControlPoints,
    t.crossSectionPosition,
    t.crossSectionTiltDeg,
    t.panoramicSlabWidth,
    t.panoramicProjection,
    t.panoramicResolution,
    t.safety,
    t.windowLevel,
    t.report,
    t.study
  ]), /* @__PURE__ */ f("div", { className: "flex h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ r(Ro, { embedded: e }),
    /* @__PURE__ */ f("div", { className: "flex-1 relative overflow-hidden", children: [
      c ? /* @__PURE__ */ r(_a, {}) : /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ r("div", { className: "w-8 h-8 border-4 border-dental-400 border-t-transparent rounded-full animate-spin" }) }),
      /* @__PURE__ */ r(ns, {}),
      c && /* @__PURE__ */ r(rs, {})
    ] })
  ] });
}
export {
  _s as ViewerShell
};
//# sourceMappingURL=ViewerShell-BS1WMwfj.js.map
