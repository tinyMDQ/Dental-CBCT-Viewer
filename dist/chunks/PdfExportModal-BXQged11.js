import { jsx as t, jsxs as r, Fragment as V } from "react/jsx-runtime";
import { useMemo as Q, useState as m, useEffect as H } from "react";
import { createPortal as z } from "react-dom";
import { u as B, a as F, b as I } from "./index-Bc8SPET-.js";
import { exportPlanPdf as L } from "./viewerExports-B33A0LLc.js";
function l({ label: d, checked: p, onChange: x }) {
  return /* @__PURE__ */ r("label", { className: "flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none", children: [
    /* @__PURE__ */ t("input", { type: "checkbox", checked: p, onChange: (a) => x(a.target.checked), className: "accent-dental-500 w-3.5 h-3.5" }),
    d
  ] });
}
function W({ open: d, onClose: p }) {
  const { state: x } = B(), { t: a, lang: D } = F(), { theme: q } = I(), g = Q(() => d ? Array.from(document.querySelectorAll("[data-vp]")).map((e) => ({
    key: e.getAttribute("data-vp") || "",
    title: e.getAttribute("data-vp-title") || e.getAttribute("data-vp") || ""
  })) : [], [d]), [o, A] = m({ patientName: !0, studyDate: !0, birth: !0, age: !0, quote: !0, status: !0, clinic: !0 }), [i, P] = m({ views: !0, implants: !0, measurements: !0, safety: !0, boneQuality: !0, disclaimer: !0 }), [f, k] = m(!1), [y, M] = m(2), [v, C] = m({}), [n, O] = m({
    name: !1,
    birth: !1,
    date: !1,
    clinic: !1,
    series: !1,
    modality: !1,
    viewTitle: !0,
    orientation: !0,
    slice: !0
  }), [w, N] = m(!1);
  if (H(() => {
    d && C(Object.fromEntries(g.map((e) => [e.key, !0])));
  }, [d, g]), !d) return null;
  const h = (e) => A((s) => ({ ...s, ...e })), u = (e) => P((s) => ({ ...s, ...e })), c = (e) => O((s) => ({ ...s, ...e })), $ = async () => {
    N(!0);
    try {
      await new Promise((s) => setTimeout(s, 30));
      const e = {
        ...o,
        ...i,
        landscape: f,
        viewsCols: y,
        selectedViews: i.views ? Object.entries(v).filter(([, s]) => s).map(([s]) => s) : [],
        overlays: n
      };
      await L(x, a, D, e), p();
    } catch (e) {
      console.error("[pdf export] failed", e);
    } finally {
      N(!1);
    }
  }, b = ({ title: e, children: s }) => /* @__PURE__ */ r("div", { className: "space-y-2", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: e }),
    s
  ] }), T = "px-3 py-1 text-xs rounded-md border transition-colors", S = "border-dental-500 bg-dental-600 text-white", j = "border-slate-200 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
  return z(
    /* @__PURE__ */ t("div", { className: `dcv-root ${q === "dark" ? "dark" : ""} fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4`, onClick: p, children: /* @__PURE__ */ r(
      "div",
      {
        className: "w-full max-w-md max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-4",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("h2", { className: "text-base font-bold text-slate-800 dark:text-slate-100", children: a("pdfexport.title") }),
            /* @__PURE__ */ t("button", { onClick: p, className: "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xl leading-none", children: "×" })
          ] }),
          /* @__PURE__ */ t(b, { title: a("pdfexport.fields"), children: /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-1.5", children: [
            /* @__PURE__ */ t(l, { label: a("report.patientName"), checked: o.patientName, onChange: (e) => h({ patientName: e }) }),
            /* @__PURE__ */ t(l, { label: a("settings.studyDate"), checked: o.studyDate, onChange: (e) => h({ studyDate: e }) }),
            /* @__PURE__ */ t(l, { label: a("report.birthDate"), checked: o.birth, onChange: (e) => h({ birth: e }) }),
            /* @__PURE__ */ t(l, { label: a("report.patientAge"), checked: o.age, onChange: (e) => h({ age: e }) }),
            /* @__PURE__ */ t(l, { label: a("report.quoteNumber"), checked: o.quote, onChange: (e) => h({ quote: e }) }),
            /* @__PURE__ */ t(l, { label: a("report.status"), checked: o.status, onChange: (e) => h({ status: e }) }),
            /* @__PURE__ */ t(l, { label: a("settings.clinic"), checked: o.clinic, onChange: (e) => h({ clinic: e }) })
          ] }) }),
          /* @__PURE__ */ t(b, { title: a("pdfexport.sections"), children: /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-1.5", children: [
            /* @__PURE__ */ t(l, { label: a("pdf.viewsTitle"), checked: i.views, onChange: (e) => u({ views: e }) }),
            /* @__PURE__ */ t(l, { label: a("pdf.implantsTitle"), checked: i.implants, onChange: (e) => u({ implants: e }) }),
            /* @__PURE__ */ t(l, { label: a("pdf.measurementsTitle"), checked: i.measurements, onChange: (e) => u({ measurements: e }) }),
            /* @__PURE__ */ t(l, { label: a("pdf.safetyTitle"), checked: i.safety, onChange: (e) => u({ safety: e }) }),
            /* @__PURE__ */ t(l, { label: a("bone.title"), checked: i.boneQuality, onChange: (e) => u({ boneQuality: e }) }),
            /* @__PURE__ */ t(l, { label: a("pdfexport.disclaimer"), checked: i.disclaimer, onChange: (e) => u({ disclaimer: e }) })
          ] }) }),
          i.views && g.length > 0 && /* @__PURE__ */ r(V, { children: [
            /* @__PURE__ */ t(b, { title: a("imgexport.views"), children: /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-1.5", children: g.map((e) => /* @__PURE__ */ t(l, { label: e.title, checked: !!v[e.key], onChange: (s) => C((E) => ({ ...E, [e.key]: s })) }, e.key)) }) }),
            /* @__PURE__ */ t(b, { title: a("imgexport.content"), children: /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-1.5", children: [
              /* @__PURE__ */ t(l, { label: a("report.patientName"), checked: n.name, onChange: (e) => c({ name: e }) }),
              /* @__PURE__ */ t(l, { label: a("report.birthDate"), checked: n.birth, onChange: (e) => c({ birth: e }) }),
              /* @__PURE__ */ t(l, { label: a("settings.studyDate"), checked: n.date, onChange: (e) => c({ date: e }) }),
              /* @__PURE__ */ t(l, { label: a("settings.clinic"), checked: n.clinic, onChange: (e) => c({ clinic: e }) }),
              /* @__PURE__ */ t(l, { label: a("imgexport.cSeries"), checked: n.series, onChange: (e) => c({ series: e }) }),
              /* @__PURE__ */ t(l, { label: a("imgexport.cModality"), checked: n.modality, onChange: (e) => c({ modality: e }) }),
              /* @__PURE__ */ t(l, { label: a("imgexport.cViewTitle"), checked: n.viewTitle, onChange: (e) => c({ viewTitle: e }) }),
              /* @__PURE__ */ t(l, { label: a("imgexport.cOrientation"), checked: n.orientation, onChange: (e) => c({ orientation: e }) }),
              /* @__PURE__ */ t(l, { label: a("imgexport.cSlice"), checked: n.slice, onChange: (e) => c({ slice: e }) })
            ] }) })
          ] }),
          /* @__PURE__ */ t(b, { title: a("pdfexport.page"), children: /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ t("button", { className: `${T} ${f ? j : S}`, onClick: () => k(!1), children: a("pdfexport.portrait") }),
            /* @__PURE__ */ t("button", { className: `${T} ${f ? S : j}`, onClick: () => k(!0), children: a("pdfexport.landscape") }),
            i.views && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 ml-auto", children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("imgexport.columns") }),
              /* @__PURE__ */ t("input", { type: "number", min: 1, max: 3, value: y, onChange: (e) => M(Math.max(1, Math.min(3, Number(e.target.value)))), className: "w-12 text-xs rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 px-2 py-1" })
            ] })
          ] }) }),
          /* @__PURE__ */ r("div", { className: "flex justify-end gap-2 pt-1", children: [
            /* @__PURE__ */ t("button", { onClick: p, className: "px-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700", children: a("common.cancel") }),
            /* @__PURE__ */ t("button", { onClick: $, disabled: w, className: "px-4 py-2 text-xs font-semibold rounded-lg bg-dental-600 text-white hover:bg-dental-700 disabled:opacity-50", children: w ? "…" : a("pdfexport.export") })
          ] })
        ]
      }
    ) }),
    document.querySelector(".dcv-root") ?? document.body
  );
}
export {
  W as PdfExportModal
};
//# sourceMappingURL=PdfExportModal-BXQged11.js.map
