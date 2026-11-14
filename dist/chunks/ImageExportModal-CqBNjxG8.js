import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { useMemo as ee, useState as m, useEffect as te } from "react";
import { createPortal as ae } from "react-dom";
import { getRenderingEngine as T, utilities as se } from "@cornerstonejs/core";
import { u as le, a as ie, b as re } from "./index-D9J0-FOS.js";
import { R as q, V as ne, b as oe } from "./constants-DMHmwL7Y.js";
import { c as ce, b as de, d as B, a as me } from "./viewCapture-CEyQDR5u.js";
import { X as pe, a as ge } from "./volume3DPreset-42nWcqi3.js";
import { h as he } from "./archCurve-DCaMAt3K.js";
import { f as R } from "./dicomUtils-BnzdyaEy.js";
function o({ label: p, checked: h, onChange: l }) {
  return /* @__PURE__ */ i("label", { className: "flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none", children: [
    /* @__PURE__ */ t("input", { type: "checkbox", checked: h, onChange: (C) => l(C.target.checked), className: "accent-dental-500 w-3.5 h-3.5" }),
    p
  ] });
}
function Se({ open: p, onClose: h }) {
  const { state: l, dispatch: C } = le(), { t: a } = ie(), { theme: G } = re(), k = ee(() => p ? Array.from(document.querySelectorAll("[data-vp]")).map((e) => ({
    key: e.getAttribute("data-vp") || "",
    title: e.getAttribute("data-vp-title") || e.getAttribute("data-vp") || ""
  })) : [], [p]), [g, A] = m("png"), [N, L] = m(0.92), [E, U] = m(2), [w, I] = m("files"), [$, X] = m(2), [S, P] = m({}), [c, Y] = m({
    name: l.display.showName,
    birth: l.display.showBirth,
    date: l.display.showDate,
    clinic: l.display.showClinic,
    series: !1,
    modality: !1,
    viewTitle: !0,
    orientation: !0,
    slice: !0
  }), [z, F] = m(!0), [_, O] = m(!1);
  if (te(() => {
    p && P(Object.fromEntries(k.map((e) => [e.key, !0])));
  }, [p, k]), !p) return null;
  const J = k.some((e) => e.key === "3D"), d = (e) => Y((s) => ({ ...s, ...e })), V = () => T(q)?.getViewport(oe), K = (e) => {
    C({ type: "SET_DISPLAY", payload: { preset3d: e } });
    const s = V();
    s && ge(s, { preset: e, colormap: l.display.colormap3d, quality: l.display.quality3d, wl: l.windowLevel });
  }, Q = (e) => {
    F(e);
    const s = V();
    if (s?.getActors) {
      for (const r of s.getActors()) typeof r.uid == "string" && r.uid.startsWith("slice3d:") && r.actor?.setVisibility?.(e);
      s.render();
    }
  }, W = (e) => {
    const s = T(q)?.getViewport(ne);
    s?.getSliceIndex && se.scroll(s, { delta: e - s.getSliceIndex() });
  }, H = async () => {
    O(!0);
    try {
      await new Promise((n) => setTimeout(n, 30));
      const e = Array.from(document.querySelectorAll("[data-vp]")), s = l.report, r = l.study, Z = {
        name: s.patientName || r?.patientName || "",
        birth: s.patientBirthDate || r?.patientBirthDate ? R(s.patientBirthDate || r.patientBirthDate) : "",
        date: r?.studyDate ? R(r.studyDate) : "",
        clinic: s.clinic || r?.institution || "",
        series: r?.series.find((n) => n.seriesInstanceUID === l.activeSeriesUID)?.seriesDescription || "",
        modality: r?.series[0]?.modality || "",
        color: l.display.labelColor
      }, v = [], j = [];
      for (const n of e) {
        const x = n.getAttribute("data-vp") || "";
        if (!S[x]) continue;
        const D = await ce(n, E);
        D && (de(D, n, x, c, Z, n.getAttribute("data-vp-title") || x), v.push(D), j.push(n.getAttribute("data-vp-title") || x));
      }
      if (v.length === 0) return;
      const M = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      w === "grid" && v.length > 1 ? B(me(v, $), `views_${M}.${g}`, g, N) : v.forEach((n, x) => B(n, `${(j[x] || "view").replace(/[^\w-]+/g, "_")}_${M}.${g}`, g, N)), h();
    } catch (e) {
      console.error("[image export] failed", e);
    } finally {
      O(!1);
    }
  }, u = ({ title: e, children: s }) => /* @__PURE__ */ i("div", { className: "space-y-2", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: e }),
    s
  ] }), b = "px-3 py-1 text-xs rounded-md border transition-colors", f = "border-dental-500 bg-dental-600 text-white", y = "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
  return ae(
    /* @__PURE__ */ t("div", { className: `dcv-root ${G === "dark" ? "dark" : ""} fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4`, onClick: h, children: /* @__PURE__ */ i(
      "div",
      {
        className: "w-full max-w-md max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-4",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("h2", { className: "text-base font-bold text-slate-800 dark:text-slate-100", children: a("imgexport.title") }),
            /* @__PURE__ */ t("button", { onClick: h, className: "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xl leading-none", children: "×" })
          ] }),
          /* @__PURE__ */ t(u, { title: a("imgexport.format"), children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("button", { className: `${b} ${g === "png" ? f : y}`, onClick: () => A("png"), children: "PNG" }),
            /* @__PURE__ */ t("button", { className: `${b} ${g === "jpg" ? f : y}`, onClick: () => A("jpg"), children: "JPG" }),
            g === "jpg" && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 ml-auto", children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("imgexport.quality") }),
              /* @__PURE__ */ t("input", { type: "range", min: 0.5, max: 1, step: 0.02, value: N, onChange: (e) => L(Number(e.target.value)), className: "w-24 accent-dental-500" }),
              /* @__PURE__ */ i("span", { className: "text-[11px] tabular-nums w-8 text-slate-600 dark:text-slate-300", children: [
                Math.round(N * 100),
                "%"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(u, { title: a("imgexport.resolution"), children: /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [1, 2, 3].map((e) => /* @__PURE__ */ i("button", { className: `${b} ${E === e ? f : y}`, onClick: () => U(e), children: [
            e,
            "×"
          ] }, e)) }) }),
          /* @__PURE__ */ t(u, { title: a("imgexport.views"), children: /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-1.5", children: k.map((e) => /* @__PURE__ */ t(o, { label: e.title, checked: !!S[e.key], onChange: (s) => P((r) => ({ ...r, [e.key]: s })) }, e.key)) }) }),
          J && /* @__PURE__ */ i(u, { title: a("imgexport.threeD"), children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("view3d.preset") }),
              /* @__PURE__ */ i("select", { value: l.display.preset3d, onChange: (e) => K(e.target.value), className: "flex-1 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 px-2 py-1", children: [
                he.map((e) => /* @__PURE__ */ t("option", { value: e.id, children: a(e.labelKey) }, e.id)),
                /* @__PURE__ */ t("option", { value: pe, children: a("preset3d.xray") })
              ] })
            ] }),
            /* @__PURE__ */ t(o, { label: a("view3d.slices"), checked: z, onChange: Q }),
            l.totalSlices > 1 && /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("imgexport.slice") }),
              /* @__PURE__ */ t("input", { type: "range", min: 0, max: l.totalSlices - 1, value: Math.min(l.currentSliceIndex, l.totalSlices - 1), onChange: (e) => W(Number(e.target.value)), className: "flex-1 accent-dental-500" }),
              /* @__PURE__ */ i("span", { className: "text-[11px] tabular-nums text-slate-600 dark:text-slate-300", children: [
                l.currentSliceIndex + 1,
                "/",
                l.totalSlices
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t(u, { title: a("imgexport.content"), children: /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-1.5", children: [
            /* @__PURE__ */ t(o, { label: a("report.patientName"), checked: c.name, onChange: (e) => d({ name: e }) }),
            /* @__PURE__ */ t(o, { label: a("report.birthDate"), checked: c.birth, onChange: (e) => d({ birth: e }) }),
            /* @__PURE__ */ t(o, { label: a("settings.studyDate"), checked: c.date, onChange: (e) => d({ date: e }) }),
            /* @__PURE__ */ t(o, { label: a("settings.clinic"), checked: c.clinic, onChange: (e) => d({ clinic: e }) }),
            /* @__PURE__ */ t(o, { label: a("imgexport.cSeries"), checked: c.series, onChange: (e) => d({ series: e }) }),
            /* @__PURE__ */ t(o, { label: a("imgexport.cModality"), checked: c.modality, onChange: (e) => d({ modality: e }) }),
            /* @__PURE__ */ t(o, { label: a("imgexport.cViewTitle"), checked: c.viewTitle, onChange: (e) => d({ viewTitle: e }) }),
            /* @__PURE__ */ t(o, { label: a("imgexport.cOrientation"), checked: c.orientation, onChange: (e) => d({ orientation: e }) }),
            /* @__PURE__ */ t(o, { label: a("imgexport.cSlice"), checked: c.slice, onChange: (e) => d({ slice: e }) })
          ] }) }),
          /* @__PURE__ */ t(u, { title: a("imgexport.output"), children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("button", { className: `${b} ${w === "files" ? f : y}`, onClick: () => I("files"), children: a("imgexport.files") }),
            /* @__PURE__ */ t("button", { className: `${b} ${w === "grid" ? f : y}`, onClick: () => I("grid"), children: a("imgexport.grid") }),
            w === "grid" && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 ml-auto", children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("imgexport.columns") }),
              /* @__PURE__ */ t("input", { type: "number", min: 1, max: 4, value: $, onChange: (e) => X(Math.max(1, Math.min(4, Number(e.target.value)))), className: "w-12 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 px-2 py-1" })
            ] })
          ] }) }),
          /* @__PURE__ */ i("div", { className: "flex justify-end gap-2 pt-1", children: [
            /* @__PURE__ */ t("button", { onClick: h, className: "px-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700", children: a("common.cancel") }),
            /* @__PURE__ */ t(
              "button",
              {
                onClick: H,
                disabled: _ || !Object.values(S).some(Boolean),
                className: "px-4 py-2 text-xs font-semibold rounded-lg bg-dental-600 text-white hover:bg-dental-700 disabled:opacity-50",
                children: _ ? "…" : a("imgexport.export")
              }
            )
          ] })
        ]
      }
    ) }),
    // Portal into the app root (not document.body) so React event delegation
    // still fires and the theme applies; .dcv-root has no containing block, so
    // `fixed` anchors to the viewport (escaping the top bar's backdrop-filter).
    document.querySelector(".dcv-root") ?? document.body
  );
}
export {
  Se as ImageExportModal
};
//# sourceMappingURL=ImageExportModal-CqBNjxG8.js.map
