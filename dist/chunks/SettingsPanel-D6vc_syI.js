import { jsx as t, jsxs as l, Fragment as v } from "react/jsx-runtime";
import { useState as T } from "react";
import { a as w, u as S, b as P, O as _ } from "./index-D9J0-FOS.js";
import { getRenderingEngine as M } from "@cornerstonejs/core";
import { W as I, h as R, c as A } from "./archCurve-DCaMAt3K.js";
import { R as O } from "./constants-DMHmwL7Y.js";
import { X as W, V as j } from "./volume3DPreset-42nWcqi3.js";
import { A as L } from "./version-rHvkkexl.js";
function $({ vertical: s = !1 }) {
  const { t: r } = w(), { dispatch: a } = S(), b = (c, d) => {
    a({ type: "SET_WINDOW_LEVEL", payload: { wc: c, ww: d } }), M(O)?.getViewports().forEach((N) => {
      if (typeof N.setProperties == "function")
        try {
          N.setProperties({ voiRange: { lower: c - d / 2, upper: c + d / 2 } }), N.render();
        } catch {
        }
    });
  };
  return /* @__PURE__ */ t("div", { className: s ? "flex flex-col gap-1" : "flex gap-1", children: I.map((c) => /* @__PURE__ */ t(
    "button",
    {
      onClick: () => b(c.windowCenter, c.windowWidth),
      className: `
            px-2 py-1 text-xs rounded transition-colors whitespace-nowrap
            bg-gray-200 text-gray-700 hover:bg-gray-300
            dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
            ${s ? "text-left" : ""}
          `,
      title: `WC: ${c.windowCenter} / WW: ${c.windowWidth}`,
      children: r(`preset.${c.key}`)
    },
    c.key
  )) });
}
const F = ["low", "medium", "high"], n = "w-full bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 text-xs rounded-md px-2 py-1.5 border outline-none focus:border-dental-500", V = [
  { name: "Cornerstone3D", url: "https://www.cornerstonejs.org/", desc: "DICOM rendering, MPR & 3D volume" },
  { name: "vtk.js", url: "https://kitware.github.io/vtk.js/", desc: "WebGL 3D mesh actors" },
  { name: "dicom-parser", url: "https://github.com/cornerstonejs/dicomParser", desc: "DICOM P10 parsing" },
  { name: "jsPDF", url: "https://github.com/parallax/jsPDF", desc: "PDF report generation" },
  { name: "manifold-3d", url: "https://github.com/elalish/manifold", desc: "CSG for the drill guide" },
  { name: "React", url: "https://react.dev/", desc: "UI framework" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/", desc: "Styling" },
  { name: "Roboto (Apache-2.0)", url: "https://fonts.google.com/specimen/Roboto", desc: "Embedded PDF font" }
];
function o({ children: s }) {
  return /* @__PURE__ */ t("p", { className: "text-[11px] leading-snug text-slate-500 dark:text-slate-400", children: s });
}
function h({ label: s, children: r }) {
  return /* @__PURE__ */ l("label", { className: "block space-y-1", children: [
    /* @__PURE__ */ t("span", { className: "text-xs font-medium text-slate-600 dark:text-slate-300", children: s }),
    r
  ] });
}
function i({ title: s, children: r }) {
  return /* @__PURE__ */ l("div", { className: "space-y-2", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: s }),
    r
  ] });
}
function Z() {
  const { state: s, dispatch: r } = S(), { t: a } = w(), { theme: b, toggleTheme: c } = P(), [d, y] = T("general");
  if (!(s.activePanel === "settings")) return null;
  const f = () => r({ type: "SET_ACTIVE_PANEL", payload: null }), g = (e) => r({ type: "SET_REPORT", payload: e }), m = (e) => r({ type: "SET_DISPLAY", payload: e }), p = s.display, k = [
    { id: "general", label: a("settings.tab.general") },
    { id: "patient", label: a("settings.tab.patient") },
    { id: "threed", label: a("settings.tab.threed") },
    { id: "panoramic", label: a("settings.tab.panoramic") },
    { id: "implant", label: a("settings.tab.implant") },
    { id: "guide", label: a("settings.guide") },
    { id: "about", label: a("settings.tab.about") }
  ];
  return /* @__PURE__ */ l("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4", onMouseDown: f, children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-[2px]" }),
    /* @__PURE__ */ l(
      "div",
      {
        className: "relative flex w-full max-w-3xl h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900",
        onMouseDown: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ l("div", { className: "w-44 shrink-0 border-r border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60 p-2 space-y-1", children: [
            /* @__PURE__ */ t("div", { className: "px-2 py-1.5 text-sm font-semibold text-dental-600 dark:text-dental-400", children: a("settings.title") }),
            k.map((e) => /* @__PURE__ */ t(
              "button",
              {
                onClick: () => y(e.id),
                className: `w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${d === e.id ? "bg-dental-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`,
                children: e.label
              },
              e.id
            ))
          ] }),
          /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto p-5 space-y-5", children: [
            /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t("h2", { className: "text-base font-semibold text-slate-800 dark:text-slate-100", children: k.find((e) => e.id === d)?.label }),
              /* @__PURE__ */ t("button", { onClick: f, title: a("layers.close"), className: "w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800", children: "✕" })
            ] }),
            d === "general" && /* @__PURE__ */ l(v, { children: [
              /* @__PURE__ */ t(i, { title: a("settings.theme"), children: /* @__PURE__ */ t("div", { className: "flex gap-1", children: ["light", "dark"].map((e) => /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    b !== e && c();
                  },
                  className: `flex-1 px-2 py-1.5 text-xs rounded-md transition-colors ${b === e ? "bg-dental-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: a(`settings.theme.${e}`)
                },
                e
              )) }) }),
              /* @__PURE__ */ l(i, { title: a("settings.onImage"), children: [
                /* @__PURE__ */ t(o, { children: a("settings.help.display") }),
                /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-1.5", children: [
                  ["showName", a("report.patientName")],
                  ["showBirth", a("report.birthDate")],
                  ["showDate", a("settings.studyDate")],
                  ["showClinic", a("settings.clinic")],
                  ["showSeries", a("settings.seriesName")],
                  ["showModality", a("settings.modality")],
                  ["showSlice", a("settings.sliceNumber")]
                ].map(([e, u]) => /* @__PURE__ */ l("label", { className: "flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer", children: [
                  /* @__PURE__ */ t("input", { type: "checkbox", checked: p[e], onChange: (x) => m({ [e]: x.target.checked }), className: "accent-dental-500 w-3.5 h-3.5" }),
                  u
                ] }, e)) }),
                /* @__PURE__ */ l("div", { className: "flex items-center gap-2 pt-1", children: [
                  /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-500", children: a("settings.scope") }),
                  ["main", "all"].map((e) => /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => m({ scope: e }),
                      className: `px-2 py-1 text-[11px] rounded-md transition-colors ${p.scope === e ? "bg-dental-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                      children: a(`settings.scope.${e}`)
                    },
                    e
                  ))
                ] })
              ] }),
              /* @__PURE__ */ l(i, { title: a("settings.labels"), children: [
                /* @__PURE__ */ t(o, { children: a("settings.help.labels") }),
                /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300", children: [
                    a("safety.color"),
                    /* @__PURE__ */ t("input", { type: "color", value: p.labelColor, onChange: (e) => m({ labelColor: e.target.value }), className: "h-6 w-8 rounded border border-slate-300 dark:border-slate-600 bg-transparent cursor-pointer" })
                  ] }),
                  /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300", children: [
                    a("settings.labelMain"),
                    /* @__PURE__ */ t("input", { type: "number", min: 8, max: 40, value: p.labelSizeMain, onChange: (e) => m({ labelSizeMain: Number(e.target.value) }), className: "w-14 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-1 text-xs" })
                  ] }),
                  /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300", children: [
                    a("settings.labelSide"),
                    /* @__PURE__ */ t("input", { type: "number", min: 8, max: 40, value: p.labelSizeSide, onChange: (e) => m({ labelSizeSide: Number(e.target.value) }), className: "w-14 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-1 text-xs" })
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { className: "flex gap-1", children: ["left", "center", "right"].map((e) => /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => m({ labelAlign: e }),
                    className: `flex-1 px-2 py-1 text-xs rounded-md transition-colors ${p.labelAlign === e ? "bg-dental-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                    children: a(`settings.align.${e}`)
                  },
                  e
                )) })
              ] }),
              /* @__PURE__ */ l(i, { title: a("settings.wlPresets"), children: [
                /* @__PURE__ */ t($, { vertical: !0 }),
                /* @__PURE__ */ t(o, { children: a("settings.wlHint") })
              ] })
            ] }),
            d === "threed" && /* @__PURE__ */ l(v, { children: [
              /* @__PURE__ */ l(i, { title: a("settings.default3dPreset"), children: [
                /* @__PURE__ */ t(o, { children: a("settings.help.threed") }),
                /* @__PURE__ */ l("select", { value: p.preset3d, onChange: (e) => m({ preset3d: e.target.value }), className: n, children: [
                  R.map((e) => /* @__PURE__ */ t("option", { value: e.id, children: a(e.labelKey) }, e.id)),
                  /* @__PURE__ */ t("option", { value: W, children: a("preset3d.xray") })
                ] })
              ] }),
              /* @__PURE__ */ t(i, { title: a("view3d.quality"), children: /* @__PURE__ */ t("select", { value: p.quality3d, onChange: (e) => m({ quality3d: e.target.value }), className: n, children: F.map((e) => /* @__PURE__ */ t("option", { value: e, children: a(`quality.${e}`) }, e)) }) }),
              /* @__PURE__ */ t(i, { title: a("view3d.color"), children: /* @__PURE__ */ t("select", { value: p.colormap3d, onChange: (e) => m({ colormap3d: e.target.value }), className: n, children: j.map((e) => /* @__PURE__ */ t("option", { value: e, children: a(`colormap.${e}`) }, e)) }) }),
              /* @__PURE__ */ l(i, { title: a("settings.slice3dOpacity"), children: [
                /* @__PURE__ */ t(o, { children: a("settings.help.sliceOpacity") }),
                /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ t("input", { type: "range", min: 0.05, max: 1, step: 0.05, value: p.sliceOpacity, onChange: (e) => m({ sliceOpacity: Number(e.target.value) }), className: "flex-1 h-1 accent-dental-400" }),
                  /* @__PURE__ */ l("span", { className: "text-xs font-mono text-slate-600 dark:text-slate-300 w-10", children: [
                    Math.round(p.sliceOpacity * 100),
                    "%"
                  ] })
                ] })
              ] })
            ] }),
            d === "patient" && /* @__PURE__ */ l(i, { title: a("settings.report"), children: [
              /* @__PURE__ */ t(o, { children: a("settings.help.patient") }),
              /* @__PURE__ */ t(h, { label: a("report.patientName"), children: /* @__PURE__ */ t("input", { className: n, value: s.report.patientName, onChange: (e) => g({ patientName: e.target.value }) }) }),
              /* @__PURE__ */ t(h, { label: a("report.birthDate"), children: /* @__PURE__ */ t("input", { type: "date", className: n, value: s.report.patientBirthDate, onChange: (e) => g({ patientBirthDate: e.target.value }) }) }),
              /* @__PURE__ */ t(h, { label: a("report.quoteNumber"), children: /* @__PURE__ */ t("input", { className: n, value: s.report.quoteNumber, onChange: (e) => g({ quoteNumber: e.target.value }) }) }),
              /* @__PURE__ */ t(h, { label: a("report.status"), children: /* @__PURE__ */ t("textarea", { rows: 2, className: `${n} resize-none`, value: s.report.statusDescription, onChange: (e) => g({ statusDescription: e.target.value }) }) }),
              /* @__PURE__ */ t("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-1", children: a("settings.onImage") }),
              /* @__PURE__ */ t(o, { children: a("settings.help.overrides") }),
              /* @__PURE__ */ t(h, { label: a("settings.clinic"), children: /* @__PURE__ */ t("input", { className: n, placeholder: s.study?.institution ?? "", value: s.report.clinic, onChange: (e) => g({ clinic: e.target.value }) }) }),
              /* @__PURE__ */ t(h, { label: a("settings.studyDate"), children: /* @__PURE__ */ t("input", { className: n, placeholder: s.study?.studyDate ?? "", value: s.report.studyDate, onChange: (e) => g({ studyDate: e.target.value }) }) }),
              /* @__PURE__ */ t(h, { label: a("settings.seriesName"), children: /* @__PURE__ */ t("input", { className: n, value: s.report.seriesName, onChange: (e) => g({ seriesName: e.target.value }) }) })
            ] }),
            d === "panoramic" && /* @__PURE__ */ l(i, { title: a("settings.opg"), children: [
              /* @__PURE__ */ t(o, { children: a("settings.help.panoramic") }),
              /* @__PURE__ */ l("div", { className: "space-y-1", children: [
                /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ t("span", { className: "text-xs text-slate-600 dark:text-slate-300", children: a("opg.width") }),
                  /* @__PURE__ */ l("span", { className: "text-xs font-mono text-slate-500", children: [
                    s.panoramicSlabWidth,
                    " mm"
                  ] })
                ] }),
                /* @__PURE__ */ t("input", { type: "range", min: 5, max: 50, step: 1, value: s.panoramicSlabWidth, onChange: (e) => r({ type: "SET_PANORAMIC_SLAB", payload: Number(e.target.value) }), className: "w-full h-1 accent-dental-400" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex gap-1", children: ["AVG", "MIP"].map((e) => /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => r({ type: "SET_PANORAMIC_PROJECTION", payload: e }),
                  className: `flex-1 px-2 py-1 text-xs rounded-md transition-colors ${s.panoramicProjection === e ? "bg-dental-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`,
                  children: e
                },
                e
              )) }),
              /* @__PURE__ */ t(h, { label: a("opg.resolution"), children: /* @__PURE__ */ l("select", { value: s.panoramicResolution, onChange: (e) => r({ type: "SET_PANORAMIC_RESOLUTION", payload: Number(e.target.value) }), className: n, children: [
                /* @__PURE__ */ t("option", { value: 0.15, children: "150 µm" }),
                /* @__PURE__ */ t("option", { value: 0.3, children: "300 µm" }),
                /* @__PURE__ */ t("option", { value: 0.45, children: "450 µm" }),
                /* @__PURE__ */ t("option", { value: 0.75, children: "750 µm" }),
                /* @__PURE__ */ t("option", { value: 1, children: "1.0 mm" }),
                /* @__PURE__ */ t("option", { value: 2, children: "2.0 mm" }),
                /* @__PURE__ */ t("option", { value: 3, children: "3.0 mm" }),
                /* @__PURE__ */ t("option", { value: 5, children: "5.0 mm" })
              ] }) })
            ] }),
            d === "implant" && /* @__PURE__ */ l(i, { title: a("settings.safety"), children: [
              /* @__PURE__ */ t(o, { children: a("settings.help.implant") }),
              /* @__PURE__ */ t(h, { label: a("settings.defaultImplant"), children: /* @__PURE__ */ t("select", { value: s.defaultSystemId, onChange: (e) => r({ type: "SET_DEFAULT_SYSTEM", payload: e.target.value }), className: n, children: A.map((e) => /* @__PURE__ */ l("option", { value: e.id, children: [
                e.brand,
                " · ",
                e.line
              ] }, e.id)) }) }),
              /* @__PURE__ */ l("div", { className: "space-y-1", children: [
                /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ t("span", { className: "text-xs text-slate-600 dark:text-slate-300", children: a("safety.margin") }),
                  /* @__PURE__ */ l("span", { className: "text-xs font-mono text-slate-500", children: [
                    s.safety.marginMm,
                    " mm"
                  ] })
                ] }),
                /* @__PURE__ */ t("input", { type: "range", min: 0, max: 5, step: 0.5, value: s.safety.marginMm, onChange: (e) => r({ type: "SET_SAFETY", payload: { marginMm: Number(e.target.value) } }), className: "w-full h-1 accent-dental-400" })
              ] }),
              /* @__PURE__ */ l("label", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ t("span", { className: "text-xs text-slate-600 dark:text-slate-300", children: a("safety.color") }),
                /* @__PURE__ */ t("input", { type: "color", value: s.safety.color, onChange: (e) => r({ type: "SET_SAFETY", payload: { color: e.target.value } }), className: "h-6 w-10 rounded border border-slate-300 dark:border-slate-600 bg-transparent cursor-pointer" })
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[11px] text-slate-500 pt-1", children: a("safety.thresholds") }),
              /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-2", children: [["nerveMm", a("safety.nerve")], ["sinusMm", a("safety.sinus")], ["neighborMm", a("safety.neighbor")]].map(([e, u]) => /* @__PURE__ */ l("label", { className: "space-y-1", children: [
                /* @__PURE__ */ t("span", { className: "block text-[11px] text-slate-600 dark:text-slate-300", children: u }),
                /* @__PURE__ */ t("input", { type: "number", min: 0, max: 10, step: 0.5, value: s.safety[e], onChange: (x) => r({ type: "SET_SAFETY", payload: { [e]: Number(x.target.value) } }), className: n })
              ] }, e)) }),
              /* @__PURE__ */ t(o, { children: a("settings.safetyHint") }),
              /* @__PURE__ */ t(o, { children: a("safety.notChecked") })
            ] }),
            d === "guide" && /* @__PURE__ */ l(i, { title: a("settings.guide"), children: [
              /* @__PURE__ */ t(o, { children: a("settings.help.guide") }),
              /* @__PURE__ */ l("label", { className: "flex items-center gap-2 mb-2 text-[12px] text-slate-700 dark:text-slate-300", children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "checkbox",
                    checked: s.guide.sleeveSeat,
                    onChange: (e) => r({ type: "SET_GUIDE", payload: { sleeveSeat: e.target.checked } })
                  }
                ),
                a("guide.sleeveSeat")
              ] }),
              /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-2", children: [
                ["wallMm", a("guide.wall"), 0.5, 4, 0.1],
                ["baseWidthMm", a("guide.baseWidth"), 2, 10, 0.5],
                ["baseHeightMm", a("guide.baseHeight"), 2, 10, 0.5],
                ["channelTolMm", a("guide.channelTol"), 0, 0.5, 0.05],
                ["seatClearanceMm", a("guide.seatClearance"), 0, 0.5, 0.01],
                ["sleeveWallMm", a("guide.sleeveWall"), 0.3, 2, 0.1]
              ].map(([e, u, x, C, E]) => /* @__PURE__ */ l("label", { className: "space-y-1", children: [
                /* @__PURE__ */ t("span", { className: "block text-[11px] text-slate-600 dark:text-slate-300", children: u }),
                /* @__PURE__ */ t("input", { type: "number", min: x, max: C, step: E, value: s.guide[e], onChange: (D) => r({ type: "SET_GUIDE", payload: { [e]: Number(D.target.value) } }), className: n })
              ] }, e)) }),
              /* @__PURE__ */ t(o, { children: a("guide.seatHint") })
            ] }),
            d === "about" && /* @__PURE__ */ l(v, { children: [
              /* @__PURE__ */ l(i, { title: a("settings.about.contributor"), children: [
                /* @__PURE__ */ l("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: [
                  /* @__PURE__ */ t("span", { className: "font-semibold", children: "Zoltán Dul" }),
                  " (ZoliQua) —",
                  " ",
                  /* @__PURE__ */ t("a", { href: "https://github.com/ZoliQua", target: "_blank", rel: "noreferrer", className: "text-dental-600 dark:text-dental-400 hover:underline", children: "github.com/ZoliQua ↗" })
                ] }),
                /* @__PURE__ */ l("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: [
                  "DenCT v",
                  L,
                  " · MIT ·",
                  " ",
                  /* @__PURE__ */ t("a", { href: "https://github.com/ZoliQua/Dental-CBCT-Viewer", target: "_blank", rel: "noreferrer", className: "text-dental-600 dark:text-dental-400 hover:underline", children: "Repository ↗" })
                ] })
              ] }),
              /* @__PURE__ */ t(i, { title: a("settings.about.builtWith"), children: /* @__PURE__ */ t("ul", { className: "space-y-1.5 text-xs", children: V.map((e) => /* @__PURE__ */ l("li", { children: [
                /* @__PURE__ */ t("a", { href: e.url, target: "_blank", rel: "noreferrer", className: "text-dental-600 dark:text-dental-400 hover:underline font-medium", children: e.name }),
                /* @__PURE__ */ l("span", { className: "text-slate-500 dark:text-slate-400", children: [
                  " — ",
                  e.desc
                ] })
              ] }, e.name)) }) }),
              /* @__PURE__ */ l("div", { className: "space-y-2", children: [
                /* @__PURE__ */ t("p", { className: "text-xs text-slate-600 dark:text-slate-300", children: a("about.otherProjects") }),
                /* @__PURE__ */ t(_, {})
              ] }),
              /* @__PURE__ */ l("p", { className: "text-[11px] text-amber-700 dark:text-amber-300", children: [
                "⚠️ ",
                a("landing.disclaimerShort")
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Z as SettingsPanel
};
//# sourceMappingURL=SettingsPanel-D6vc_syI.js.map
