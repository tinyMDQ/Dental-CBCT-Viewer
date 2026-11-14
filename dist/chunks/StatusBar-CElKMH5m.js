import { jsxs as c, jsx as a } from "react/jsx-runtime";
import { useState as N, useEffect as V } from "react";
import { getRenderingEngine as g, Enums as f } from "@cornerstonejs/core";
import { u as D, a as L } from "./index-Bc8SPET-.js";
import { b as S, d as C, e as P, V as R, R as w } from "./constants-DMHmwL7Y.js";
import { p as _, q as k } from "./archCurve-DCaMAt3K.js";
const z = {
  AXIAL: R,
  SAGITTAL: P,
  CORONAL: C,
  "3D": S
};
function I(e, t, s) {
  switch (e) {
    case "1x1":
      return t;
    case "1+3":
      return k(s.big, s.small).big;
    case "OPG2+1":
      return _(s.opgOrder)[0];
    case "IO3D":
      return "3D";
    case "2x2":
    default:
      return "AXIAL";
  }
}
function G(e, t, s) {
  const o = I(e, t, s);
  return o === "PANORAMA" || o === "CROSS" ? null : z[o];
}
function T(e) {
  const t = g(w)?.getViewport(e);
  if (t && "getZoom" in t)
    try {
      return t.getZoom();
    } catch {
    }
  return null;
}
function F() {
  const { state: e } = D(), { t } = L(), [s, o] = N(null), m = !!e.study, n = G(e.layoutMode, e.viewMode, e.panel);
  if (V(() => {
    if (o(null), !m || !n) return;
    let r = null;
    const i = () => {
      const u = T(n);
      u != null && o(u);
    }, v = () => {
      const u = g(w)?.getViewport(n);
      return u?.element ? (r = u.element, r.addEventListener(f.Events.CAMERA_MODIFIED, i), i(), !0) : !1;
    };
    let O = 0;
    const d = setInterval(() => {
      (v() || ++O > 40) && clearInterval(d);
    }, 250);
    return v() && clearInterval(d), () => {
      clearInterval(d), r?.removeEventListener(f.Events.CAMERA_MODIFIED, i);
    };
  }, [m, n, e.volumeId]), !e.study) return null;
  const p = e.study.series.find((r) => r.seriesInstanceUID === e.activeSeriesUID) ?? e.study.series[0], b = p?.modality ?? "CT", h = p?.imageCount ?? e.totalSlices, { ww: x, wc: y } = e.windowLevel, A = n ? s != null ? `${Math.round(s * 100)}%` : "—" : t("status.fit"), E = I(e.layoutMode, e.viewMode, e.panel), M = e.layoutMode === "1+3" ? t("layout.view3d") : e.layoutMode === "IO3D" ? t("layout.viewIo3d") : e.layoutMode === "OPG2+1" ? t("layout.panoramic") : e.layoutMode === "2x2" ? t("layout.grid") : t(`view.${String(E).toLowerCase()}`), l = ({ label: r, value: i }) => /* @__PURE__ */ c("span", { className: "whitespace-nowrap", children: [
    /* @__PURE__ */ a("span", { className: "text-slate-400 dark:text-slate-500", children: r }),
    " ",
    /* @__PURE__ */ a("span", { className: "text-slate-600 dark:text-slate-300 tabular-nums", children: i })
  ] });
  return /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-4 px-4 h-7 shrink-0 text-[11px] bg-white/95 border-t border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 backdrop-blur-sm select-none", children: [
    /* @__PURE__ */ c("div", { className: "flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 whitespace-nowrap", children: [
      /* @__PURE__ */ a("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
      /* @__PURE__ */ a("span", { children: t("status.local") })
    ] }),
    /* @__PURE__ */ c("div", { className: "flex items-center gap-4 overflow-x-auto", children: [
      /* @__PURE__ */ a(l, { label: b, value: t("status.images", { n: h }) }),
      /* @__PURE__ */ a(l, { label: "WW/WL", value: `${Math.round(x)}/${Math.round(y)}` }),
      /* @__PURE__ */ a(l, { label: t("status.zoom"), value: A }),
      /* @__PURE__ */ a(l, { label: t("status.mode"), value: M }),
      /* @__PURE__ */ a(l, { label: t("status.tool"), value: t(`tool.${e.activeTool}`) })
    ] })
  ] });
}
export {
  F as StatusBar
};
//# sourceMappingURL=StatusBar-CElKMH5m.js.map
