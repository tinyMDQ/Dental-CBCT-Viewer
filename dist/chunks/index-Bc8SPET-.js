import { jsx as a, jsxs as s, Fragment as U } from "react/jsx-runtime";
import { useReducer as Je, useEffect as L, createContext as fe, useContext as ye, useState as P, useCallback as O, useRef as j, Suspense as pe, lazy as J, forwardRef as Ye, useImperativeHandle as $e } from "react";
import { a as re, q as Ae, p as Pe, D as Qe, G, o as Me, l as Xe, V as et, e as tt, S as me, k as at } from "./archCurve-DCaMAt3K.js";
const nt = ["both", "upper", "lower"], ne = { splitZ: null, hasUpper: !1, hasLower: !1 }, rt = 1500, it = 300, X = 1.5, lt = 4e5;
function st(e, t) {
  const n = new Array(e.length).fill(0), r = Math.floor(t / 2);
  for (let l = 0; l < e.length; l++) {
    let i = 0, p = 0;
    for (let c = -r; c <= r; c++) {
      const f = l + c;
      f >= 0 && f < e.length && (i += e[f], p++);
    }
    n[l] = i / p;
  }
  return n;
}
function ot(e) {
  const [t, n, r] = e.dims;
  if (t < 4 || n < 4 || r < 4) return ne;
  const l = 1 / e.invSz, i = e.origin[2], p = Math.max(4, Math.ceil(r * l / X)), c = new Array(p).fill(0), f = Math.max(1, Math.ceil(Math.cbrt(t * n * r / lt)));
  let y = 0, z = 0;
  for (let h = 0; h < r; h += f) {
    const T = i + h * l, B = Math.min(p - 1, Math.max(0, Math.floor((T - i) / X)));
    for (let E = 0; E < n; E += f)
      for (let q = 0; q < t; q += f) {
        const $ = e.getVoxel(q, E, h);
        $ > rt && c[B]++, $ > it && (y += T, z++);
      }
  }
  if (z === 0) return ne;
  const k = st(c, 3), g = k.reduce((h, T, B) => T > k[h] ? B : h, 0), v = k[g];
  if (v <= 0) return ne;
  const d = Math.ceil(8 / X);
  let w = -1;
  for (let h = 0; h < k.length; h++)
    Math.abs(h - g) < d || (w < 0 || k[h] > k[w]) && (w = h);
  const b = (h) => i + (h + 0.5) * X, u = () => {
    const h = y / z < b(g);
    return { splitZ: null, hasUpper: !h, hasLower: h };
  };
  if (w < 0 || k[w] < v * 0.15) return u();
  const o = Math.min(g, w), S = Math.max(g, w);
  let x = o;
  for (let h = o; h <= S; h++) k[h] < k[x] && (x = h);
  return k[x] > Math.min(v, k[w]) * 0.45 ? u() : { splitZ: b(x), hasUpper: !0, hasLower: !0 };
}
function Ea(e, t) {
  if (t === "both" || e.splitZ == null) return null;
  const n = [0, 0, e.splitZ];
  return t === "upper" ? { origin: n, normal: [0, 0, 1] } : { origin: n, normal: [0, 0, -1] };
}
const Na = (e) => e.splitZ != null && e.hasUpper && e.hasLower, W = /* @__PURE__ */ new Map(), dt = 8;
function La(e, t) {
  if (!t) return ne;
  const n = W.get(e);
  if (n) return n;
  const r = ot(t);
  return W.size >= dt && W.delete(W.keys().next().value), W.set(e, r), r;
}
const Ee = "denct.viewPrefs.v1", ct = ["1x1", "2x2", "1+3", "OPG2+1", "IO3D"], ee = {
  layoutMode: "1+3",
  panel: re,
  sliceAxes: { AXIAL: !0, SAGITTAL: !0, CORONAL: !0 },
  showCrossSection: !0,
  jawSide: "both",
  ioSagittal: !1
}, K = (e, t) => typeof e == "boolean" ? e : t;
function Ne() {
  let e;
  try {
    const i = localStorage.getItem(Ee);
    if (!i) return ee;
    e = JSON.parse(i);
  } catch {
    return ee;
  }
  if (!e || typeof e != "object") return ee;
  const t = e, n = t.panel ?? {}, r = Ae(n.big ?? re.big, n.small ?? re.small), l = t.sliceAxes ?? {};
  return {
    layoutMode: ct.includes(t.layoutMode) ? t.layoutMode : ee.layoutMode,
    panel: {
      big: r.big,
      small: r.small,
      arrangement: n.arrangement === "top" ? "top" : "left",
      grid: n.grid === "2x2" ? "2x2" : "1+3",
      panoArrangement: n.panoArrangement === "top" ? "top" : "left",
      opgOrder: Pe(n.opgOrder)
    },
    sliceAxes: {
      AXIAL: K(l.AXIAL, !0),
      SAGITTAL: K(l.SAGITTAL, !0),
      CORONAL: K(l.CORONAL, !0)
    },
    showCrossSection: K(t.showCrossSection, !0),
    jawSide: nt.includes(t.jawSide) ? t.jawSide : "both",
    ioSagittal: K(t.ioSagittal, !1)
  };
}
function pt(e) {
  try {
    localStorage.setItem(Ee, JSON.stringify({ ...Ne(), ...e }));
  } catch {
  }
}
const D = {
  showName: !0,
  showBirth: !0,
  showDate: !0,
  showClinic: !0,
  labelColor: "#fbbf24",
  labelSizeMain: 18,
  labelSizeSide: 14,
  labelAlign: "center",
  showSeries: !1,
  showModality: !1,
  showSlice: !0,
  scope: "main",
  sliceOpacity: 0.2,
  preset3d: "X-Ray",
  quality3d: "medium",
  colormap3d: "grayscale"
}, xe = 3, mt = 8;
function ut(e, t) {
  const n = /* @__PURE__ */ new Set(), r = e.map((l) => {
    if (!l.fileName) return l;
    const i = t.find((p) => p.fileName === l.fileName && !n.has(p.id));
    return i ? (n.add(i.id), { ...i, id: l.id }) : l;
  });
  for (const l of t) n.has(l.id) || r.push(l);
  return r;
}
const ue = {
  isInitialized: !1,
  isLoading: !1,
  loadProgress: null,
  study: null,
  studies: [],
  studyPlans: {},
  activeSeriesUID: null,
  activeTool: "windowLevel",
  layoutMode: "1+3",
  panel: re,
  volumeId: null,
  viewMode: "AXIAL",
  currentSliceIndex: 0,
  totalSlices: 0,
  error: null,
  archCurveControlPoints: null,
  panoramicSlabWidth: 20,
  panoramicProjection: "AVG",
  panoramicResolution: 0.3,
  crossSectionPosition: 0.5,
  crossSectionTiltDeg: 0,
  implants: [],
  activeImplantId: null,
  implantPlacementMode: !1,
  editingImplantId: null,
  activePanel: null,
  patientOpen: !1,
  toolsOpen: !1,
  layersOpen: !1,
  seriesOpen: !0,
  windowLevel: { wc: 300, ww: 2500 },
  safety: { marginMm: 1, color: "#ff3c3c", nerveMm: 2, sinusMm: 1, neighborMm: 3 },
  guide: { ...G },
  defaultSystemId: Qe,
  jawSide: "both",
  anatomy: [],
  anatomyDrawMode: null,
  activeAnatomyId: null,
  scans: [],
  registration: null,
  // Empty defaults: real DICOM metadata must flow through (consumers fall back
  // to study values via `report?.field?.trim() || study?.field`); placeholders
  // here would override genuine patient data in exports.
  report: { patientName: "", patientAge: "", patientBirthDate: "", quoteNumber: "", statusDescription: "", clinic: "", studyDate: "", seriesName: "" },
  display: D,
  measurements: [],
  planMismatch: !1
}, Le = {
  volumeId: null,
  implants: [],
  anatomy: [],
  measurements: [],
  archCurveControlPoints: null,
  scans: [],
  registration: null,
  activeImplantId: null,
  editingImplantId: null,
  activeAnatomyId: null,
  anatomyDrawMode: null
};
function Se(e, t) {
  const n = new Map(e.map((l) => [l.studyInstanceUID, l])), r = e.map((l) => l.studyInstanceUID);
  for (const l of t)
    n.has(l.studyInstanceUID) || r.push(l.studyInstanceUID), n.set(l.studyInstanceUID, l);
  return r.map((l) => n.get(l));
}
function gt(e) {
  return {
    volumeId: e.volumeId,
    activeSeriesUID: e.activeSeriesUID,
    windowLevel: e.windowLevel,
    implants: e.implants,
    anatomy: e.anatomy,
    measurements: e.measurements,
    archCurveControlPoints: e.archCurveControlPoints,
    scans: e.scans,
    registration: e.registration,
    activeImplantId: e.activeImplantId,
    editingImplantId: e.editingImplantId,
    activeAnatomyId: e.activeAnatomyId,
    anatomyDrawMode: e.anatomyDrawMode
  };
}
function le(e, t, n) {
  const r = e.study?.studyInstanceUID ?? null, l = t.studyInstanceUID, i = {
    ...e,
    studies: n,
    study: t,
    isLoading: !1,
    loadProgress: null,
    planMismatch: !1
  };
  if (r === l) return i;
  const p = r ? { ...e.studyPlans, [r]: gt(e) } : e.studyPlans, c = p[l];
  return c ? { ...i, studyPlans: p, ...c } : { ...i, studyPlans: p, ...Le, activeSeriesUID: t.series[0]?.seriesInstanceUID ?? null };
}
function ht(e, t) {
  switch (t.type) {
    case "SET_INITIALIZED":
      return { ...e, isInitialized: !0 };
    case "SET_LOADING":
      return { ...e, isLoading: t.payload, error: null, loadProgress: null };
    case "SET_LOAD_PROGRESS":
      return { ...e, loadProgress: t.payload };
    case "SET_STUDY":
      return le(e, t.payload, Se(e.studies, [t.payload]));
    case "ADD_STUDIES":
      return t.payload.length === 0 ? e : le(e, t.payload[0], Se(e.studies, t.payload));
    case "SET_ACTIVE_STUDY": {
      if (t.payload === e.study?.studyInstanceUID) return e;
      const n = e.studies.find((r) => r.studyInstanceUID === t.payload);
      return n ? le(e, n, e.studies) : e;
    }
    case "REMOVE_STUDY": {
      const n = t.payload, r = e.studies.filter((f) => f.studyInstanceUID !== n), l = { ...e.studyPlans };
      if (delete l[n], e.study?.studyInstanceUID !== n) return { ...e, studies: r, studyPlans: l };
      if (r.length === 0) return { ...ue, isInitialized: e.isInitialized, display: e.display };
      const i = r[0], p = l[i.studyInstanceUID], c = { ...e, studies: r, studyPlans: l, study: i, planMismatch: !1 };
      return p ? { ...c, ...p } : { ...c, ...Le, activeSeriesUID: i.series[0]?.seriesInstanceUID ?? null };
    }
    case "SET_ACTIVE_SERIES":
      return t.payload === e.activeSeriesUID ? e : {
        ...e,
        activeSeriesUID: t.payload,
        volumeId: null,
        implants: [],
        anatomy: [],
        measurements: [],
        archCurveControlPoints: null,
        activeImplantId: null,
        editingImplantId: null,
        activeAnatomyId: null,
        anatomyDrawMode: null
      };
    case "SET_ACTIVE_TOOL":
      return { ...e, activeTool: t.payload };
    case "SET_LAYOUT_MODE":
      return { ...e, layoutMode: t.payload, viewMode: "AXIAL" };
    case "SET_PANEL": {
      const n = { ...e.panel, ...t.payload }, r = Ae(n.big, n.small);
      return {
        ...e,
        panel: { ...n, big: r.big, small: r.small, opgOrder: Pe(n.opgOrder) }
      };
    }
    case "SET_VOLUME_ID":
      return { ...e, volumeId: t.payload };
    case "SET_VIEW_MODE":
      return { ...e, viewMode: t.payload };
    case "SET_SLICE_INFO":
      return { ...e, currentSliceIndex: t.payload.index, totalSlices: t.payload.total };
    case "SET_ERROR":
      return { ...e, error: t.payload, isLoading: !1, loadProgress: null };
    case "SET_ARCH_CURVE":
      return { ...e, archCurveControlPoints: t.payload };
    case "SET_PANORAMIC_SLAB":
      return { ...e, panoramicSlabWidth: t.payload };
    case "SET_PANORAMIC_PROJECTION":
      return { ...e, panoramicProjection: t.payload };
    case "SET_PANORAMIC_RESOLUTION":
      return { ...e, panoramicResolution: t.payload };
    case "SET_CROSS_SECTION_POSITION":
      return { ...e, crossSectionPosition: t.payload };
    case "SET_CROSS_SECTION_TILT":
      return { ...e, crossSectionTiltDeg: t.payload };
    case "ADD_IMPLANT":
      return { ...e, implants: [...e.implants, t.payload], activeImplantId: t.payload.id };
    case "UPDATE_IMPLANT":
      return { ...e, implants: e.implants.map((n) => n.id === t.payload.id ? t.payload : n) };
    case "REMOVE_IMPLANT":
      return {
        ...e,
        implants: e.implants.filter((n) => n.id !== t.payload),
        activeImplantId: e.activeImplantId === t.payload ? null : e.activeImplantId,
        editingImplantId: e.editingImplantId === t.payload ? null : e.editingImplantId
      };
    case "SET_ACTIVE_IMPLANT":
      return { ...e, activeImplantId: t.payload };
    case "SET_IMPLANT_PLACEMENT_MODE":
      return { ...e, implantPlacementMode: t.payload };
    case "SET_EDITING_IMPLANT":
      return { ...e, editingImplantId: t.payload };
    case "SET_ACTIVE_PANEL":
      return { ...e, activePanel: t.payload };
    case "TOGGLE_PANEL":
      return { ...e, activePanel: e.activePanel === t.payload ? null : t.payload };
    case "TOGGLE_PATIENT":
      return { ...e, patientOpen: !e.patientOpen };
    case "TOGGLE_TOOLS":
      return { ...e, toolsOpen: !e.toolsOpen };
    case "TOGGLE_LAYERS":
      return { ...e, layersOpen: !e.layersOpen };
    case "TOGGLE_SERIES":
      return { ...e, seriesOpen: !e.seriesOpen };
    case "SET_WINDOW_LEVEL":
      return { ...e, windowLevel: t.payload };
    case "SET_SAFETY":
      return { ...e, safety: { ...e.safety, ...t.payload } };
    case "SET_GUIDE":
      return { ...e, guide: { ...e.guide, ...t.payload } };
    case "SET_DEFAULT_SYSTEM":
      return { ...e, defaultSystemId: t.payload };
    case "ADD_ANATOMY":
      return { ...e, anatomy: [...e.anatomy, t.payload], activeAnatomyId: t.payload.id };
    case "UPDATE_ANATOMY":
      return { ...e, anatomy: e.anatomy.map((n) => n.id === t.payload.id ? t.payload : n) };
    case "REMOVE_ANATOMY":
      return {
        ...e,
        anatomy: e.anatomy.filter((n) => n.id !== t.payload),
        activeAnatomyId: e.activeAnatomyId === t.payload ? null : e.activeAnatomyId
      };
    case "SET_ANATOMY_DRAW_MODE":
      return { ...e, anatomyDrawMode: t.payload };
    case "SET_ACTIVE_ANATOMY":
      return { ...e, activeAnatomyId: t.payload };
    case "ADD_SCAN": {
      const n = t.payload.fileName ? e.scans.find((r) => r.fileName === t.payload.fileName && r.id !== t.payload.id) : void 0;
      return n ? {
        ...e,
        scans: e.scans.map((r) => r.id === n.id ? { ...n, id: t.payload.id } : r)
      } : { ...e, scans: [...e.scans, t.payload] };
    }
    case "UPDATE_SCAN":
      return { ...e, scans: e.scans.map((n) => n.id === t.payload.id ? t.payload : n) };
    case "REMOVE_SCAN": {
      const n = e.scans.filter((r) => r.id !== t.payload);
      return {
        ...e,
        scans: n,
        // The IO view has nothing to show once the last arch scan is gone, and
        // its switcher button disappears with it — leave it rather than strand
        // the user in a layout they can no longer navigate back to.
        layoutMode: e.layoutMode === "IO3D" && !n.some((r) => Me(r.type)) ? "1+3" : e.layoutMode,
        registration: e.registration?.scanId === t.payload ? null : e.registration
      };
    }
    case "SET_REG_FIDUCIALS":
      return e.registration ? { ...e, registration: { ...e.registration, fiducials: t.payload } } : e;
    case "ADD_REG_PAIR":
      return !e.registration || e.registration.pairs.length >= mt ? e : {
        ...e,
        registration: { ...e.registration, pairs: [...e.registration.pairs, { scan: null, cbct: null }] }
      };
    case "REMOVE_REG_PAIR": {
      const n = e.registration;
      return !n || n.pairs.length <= xe ? e : {
        ...e,
        registration: {
          ...n,
          pairs: n.pairs.filter((r, l) => l !== t.payload),
          // The picking slot indexes into the array that just changed.
          picking: null
        }
      };
    }
    case "START_REGISTRATION":
      return {
        ...e,
        registration: {
          scanId: t.payload,
          pairs: Array.from({ length: xe }, () => ({ scan: null, cbct: null })),
          fiducials: [],
          picking: null
        }
      };
    case "SET_REG_PICKING":
      return e.registration ? { ...e, registration: { ...e.registration, picking: t.payload } } : e;
    case "SET_REG_POINT": {
      if (!e.registration) return e;
      const n = e.registration.pairs.map((r, l) => l === t.payload.slot ? { ...r, [t.payload.kind]: t.payload.point } : r);
      return { ...e, registration: { ...e.registration, pairs: n, picking: null } };
    }
    case "END_REGISTRATION":
      return { ...e, registration: null };
    case "LOAD_PLAN": {
      const n = t.payload.studyInstanceUID;
      if (n && e.study && n !== e.study.studyInstanceUID)
        return console.warn("[DQ-DICOM] Plan ignored: recorded for a different study", n), { ...e, planMismatch: !0 };
      const { studyInstanceUID: r, ...l } = t.payload;
      return {
        ...e,
        ...l,
        scans: ut(e.scans, l.scans),
        planMismatch: !1,
        activeImplantId: null,
        editingImplantId: null,
        activeAnatomyId: null,
        anatomyDrawMode: null,
        implantPlacementMode: !1
      };
    }
    case "SET_REPORT":
      return { ...e, report: { ...e.report, ...t.payload } };
    case "SET_JAW_SIDE":
      return { ...e, jawSide: t.payload };
    case "SET_DISPLAY":
      return { ...e, display: { ...e.display, ...t.payload } };
    case "ADD_MEASUREMENT":
      return { ...e, measurements: [...e.measurements, t.payload] };
    case "UPDATE_MEASUREMENT":
      return { ...e, measurements: e.measurements.map((n) => n.id === t.payload.id ? t.payload : n) };
    case "REMOVE_MEASUREMENT":
      return { ...e, measurements: e.measurements.filter((n) => n.id !== t.payload) };
    case "RESET":
      return { ...ue, isInitialized: e.isInitialized };
    default:
      return e;
  }
}
const Oe = fe(null);
function ft({ children: e }) {
  const [t, n] = Je(ht, ue, (r) => {
    const l = Ne();
    return { ...r, layoutMode: l.layoutMode, panel: l.panel, jawSide: l.jawSide };
  });
  return L(() => {
    pt({ layoutMode: t.layoutMode, panel: t.panel, jawSide: t.jawSide });
  }, [t.layoutMode, t.panel, t.jawSide]), /* @__PURE__ */ a(Oe.Provider, { value: { state: t, dispatch: n }, children: e });
}
function R() {
  const e = ye(Oe);
  if (!e) throw new Error("useViewer must be used within ViewerProvider");
  return e;
}
const Ie = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "hu", label: "Magyar", flag: "🇭🇺" }
], yt = {
  "app.title": "DenCT",
  "app.initializing": "Initializing DICOM viewer...",
  "app.initError": "Cornerstone initialization error: {msg}",
  "app.retry": "Retry",
  // Landing page
  "landing.infoTitle": "What is this app?",
  "landing.infoBody": "A dental CBCT/CT DICOM viewer for implant planning — load several CTs at once, MPR and true-3D views, panoramic (OPG) reconstruction along the dental arch, tiltable cross-sections, guided implant planning with nerve/sinus/neighbour safety clearances and Misch bone quality, a printable drill-guide (STL) export, and configurable image (PNG/JPG) and PDF report exports — all in four languages.",
  "landing.howTitle": "How to use",
  "landing.how1": "Load a DICOM folder or .dcm files below (GALILEOS and OneVolume folders too); add more CTs later from the Series panel.",
  "landing.how2": "Pick a layout in the top bar — “3D view” combines 3D + MPR, “Panoramic view” shows the panoramic with axial, cross-section and coronal.",
  "landing.how3": "Adjust the red arch curve on the axial view to follow the dental arch.",
  "landing.how4": "Place implants on the cross-section with “+ Implant”, then export a PDF/image or a drill-guide STL.",
  "landing.aboutTitle": "About",
  "landing.aboutBody": "I am Zoltán Dul (ZoliQua), developer of dental software.",
  "landing.aboutBuilt": "Built with React, TypeScript and Cornerstone3D.",
  "landing.fileTypes": "Accepts DICOM (.dcm files or a study/series folder), GALILEOS folder exports (*_vol_0) and OneVolume / Morita CT_0.vol folders — CT / CBCT. Compressed and uncompressed DICOM is supported.",
  "landing.sampleTitle": "Try the sample",
  "landing.sampleDesc": "No scan at hand? Load an anonymized CBCT — on its own, or together with the matching upper and lower intraoral scans.",
  "landing.uploadTitle": "Your DICOM",
  "landing.disclaimerShort": "Reference and demonstration only — not a medical device and not for diagnosis, treatment planning or measurements.",
  "landing.contribute": "If you find it useful, ⭐ star it on GitHub, open a pull request or contribute — feedback is welcome.",
  "about.otherProjects": "You might also like my other dental software:",
  // Marketing landing sections
  "landing.nav.why": "Why",
  "landing.nav.views": "Views",
  "landing.nav.tools": "Tools",
  "landing.nav.presets": "Imaging",
  "landing.nav.privacy": "Privacy",
  "landing.title": "DenCT — The Dental CBCT Viewer",
  "landing.heroSub": "A free CBCT & dental CT viewer — right in your browser. No install, nothing uploaded.",
  "landing.metricViews": "View types",
  "landing.metricFree": "Free & open-source",
  "landing.metricInstall": "Install time",
  "landing.metricPrivate": "Local & private",
  "landing.why.title": "Why this viewer?",
  "landing.why1t": "Free & open-source",
  "landing.why1d": "MIT-licensed and free to use — for study, planning and teaching.",
  "landing.why2t": "Local & private",
  "landing.why2d": "Your scans are processed in the browser and never leave your device.",
  "landing.why3t": "Implant planning",
  "landing.why3d": "Place implants with live nerve, sinus and neighbour safety checks.",
  "landing.why4t": "Guided surgery",
  "landing.why4d": "Export a printable drill-guide (STL) for template-based surgery.",
  "landing.why5t": "Reports & languages",
  "landing.why5d": "Multilingual PDF report export in four languages.",
  "landing.why6t": "Dental-optimized",
  "landing.why6d": "Arch curve, panoramic (OPG) and Misch bone-quality classification.",
  "landing.views.title": "Four ways to look",
  "landing.view2dt": "2D slice view",
  "landing.view2dd": "Browse axial, sagittal, coronal or panoramic slices one at a time, with on-image measurement tools.",
  "landing.view3dt": "3D + MPR view",
  "landing.view3dd": "A true volumetric 3D render linked to MPR, with cutting slice-planes and an adjustable crop box.",
  "landing.viewPanot": "Panoramic (OPG)",
  "landing.viewPanod": "A curved panoramic reconstruction along the dental arch, alongside axial, cross-section and coronal.",
  "landing.tools.title": "Measurement & planning tools",
  "landing.tool1": "Length & angle measurements",
  "landing.tool2": "Per-measurement layers",
  "landing.tool3": "Implant placement",
  "landing.tool4": "Nerve / sinus / neighbour safety",
  "landing.tool5": "Misch bone quality",
  "landing.tool6": "Guided sleeve & drill",
  "landing.tool7": "PDF report export",
  "landing.tool8": "Arch curve & tiltable cross-section",
  "landing.presets.title": "Display & imaging",
  "landing.preset1": "X-ray 3D preset",
  "landing.preset2": "Window / level presets",
  "landing.preset3": "Adjustable slice opacity",
  "landing.preset4": "Cutting slice-planes",
  "landing.preset5": "Crop box",
  "landing.privacy.title": "Private by design",
  "landing.privacy.body": "Everything runs locally in your browser — your DICOM data is never uploaded to any server.",
  "landing.cta.title": "Ready to look inside?",
  "landing.cta.upload": "Load DICOM",
  // Bottom status bar
  "status.local": "Local processing — data is not uploaded",
  "status.images": "{n} images",
  "status.zoom": "Zoom",
  "status.fit": "Fit",
  "status.mode": "Mode",
  "status.tool": "Tool",
  "sample.loading": "Loading sample…",
  // File drop zone
  "drop.title": "Load DICOM files",
  "drop.hint": "Drag DICOM files or a whole folder here — or use the buttons below",
  "drop.chooseFiles": "Choose files",
  "drop.chooseFolder": "Choose folder",
  "layout.configure": "Configure layout",
  "layout.view2d": "2D view",
  "layout.view3d": "3D view",
  "layout.panoramic": "Panoramic view",
  "layout.viewIo3d": "3D IO view",
  "layout.grid": "Grid",
  "layout.arrangement": "Arrangement",
  "layout.arrangeLeft": "Big left",
  "layout.arrangeTop": "Big top",
  "layout.big": "Big panel",
  "layout.small": "Small",
  "landing.starOnGithub": "Star on GitHub",
  "disclaimer.title": "Research use only",
  "disclaimer.text": "This tool is provided for research and demonstration purposes only. It is not certified medical software and must not be used for clinical diagnosis, real treatment planning, or precise measurements. The implant modelling is illustrative only; actual implant placement must not be planned based on it. By using this tool you accept that its developers assume no liability whatsoever for any consequences arising from its use.",
  "disclaimer.agree": "Agree",
  "drop.format": ".dcm files or a DICOM folder",
  "drop.processing": "Processing DICOM files...",
  "drop.files": "{loaded} / {total} files",
  // Series list
  "series.title": "Series ({n})",
  "series.images": "{n} images",
  "series.panel": "Series",
  "series.load": "Load",
  "series.loadScan": "Load scan",
  "series.loadScanBusy": "Loading scan…",
  "series.loadScanHint": "Load one or more surface scans (STL / OBJ / PLY) for the open CT — upper and lower arch are recognised from the file name.",
  "series.triangles": "{n} triangles",
  "scan.notLoaded": "geometry not loaded",
  "scan.reimport": "Registration saved — re-import:",
  "view3d.ioSagittal": "Sagittal slice through the CT — drag to move it along the arch and check the scan sits on the enamel",
  "series.study": "DICOM study",
  "series.remove": "Remove",
  // Errors
  "error.noDicom": "No DICOM files found. Files must have a .dcm extension or no extension.",
  "error.processFailed": "Failed to process the DICOM files.",
  "error.loadError": "Error loading files: {msg}",
  // Tools
  "tool.windowLevel": "W/L",
  "tool.pan": "Pan",
  "tool.zoom": "Zoom",
  "tool.scroll": "Scroll",
  "tool.crosshairs": "Crosshairs",
  "tool.length": "Length",
  "tool.angle": "Angle",
  "tool.ellipse": "Ellipse",
  "tool.circle": "Circle",
  "tool.rectangle": "Rectangle",
  "tool.freehand": "Freehand",
  "tool.bidirectional": "Bidirectional",
  "tool.probe": "HU probe",
  "tool.arrow": "Arrow",
  "toolbar.crosshairsOnlyMulti": "Crosshairs only in multi-view mode (2×2 / 1+3)",
  "toolbar.multiviewAllVisible": "All visible in multi-view mode",
  "toolbar.layout": "Layout: {label}",
  "toolbar.reload": "New load",
  "toolbar.layers": "Layers",
  // View modes
  "view.axial": "Axial",
  "view.swapBig": "Enlarge — swap this view with the main one",
  "view.sagittal": "Sagittal",
  "view.coronal": "Coronal",
  "view.3d": "3D",
  // W/L presets
  "preset.bone": "Bone",
  "preset.soft": "Soft tissue",
  "preset.lung": "Lung",
  "preset.brain": "Brain",
  "preset.dental": "Dental",
  "preset.implant": "Implant",
  "preset3d.bone": "Bone",
  "preset3d.xray": "X-ray",
  "preset3d.bones": "Bone (contrast)",
  "preset3d.dental": "Dental",
  "preset3d.mip": "MIP",
  // OPG controls
  "opg.width": "Width",
  "opg.savePng": "Save PNG",
  "opg.sectionPng": "Section PNG",
  "export.saveImage": "Save Image",
  "common.cancel": "Cancel",
  "imgexport.title": "Save Image",
  "imgexport.format": "Format",
  "imgexport.quality": "Quality",
  "imgexport.resolution": "Resolution",
  "imgexport.views": "Views",
  "imgexport.threeD": "3D view",
  "imgexport.slice": "Slice",
  "imgexport.content": "On-image info",
  "imgexport.output": "Output",
  "imgexport.files": "Separate files",
  "imgexport.grid": "Single grid",
  "imgexport.columns": "Columns",
  "imgexport.export": "Export",
  "imgexport.cSeries": "Series",
  "imgexport.cModality": "Modality",
  "imgexport.cViewTitle": "View name",
  "imgexport.cOrientation": "Orientation (A/P/R/L)",
  "imgexport.cSlice": "Slice number",
  "pdfexport.title": "Save PDF",
  "pdfexport.fields": "Header fields",
  "pdfexport.sections": "Sections",
  "pdfexport.disclaimer": "Disclaimer",
  "pdfexport.page": "Page",
  "pdfexport.portrait": "Portrait",
  "pdfexport.landscape": "Landscape",
  "pdfexport.export": "Save PDF",
  "opg.planning": "Planning",
  "opg.addImplant": "+ Implant",
  "opg.addImplantTitle": "Place an implant on the cross-section",
  // Viewport labels
  "viewport.panorama": "Panorama",
  "viewport.crossSection": "Cross-section",
  "viewport.computing": "Computing...",
  "viewport.tilt": "Tilt: {deg}°",
  "viewport.placeImplantHint": "Click to place implants · Esc to finish",
  "viewport.slices": "slices",
  // Layers panel
  "layers.title": "Layers",
  "layers.addText": "Add text",
  "layers.addImplant": "Add implant",
  "panel.tools": "Tools",
  "chrome.view": "View",
  "layers.implants": "Implants",
  "layers.other": "Other layers",
  "layers.none": "No implants yet — place one on the cross-section with “+ Implant”.",
  "layers.measurements": "Measurements",
  "layers.show": "Show",
  "layers.hide": "Hide",
  "layers.edit": "Edit",
  "layers.delete": "Delete",
  "layers.rename": "Rename",
  "layers.confirmClear": "Delete all measurements?",
  "layers.close": "Close",
  "arch.auto": "Auto arch",
  "arch.autoFailed": "Could not estimate the arch here — scroll the axial view to a slice through the teeth / alveolar ridge and try again.",
  "arch.autoTitle": "Estimate the dental arch from the scan (editable afterwards)",
  // Implant
  "implant.defaultName": "Implant {n}",
  "implant.diameter": "Diameter",
  "implant.length": "Length",
  "implant.blRotation": "B-L rotation",
  "implant.blHint": "Buccolingual rotation in the cross-section plane — ±180°: 0° down (lower jaw), ±180° up (upper jaw)",
  "implant.mdTilt": "M-D tilt",
  "implant.mdHint": "Mesiodistal lean along the arch (panoramic plane)",
  "implant.lowerJaw": "↓ Lower jaw",
  "implant.upperJaw": "↑ Upper jaw",
  "implant.close": "Close",
  "implant.system": "System",
  "guided.title": "Guided surgery",
  "guided.sleeveDiameter": "Sleeve Ø",
  "guided.offset": "Sleeve offset",
  "guided.offsetHint": "Distance from the sleeve bottom to the implant platform along the axis",
  "guided.drillLength": "Drill length",
  "view3d.implant": "Implant",
  "view3d.slices": "Slice planes",
  "view3d.quality": "Quality",
  "view3d.color": "Color",
  "quality.low": "Low",
  "quality.medium": "Medium",
  "quality.high": "High",
  "colormap.grayscale": "Grayscale",
  "colormap.cool": "Cool",
  "colormap.warm": "Warm",
  "colormap.spectral": "Spectral",
  "colormap.inverted": "Inverted",
  "view3d.crop": "Crop",
  "view3d.cropHint": "Trim each side to cut away the volume and reveal the inside.",
  "common.reset": "Reset",
  "view3d.preset": "Preset",
  "view3d.slab": "Slab",
  "common.off": "Off",
  "view3d.sleeve": "Sleeve",
  "view3d.axis": "Axis",
  // Top bar
  "topbar.language": "Language",
  "topbar.theme": "Dark / light mode",
  "topbar.settings": "Settings",
  "topbar.help": "Help",
  "topbar.newLoad": "New load",
  "topbar.patients": "Patients",
  "topbar.intro": "Intro tour",
  "intro.s1t": "Welcome",
  "intro.s1b": "A research CBCT/CT viewer for dental implant planning — MPR, 3D, panoramic reconstruction and guided implants. Not for clinical use.",
  "intro.s2t": "Load a study",
  "intro.s2b": "Drag a DICOM folder onto the start page, or use Choose files / Choose folder. Everything runs locally in your browser.",
  "intro.s3t": "Layouts",
  "intro.s3b": "Switch between the 3D view (3D + MPR with slice planes and crop), the Panoramic view (panoramic + axial, cross-section, coronal) and 1x1. The grid icon configures the panels.",
  "intro.s4t": "Tools & layers",
  "intro.s4b": "The left panel holds the interaction tools (window/level, pan, zoom, measurements) and the layers list for implants, anatomy and scans.",
  "intro.s5t": "Implant planning",
  "intro.s5b": "Place implants on the cross-section, set the sleeve for a guided plan, and watch the safety margins to nerve, sinus and neighbours plus bone quality.",
  "intro.s6t": "Export",
  "intro.s6b": "Export a PDF report with all views, a printable drill guide (STL), or save/load the plan. Settings and Patients are top-right.",
  "intro.skip": "Skip",
  "intro.back": "Back",
  "intro.next": "Next",
  "intro.done": "Got it",
  "newload.loadCtSample": "Load CT sample",
  "newload.loadCtIoSample": "Load CT + IO scan sample",
  "newload.sampleError": "Could not load the sample data.",
  "newload.sampleSoon": "Sample data — coming soon",
  "patients.fileInfo": "Loaded study",
  "patients.patientData": "Patient data",
  "patients.noStudy": "No study loaded.",
  // Settings panel
  "settings.title": "Settings",
  "settings.tab.general": "General",
  "settings.tab.patient": "Patient",
  "settings.tab.panoramic": "Panoramic view",
  "settings.tab.implant": "Implant planning",
  "settings.tab.about": "About & Credits",
  "settings.about.contributor": "Main contributor",
  "settings.about.builtWith": "Built with these open-source libraries",
  "settings.theme": "Theme",
  "settings.theme.light": "Light",
  "settings.theme.dark": "Dark",
  "settings.onImage": "On-image data",
  "report.birthDate": "Birth date",
  "settings.studyDate": "Study date",
  "settings.clinic": "Clinic",
  "settings.labels": "Orientation labels",
  "settings.size": "Size",
  "settings.labelMain": "Main view",
  "settings.labelSide": "Side views",
  "settings.align.left": "Left",
  "settings.align.center": "Center",
  "settings.align.right": "Right",
  "settings.slice3dOpacity": "3D slice opacity",
  "settings.help.display": "Choose which patient/study fields appear over the images.",
  "settings.help.labels": "Color, size and alignment of the Axial/Sagittal/Coronal labels.",
  "settings.help.sliceOpacity": "Transparency of the CT slice planes shown inside the 3D volume.",
  "settings.help.patient": "These fields appear in the exported PDF report.",
  "settings.help.panoramic": "Controls for the panoramic reconstruction (slab, projection, resolution).",
  "settings.help.implant": "Safety margin and minimum clearance to nerve, sinus and neighbouring implants.",
  "settings.help.guide": "Dimensions of the printable surgical guide.",
  "settings.tab.threed": "3D view",
  "settings.default3dPreset": "Default 3D preset",
  "settings.help.threed": "The default volume look for the 3D view and the transparency of the CT slice planes.",
  "settings.seriesName": "Series name",
  "settings.modality": "Modality (CT)",
  "settings.sliceNumber": "Slice number",
  "settings.scope": "Show on:",
  "settings.scope.main": "Main view",
  "settings.scope.all": "All views",
  "settings.help.overrides": "Override the clinic, date and series text shown on the images (blank = use the DICOM value).",
  "settings.defaultImplant": "Default implant type",
  "settings.wlPresets": "Window/Level presets",
  "settings.wlHint": "Applies to all views.",
  "settings.report": "Report details",
  "settings.opg": "Panoramic / cross-section",
  "opg.resolution": "Resolution",
  "settings.safety": "Safety margin",
  "safety.margin": "Margin",
  "safety.color": "Color",
  "safety.thresholds": "Thresholds (mm)",
  "safety.nerve": "Nerve",
  "safety.sinus": "Sinus",
  "safety.neighbor": "Implant",
  "safety.title": "Safety",
  "settings.guide": "Drill guide",
  "guide.wall": "Wall (mm)",
  "guide.baseWidth": "Base width (mm)",
  "guide.baseHeight": "Base height (mm)",
  "guide.channelTol": "Channel tol. (mm)",
  "guide.sleeveSeat": "Metal sleeve seat",
  "guide.seatClearance": "Seat clearance (mm)",
  "guide.sleeveWall": "Sleeve wall (mm)",
  "guide.seatHint": "Cuts a stepped pocket so a real metal drill sleeve drops in and rests on a shoulder (a repeatable drill stop). Off = a plain drill bore. Verify the fit against your sleeve kit on a printed model.",
  "guide.export": "Drill guide (STL)",
  "guide.building": "Building drill guide…",
  "guide.noImplants": "Add at least one guided implant first",
  "guide.warnScan": "The scan is not a watertight surface — the tissue imprint was skipped; the sleeve frame was still exported.",
  "guide.error": "Guide generation failed.",
  "anatomy.nerve": "Nerve",
  "anatomy.sinus": "Sinus",
  "anatomy.nerveTitle": "Trace the nerve canal on the panoramic (Esc to finish)",
  "anatomy.sinusTitle": "Trace the sinus floor on the panoramic (Esc to finish)",
  "layers.anatomy": "Anatomy",
  "pdf.safetyTitle": "Safety summary",
  "report.patientName": "Patient name",
  "report.patientAge": "Age",
  "report.quoteNumber": "Quote no.",
  "report.status": "Status",
  // Help panel
  "help.title": "Help",
  "help.loadTitle": "Loading data",
  "help.loadBody": "Load a DICOM folder or .dcm files from the start screen — GALILEOS and OneVolume/Morita folders are read too. Loaded scans appear in the Series panel on the left; use “+ Load” there to add more CTs and click a study to switch between them, each keeping its own plan.",
  "help.toolsTitle": "Navigation & measurement tools",
  "help.toolsBody": "W/L (window/level) drags brightness/contrast; Pan, Zoom and Scroll navigate the slices. Measurement tools: length, angle, ellipse/circle/rectangle ROI, freehand, bidirectional, HU probe and arrow annotation. Each tool has a keyboard shortcut shown in its tooltip.",
  "help.layoutsTitle": "Layouts",
  "help.layoutsBody": "Switch layout from the top bar: “2D view” (a single slice with on-image tools), “3D view” (a 3D volume with linked axial, sagittal and coronal) and “Panoramic view” (the OPG with axial, cross-section and 3D). In the Panoramic view the ⤢ button in a small pane swaps it into the big slot — press it on the pane that moved out to swap back. The grid icon configures which panels the 3D view shows. The status bar’s Zoom follows the big view.",
  "help.panoramicTitle": "Panoramic (OPG)",
  "help.panoramicBody": "The panoramic image is reconstructed along the red arch curve drawn on the axial view. Drag the blue control points to fit the dental arch; the slab width and projection (AVG/MIP) are set in the toolbar. The yellow horizontal line is the axial slice; drag it to scroll.",
  "help.crossTitle": "Cross-section",
  "help.crossBody": "The cross-section is perpendicular to the arch at the blue line on the panoramic. Drag the line to move along the arch; drag the round handles at its ends to tilt the cut along the arch (±30°).",
  "help.implantTitle": "Implant planning",
  "help.implantBody": "Click “+ Implant” and place the implant on the cross-section. Implants are true 3D bodies: every view shows its own plane intersection — the cross-section highlights the actual cut and keeps a faded ghost grabbable, the panoramic fades with depth, the axial draws the disc where the slice crosses the body. Drag the body to move it (cross-section and panoramic), drag the yellow apex handle to rotate it freely (0° lower jaw, 180° upper jaw). Fine-tune in the layer’s edit popup.",
  "help.layersTitle": "Layers panel",
  "help.layersBody": "The Layers rail on the left lists every implant and measurement — show/hide, edit, rename or delete each. Quick buttons above the list add a text annotation or start implant placement.",
  "help.panelsTitle": "Left panels",
  "help.panelsBody": "The left rail has independent toggles: Patients (loaded-study info and the editable report fields), Series (the tree of loaded CTs), Layers and Tools. Patients and Series share the inner column, Tools and Layers the outer one — open any combination.",
  "help.view3dTitle": "3D view controls",
  "help.view3dBody": "The bar under the 3D view sets the render preset (including the translucent X-ray), the colormap (Grayscale / Cool / Warm / Spectral / Inverted) and the quality — one button that cycles Low → Medium → High (a real sampling difference) — toggles the cutting slice-planes (A/S/C), and offers a crop box and slab thickness. In the Panoramic view the 3D pane keeps only the preset, quality, the axial plane (A) and CS, which shows where the cross-section cuts.",
  "help.exportTitle": "Exporting",
  "help.exportBody": "From the top bar, “Save Image” exports PNG/JPG at a chosen resolution — pick which views, tick the on-image info to burn in, and save as separate files or one grid. “Save PDF” builds a report with toggleable header fields and sections (views, implants, measurements, safety, bone quality) in portrait or landscape. A printable drill-guide (STL) and save/load plan are also here.",
  "help.shortcutsTitle": "Keyboard shortcuts",
  "help.shortcutsBody": "W window/level · P pan · Z zoom · S scroll · X crosshairs · L length · A angle · E ellipse · C circle · R rectangle · F freehand · B bidirectional · H HU probe · N arrow",
  // Toolbar groups & export
  "toolbar.view": "View:",
  "toolbar.tools": "Tools:",
  "export.button": "Export",
  "export.savePdf": "Save PDF",
  "plan.save": "Save plan (JSON)",
  "bone.title": "Bone quality",
  "scan.import": "Import scan",
  "scan.importTitle": "Import a surface scan (STL / OBJ / PLY)",
  "reg.start": "Register",
  "crown.plan": "Plan from crown",
  "crown.planHint": "Suggest an implant from this tooth-setup mesh — its long axis becomes the screw axis (editable afterwards).",
  "crown.needArch": "Draw the dental arch first (open the Panoramic view), then plan from the crown.",
  "crown.failed": "Could not derive an implant from this mesh.",
  "reg.title": "Scan registration",
  "reg.hint": "Pick a CBCT landmark on the Axial slice or straight on the 3D rendering, then the same spot on the 3D scan. Three pairs is the minimum — add more and the click error averages out. Cusp tips work best.",
  "reg.addPair": "Landmark",
  "reg.addPairHint": "Add another landmark pair. More pairs average out the click error — three is the minimum, not the target.",
  "reg.removePair": "Remove this pair",
  "reg.fid.detect": "Detect markers",
  "reg.fid.busy": "Searching…",
  "reg.fid.hint": "Find radiopaque markers in the CT. They are drawn in the 3D view; clicking near one picks its centre, which is far more accurate than clicking a tooth surface.",
  "reg.fid.found": "{n} candidates — confirm by clicking them",
  "reg.fid.none": "No markers found. Was a marker template worn for the scan?",
  "reg.metal.found": "{mm3} mm³ of metal in {n} places.",
  "reg.metal.severe": "Streaking around restorations shifts the apparent tooth surfaces across the whole arch, so matching the scan to them cannot be trusted here. Register on markers, or on landmarks you can identify in both.",
  "reg.metal.minor": "Avoid landmarks close to the restorations — streaking shifts the surfaces around them.",
  "reg.fixOrder": "Markers look mis-paired — fix the order",
  "jaw.both": "Both jaws",
  "jaw.upper": "Upper jaw",
  "jaw.lower": "Lower jaw",
  "jaw.hint": "Show one jaw at a time, cut at the occlusal plane — only offered when the scan holds both.",
  "reg.cbctPoint": "CBCT",
  "reg.scanPoint": "Scan",
  "reg.align": "Align",
  "scan.invalid": "Could not read the mesh file (STL / OBJ / PLY).",
  "layers.scans": "Scans",
  "scan.oral": "Oral scan",
  "scan.upperJaw": "Upper jaw",
  "scan.lowerJaw": "Lower jaw",
  "scan.bite": "Bite",
  "scan.antagonist": "Antagonist",
  "scan.toothSetup": "Tooth setup",
  "scanAdjust.button": "Adjust",
  "scanAdjust.hint": "Correct this scan’s position by hand, on top of the registration.",
  "scanAdjust.move": "Move",
  "scanAdjust.rotate": "Rotate",
  "scanAdjust.reset": "Reset placement",
  "scanAdjust.resetHint": "Back to the position the scan was loaded with.",
  "plan.load": "Load plan",
  "plan.invalid": "Invalid or unreadable plan file.",
  "plan.mismatch": "This plan was saved for a different study. Load it anyway?",
  "pdf.patient": "Patient",
  "pdf.date": "Date",
  "pdf.implantsTitle": "Planned implants",
  "pdf.viewsTitle": "Views",
  "pdf.measurementsTitle": "Measurements",
  "pdf.description": "Implant planning report generated with DenCT.",
  "pdf.guidedLine": "Guided: sleeve Ø{sleeve} mm, offset {offset} mm, drill {drill} mm",
  "pdf.age": "Age",
  "pdf.quote": "Quote no.",
  "pdf.status": "Status",
  // Clinical-safety disclosures (review follow-ups)
  "safety.nerveCaveat": "Distance to the centerline traced on the panoramic — buccolingual position not verified.",
  "safety.notChecked": "Not checked: proximity to teeth/roots, cortical plate perforation, buccolingual nerve position.",
  "settings.safetyHint": "Defaults follow common clinical guidelines (nerve 2 mm, sinus 1 mm, implant 3 mm).",
  "bone.uncalibrated": "uncalibrated CBCT gray values — Misch class is indicative only",
  "measure.panoCaveat": "Horizontal distances follow the arch curve; off-curve structures may be distorted.",
  "reg.rms": "Fit error (RMS): {rms} mm",
  "reg.rmsHigh": "High fit error — re-check the landmark pairs.",
  "reg.tre.atImplant": "Predicted error at the implant",
  "reg.tre.atScan": "Predicted error across the scan",
  "reg.tre.short": "Predicted error at the target",
  "reg.tre.worst": "worst: {name}",
  "reg.tre.collinear": "The markers lie on one line. Rotation about that line is not determined by the fit, so away from it the scan is not held at all — move one marker off the line.",
  "reg.tre.spread": "The residual is small, but the markers sit too close together to hold the far end of the arch. Spreading them out helps more than picking them more carefully.",
  "guide.warnDisconnected": "A sleeve housing is not connected to the base bar — check the implant positions before printing.",
  "guide.confirmNoScan": "No registered intraoral/scan surface loaded — the exported guide will NOT fit any tissue surface. Verify the fit and drill stop on a printed model before any use. Continue?",
  "guideCheck.thinWall": "Housing wall thinner than 1 mm — may be too fragile to print",
  "guideCheck.narrowChannel": "Drill channel narrower than 1.8 mm — the guided drill may not fit",
  "guideCheck.boresClose": "Two drill channels are very close — the wall between them is fragile",
  "guideCheck.drillNerve": "Drill path runs too close to the marked nerve",
  "guideCheck.drillSinus": "Drill path runs too close to the marked sinus",
  "guideCheck.errorIntro": "The guide plan has problems that could make it unsafe or unprintable:",
  "guideCheck.warnIntro": "Please review these guide-plan warnings:",
  "guideCheck.proceed": "Export the guide anyway?",
  "pdf.guideNote": "Drill guide STL: no integrated drill stop, no metal sleeve; verify fit on a printed model before clinical use.",
  "pdf.reportOverride": "report: {value}",
  "pdf.boneCaveat": "CBCT gray values (GV) are uncalibrated — the Misch class is indicative only."
}, bt = {
  "app.title": "DenCT",
  "app.initializing": "DICOM-Viewer wird initialisiert...",
  "app.initError": "Cornerstone-Initialisierungsfehler: {msg}",
  "app.retry": "Erneut versuchen",
  "landing.infoTitle": "Was ist diese App?",
  "landing.infoBody": "Ein dentaler CBCT/CT-DICOM-Viewer für die Implantatplanung — mehrere CTs gleichzeitig laden, MPR- und echte 3D-Ansichten, Panorama-Rekonstruktion (OPG) entlang des Zahnbogens, kippbare Querschnitte, geführte Implantatplanung mit Sicherheitsabständen zu Nerv/Sinus/Nachbar und Misch-Knochenqualität, druckbarer Bohrschablonen-Export (STL) sowie konfigurierbarer Bild- (PNG/JPG) und PDF-Bericht-Export — alles in vier Sprachen.",
  "landing.howTitle": "Bedienung",
  "landing.how1": "DICOM-Ordner oder .dcm-Dateien unten laden (auch GALILEOS- und OneVolume-Ordner); weitere CTs später im Serien-Panel hinzufügen.",
  "landing.how2": "Layout in der oberen Leiste wählen — „3D-Ansicht“ kombiniert 3D + MPR, „Panorama-Ansicht“ zeigt Panorama mit Axial, Querschnitt und Koronal.",
  "landing.how3": "Die rote Bogenkurve in der Axialansicht an den Zahnbogen anpassen.",
  "landing.how4": "Implantate mit „+ Implantat“ im Querschnitt platzieren, dann PDF/Bild oder Bohrschablone (STL) exportieren.",
  "landing.aboutTitle": "Über",
  "landing.aboutBody": "Ich bin Zoltán Dul (ZoliQua), Entwickler von Dental-Software.",
  "landing.aboutBuilt": "Erstellt mit React, TypeScript und Cornerstone3D.",
  "landing.fileTypes": "Akzeptiert DICOM (.dcm oder ein Studien-/Serienordner), GALILEOS-Ordner-Exporte (*_vol_0) und OneVolume-/Morita-CT_0.vol-Ordner — CT / CBCT. Komprimiertes und unkomprimiertes DICOM wird unterstützt.",
  "landing.sampleTitle": "Beispiel testen",
  "landing.sampleDesc": "Kein Scan zur Hand? Laden Sie ein anonymisiertes CBCT — allein oder zusammen mit den passenden intraoralen Ober- und Unterkiefer-Scans.",
  "landing.uploadTitle": "Ihr DICOM",
  "landing.disclaimerShort": "Nur zu Referenz- und Demonstrationszwecken — kein Medizinprodukt und nicht für Diagnose, Behandlungsplanung oder Messungen.",
  "landing.contribute": "Wenn es Ihnen nützt, ⭐ vergeben Sie einen Stern auf GitHub, öffnen Sie einen Pull Request oder tragen Sie bei — Feedback ist willkommen.",
  "about.otherProjects": "Vielleicht gefällt Ihnen auch meine andere Dental-Software:",
  // Marketing landing sections
  "landing.nav.why": "Warum",
  "landing.nav.views": "Ansichten",
  "landing.nav.tools": "Werkzeuge",
  "landing.nav.presets": "Bildgebung",
  "landing.nav.privacy": "Datenschutz",
  "landing.title": "DenCT — Der Dental-CBCT-Viewer",
  "landing.heroSub": "Ein kostenloser CBCT- & Dental-CT-Viewer — direkt im Browser. Keine Installation, nichts wird hochgeladen.",
  "landing.metricViews": "Ansichtstypen",
  "landing.metricFree": "Kostenlos & Open Source",
  "landing.metricInstall": "Installationszeit",
  "landing.metricPrivate": "Lokal & privat",
  "landing.why.title": "Warum dieser Viewer?",
  "landing.why1t": "Kostenlos & Open Source",
  "landing.why1d": "MIT-lizenziert und kostenlos — für Studium, Planung und Lehre.",
  "landing.why2t": "Lokal & privat",
  "landing.why2d": "Ihre Aufnahmen werden im Browser verarbeitet und verlassen Ihr Gerät nie.",
  "landing.why3t": "Implantatplanung",
  "landing.why3d": "Implantate mit Live-Sicherheitsabständen zu Nerv, Sinus und Nachbar setzen.",
  "landing.why4t": "Geführte Chirurgie",
  "landing.why4d": "Druckbare Bohrschablone (STL) für die schablonengeführte Chirurgie exportieren.",
  "landing.why5t": "Berichte & Sprachen",
  "landing.why5d": "Mehrsprachiger PDF-Bericht-Export in vier Sprachen.",
  "landing.why6t": "Dental-optimiert",
  "landing.why6d": "Bogenkurve, Panorama (OPG) und Misch-Knochenqualität.",
  "landing.views.title": "Vier Blickwinkel",
  "landing.view2dt": "2D-Schichtansicht",
  "landing.view2dd": "Axiale, sagittale, koronale oder Panorama-Schichten einzeln durchsehen — mit Messwerkzeugen im Bild.",
  "landing.view3dt": "3D- + MPR-Ansicht",
  "landing.view3dd": "Echte volumetrische 3D-Darstellung, mit MPR verknüpft, mit Schnittebenen und verstellbarer Zuschneidebox.",
  "landing.viewPanot": "Panorama (OPG)",
  "landing.viewPanod": "Gekrümmte Panorama-Rekonstruktion entlang des Zahnbogens, neben Axial, Querschnitt und Koronal.",
  "landing.tools.title": "Mess- & Planungswerkzeuge",
  "landing.tool1": "Längen- & Winkelmessungen",
  "landing.tool2": "Ebenen je Messung",
  "landing.tool3": "Implantatplatzierung",
  "landing.tool4": "Sicherheit Nerv / Sinus / Nachbar",
  "landing.tool5": "Misch-Knochenqualität",
  "landing.tool6": "Geführte Hülse & Bohrer",
  "landing.tool7": "PDF-Bericht-Export",
  "landing.tool8": "Bogenkurve & kippbarer Querschnitt",
  "landing.presets.title": "Darstellung & Bildgebung",
  "landing.preset1": "Röntgen-3D-Voreinstellung",
  "landing.preset2": "Fenster-/Level-Voreinstellungen",
  "landing.preset3": "Verstellbare Schicht-Deckkraft",
  "landing.preset4": "Schnittebenen",
  "landing.preset5": "Zuschneidebox",
  "landing.privacy.title": "Privat by Design",
  "landing.privacy.body": "Alles läuft lokal in Ihrem Browser — Ihre DICOM-Daten werden nie auf einen Server hochgeladen.",
  "landing.cta.title": "Bereit für den Blick ins Innere?",
  "landing.cta.upload": "DICOM laden",
  // Bottom status bar
  "status.local": "Lokale Verarbeitung — Daten werden nicht hochgeladen",
  "status.images": "{n} Bilder",
  "status.zoom": "Zoom",
  "status.fit": "Einpassen",
  "status.mode": "Modus",
  "status.tool": "Werkzeug",
  "sample.loading": "Beispiel wird geladen…",
  "drop.title": "DICOM-Dateien laden",
  "drop.hint": "DICOM-Dateien oder einen ganzen Ordner hierher ziehen — oder die Schaltflächen unten nutzen",
  "drop.chooseFiles": "Dateien wählen",
  "drop.chooseFolder": "Ordner wählen",
  "layout.configure": "Layout konfigurieren",
  "layout.view2d": "2D-Ansicht",
  "layout.view3d": "3D-Ansicht",
  "layout.panoramic": "Panorama-Ansicht",
  "layout.viewIo3d": "3D-IO-Ansicht",
  "layout.grid": "Raster",
  "layout.arrangement": "Anordnung",
  "layout.arrangeLeft": "Groß links",
  "layout.arrangeTop": "Groß oben",
  "layout.big": "Großes Panel",
  "layout.small": "Klein",
  "landing.starOnGithub": "Auf GitHub favorisieren",
  "disclaimer.title": "Nur zu Forschungszwecken",
  "disclaimer.text": "Dieses Werkzeug dient ausschließlich Forschungs- und Demonstrationszwecken. Es ist keine zertifizierte medizinische Software und darf nicht für klinische Diagnosen, echte Behandlungsplanung oder präzise Messungen verwendet werden. Die Implantatmodellierung ist rein illustrativ; eine tatsächliche Implantatplanung darf darauf nicht gestützt werden. Mit der Nutzung akzeptieren Sie, dass die Entwickler keinerlei Haftung für Folgen der Nutzung übernehmen.",
  "disclaimer.agree": "Zustimmen",
  "drop.format": ".dcm-Dateien oder ein DICOM-Ordner",
  "drop.processing": "DICOM-Dateien werden verarbeitet...",
  "drop.files": "{loaded} / {total} Dateien",
  "series.title": "Serien ({n})",
  "series.images": "{n} Bilder",
  "series.panel": "Serien",
  "series.load": "Laden",
  "series.loadScan": "Scan laden",
  "series.loadScanBusy": "Scan wird geladen…",
  "series.loadScanHint": "Einen oder mehrere Oberflächenscans (STL / OBJ / PLY) zum geöffneten CT laden — Ober- und Unterkiefer werden am Dateinamen erkannt.",
  "series.triangles": "{n} Dreiecke",
  "scan.notLoaded": "Geometrie nicht geladen",
  "scan.reimport": "Registrierung gespeichert — erneut importieren:",
  "view3d.ioSagittal": "Sagittale Schicht durch das CT — verschieben, um zu prüfen, ob der Scan auf dem Schmelz sitzt",
  "series.study": "DICOM-Studie",
  "series.remove": "Entfernen",
  "error.noDicom": "Keine DICOM-Dateien gefunden. Dateien müssen die Endung .dcm oder keine Endung haben.",
  "error.processFailed": "DICOM-Dateien konnten nicht verarbeitet werden.",
  "error.loadError": "Fehler beim Laden der Dateien: {msg}",
  "tool.windowLevel": "W/L",
  "tool.pan": "Verschieben",
  "tool.zoom": "Zoom",
  "tool.scroll": "Scrollen",
  "tool.crosshairs": "Fadenkreuz",
  "tool.length": "Strecke",
  "tool.angle": "Winkel",
  "tool.ellipse": "Ellipse",
  "tool.circle": "Kreis",
  "tool.rectangle": "Rechteck",
  "tool.freehand": "Freihand",
  "tool.bidirectional": "Bidirektional",
  "tool.probe": "HU-Sonde",
  "tool.arrow": "Pfeil",
  "toolbar.crosshairsOnlyMulti": "Fadenkreuz nur im Mehrfachansicht-Modus (2×2 / 1+3)",
  "toolbar.multiviewAllVisible": "In Mehrfachansicht alle sichtbar",
  "toolbar.layout": "Layout: {label}",
  "toolbar.reload": "Neu laden",
  "toolbar.layers": "Ebenen",
  "view.axial": "Axial",
  "view.swapBig": "Vergrößern — diese Ansicht mit der Hauptansicht tauschen",
  "view.sagittal": "Sagittal",
  "view.coronal": "Koronal",
  "view.3d": "3D",
  "preset.bone": "Knochen",
  "preset.soft": "Weichgewebe",
  "preset.lung": "Lunge",
  "preset.brain": "Gehirn",
  "preset.dental": "Dental",
  "preset.implant": "Implantat",
  "preset3d.bone": "Knochen",
  "preset3d.xray": "Röntgen",
  "preset3d.bones": "Knochen (Kontrast)",
  "preset3d.dental": "Dental",
  "preset3d.mip": "MIP",
  "opg.width": "Breite",
  "opg.savePng": "PNG speichern",
  "opg.sectionPng": "Schnitt-PNG",
  "export.saveImage": "Bild speichern",
  "common.cancel": "Abbrechen",
  "imgexport.title": "Bild speichern",
  "imgexport.format": "Format",
  "imgexport.quality": "Qualität",
  "imgexport.resolution": "Auflösung",
  "imgexport.views": "Ansichten",
  "imgexport.threeD": "3D-Ansicht",
  "imgexport.slice": "Schicht",
  "imgexport.content": "Info im Bild",
  "imgexport.output": "Ausgabe",
  "imgexport.files": "Einzelne Dateien",
  "imgexport.grid": "Ein Raster",
  "imgexport.columns": "Spalten",
  "imgexport.export": "Exportieren",
  "imgexport.cSeries": "Serie",
  "imgexport.cModality": "Modalität",
  "imgexport.cViewTitle": "Ansichtsname",
  "imgexport.cOrientation": "Orientierung (A/P/R/L)",
  "imgexport.cSlice": "Schichtnummer",
  "pdfexport.title": "PDF speichern",
  "pdfexport.fields": "Kopfzeilen-Felder",
  "pdfexport.sections": "Abschnitte",
  "pdfexport.disclaimer": "Haftungsausschluss",
  "pdfexport.page": "Seite",
  "pdfexport.portrait": "Hochformat",
  "pdfexport.landscape": "Querformat",
  "pdfexport.export": "PDF speichern",
  "opg.planning": "Planung",
  "opg.addImplant": "+ Implantat",
  "opg.addImplantTitle": "Implantat im Querschnitt platzieren",
  "viewport.panorama": "Panorama",
  "viewport.crossSection": "Querschnitt",
  "viewport.computing": "Berechnung...",
  "viewport.tilt": "Neigung: {deg}°",
  "viewport.placeImplantHint": "Klicken zum Platzieren · Esc zum Beenden",
  "viewport.slices": "Schichten",
  "layers.title": "Ebenen",
  "layers.addText": "Text hinzufügen",
  "layers.addImplant": "Implantat hinzufügen",
  "panel.tools": "Werkzeuge",
  "chrome.view": "Ansicht",
  "layers.implants": "Implantate",
  "layers.other": "Weitere Ebenen",
  "layers.none": "Noch keine Implantate — mit „+ Implantat“ im Querschnitt platzieren.",
  "layers.measurements": "Messungen",
  "layers.show": "Einblenden",
  "layers.hide": "Ausblenden",
  "layers.edit": "Bearbeiten",
  "layers.delete": "Löschen",
  "layers.rename": "Umbenennen",
  "layers.confirmClear": "Alle Messungen löschen?",
  "layers.close": "Schließen",
  "arch.auto": "Auto-Bogen",
  "arch.autoFailed": "Der Bogen konnte hier nicht geschätzt werden — scrollen Sie die Axialansicht auf eine Schicht durch die Zähne / den Alveolarkamm und versuchen Sie es erneut.",
  "arch.autoTitle": "Zahnbogen aus dem Scan schätzen (danach bearbeitbar)",
  "implant.defaultName": "Implantat {n}",
  "implant.diameter": "Durchmesser",
  "implant.length": "Länge",
  "implant.blRotation": "B-L-Rotation",
  "implant.blHint": "Bukkolinguale Rotation in der Querschnittsebene — ±180°: 0° nach unten (Unterkiefer), ±180° nach oben (Oberkiefer)",
  "implant.mdTilt": "M-D-Neigung",
  "implant.mdHint": "Mesiodistale Neigung entlang des Bogens (Panoramaebene)",
  "implant.lowerJaw": "↓ Unterkiefer",
  "implant.upperJaw": "↑ Oberkiefer",
  "implant.close": "Schließen",
  "implant.system": "System",
  "guided.title": "Geführte Chirurgie",
  "guided.sleeveDiameter": "Hülse Ø",
  "guided.offset": "Hülsen-Offset",
  "guided.offsetHint": "Abstand von der Hülsenunterseite zur Implantatplattform entlang der Achse",
  "guided.drillLength": "Bohrlänge",
  "view3d.implant": "Implantat",
  "view3d.slices": "Schnittebenen",
  "view3d.quality": "Qualität",
  "view3d.color": "Farbe",
  "quality.low": "Niedrig",
  "quality.medium": "Mittel",
  "quality.high": "Hoch",
  "colormap.grayscale": "Graustufen",
  "colormap.cool": "Kühl",
  "colormap.warm": "Warm",
  "colormap.spectral": "Spektral",
  "colormap.inverted": "Invertiert",
  "view3d.crop": "Zuschnitt",
  "view3d.cropHint": "Jede Seite beschneiden, um das Volumen aufzuschneiden und das Innere freizulegen.",
  "common.reset": "Zurücksetzen",
  "view3d.preset": "Preset",
  "view3d.slab": "Schnitt",
  "common.off": "Aus",
  "view3d.sleeve": "Hülse",
  "view3d.axis": "Achse",
  "topbar.language": "Sprache",
  "topbar.theme": "Dunkel-/Hellmodus",
  "topbar.settings": "Einstellungen",
  "topbar.help": "Hilfe",
  "topbar.newLoad": "Neu laden",
  "topbar.patients": "Patienten",
  "topbar.intro": "Einführung",
  "intro.s1t": "Willkommen",
  "intro.s1b": "Ein Forschungs-CBCT/CT-Viewer für die Implantatplanung — MPR, 3D, Panorama und geführte Implantate. Nicht für den klinischen Einsatz.",
  "intro.s2t": "Studie laden",
  "intro.s2b": "Ziehen Sie einen DICOM-Ordner auf die Startseite oder nutzen Sie Dateien / Ordner wählen. Alles läuft lokal im Browser.",
  "intro.s3t": "Layouts",
  "intro.s3b": "Wechseln Sie zwischen 3D-Ansicht (3D + MPR mit Schnittebenen und Zuschnitt), Panorama-Ansicht (Panorama + Axial, Querschnitt, Koronal) und 1x1. Das Raster-Symbol konfiguriert die Panels.",
  "intro.s4t": "Werkzeuge & Ebenen",
  "intro.s4b": "Das linke Panel enthält die Werkzeuge (Fenster/Ebene, Verschieben, Zoom, Messungen) und die Ebenenliste für Implantate, Anatomie und Scans.",
  "intro.s5t": "Implantatplanung",
  "intro.s5b": "Platzieren Sie Implantate im Querschnitt, stellen Sie die Hülse für einen geführten Plan ein und beachten Sie die Sicherheitsabstände zu Nerv, Sinus und Nachbarn sowie die Knochenqualität.",
  "intro.s6t": "Export",
  "intro.s6b": "Exportieren Sie einen PDF-Bericht mit allen Ansichten, eine druckbare Bohrschablone (STL) oder speichern/laden Sie den Plan. Einstellungen und Patienten oben rechts.",
  "intro.skip": "Überspringen",
  "intro.back": "Zurück",
  "intro.next": "Weiter",
  "intro.done": "Verstanden",
  "newload.loadCtSample": "CT-Beispiel laden",
  "newload.loadCtIoSample": "CT- + IO-Scan-Beispiel laden",
  "newload.sampleError": "Beispieldaten konnten nicht geladen werden.",
  "newload.sampleSoon": "Beispieldaten — folgt in Kürze",
  "patients.fileInfo": "Geladene Studie",
  "patients.patientData": "Patientendaten",
  "patients.noStudy": "Keine Studie geladen.",
  "settings.title": "Einstellungen",
  "settings.tab.general": "Allgemein",
  "settings.tab.patient": "Patient",
  "settings.tab.panoramic": "Panorama-Ansicht",
  "settings.tab.implant": "Implantatplanung",
  "settings.tab.about": "Über & Credits",
  "settings.about.contributor": "Hauptautor",
  "settings.about.builtWith": "Erstellt mit diesen Open-Source-Bibliotheken",
  "settings.theme": "Design",
  "settings.theme.light": "Hell",
  "settings.theme.dark": "Dunkel",
  "settings.onImage": "Bilddaten",
  "report.birthDate": "Geburtsdatum",
  "settings.studyDate": "Aufnahmedatum",
  "settings.clinic": "Praxis",
  "settings.labels": "Orientierungsbeschriftungen",
  "settings.size": "Größe",
  "settings.labelMain": "Hauptansicht",
  "settings.labelSide": "Nebenansichten",
  "settings.align.left": "Links",
  "settings.align.center": "Mitte",
  "settings.align.right": "Rechts",
  "settings.slice3dOpacity": "3D-Schnitt-Deckkraft",
  "settings.help.display": "Wählen Sie, welche Patienten-/Studienfelder über den Bildern erscheinen.",
  "settings.help.labels": "Farbe, Größe und Ausrichtung der Axial/Sagittal/Koronal-Beschriftungen.",
  "settings.help.sliceOpacity": "Transparenz der CT-Schnittebenen im 3D-Volumen.",
  "settings.help.patient": "Diese Felder erscheinen im exportierten PDF-Bericht.",
  "settings.help.panoramic": "Einstellungen der Panorama-Rekonstruktion (Schicht, Projektion, Auflösung).",
  "settings.help.implant": "Sicherheitsabstand und Mindestabstand zu Nerv, Sinus und Nachbarimplantaten.",
  "settings.help.guide": "Abmessungen der druckbaren OP-Schablone.",
  "settings.tab.threed": "3D-Ansicht",
  "settings.default3dPreset": "Standard-3D-Voreinstellung",
  "settings.help.threed": "Das Standardaussehen des Volumens für die 3D-Ansicht und die Transparenz der CT-Schnittebenen.",
  "settings.seriesName": "Serienname",
  "settings.modality": "Modalität (CT)",
  "settings.sliceNumber": "Schnittnummer",
  "settings.scope": "Anzeigen auf:",
  "settings.scope.main": "Hauptansicht",
  "settings.scope.all": "Alle Ansichten",
  "settings.help.overrides": "Überschreiben Sie den auf den Bildern angezeigten Praxis-, Datums- und Serientext (leer = DICOM-Wert).",
  "settings.defaultImplant": "Standard-Implantattyp",
  "settings.wlPresets": "Fenster/Ebene-Voreinstellungen",
  "settings.wlHint": "Gilt für alle Ansichten.",
  "settings.report": "Berichtdaten",
  "settings.opg": "Panorama / Querschnitt",
  "opg.resolution": "Auflösung",
  "settings.safety": "Sicherheitsabstand",
  "safety.margin": "Abstand",
  "safety.color": "Farbe",
  "safety.thresholds": "Schwellen (mm)",
  "safety.nerve": "Nerv",
  "safety.sinus": "Sinus",
  "safety.neighbor": "Implantat",
  "safety.title": "Sicherheit",
  "settings.guide": "Bohrschablone",
  "guide.wall": "Wand (mm)",
  "guide.baseWidth": "Basisbreite (mm)",
  "guide.baseHeight": "Basishöhe (mm)",
  "guide.channelTol": "Kanaltol. (mm)",
  "guide.sleeveSeat": "Metallhülsen-Sitz",
  "guide.seatClearance": "Sitz-Spiel (mm)",
  "guide.sleeveWall": "Hülsenwand (mm)",
  "guide.seatHint": "Schneidet eine gestufte Tasche, sodass eine echte Metall-Bohrhülse einrastet und auf einer Schulter aufsitzt (reproduzierbarer Bohrstopp). Aus = einfache Bohrung. Passung am gedruckten Modell mit Ihrem Hülsen-Set prüfen.",
  "guide.export": "Bohrschablone (STL)",
  "guide.building": "Bohrschablone wird erstellt…",
  "guide.noImplants": "Zuerst mindestens ein geführtes Implantat hinzufügen",
  "guide.warnScan": "Der Scan ist keine wasserdichte Oberfläche — der Gewebeabdruck wurde übersprungen; das Hülsengerüst wurde dennoch exportiert.",
  "guide.error": "Erstellung der Schablone fehlgeschlagen.",
  "anatomy.nerve": "Nerv",
  "anatomy.sinus": "Sinus",
  "anatomy.nerveTitle": "Nervkanal im Panorama einzeichnen (Esc zum Beenden)",
  "anatomy.sinusTitle": "Sinusboden im Panorama einzeichnen (Esc zum Beenden)",
  "layers.anatomy": "Anatomie",
  "pdf.safetyTitle": "Sicherheitsübersicht",
  "report.patientName": "Patientenname",
  "report.patientAge": "Alter",
  "report.quoteNumber": "Angebotsnr.",
  "report.status": "Status",
  "help.title": "Hilfe",
  "help.loadTitle": "Daten laden",
  "help.loadBody": "DICOM-Ordner oder .dcm-Dateien vom Startbildschirm laden — auch GALILEOS- und OneVolume/Morita-Ordner. Geladene Scans erscheinen im Serien-Panel links; mit „+ Laden“ weitere CTs hinzufügen und per Klick zwischen Studien wechseln, jede behält ihren eigenen Plan.",
  "help.toolsTitle": "Navigations- & Messwerkzeuge",
  "help.toolsBody": "W/L (Fenster/Ebene) regelt Helligkeit/Kontrast per Ziehen; Pan, Zoom und Scroll navigieren durch die Schichten. Messwerkzeuge: Strecke, Winkel, Ellipse/Kreis/Rechteck-ROI, Freihand, bidirektional, HU-Sonde und Pfeil. Jedes Werkzeug hat ein Tastenkürzel (siehe Tooltip).",
  "help.layoutsTitle": "Layouts",
  "help.layoutsBody": "Layout in der oberen Leiste wechseln: „2D-Ansicht“ (eine Schicht mit Bild-Werkzeugen), „3D-Ansicht“ (3D-Volumen mit verknüpftem Axial, Sagittal und Koronal) und „Panorama-Ansicht“ (OPG mit Axial, Querschnitt und 3D). In der Panorama-Ansicht tauscht die ⤢-Taste eines kleinen Feldes es in den großen Platz — auf dem verdrängten Feld erneut drücken, um zurückzutauschen. Das Raster-Symbol legt fest, welche Felder die 3D-Ansicht zeigt. Der Zoom in der Statusleiste folgt der großen Ansicht.",
  "help.panoramicTitle": "Panorama (OPG)",
  "help.panoramicBody": "Das Panorama wird entlang der roten Bogenkurve der Axialansicht rekonstruiert. Die blauen Kontrollpunkte an den Zahnbogen anpassen; Schichtdicke und Projektion (AVG/MIP) in der Werkzeugleiste. Die gelbe Linie ist die Axialschicht — ziehen zum Blättern.",
  "help.crossTitle": "Querschnitt",
  "help.crossBody": "Der Querschnitt steht senkrecht zum Bogen an der blauen Linie im Panorama. Linie ziehen, um entlang des Bogens zu fahren; die runden Griffe an den Enden kippen den Schnitt (±30°).",
  "help.implantTitle": "Implantatplanung",
  "help.implantBody": "„+ Implantat“ klicken und im Querschnitt platzieren. Implantate sind echte 3D-Körper: Jede Ansicht zeigt ihren eigenen Ebenenschnitt — der Querschnitt hebt den tatsächlichen Schnitt hervor und hält einen blassen Geist greifbar, das Panorama blendet mit der Tiefe aus, die Axialansicht zeichnet die Schnittscheibe. Körper ziehen zum Verschieben (Querschnitt und Panorama), gelben Apex-Griff ziehen zum freien Rotieren (0° Unterkiefer, 180° Oberkiefer). Feinabstimmung im Bearbeiten-Pop-up der Ebene.",
  "help.layersTitle": "Ebenen-Panel",
  "help.layersBody": "Die Ebenen-Leiste links listet jedes Implantat und jede Messung — ein-/ausblenden, bearbeiten, umbenennen, löschen. Schnell-Buttons darüber fügen eine Textnotiz hinzu oder starten die Implantatplatzierung.",
  "help.panelsTitle": "Linke Panels",
  "help.panelsBody": "Die linke Leiste hat unabhängige Schalter: Patienten (Studieninfo und editierbare Berichtsfelder), Serien (Baum der geladenen CTs), Ebenen und Werkzeuge. Patienten und Serien teilen sich die innere Spalte, Werkzeuge und Ebenen die äußere — beliebig kombinierbar.",
  "help.view3dTitle": "3D-Ansicht-Steuerung",
  "help.view3dBody": "Die Leiste unter der 3D-Ansicht wählt das Render-Preset (inkl. des transluzenten Röntgens), die Farbkarte (Graustufen / Kühl / Warm / Spektral / Invertiert) und die Qualität — eine Taste, die Niedrig → Mittel → Hoch durchschaltet (echter Unterschied in der Abtastung) —, schaltet die Schnittebenen (A/S/C) und bietet Zuschneidebox und Schichtdicke. In der Panorama-Ansicht behält das 3D-Feld nur Preset, Qualität, die axiale Ebene (A) und CS, das zeigt, wo der Querschnitt schneidet.",
  "help.exportTitle": "Exportieren",
  "help.exportBody": "In der oberen Leiste: „Bild speichern“ exportiert PNG/JPG in gewählter Auflösung — Ansichten wählen, Info fürs Bild ankreuzen, als Einzeldateien oder ein Raster. „PDF speichern“ erstellt einen Bericht mit umschaltbaren Kopf-Feldern und Abschnitten (Ansichten, Implantate, Messungen, Sicherheit, Knochenqualität) in Hoch- oder Querformat. Auch Bohrschablone (STL) und Plan speichern/laden.",
  "help.shortcutsTitle": "Tastenkürzel",
  "help.shortcutsBody": "W Fenster/Ebene · P Verschieben · Z Zoom · S Scrollen · X Fadenkreuz · L Strecke · A Winkel · E Ellipse · C Kreis · R Rechteck · F Freihand · B Bidirektional · H HU-Sonde · N Pfeil",
  // Toolbar groups & export
  "toolbar.view": "Ansicht:",
  "toolbar.tools": "Werkzeuge:",
  "export.button": "Export",
  "export.savePdf": "PDF speichern",
  "plan.save": "Plan speichern (JSON)",
  "bone.title": "Knochenqualität",
  "scan.import": "Scan importieren",
  "scan.importTitle": "Oberflächen-Scan importieren (STL / OBJ / PLY)",
  "reg.start": "Registrieren",
  "crown.plan": "Aus Krone planen",
  "crown.planHint": "Implantat aus diesem Zahn-Setup-Mesh vorschlagen — seine Längsachse wird zur Schraubenachse (danach bearbeitbar).",
  "crown.needArch": "Zeichnen Sie zuerst den Zahnbogen (Panorama-Ansicht öffnen), dann aus der Krone planen.",
  "crown.failed": "Aus diesem Mesh konnte kein Implantat abgeleitet werden.",
  "reg.title": "Scan-Registrierung",
  "reg.hint": "Einen DVT-Punkt auf der Axial-Schicht oder direkt auf der 3D-Darstellung setzen, dann dieselbe Stelle auf dem 3D-Scan. Drei Paare sind das Minimum — mehr Paare mitteln den Klickfehler heraus. Höckerspitzen eignen sich am besten.",
  "reg.addPair": "Landmarke",
  "reg.addPairHint": "Ein weiteres Landmarkenpaar. Mehr Paare mitteln den Klickfehler heraus — drei ist das Minimum, nicht das Ziel.",
  "reg.removePair": "Dieses Paar entfernen",
  "reg.fid.detect": "Marker suchen",
  "reg.fid.busy": "Suche läuft…",
  "reg.fid.hint": "Röntgenopake Marker im CT finden. Sie werden in der 3D-Ansicht dargestellt; ein Klick in ihre Nähe übernimmt den Mittelpunkt, was deutlich genauer ist als ein Klick auf eine Zahnoberfläche.",
  "reg.fid.found": "{n} Kandidaten — durch Anklicken bestätigen",
  "reg.fid.none": "Keine Marker gefunden. Wurde für die Aufnahme eine Markerschablone getragen?",
  "reg.metal.found": "{mm3} mm³ Metall an {n} Stellen.",
  "reg.metal.severe": "Streifenartefakte um Restaurationen verschieben die scheinbaren Zahnoberflächen im gesamten Kiefer, daher ist eine Anpassung des Scans an diese Oberflächen hier nicht verlässlich. Registrieren Sie über Marker oder über Landmarken, die in beiden Datensätzen erkennbar sind.",
  "reg.metal.minor": "Landmarken nahe den Restaurationen meiden — Streifenartefakte verschieben dort die Oberflächen.",
  "reg.fixOrder": "Marker scheinen falsch gepaart — Reihenfolge korrigieren",
  "jaw.both": "Beide Kiefer",
  "jaw.upper": "Oberkiefer",
  "jaw.lower": "Unterkiefer",
  "jaw.hint": "Nur einen Kiefer zeigen, an der Okklusionsebene geschnitten — nur verfügbar, wenn die Aufnahme beide enthält.",
  "reg.cbctPoint": "CBCT",
  "reg.scanPoint": "Scan",
  "reg.align": "Ausrichten",
  "scan.invalid": "Mesh-Datei konnte nicht gelesen werden (STL / OBJ / PLY).",
  "layers.scans": "Scans",
  "scan.oral": "Oral-Scan",
  "scan.upperJaw": "Oberkiefer",
  "scan.lowerJaw": "Unterkiefer",
  "scan.bite": "Biss",
  "scan.antagonist": "Antagonist",
  "scan.toothSetup": "Zahnaufstellung",
  "scanAdjust.button": "Korrigieren",
  "scanAdjust.hint": "Position dieses Scans zusätzlich zur Registrierung von Hand korrigieren.",
  "scanAdjust.move": "Verschieben",
  "scanAdjust.rotate": "Drehen",
  "scanAdjust.reset": "Position zurücksetzen",
  "scanAdjust.resetHint": "Zurück zur Position, mit der der Scan geladen wurde.",
  "plan.load": "Plan laden",
  "plan.invalid": "Ungültige oder unlesbare Plandatei.",
  "plan.mismatch": "Dieser Plan wurde für eine andere Studie gespeichert. Trotzdem laden?",
  "pdf.patient": "Patient",
  "pdf.date": "Datum",
  "pdf.implantsTitle": "Geplante Implantate",
  "pdf.viewsTitle": "Ansichten",
  "pdf.measurementsTitle": "Messungen",
  "pdf.description": "Bericht zur Implantatplanung, erstellt mit DenCT.",
  "pdf.guidedLine": "Geführt: Hülse Ø{sleeve} mm, Offset {offset} mm, Bohrung {drill} mm",
  "pdf.age": "Alter",
  "pdf.quote": "Angebotsnr.",
  "pdf.status": "Status",
  // Klinische Sicherheitshinweise (Review-Nachzügler)
  "safety.nerveCaveat": "Abstand zur im Panorama eingezeichneten Mittellinie — bukkolinguale Position nicht verifiziert.",
  "safety.notChecked": "Nicht geprüft: Nähe zu Zähnen/Wurzeln, Perforation der Kortikalis, bukkolinguale Nervenlage.",
  "settings.safetyHint": "Die Vorgaben folgen gängigen klinischen Richtlinien (Nerv 2 mm, Sinus 1 mm, Implantat 3 mm).",
  "bone.uncalibrated": "unkalibrierte CBCT-Grauwerte — Misch-Klasse nur indikativ",
  "measure.panoCaveat": "Horizontale Strecken folgen der Bogenkurve; Strukturen abseits der Kurve können verzerrt sein.",
  "reg.rms": "Passfehler (RMS): {rms} mm",
  "reg.rmsHigh": "Hoher Passfehler — Landmarkenpaare erneut prüfen.",
  "reg.tre.atImplant": "Erwarteter Fehler am Implantat",
  "reg.tre.atScan": "Erwarteter Fehler über den Scan",
  "reg.tre.short": "Erwarteter Fehler am Zielpunkt",
  "reg.tre.worst": "schlechtester: {name}",
  "reg.tre.collinear": "Die Marker liegen auf einer Geraden. Die Drehung um diese Gerade wird von der Passung nicht bestimmt, abseits davon ist der Scan also gar nicht fixiert — setzen Sie einen Marker neben die Linie.",
  "reg.tre.spread": "Das Residuum ist klein, aber die Marker liegen zu dicht beieinander, um das ferne Ende des Bogens zu halten. Sie weiter zu verteilen hilft mehr, als sie genauer zu setzen.",
  "guide.warnDisconnected": "Ein Hülsengehäuse ist nicht mit der Basisschiene verbunden — Implantatpositionen vor dem Druck prüfen.",
  "guide.confirmNoScan": "Keine registrierte Intraoral-/Scan-Oberfläche geladen — die exportierte Schablone passt auf KEINE Gewebeoberfläche. Prüfen Sie Passung und Bohrstop am gedruckten Modell vor jeder Verwendung. Fortfahren?",
  "guideCheck.thinWall": "Hülsenwand dünner als 1 mm — evtl. zu fragil zum Drucken",
  "guideCheck.narrowChannel": "Bohrkanal schmaler als 1,8 mm — der Führungsbohrer passt evtl. nicht",
  "guideCheck.boresClose": "Zwei Bohrkanäle liegen sehr nah — die Wand dazwischen ist fragil",
  "guideCheck.drillNerve": "Bohrpfad verläuft zu nah am markierten Nerv",
  "guideCheck.drillSinus": "Bohrpfad verläuft zu nah an der markierten Kieferhöhle",
  "guideCheck.errorIntro": "Der Schablonenplan hat Probleme, die ihn unsicher oder undruckbar machen könnten:",
  "guideCheck.warnIntro": "Bitte prüfen Sie diese Warnungen zum Schablonenplan:",
  "guideCheck.proceed": "Schablone trotzdem exportieren?",
  "pdf.guideNote": "Bohrschablone (STL): kein integrierter Bohrstop, keine Metallhülse; Passung vor klinischer Verwendung auf einem gedruckten Modell prüfen.",
  "pdf.reportOverride": "Bericht: {value}",
  "pdf.boneCaveat": "CBCT-Grauwerte (GV) sind unkalibriert — die Misch-Klasse ist nur indikativ."
}, vt = {
  "app.title": "DenCT",
  "app.initializing": "Inicializando el visor DICOM...",
  "app.initError": "Error de inicialización de Cornerstone: {msg}",
  "app.retry": "Reintentar",
  "landing.infoTitle": "¿Qué es esta aplicación?",
  "landing.infoBody": "Un visor DICOM de CBCT/TC dental para la planificación de implantes — cargue varias TC a la vez, vistas MPR y 3D real, reconstrucción panorámica (OPG) a lo largo del arco dental, cortes transversales inclinables, planificación guiada de implantes con distancias de seguridad a nervio/seno/vecino y calidad ósea de Misch, exportación de guía de fresado imprimible (STL) y exportación configurable de imagen (PNG/JPG) e informe PDF — todo en cuatro idiomas.",
  "landing.howTitle": "Cómo se usa",
  "landing.how1": "Cargue una carpeta DICOM o archivos .dcm abajo (también carpetas GALILEOS y OneVolume); añada más TC luego desde el panel Series.",
  "landing.how2": "Elija un diseño en la barra superior — «Vista 3D» combina 3D + MPR, «Vista panorámica» muestra la panorámica con axial, corte transversal y coronal.",
  "landing.how3": "Ajuste la curva roja del arco en la vista axial para seguir el arco dental.",
  "landing.how4": "Coloque implantes en el corte transversal con «+ Implante», luego exporte un PDF/imagen o una guía de fresado STL.",
  "landing.aboutTitle": "Acerca de",
  "landing.aboutBody": "Soy Zoltán Dul (ZoliQua), desarrollador de software dental.",
  "landing.aboutBuilt": "Creado con React, TypeScript y Cornerstone3D.",
  "landing.fileTypes": "Acepta DICOM (.dcm o una carpeta de estudio/serie), exportaciones de carpeta GALILEOS (*_vol_0) y carpetas OneVolume / Morita CT_0.vol — CT / CBCT. Se admite DICOM comprimido y sin comprimir.",
  "landing.sampleTitle": "Probar la muestra",
  "landing.sampleDesc": "¿No tienes un escaneo a mano? Carga un CBCT anonimizado, solo o junto con los escaneos intraorales superior e inferior correspondientes.",
  "landing.uploadTitle": "Tu DICOM",
  "landing.disclaimerShort": "Solo para referencia y demostración — no es un dispositivo médico ni para diagnóstico, planificación de tratamientos o mediciones.",
  "landing.contribute": "Si te resulta útil, ⭐ dale una estrella en GitHub, abre un pull request o contribuye — se agradecen los comentarios.",
  "about.otherProjects": "También te puede interesar mi otro software dental:",
  // Marketing landing sections
  "landing.nav.why": "Por qué",
  "landing.nav.views": "Vistas",
  "landing.nav.tools": "Herramientas",
  "landing.nav.presets": "Imagen",
  "landing.nav.privacy": "Privacidad",
  "landing.title": "DenCT — El visor de CBCT dental",
  "landing.heroSub": "Un visor gratuito de CBCT y TC dental — directamente en tu navegador. Sin instalación, sin subir nada.",
  "landing.metricViews": "Tipos de vista",
  "landing.metricFree": "Gratis y de código abierto",
  "landing.metricInstall": "Tiempo de instalación",
  "landing.metricPrivate": "Local y privado",
  "landing.why.title": "¿Por qué este visor?",
  "landing.why1t": "Gratis y de código abierto",
  "landing.why1d": "Con licencia MIT y de uso gratuito — para estudio, planificación y docencia.",
  "landing.why2t": "Local y privado",
  "landing.why2d": "Tus escaneos se procesan en el navegador y nunca salen de tu dispositivo.",
  "landing.why3t": "Planificación de implantes",
  "landing.why3d": "Coloca implantes con comprobaciones de seguridad en vivo de nervio, seno y vecino.",
  "landing.why4t": "Cirugía guiada",
  "landing.why4d": "Exporta una guía de fresado imprimible (STL) para cirugía con férula.",
  "landing.why5t": "Informes e idiomas",
  "landing.why5d": "Exportación de informe PDF multilingüe en cuatro idiomas.",
  "landing.why6t": "Optimizado para odontología",
  "landing.why6d": "Curva del arco, panorámica (OPG) y calidad ósea de Misch.",
  "landing.views.title": "Cuatro formas de mirar",
  "landing.view2dt": "Vista de cortes 2D",
  "landing.view2dd": "Revisa cortes axiales, sagitales, coronales o panorámicos uno a uno, con herramientas de medición sobre la imagen.",
  "landing.view3dt": "Vista 3D + MPR",
  "landing.view3dd": "Una representación 3D volumétrica real vinculada a MPR, con planos de corte y una caja de recorte ajustable.",
  "landing.viewPanot": "Panorámica (OPG)",
  "landing.viewPanod": "Una reconstrucción panorámica curva a lo largo del arco dental, junto con axial, corte transversal y coronal.",
  "landing.tools.title": "Herramientas de medición y planificación",
  "landing.tool1": "Mediciones de longitud y ángulo",
  "landing.tool2": "Capas por medición",
  "landing.tool3": "Colocación de implantes",
  "landing.tool4": "Seguridad nervio / seno / vecino",
  "landing.tool5": "Calidad ósea de Misch",
  "landing.tool6": "Casquillo y fresado guiados",
  "landing.tool7": "Exportación de informe PDF",
  "landing.tool8": "Curva del arco y corte transversal inclinable",
  "landing.presets.title": "Visualización e imagen",
  "landing.preset1": "Preajuste 3D de rayos X",
  "landing.preset2": "Preajustes de ventana/nivel",
  "landing.preset3": "Opacidad de corte ajustable",
  "landing.preset4": "Planos de corte",
  "landing.preset5": "Caja de recorte",
  "landing.privacy.title": "Privado por diseño",
  "landing.privacy.body": "Todo se ejecuta localmente en tu navegador — tus datos DICOM nunca se suben a ningún servidor.",
  "landing.cta.title": "¿Listo para mirar dentro?",
  "landing.cta.upload": "Cargar DICOM",
  // Bottom status bar
  "status.local": "Procesamiento local — los datos no se suben",
  "status.images": "{n} imágenes",
  "status.zoom": "Zoom",
  "status.fit": "Ajustado",
  "status.mode": "Modo",
  "status.tool": "Herramienta",
  "sample.loading": "Cargando muestra…",
  "drop.title": "Cargar archivos DICOM",
  "drop.hint": "Arrastre archivos DICOM o una carpeta completa aquí, o use los botones de abajo",
  "drop.chooseFiles": "Elegir archivos",
  "drop.chooseFolder": "Elegir carpeta",
  "layout.configure": "Configurar disposición",
  "layout.view2d": "Vista 2D",
  "layout.view3d": "Vista 3D",
  "layout.panoramic": "Vista panorámica",
  "layout.viewIo3d": "Vista 3D IO",
  "layout.grid": "Cuadrícula",
  "layout.arrangement": "Disposición",
  "layout.arrangeLeft": "Grande a la izquierda",
  "layout.arrangeTop": "Grande arriba",
  "layout.big": "Panel grande",
  "layout.small": "Pequeño",
  "landing.starOnGithub": "Marcar en GitHub",
  "disclaimer.title": "Solo para investigación",
  "disclaimer.text": "Esta herramienta se ofrece únicamente con fines de investigación y demostración. No es software médico certificado y no debe utilizarse para diagnóstico clínico, planificación real de tratamientos ni mediciones precisas. El modelado de implantes es solo ilustrativo; la colocación real de implantes no debe planificarse a partir de él. Al usar esta herramienta acepta que sus desarrolladores no asumen ninguna responsabilidad por las consecuencias derivadas de su uso.",
  "disclaimer.agree": "Aceptar",
  "drop.format": "archivos .dcm o una carpeta DICOM",
  "drop.processing": "Procesando archivos DICOM...",
  "drop.files": "{loaded} / {total} archivos",
  "series.title": "Series ({n})",
  "series.images": "{n} imágenes",
  "series.panel": "Series",
  "series.load": "Cargar",
  "series.loadScan": "Cargar escaneo",
  "series.loadScanBusy": "Cargando escaneo…",
  "series.loadScanHint": "Carga uno o varios escaneos de superficie (STL / OBJ / PLY) para el TC abierto: el maxilar y la mandíbula se reconocen por el nombre del archivo.",
  "series.triangles": "{n} triángulos",
  "scan.notLoaded": "geometría no cargada",
  "scan.reimport": "Registro guardado — vuelve a importar:",
  "view3d.ioSagittal": "Corte sagital del TC: desplázalo por la arcada para comprobar que el escaneo se apoya en el esmalte",
  "series.study": "Estudio DICOM",
  "series.remove": "Quitar",
  "error.noDicom": "No se encontraron archivos DICOM. Los archivos deben tener extensión .dcm o ninguna.",
  "error.processFailed": "No se pudieron procesar los archivos DICOM.",
  "error.loadError": "Error al cargar los archivos: {msg}",
  "tool.windowLevel": "W/L",
  "tool.pan": "Mover",
  "tool.zoom": "Zoom",
  "tool.scroll": "Desplazar",
  "tool.crosshairs": "Cruz",
  "tool.length": "Distancia",
  "tool.angle": "Ángulo",
  "tool.ellipse": "Elipse",
  "tool.circle": "Círculo",
  "tool.rectangle": "Rectángulo",
  "tool.freehand": "Mano alzada",
  "tool.bidirectional": "Bidireccional",
  "tool.probe": "Sonda HU",
  "tool.arrow": "Flecha",
  "toolbar.crosshairsOnlyMulti": "Cruz solo en modo multivista (2×2 / 1+3)",
  "toolbar.multiviewAllVisible": "Todo visible en modo multivista",
  "toolbar.layout": "Diseño: {label}",
  "toolbar.reload": "Nueva carga",
  "toolbar.layers": "Capas",
  "view.axial": "Axial",
  "view.swapBig": "Ampliar — intercambiar esta vista con la principal",
  "view.sagittal": "Sagital",
  "view.coronal": "Coronal",
  "view.3d": "3D",
  "preset.bone": "Hueso",
  "preset.soft": "Tejido blando",
  "preset.lung": "Pulmón",
  "preset.brain": "Cerebro",
  "preset.dental": "Dental",
  "preset.implant": "Implante",
  "preset3d.bone": "Hueso",
  "preset3d.xray": "Rayos X",
  "preset3d.bones": "Hueso (contraste)",
  "preset3d.dental": "Dental",
  "preset3d.mip": "MIP",
  "opg.width": "Anchura",
  "opg.savePng": "Guardar PNG",
  "opg.sectionPng": "PNG del corte",
  "export.saveImage": "Guardar imagen",
  "common.cancel": "Cancelar",
  "imgexport.title": "Guardar imagen",
  "imgexport.format": "Formato",
  "imgexport.quality": "Calidad",
  "imgexport.resolution": "Resolución",
  "imgexport.views": "Vistas",
  "imgexport.threeD": "Vista 3D",
  "imgexport.slice": "Corte",
  "imgexport.content": "Info en la imagen",
  "imgexport.output": "Salida",
  "imgexport.files": "Archivos separados",
  "imgexport.grid": "Una cuadrícula",
  "imgexport.columns": "Columnas",
  "imgexport.export": "Exportar",
  "imgexport.cSeries": "Serie",
  "imgexport.cModality": "Modalidad",
  "imgexport.cViewTitle": "Nombre de vista",
  "imgexport.cOrientation": "Orientación (A/P/R/L)",
  "imgexport.cSlice": "Número de corte",
  "pdfexport.title": "Guardar PDF",
  "pdfexport.fields": "Campos de encabezado",
  "pdfexport.sections": "Secciones",
  "pdfexport.disclaimer": "Aviso legal",
  "pdfexport.page": "Página",
  "pdfexport.portrait": "Vertical",
  "pdfexport.landscape": "Horizontal",
  "pdfexport.export": "Guardar PDF",
  "opg.planning": "Planificación",
  "opg.addImplant": "+ Implante",
  "opg.addImplantTitle": "Colocar un implante en el corte transversal",
  "viewport.panorama": "Panorámica",
  "viewport.crossSection": "Corte transversal",
  "viewport.computing": "Calculando...",
  "viewport.tilt": "Inclinación: {deg}°",
  "viewport.placeImplantHint": "Haga clic para colocar · Esc para terminar",
  "viewport.slices": "cortes",
  "layers.title": "Capas",
  "layers.addText": "Añadir texto",
  "layers.addImplant": "Añadir implante",
  "panel.tools": "Herramientas",
  "chrome.view": "Vista",
  "layers.implants": "Implantes",
  "layers.other": "Otras capas",
  "layers.none": "Aún no hay implantes — coloque uno en el corte transversal con «+ Implante».",
  "layers.measurements": "Mediciones",
  "layers.show": "Mostrar",
  "layers.hide": "Ocultar",
  "layers.edit": "Editar",
  "layers.delete": "Eliminar",
  "layers.rename": "Renombrar",
  "layers.confirmClear": "¿Eliminar todas las mediciones?",
  "layers.close": "Cerrar",
  "arch.auto": "Arco automático",
  "arch.autoFailed": "No se pudo estimar el arco aquí — desplace la vista axial a un corte que pase por los dientes / la cresta alveolar e inténtelo de nuevo.",
  "arch.autoTitle": "Estimar el arco dental a partir del escáner (editable después)",
  "implant.defaultName": "Implante {n}",
  "implant.diameter": "Diámetro",
  "implant.length": "Longitud",
  "implant.blRotation": "Rotación B-L",
  "implant.blHint": "Rotación bucolingual en el plano del corte — ±180°: 0° hacia abajo (mandíbula), ±180° hacia arriba (maxilar)",
  "implant.mdTilt": "Inclinación M-D",
  "implant.mdHint": "Inclinación mesiodistal a lo largo del arco (plano panorámico)",
  "implant.lowerJaw": "↓ Mandíbula",
  "implant.upperJaw": "↑ Maxilar",
  "implant.close": "Cerrar",
  "implant.system": "Sistema",
  "guided.title": "Cirugía guiada",
  "guided.sleeveDiameter": "Casquillo Ø",
  "guided.offset": "Offset del casquillo",
  "guided.offsetHint": "Distancia desde la base del casquillo hasta la plataforma del implante a lo largo del eje",
  "guided.drillLength": "Longitud de fresado",
  "view3d.implant": "Implante",
  "view3d.slices": "Planos de corte",
  "view3d.quality": "Calidad",
  "view3d.color": "Color",
  "quality.low": "Baja",
  "quality.medium": "Media",
  "quality.high": "Alta",
  "colormap.grayscale": "Escala de grises",
  "colormap.cool": "Frío",
  "colormap.warm": "Cálido",
  "colormap.spectral": "Espectral",
  "colormap.inverted": "Invertido",
  "view3d.crop": "Recorte",
  "view3d.cropHint": "Recorta cada lado para cortar el volumen y revelar el interior.",
  "common.reset": "Restablecer",
  "view3d.preset": "Preajuste",
  "view3d.slab": "Corte",
  "common.off": "Off",
  "view3d.sleeve": "Casquillo",
  "view3d.axis": "Eje",
  "topbar.language": "Idioma",
  "topbar.theme": "Modo oscuro/claro",
  "topbar.settings": "Ajustes",
  "topbar.help": "Ayuda",
  "topbar.newLoad": "Nueva carga",
  "topbar.patients": "Pacientes",
  "topbar.intro": "Introducción",
  "intro.s1t": "Bienvenido",
  "intro.s1b": "Un visor CBCT/CT de investigación para la planificación de implantes — MPR, 3D, panorámica e implantes guiados. No para uso clínico.",
  "intro.s2t": "Cargar un estudio",
  "intro.s2b": "Arrastre una carpeta DICOM a la página de inicio, o use Elegir archivos / Elegir carpeta. Todo se ejecuta localmente en su navegador.",
  "intro.s3t": "Diseños",
  "intro.s3b": "Cambie entre la Vista 3D (3D + MPR con planos de corte y recorte), la Vista panorámica (panorámica + axial, corte transversal, coronal) y 1x1. El icono de cuadrícula configura los paneles.",
  "intro.s4t": "Herramientas y capas",
  "intro.s4b": "El panel izquierdo contiene las herramientas (ventana/nivel, desplazar, zoom, mediciones) y la lista de capas de implantes, anatomía y escaneos.",
  "intro.s5t": "Planificación de implantes",
  "intro.s5b": "Coloque implantes en el corte transversal, configure el casquillo para un plan guiado y vigile los márgenes de seguridad a nervio, seno y vecinos, además de la calidad ósea.",
  "intro.s6t": "Exportar",
  "intro.s6b": "Exporte un informe PDF con todas las vistas, una férula quirúrgica imprimible (STL), o guarde/cargue el plan. Ajustes y Pacientes arriba a la derecha.",
  "intro.skip": "Omitir",
  "intro.back": "Atrás",
  "intro.next": "Siguiente",
  "intro.done": "Entendido",
  "newload.loadCtSample": "Cargar ejemplo de TC",
  "newload.loadCtIoSample": "Cargar ejemplo de TC + escaneo IO",
  "newload.sampleError": "No se pudieron cargar los datos de ejemplo.",
  "newload.sampleSoon": "Datos de ejemplo — próximamente",
  "patients.fileInfo": "Estudio cargado",
  "patients.patientData": "Datos del paciente",
  "patients.noStudy": "Ningún estudio cargado.",
  "settings.title": "Ajustes",
  "settings.tab.general": "General",
  "settings.tab.patient": "Paciente",
  "settings.tab.panoramic": "Vista panorámica",
  "settings.tab.implant": "Planificación de implantes",
  "settings.tab.about": "Acerca de y créditos",
  "settings.about.contributor": "Contribuidor principal",
  "settings.about.builtWith": "Creado con estas bibliotecas de código abierto",
  "settings.theme": "Tema",
  "settings.theme.light": "Claro",
  "settings.theme.dark": "Oscuro",
  "settings.onImage": "Datos en imagen",
  "report.birthDate": "Fecha de nacimiento",
  "settings.studyDate": "Fecha del estudio",
  "settings.clinic": "Clínica",
  "settings.labels": "Etiquetas de orientación",
  "settings.size": "Tamaño",
  "settings.labelMain": "Vista principal",
  "settings.labelSide": "Vistas laterales",
  "settings.align.left": "Izquierda",
  "settings.align.center": "Centro",
  "settings.align.right": "Derecha",
  "settings.slice3dOpacity": "Opacidad del corte 3D",
  "settings.help.display": "Elija qué campos de paciente/estudio aparecen sobre las imágenes.",
  "settings.help.labels": "Color, tamaño y alineación de las etiquetas Axial/Sagital/Coronal.",
  "settings.help.sliceOpacity": "Transparencia de los planos de corte de la TC dentro del volumen 3D.",
  "settings.help.patient": "Estos campos aparecen en el informe PDF exportado.",
  "settings.help.panoramic": "Controles de la reconstrucción panorámica (corte, proyección, resolución).",
  "settings.help.implant": "Margen de seguridad y distancia mínima a nervio, seno e implantes vecinos.",
  "settings.help.guide": "Dimensiones de la férula quirúrgica imprimible.",
  "settings.tab.threed": "Vista 3D",
  "settings.default3dPreset": "Preajuste 3D predeterminado",
  "settings.help.threed": "El aspecto de volumen predeterminado para la vista 3D y la transparencia de los planos de corte.",
  "settings.seriesName": "Nombre de serie",
  "settings.modality": "Modalidad (CT)",
  "settings.sliceNumber": "Número de corte",
  "settings.scope": "Mostrar en:",
  "settings.scope.main": "Vista principal",
  "settings.scope.all": "Todas las vistas",
  "settings.help.overrides": "Sobrescriba el texto de clínica, fecha y serie en las imágenes (vacío = valor DICOM).",
  "settings.defaultImplant": "Tipo de implante predeterminado",
  "settings.wlPresets": "Preajustes de ventana/nivel",
  "settings.wlHint": "Se aplica a todas las vistas.",
  "settings.report": "Datos del informe",
  "settings.opg": "Panorámica / corte transversal",
  "opg.resolution": "Resolución",
  "settings.safety": "Margen de seguridad",
  "safety.margin": "Margen",
  "safety.color": "Color",
  "safety.thresholds": "Umbrales (mm)",
  "safety.nerve": "Nervio",
  "safety.sinus": "Seno",
  "safety.neighbor": "Implante",
  "safety.title": "Seguridad",
  "settings.guide": "Férula quirúrgica",
  "guide.wall": "Pared (mm)",
  "guide.baseWidth": "Ancho base (mm)",
  "guide.baseHeight": "Alto base (mm)",
  "guide.channelTol": "Tol. canal (mm)",
  "guide.sleeveSeat": "Asiento de casquillo metálico",
  "guide.seatClearance": "Holgura del asiento (mm)",
  "guide.sleeveWall": "Pared del casquillo (mm)",
  "guide.seatHint": "Crea un alojamiento escalonado para que un casquillo metálico real encaje y descanse sobre un hombro (tope de fresado repetible). Desactivado = perforación simple. Verifique el ajuste con su kit de casquillos en un modelo impreso.",
  "guide.export": "Férula quirúrgica (STL)",
  "guide.building": "Generando la férula…",
  "guide.noImplants": "Añade primero al menos un implante guiado",
  "guide.warnScan": "El escaneo no es una superficie estanca: se omitió la impresión del tejido; el armazón de casquillos se exportó igualmente.",
  "guide.error": "Error al generar la férula.",
  "anatomy.nerve": "Nervio",
  "anatomy.sinus": "Seno",
  "anatomy.nerveTitle": "Trazar el conducto del nervio en la panorámica (Esc para terminar)",
  "anatomy.sinusTitle": "Trazar el suelo del seno en la panorámica (Esc para terminar)",
  "layers.anatomy": "Anatomía",
  "pdf.safetyTitle": "Resumen de seguridad",
  "report.patientName": "Nombre del paciente",
  "report.patientAge": "Edad",
  "report.quoteNumber": "N.º de presupuesto",
  "report.status": "Estado",
  "help.title": "Ayuda",
  "help.loadTitle": "Carga de datos",
  "help.loadBody": "Cargue una carpeta DICOM o archivos .dcm desde la pantalla de inicio — también carpetas GALILEOS y OneVolume/Morita. Los escaneos cargados aparecen en el panel Series a la izquierda; use «+ Cargar» para añadir más TC y haga clic en un estudio para cambiar entre ellos, cada uno conserva su plan.",
  "help.toolsTitle": "Herramientas de navegación y medición",
  "help.toolsBody": "W/L (ventana/nivel) ajusta brillo/contraste arrastrando; Mover, Zoom y Desplazar navegan por los cortes. Herramientas de medición: distancia, ángulo, ROI de elipse/círculo/rectángulo, mano alzada, bidireccional, sonda HU y flecha. Cada herramienta tiene un atajo de teclado (ver tooltip).",
  "help.layoutsTitle": "Diseños",
  "help.layoutsBody": "Cambie el diseño desde la barra superior: «Vista 2D» (un corte con herramientas sobre la imagen), «Vista 3D» (volumen 3D con axial, sagital y coronal enlazados) y «Vista panorámica» (la OPG con axial, corte transversal y 3D). En la vista panorámica, el botón ⤢ de un panel pequeño lo intercambia con el panel grande; púlselo en el panel desplazado para volver. El icono de cuadrícula configura qué paneles muestra la vista 3D. El zoom de la barra de estado sigue a la vista grande.",
  "help.panoramicTitle": "Panorámica (OPG)",
  "help.panoramicBody": "La panorámica se reconstruye a lo largo de la curva roja del arco dibujada en la vista axial. Arrastre los puntos de control azules para ajustarla al arco dental; el grosor y la proyección (AVG/MIP) se configuran en la barra de herramientas. La línea amarilla es el corte axial — arrástrela para desplazarse.",
  "help.crossTitle": "Corte transversal",
  "help.crossBody": "El corte es perpendicular al arco en la línea azul de la panorámica. Arrastre la línea para moverse por el arco; los tiradores redondos de los extremos inclinan el corte (±30°).",
  "help.implantTitle": "Planificación de implantes",
  "help.implantBody": "Pulse «+ Implante» y colóquelo en el corte transversal. Los implantes son cuerpos 3D reales: cada vista muestra su propia intersección con el plano — el corte resalta la sección real y mantiene un fantasma tenue agarrable, la panorámica se desvanece con la profundidad y la axial dibuja el disco donde el corte cruza el cuerpo. Arrastre el cuerpo para moverlo (corte y panorámica) y el tirador amarillo del ápice para rotarlo libremente (0° mandíbula, 180° maxilar). Ajuste fino en el pop-up de edición de la capa.",
  "help.layersTitle": "Panel de capas",
  "help.layersBody": "La barra de Capas a la izquierda lista cada implante y medición — mostrar/ocultar, editar, renombrar o eliminar. Los botones rápidos encima añaden una anotación de texto o inician la colocación de implante.",
  "help.panelsTitle": "Paneles izquierdos",
  "help.panelsBody": "La barra izquierda tiene interruptores independientes: Pacientes (info del estudio y los campos editables del informe), Series (el árbol de TC cargadas), Capas y Herramientas. Pacientes y Series comparten la columna interior, Herramientas y Capas la exterior — abra cualquier combinación.",
  "help.view3dTitle": "Controles de la vista 3D",
  "help.view3dBody": "La barra bajo la vista 3D fija el preajuste de render (incluida la radiografía translúcida), el mapa de color (Escala de grises / Frío / Cálido / Espectral / Invertido) y la calidad —un botón que alterna Baja → Media → Alta (una diferencia real de muestreo)—, activa los planos de corte (A/S/C) y ofrece caja de recorte y grosor de losa. En la vista panorámica, el panel 3D solo conserva el preajuste, la calidad, el plano axial (A) y CS, que muestra dónde corta el corte transversal.",
  "help.exportTitle": "Exportación",
  "help.exportBody": "Desde la barra superior: «Guardar imagen» exporta PNG/JPG a la resolución elegida — elija qué vistas, marque la info a grabar en la imagen, y guarde como archivos separados o una cuadrícula. «Guardar PDF» crea un informe con campos de encabezado y secciones conmutables (vistas, implantes, mediciones, seguridad, calidad ósea) en vertical u horizontal. También guía de fresado (STL) y guardar/cargar plan.",
  "help.shortcutsTitle": "Atajos de teclado",
  "help.shortcutsBody": "W ventana/nivel · P mover · Z zoom · S desplazar · X cruz · L distancia · A ángulo · E elipse · C círculo · R rectángulo · F mano alzada · B bidireccional · H sonda HU · N flecha",
  // Toolbar groups & export
  "toolbar.view": "Vista:",
  "toolbar.tools": "Herramientas:",
  "export.button": "Exportar",
  "export.savePdf": "Guardar PDF",
  "plan.save": "Guardar plan (JSON)",
  "bone.title": "Calidad ósea",
  "scan.import": "Importar escaneo",
  "scan.importTitle": "Importar un escaneo de superficie (STL / OBJ / PLY)",
  "reg.start": "Registrar",
  "crown.plan": "Planificar desde corona",
  "crown.planHint": "Sugerir un implante a partir de esta malla de encerado — su eje longitudinal define el eje del tornillo (editable después).",
  "crown.needArch": "Dibuje primero el arco dental (abra la vista panorámica) y luego planifique desde la corona.",
  "crown.failed": "No se pudo derivar un implante de esta malla.",
  "reg.title": "Registro del escaneo",
  "reg.hint": "Marca un punto del CBCT en el corte axial o directamente sobre la representación 3D, y luego el mismo punto en el escaneo 3D. Tres pares es el mínimo: con más, el error de clic se promedia. Las cúspides funcionan mejor.",
  "reg.addPair": "Punto",
  "reg.addPairHint": "Añade otro par de puntos. Más pares promedian el error de clic: tres es el mínimo, no el objetivo.",
  "reg.removePair": "Eliminar este par",
  "reg.fid.detect": "Buscar marcadores",
  "reg.fid.busy": "Buscando…",
  "reg.fid.hint": "Busca marcadores radiopacos en el TC. Se dibujan en la vista 3D; al hacer clic cerca de uno se toma su centro, mucho más preciso que hacer clic en la superficie de un diente.",
  "reg.fid.found": "{n} candidatos: confírmalos haciendo clic",
  "reg.fid.none": "No se han encontrado marcadores. ¿Se llevó una férula con marcadores durante el escaneo?",
  "reg.metal.found": "{mm3} mm³ de metal en {n} puntos.",
  "reg.metal.severe": "Los artefactos de estrías alrededor de las restauraciones desplazan las superficies dentales aparentes en toda la arcada, por lo que aquí no es fiable ajustar el escaneo a esas superficies. Registre con marcadores o con puntos de referencia identificables en ambos.",
  "reg.metal.minor": "Evite puntos de referencia cercanos a las restauraciones: las estrías desplazan allí las superficies.",
  "reg.fixOrder": "Los marcadores parecen mal emparejados: corregir el orden",
  "jaw.both": "Ambos maxilares",
  "jaw.upper": "Maxilar superior",
  "jaw.lower": "Mandíbula",
  "jaw.hint": "Muestra un maxilar cada vez, cortado por el plano oclusal — solo disponible si el estudio contiene ambos.",
  "reg.cbctPoint": "CBCT",
  "reg.scanPoint": "Escaneo",
  "reg.align": "Alinear",
  "scan.invalid": "No se pudo leer el archivo de malla (STL / OBJ / PLY).",
  "layers.scans": "Escaneos",
  "scan.oral": "Escaneo oral",
  "scan.upperJaw": "Maxilar superior",
  "scan.lowerJaw": "Mandíbula",
  "scan.bite": "Mordida",
  "scan.antagonist": "Antagonista",
  "scan.toothSetup": "Montaje dental",
  "scanAdjust.button": "Ajustar",
  "scanAdjust.hint": "Corrige a mano la posición de este escaneo, sobre el registro.",
  "scanAdjust.move": "Mover",
  "scanAdjust.rotate": "Rotar",
  "scanAdjust.reset": "Restablecer posición",
  "scanAdjust.resetHint": "Vuelve a la posición con la que se cargó el escaneo.",
  "plan.load": "Cargar plan",
  "plan.invalid": "Archivo de plan no válido o ilegible.",
  "plan.mismatch": "Este plan se guardó para otro estudio. ¿Cargar de todos modos?",
  "pdf.patient": "Paciente",
  "pdf.date": "Fecha",
  "pdf.implantsTitle": "Implantes planificados",
  "pdf.viewsTitle": "Vistas",
  "pdf.measurementsTitle": "Mediciones",
  "pdf.description": "Informe de planificación de implantes generado con DenCT.",
  "pdf.guidedLine": "Guiada: casquillo Ø{sleeve} mm, offset {offset} mm, fresado {drill} mm",
  "pdf.age": "Edad",
  "pdf.quote": "N.º de presupuesto",
  "pdf.status": "Estado",
  // Avisos de seguridad clínica (seguimiento de revisión)
  "safety.nerveCaveat": "Distancia a la línea central trazada en la panorámica — posición vestibulolingual no verificada.",
  "safety.notChecked": "No comprobado: proximidad a dientes/raíces, perforación de la cortical, posición vestibulolingual del nervio.",
  "settings.safetyHint": "Los valores por defecto siguen pautas clínicas habituales (nervio 2 mm, seno 1 mm, implante 3 mm).",
  "bone.uncalibrated": "valores de gris CBCT no calibrados — la clase de Misch es solo orientativa",
  "measure.panoCaveat": "Las distancias horizontales siguen la curva del arco; las estructuras fuera de la curva pueden estar distorsionadas.",
  "reg.rms": "Error de ajuste (RMS): {rms} mm",
  "reg.rmsHigh": "Error de ajuste alto — revise los pares de puntos de referencia.",
  "reg.tre.atImplant": "Error previsto en el implante",
  "reg.tre.atScan": "Error previsto en todo el escaneo",
  "reg.tre.short": "Error previsto en el objetivo",
  "reg.tre.worst": "peor: {name}",
  "reg.tre.collinear": "Los marcadores están alineados en una recta. El ajuste no determina el giro alrededor de esa recta, así que fuera de ella el escaneo no queda sujeto — desplace un marcador fuera de la línea.",
  "reg.tre.spread": "El residuo es pequeño, pero los marcadores están demasiado juntos para sujetar el extremo lejano de la arcada. Separarlos ayuda más que colocarlos con más cuidado.",
  "guide.warnDisconnected": "Un alojamiento de casquillo no está conectado a la barra base — revise las posiciones de los implantes antes de imprimir.",
  "guide.confirmNoScan": "No hay ninguna superficie intraoral/escaneada registrada — la férula exportada NO se ajustará a ninguna superficie de tejido. Verifique el ajuste y el tope de fresado en un modelo impreso antes de usarla. ¿Continuar?",
  "guideCheck.thinWall": "Pared del casquillo menor de 1 mm — puede ser demasiado frágil para imprimir",
  "guideCheck.narrowChannel": "Canal de fresado menor de 1,8 mm — la fresa guiada puede no caber",
  "guideCheck.boresClose": "Dos canales de fresado están muy próximos — la pared entre ellos es frágil",
  "guideCheck.drillNerve": "La trayectoria de fresado pasa demasiado cerca del nervio marcado",
  "guideCheck.drillSinus": "La trayectoria de fresado pasa demasiado cerca del seno marcado",
  "guideCheck.errorIntro": "El plan de la férula tiene problemas que podrían hacerla insegura o no imprimible:",
  "guideCheck.warnIntro": "Revise estas advertencias del plan de la férula:",
  "guideCheck.proceed": "¿Exportar la férula de todos modos?",
  "pdf.guideNote": "Férula quirúrgica (STL): sin tope de fresado integrado ni casquillo metálico; verifique el ajuste en un modelo impreso antes del uso clínico.",
  "pdf.reportOverride": "informe: {value}",
  "pdf.boneCaveat": "Los valores de gris (GV) del CBCT no están calibrados — la clase de Misch es solo orientativa."
}, kt = {
  "app.title": "DenCT",
  "app.initializing": "DICOM megjelenítő inicializálása...",
  "app.initError": "Cornerstone inicializálási hiba: {msg}",
  "app.retry": "Újrapróbálás",
  "landing.infoTitle": "Mi ez az alkalmazás?",
  "landing.infoBody": "Dentális CBCT/CT DICOM-néző implantátum-tervezéshez — több CT egyszerre, MPR és valódi 3D nézetek, panoráma (OPG) rekonstrukció a fogív mentén, dönthető keresztmetszetek, vezetett implantátum-tervezés ideg/arcüreg/szomszéd biztonsági távolságokkal és Misch-csontminőséggel, nyomtatható fúrósablon (STL) export, valamint konfigurálható kép- (PNG/JPG) és PDF-riport-export — négy nyelven.",
  "landing.howTitle": "Használat",
  "landing.how1": "Tölts be egy DICOM mappát vagy .dcm fájlokat lent (GALILEOS és OneVolume mappákat is); további CT-ket később a Sorozatok panelen adhatsz hozzá.",
  "landing.how2": "Válassz elrendezést a felső sávban — a „3D nézet” a 3D-t és az MPR-t, a „Panoráma nézet” a panorámát adja axiális, keresztmetszet és koronális nézettel.",
  "landing.how3": "Igazítsd a piros ívgörbét az axiális nézeten a fogívhez.",
  "landing.how4": "Helyezz el implantátumokat a keresztmetszeten a „+ Implantátum” gombbal, majd exportálj PDF-et/képet vagy fúrósablon STL-t.",
  "landing.aboutTitle": "Névjegy",
  "landing.aboutBody": "Dul Zoltán (ZoliQua) vagyok, fogászati szoftverfejlesztő.",
  "landing.aboutBuilt": "React, TypeScript és Cornerstone3D alapokon.",
  "landing.fileTypes": "DICOM (.dcm fájlok vagy vizsgálat/sorozat mappa), GALILEOS mappa-exportok (*_vol_0) és OneVolume / Morita CT_0.vol mappák — CT / CBCT. Tömörített és tömörítetlen DICOM is támogatott.",
  "landing.sampleTitle": "Próbáld ki a mintát",
  "landing.sampleDesc": "Nincs kéznél felvétel? Tölts be egy anonim CBCT-t — önmagában, vagy a hozzá tartozó felső és alsó intraorális scannel együtt.",
  "landing.uploadTitle": "A saját DICOM-od",
  "landing.disclaimerShort": "Kizárólag referencia és bemutató célra — nem orvostechnikai eszköz, és nem használható diagnózisra, kezeléstervezésre vagy mérésre.",
  "landing.contribute": "Ha hasznosnak találod, ⭐ csillagozd GitHubon, küldj pull requestet vagy contributálj — a visszajelzést szívesen fogadom.",
  "about.otherProjects": "Nézd meg a többi fogászati szoftveremet is:",
  // Marketing landing sections
  "landing.nav.why": "Miért",
  "landing.nav.views": "Nézetek",
  "landing.nav.tools": "Eszközök",
  "landing.nav.presets": "Képalkotás",
  "landing.nav.privacy": "Adatvédelem",
  "landing.title": "DenCT — A fogászati CBCT-nézegető",
  "landing.heroSub": "Ingyenes CBCT- és fogászati CT-nézegető — közvetlenül a böngésződben. Nincs telepítés, semmi nem töltődik fel.",
  "landing.metricViews": "Nézettípus",
  "landing.metricFree": "Ingyenes és nyílt forrású",
  "landing.metricInstall": "Telepítési idő",
  "landing.metricPrivate": "Helyi és privát",
  "landing.why.title": "Miért ez a nézegető?",
  "landing.why1t": "Ingyenes és nyílt forrású",
  "landing.why1d": "MIT-licenc alatt, ingyenesen — tanuláshoz, tervezéshez és oktatáshoz.",
  "landing.why2t": "Helyi és privát",
  "landing.why2d": "A felvételek a böngésződben dolgozódnak fel, és soha nem hagyják el az eszközödet.",
  "landing.why3t": "Implantátum-tervezés",
  "landing.why3d": "Implantátumok elhelyezése élő ideg-, arcüreg- és szomszéd-biztonsági ellenőrzésekkel.",
  "landing.why4t": "Vezetett sebészet",
  "landing.why4d": "Nyomtatható fúrósablon (STL) exportálása sablonvezérelt sebészethez.",
  "landing.why5t": "Jelentések és nyelvek",
  "landing.why5d": "Többnyelvű PDF-jelentés exportálása négy nyelven.",
  "landing.why6t": "Fogászatra optimalizált",
  "landing.why6d": "Fogív-görbe, panoráma (OPG) és Misch csontminőség.",
  "landing.views.title": "Négyféle nézőpont",
  "landing.view2dt": "2D szelet-nézet",
  "landing.view2dd": "Axiális, szagittális, koronális vagy panoráma szeletek egyenkénti böngészése, képre rajzolható mérőeszközökkel.",
  "landing.view3dt": "3D + MPR nézet",
  "landing.view3dd": "Valódi térfogati 3D megjelenítés MPR-hez kötve, metsző szeletsíkokkal és állítható vágódobozzal.",
  "landing.viewPanot": "Panoráma (OPG)",
  "landing.viewPanod": "Ívelt panoráma-rekonstrukció a fogív mentén, axiális, keresztmetszet és koronális nézet mellett.",
  "landing.tools.title": "Mérő- és tervezőeszközök",
  "landing.tool1": "Hossz- és szögmérések",
  "landing.tool2": "Mérésenkénti rétegek",
  "landing.tool3": "Implantátum elhelyezése",
  "landing.tool4": "Ideg / arcüreg / szomszéd biztonság",
  "landing.tool5": "Misch csontminőség",
  "landing.tool6": "Vezetett persely és fúró",
  "landing.tool7": "PDF-jelentés exportálása",
  "landing.tool8": "Fogív-görbe és dönthető keresztmetszet",
  "landing.presets.title": "Megjelenítés és képalkotás",
  "landing.preset1": "Röntgen 3D preset",
  "landing.preset2": "Ablak/szint presetek",
  "landing.preset3": "Állítható szelet-átlátszóság",
  "landing.preset4": "Metsző szeletsíkok",
  "landing.preset5": "Vágódoboz",
  "landing.privacy.title": "Alapból privát",
  "landing.privacy.body": "Minden helyben, a böngésződben fut — a DICOM-adataid soha nem töltődnek fel semmilyen szerverre.",
  "landing.cta.title": "Kész belenézni?",
  "landing.cta.upload": "DICOM betöltése",
  // Bottom status bar
  "status.local": "Helyi feldolgozás — az adatok nem töltődnek fel",
  "status.images": "{n} kép",
  "status.zoom": "Nagyítás",
  "status.fit": "Illesztve",
  "status.mode": "Mód",
  "status.tool": "Eszköz",
  "sample.loading": "Minta betöltése…",
  "drop.title": "DICOM fájlok betöltése",
  "drop.hint": "Húzz ide DICOM fájlokat vagy egy egész mappát — vagy használd az alábbi gombokat",
  "drop.chooseFiles": "Fájlok kiválasztása",
  "drop.chooseFolder": "Mappa kiválasztása",
  "layout.configure": "Elrendezés beállítása",
  "layout.view2d": "2D nézet",
  "layout.view3d": "3D nézet",
  "layout.panoramic": "Panoráma nézet",
  "layout.viewIo3d": "3D IO nézet",
  "layout.grid": "Rács",
  "layout.arrangement": "Elrendezés",
  "layout.arrangeLeft": "Nagy balra",
  "layout.arrangeTop": "Nagy felül",
  "layout.big": "Nagy panel",
  "layout.small": "Kicsi",
  "landing.starOnGithub": "Csillagozz GitHubon",
  "disclaimer.title": "Csak kutatási célra",
  "disclaimer.text": "Ez az eszköz kutatási és bemutató célokat szolgál. Nem orvostechnikai eszközként bevizsgált szoftver, ezért klinikai diagnózis felállítására, valós kezelési terv készítésére vagy pontos mérések végzésére nem alkalmas. Az implantációs modellezés kizárólag szemléltető jellegű; valós implantátum-beültetés tervezése ez alapján nem végezhető. Az eszköz használatával elfogadod, hogy a fejlesztők a felhasználásból eredő semmilyen következményért nem vállalnak felelősséget.",
  "disclaimer.agree": "Elfogadom",
  "drop.format": ".dcm fájlok vagy DICOM mappa",
  "drop.processing": "DICOM fájlok feldolgozása...",
  "drop.files": "{loaded} / {total} fájl",
  "series.title": "Sorozatok ({n})",
  "series.images": "{n} kép",
  "series.panel": "Sorozatok",
  "series.load": "Betöltés",
  "series.loadScan": "Scan betöltése",
  "series.loadScanBusy": "Scan betöltése…",
  "series.loadScanHint": "Egy vagy több felszíni scan (STL / OBJ / PLY) betöltése a megnyitott CT-hez — a felső és alsó állcsontot a fájlnévből ismeri fel.",
  "series.triangles": "{n} háromszög",
  "scan.notLoaded": "geometria nincs betöltve",
  "scan.reimport": "A regisztráció mentve — töltsd vissza:",
  "view3d.ioSagittal": "Szagittális szelet a CT-ben — húzd végig a fogíven, hogy lásd, a scan a zománcon ül-e",
  "series.study": "DICOM vizsgálat",
  "series.remove": "Eltávolítás",
  "error.noDicom": "Nem található DICOM fájl. A fájloknak .dcm kiterjesztéssel vagy kiterjesztés nélkülinek kell lenniük.",
  "error.processFailed": "Nem sikerült a DICOM fájlok feldolgozása.",
  "error.loadError": "Hiba a fájlok betöltésekor: {msg}",
  "tool.windowLevel": "W/L",
  "tool.pan": "Mozgatás",
  "tool.zoom": "Nagyítás",
  "tool.scroll": "Görgetés",
  "tool.crosshairs": "Szálkereszt",
  "tool.length": "Távolság",
  "tool.angle": "Szög",
  "tool.ellipse": "Ellipszis",
  "tool.circle": "Kör",
  "tool.rectangle": "Téglalap",
  "tool.freehand": "Szabadkézi",
  "tool.bidirectional": "Kétirányú",
  "tool.probe": "HU szonda",
  "tool.arrow": "Nyíl",
  "toolbar.crosshairsOnlyMulti": "Szálkereszt csak többnézetes módban (2×2 / 1+3)",
  "toolbar.multiviewAllVisible": "Többnézetes módban mind látható",
  "toolbar.layout": "Elrendezés: {label}",
  "toolbar.reload": "Új betöltés",
  "toolbar.layers": "Rétegek",
  "view.axial": "Axiális",
  "view.swapBig": "Nagyítás — csere a fő nézettel",
  "view.sagittal": "Szagittális",
  "view.coronal": "Koronális",
  "view.3d": "3D",
  "preset.bone": "Csont",
  "preset.soft": "Lágyrész",
  "preset.lung": "Tüdő",
  "preset.brain": "Agy",
  "preset.dental": "Fogászat",
  "preset.implant": "Implantátum",
  "preset3d.bone": "Csont",
  "preset3d.xray": "Röntgen",
  "preset3d.bones": "Csont (kontrasztos)",
  "preset3d.dental": "Fogászat",
  "preset3d.mip": "MIP",
  "opg.width": "Szélesség",
  "opg.savePng": "Mentés PNG",
  "opg.sectionPng": "Metszet PNG",
  "export.saveImage": "Kép mentése",
  "common.cancel": "Mégse",
  "imgexport.title": "Kép mentése",
  "imgexport.format": "Formátum",
  "imgexport.quality": "Minőség",
  "imgexport.resolution": "Felbontás",
  "imgexport.views": "Nézetek",
  "imgexport.threeD": "3D nézet",
  "imgexport.slice": "Szelet",
  "imgexport.content": "Felirat a képen",
  "imgexport.output": "Kimenet",
  "imgexport.files": "Külön fájlok",
  "imgexport.grid": "Egy rács",
  "imgexport.columns": "Oszlopok",
  "imgexport.export": "Exportálás",
  "imgexport.cSeries": "Sorozat",
  "imgexport.cModality": "Modalitás",
  "imgexport.cViewTitle": "Nézet neve",
  "imgexport.cOrientation": "Tájolás (A/P/R/L)",
  "imgexport.cSlice": "Szeletszám",
  "pdfexport.title": "PDF mentése",
  "pdfexport.fields": "Fejléc-mezők",
  "pdfexport.sections": "Szekciók",
  "pdfexport.disclaimer": "Jogi nyilatkozat",
  "pdfexport.page": "Oldal",
  "pdfexport.portrait": "Álló",
  "pdfexport.landscape": "Fekvő",
  "pdfexport.export": "PDF mentése",
  "opg.planning": "Tervezés",
  "opg.addImplant": "+ Implantátum",
  "opg.addImplantTitle": "Implantátum elhelyezése a keresztmetszeten",
  "viewport.panorama": "Panoráma",
  "viewport.crossSection": "Keresztmetszet",
  "viewport.computing": "Számítás...",
  "viewport.tilt": "Döntés: {deg}°",
  "viewport.placeImplantHint": "Kattints az elhelyezéshez · Esc a befejezéshez",
  "viewport.slices": "szelet",
  "layers.title": "Rétegek",
  "layers.addText": "Szöveg hozzáadása",
  "layers.addImplant": "Implant hozzáadása",
  "panel.tools": "Eszközök",
  "chrome.view": "Nézet",
  "layers.implants": "Implantátumok",
  "layers.other": "Egyéb rétegek",
  "layers.none": "Még nincs implantátum — a „+ Implantátum” gombbal helyezhetsz el a keresztmetszeten.",
  "layers.measurements": "Mérések",
  "layers.show": "Megjelenítés",
  "layers.hide": "Elrejtés",
  "layers.edit": "Módosítás",
  "layers.delete": "Törlés",
  "layers.rename": "Átnevezés",
  "layers.confirmClear": "Minden mérés törlése?",
  "layers.close": "Bezárás",
  "arch.auto": "Automatikus ív",
  "arch.autoFailed": "Itt nem sikerült megbecsülni az ívet — görgesd az axiális nézetet a fogakon / az alveoláris gerincen áthaladó szeletre, és próbáld újra.",
  "arch.autoTitle": "Fogív becslése a felvételből (utána szerkeszthető)",
  "implant.defaultName": "Implantátum {n}",
  "implant.diameter": "Átmérő",
  "implant.length": "Hossz",
  "implant.blRotation": "B-L forgatás",
  "implant.blHint": "Bucco-linguális forgatás a keresztmetszet síkjában — ±180°: 0° lefelé (alsó állcsont), ±180° felfelé (felső állcsont)",
  "implant.mdTilt": "M-D döntés",
  "implant.mdHint": "Mesio-distális döntés az ív mentén (panoráma síkjában)",
  "implant.lowerJaw": "↓ Alsó állcsont",
  "implant.upperJaw": "↑ Felső állcsont",
  "implant.close": "Bezárás",
  "implant.system": "Rendszer",
  "guided.title": "Vezetett sebészet",
  "guided.sleeveDiameter": "Persely Ø",
  "guided.offset": "Persely offset",
  "guided.offsetHint": "A persely aljától az implantátum platformjáig mért távolság a tengely mentén",
  "guided.drillLength": "Fúró hossz",
  "view3d.implant": "Implantátum",
  "view3d.slices": "Szeletsíkok",
  "view3d.quality": "Minőség",
  "view3d.color": "Szín",
  "quality.low": "Alacsony",
  "quality.medium": "Közepes",
  "quality.high": "Magas",
  "colormap.grayscale": "Szürkeárnyalatos",
  "colormap.cool": "Hideg",
  "colormap.warm": "Meleg",
  "colormap.spectral": "Spektrális",
  "colormap.inverted": "Invertált",
  "view3d.crop": "Vágódoboz",
  "view3d.cropHint": "Vágd le az egyes oldalakat, hogy feltárd a volumen belsejét.",
  "common.reset": "Alaphelyzet",
  "view3d.preset": "Preset",
  "view3d.slab": "Vágósík",
  "common.off": "Ki",
  "view3d.sleeve": "Persely",
  "view3d.axis": "Tengely",
  "topbar.language": "Nyelv",
  "topbar.theme": "Sötét/világos mód",
  "topbar.settings": "Beállítások",
  "topbar.help": "Súgó",
  "topbar.newLoad": "Új betöltés",
  "topbar.patients": "Páciensek",
  "topbar.intro": "Bemutató",
  "intro.s1t": "Üdv",
  "intro.s1b": "Kutatási CBCT/CT néző implantátum-tervezéshez — MPR, 3D, panoráma és vezetett implantátumok. Nem klinikai használatra.",
  "intro.s2t": "Vizsgálat betöltése",
  "intro.s2b": "Húzz egy DICOM mappát a kezdőoldalra, vagy használd a Fájlok / Mappa gombot. Minden helyben, a böngésződben fut.",
  "intro.s3t": "Elrendezések",
  "intro.s3b": "Válts a 3D nézet (3D + MPR szeletsíkokkal és croppal), a Panoráma nézet (panoráma + axiális, keresztmetszet, koronális) és az 1x1 között. A rács-ikonnal a paneleket állítod.",
  "intro.s4t": "Eszközök és rétegek",
  "intro.s4b": "A bal panel tartalmazza az eszközöket (ablak/szint, pan, zoom, mérők) és a réteglistát (implantok, anatómia, scanek).",
  "intro.s5t": "Implantátum-tervezés",
  "intro.s5b": "Helyezz implantátumot a keresztmetszeten, állítsd a perselyt a vezetett tervhez, és figyeld a biztonsági távolságokat (ideg, arcüreg, szomszéd) és a csontminőséget.",
  "intro.s6t": "Exportálás",
  "intro.s6b": "Exportálj PDF-riportot minden nézettel, nyomtatható fúrósablont (STL), vagy ments/tölts be tervet. A Beállítások és a Páciensek jobbra fent.",
  "intro.skip": "Kihagyás",
  "intro.back": "Vissza",
  "intro.next": "Tovább",
  "intro.done": "Rendben",
  "newload.loadCtSample": "CT minta betöltése",
  "newload.loadCtIoSample": "CT + IO scan minta betöltése",
  "newload.sampleError": "A mintaadat betöltése nem sikerült.",
  "newload.sampleSoon": "Mintaadat — hamarosan",
  "patients.fileInfo": "Betöltött vizsgálat",
  "patients.patientData": "Páciens adatok",
  "patients.noStudy": "Nincs betöltött vizsgálat.",
  "settings.title": "Beállítások",
  "settings.tab.general": "Általános",
  "settings.tab.patient": "Páciens",
  "settings.tab.panoramic": "Panoráma nézet",
  "settings.tab.implant": "Implantátum-tervezés",
  "settings.tab.about": "Névjegy & köszönet",
  "settings.about.contributor": "Fő közreműködő",
  "settings.about.builtWith": "Ezekkel a nyílt forráskódú könyvtárakkal készült",
  "settings.theme": "Téma",
  "settings.theme.light": "Világos",
  "settings.theme.dark": "Sötét",
  "settings.onImage": "Képen megjelenő adatok",
  "report.birthDate": "Születési dátum",
  "settings.studyDate": "Felvétel dátuma",
  "settings.clinic": "Rendelő",
  "settings.labels": "Tájolás-feliratok",
  "settings.size": "Méret",
  "settings.labelMain": "Fő nézet",
  "settings.labelSide": "Oldalsó nézetek",
  "settings.align.left": "Balra",
  "settings.align.center": "Középre",
  "settings.align.right": "Jobbra",
  "settings.slice3dOpacity": "3D szelet áttetszőség",
  "settings.help.display": "Válaszd ki, mely páciens-/vizsgálat-adatok jelenjenek meg a képeken.",
  "settings.help.labels": "Az Axiális/Szagittális/Koronális feliratok színe, mérete és igazítása.",
  "settings.help.sliceOpacity": "A 3D volumenben megjelenő CT-szeletsíkok átlátszósága.",
  "settings.help.patient": "Ezek a mezők megjelennek az exportált PDF-riportban.",
  "settings.help.panoramic": "A panoráma-rekonstrukció beállításai (réteg, projekció, felbontás).",
  "settings.help.implant": "Biztonsági margó és minimális távolság ideghez, arcüreghez, szomszéd implantátumhoz.",
  "settings.help.guide": "A nyomtatható sebészi sablon méretei.",
  "settings.tab.threed": "3D nézet",
  "settings.default3dPreset": "Alap 3D preset",
  "settings.help.threed": "A 3D nézet alap volumen-megjelenése és a CT-szeletsíkok átlátszósága.",
  "settings.seriesName": "Kötet neve",
  "settings.modality": "Modalitás (CT)",
  "settings.sliceNumber": "Szeletszám",
  "settings.scope": "Megjelenítés:",
  "settings.scope.main": "Fő nézet",
  "settings.scope.all": "Minden nézet",
  "settings.help.overrides": "Írd felül a képeken megjelenő rendelő/dátum/kötet szöveget (üres = a DICOM-érték).",
  "settings.defaultImplant": "Alapértelmezett implantátum-típus",
  "settings.wlPresets": "Ablak/Szint presetek",
  "settings.wlHint": "Minden nézetre érvényes.",
  "settings.report": "Riport adatok",
  "settings.opg": "Panoráma / keresztmetszet",
  "opg.resolution": "Felbontás",
  "settings.safety": "Biztonsági keret",
  "safety.margin": "Keret",
  "safety.color": "Szín",
  "safety.thresholds": "Küszöbök (mm)",
  "safety.nerve": "Ideg",
  "safety.sinus": "Arcüreg",
  "safety.neighbor": "Implantátum",
  "safety.title": "Biztonság",
  "settings.guide": "Fúrósablon",
  "guide.wall": "Falvastagság (mm)",
  "guide.baseWidth": "Bázis szélesség (mm)",
  "guide.baseHeight": "Bázis magasság (mm)",
  "guide.channelTol": "Csatorna tűrés (mm)",
  "guide.sleeveSeat": "Fémpersely-fészek",
  "guide.seatClearance": "Fészek hézag (mm)",
  "guide.sleeveWall": "Persely falvastagság (mm)",
  "guide.seatHint": "Lépcsős fészket vág, hogy a valódi fémpersely beleüljön és egy vállon támaszkodjon (ismételhető fúrás-ütköző). Kikapcsolva = sima furat. A printelt modellen ellenőrizd az illeszkedést a persely-készleteddel.",
  "guide.export": "Fúrósablon (STL)",
  "guide.building": "Fúrósablon készítése…",
  "guide.noImplants": "Előbb adj hozzá legalább egy vezetett implantátumot",
  "guide.warnScan": "A scan nem zárt felület — a lágyszövet-lenyomat kimaradt; a persely-váz így is elkészült.",
  "guide.error": "A sablon készítése nem sikerült.",
  "anatomy.nerve": "Ideg",
  "anatomy.sinus": "Arcüreg",
  "anatomy.nerveTitle": "Idegcsatorna berajzolása a panorámán (Esc a befejezéshez)",
  "anatomy.sinusTitle": "Arcüreg-fenék berajzolása a panorámán (Esc a befejezéshez)",
  "layers.anatomy": "Anatómia",
  "pdf.safetyTitle": "Biztonsági összegzés",
  "report.patientName": "Páciens neve",
  "report.patientAge": "Kor",
  "report.quoteNumber": "Árajánlat száma",
  "report.status": "Státusz",
  "help.title": "Súgó",
  "help.loadTitle": "Adatok betöltése",
  "help.loadBody": "Tölts be egy DICOM mappát vagy .dcm fájlokat a kezdőképernyőről — GALILEOS és OneVolume/Morita mappákat is beolvas. A betöltött felvételek a bal oldali Sorozatok panelen jelennek meg; a „+ Betöltés”-sel újabb CT-ket adhatsz hozzá, és study-ra kattintva válthatsz köztük, mindegyik megőrzi a saját tervét.",
  "help.toolsTitle": "Navigációs és mérőeszközök",
  "help.toolsBody": "A W/L (ablak/szint) húzással állítja a fényerőt/kontrasztot; a Mozgatás, Nagyítás és Görgetés a szeletek közt navigál. Mérőeszközök: távolság, szög, ellipszis/kör/téglalap ROI, szabadkézi, kétirányú, HU szonda és nyíl. Minden eszköznek van billentyűparancsa (lásd a tooltipet).",
  "help.layoutsTitle": "Elrendezések",
  "help.layoutsBody": "Válts elrendezést a felső sávban: „2D nézet” (egy szelet képre rajzolható eszközökkel), „3D nézet” (3D térfogat összekötött axiális, szagittális és koronális nézettel) és „Panoráma nézet” (az OPG axiális, keresztmetszeti és 3D nézettel). A Panoráma nézetben egy kis panel ⤢ gombja a nagy helyre cseréli — a kiszorult panelen újra megnyomva visszacserél. A rács ikon állítja, mely panelek látszanak a 3D nézetben. Az állapotsor nagyítása a nagy nézetet követi.",
  "help.panoramicTitle": "Panoráma (OPG)",
  "help.panoramicBody": "A panorámakép az axiális nézeten rajzolt piros ívgörbe mentén készül. A kék vezérlőpontokat húzva igazítsd a fogívhez; a rétegvastagság és a vetítés (AVG/MIP) az eszköztárban állítható. A sárga vízszintes vonal az axiális szelet — húzd a lapozáshoz.",
  "help.crossTitle": "Keresztmetszet",
  "help.crossBody": "A keresztmetszet az ívre merőleges, a panorámán látható kék vonalnál. A vonalat húzva mozogsz az ív mentén; a végein lévő kerek fogantyúkkal döntheted a metszetet (±30°).",
  "help.implantTitle": "Implantátum-tervezés",
  "help.implantBody": "Kattints a „+ Implantátum” gombra, és helyezd el a keresztmetszeten. Az implantátumok valódi 3D testek: minden nézet a saját sík-metszetét mutatja — a keresztmetszet kiemeli a tényleges vágatot és halvány ghostként fogható marad, a panoráma a mélységgel halványít, az axiális a szeletnél kirajzolja a kör-metszetet. A testet húzva mozgatod (keresztmetszeten és panorámán), a sárga csúcs-fogantyúval szabadon forgatod (0° alsó, 180° felső állcsont). Finomhangolás a réteg szerkesztő pop-upjában.",
  "help.layersTitle": "Rétegek panel",
  "help.layersBody": "A bal oldali Rétegek sáv minden implantátumot és mérést listáz — megjelenítés/rejtés, módosítás, átnevezés, törlés. A lista fölötti gyorsgombok szöveget adnak hozzá vagy implantátum-elhelyezést indítanak.",
  "help.panelsTitle": "Bal oldali panelek",
  "help.panelsBody": "A bal sávban független kapcsolók vannak: Páciens (study-infó és a szerkeszthető riport-mezők), Sorozatok (a betöltött CT-k fája), Rétegek és Eszközök. A Páciens és a Sorozatok a belső, az Eszközök és a Rétegek a külső oszlopon osztozik — bármelyik kombináció nyitható.",
  "help.view3dTitle": "3D nézet vezérlők",
  "help.view3dBody": "A 3D nézet alatti sáv állítja a render-presetet (az áttetsző röntgent is), a színpalettát (Szürkeárnyalatos / Hideg / Meleg / Spektrális / Inverz) és a minőséget — egyetlen gomb, amely Alacsony → Közepes → Magas között vált (valódi mintavételi különbség) —, kapcsolja a vágó szeletsíkokat (A/S/C), és kínál vágódobozt és slab-vastagságot. A Panoráma nézetben a 3D panel csak a presetet, a minőséget, az axiális síkot (A) és a CS-t tartja meg, ami mutatja, hol vág a keresztmetszet.",
  "help.exportTitle": "Exportálás",
  "help.exportBody": "A felső sávból: a „Kép mentése” PNG/JPG-t exportál választott felbontásban — kiválasztod a nézeteket, bepipálod a képre égetendő feliratokat, és külön fájlként vagy egy rácsban mented. A „PDF mentése” riportot készít ki/bekapcsolható fejléc-mezőkkel és szekciókkal (nézetek, implantok, mérések, biztonság, csontminőség) álló vagy fekvő tájolásban. Itt a fúrósablon (STL) és a terv mentése/betöltése is.",
  "help.shortcutsTitle": "Billentyűparancsok",
  "help.shortcutsBody": "W ablak/szint · P mozgatás · Z nagyítás · S görgetés · X szálkereszt · L távolság · A szög · E ellipszis · C kör · R téglalap · F szabadkézi · B kétirányú · H HU szonda · N nyíl",
  // Toolbar groups & export
  "toolbar.view": "Nézet:",
  "toolbar.tools": "Eszközök:",
  "export.button": "Export",
  "export.savePdf": "Mentés PDF",
  "plan.save": "Terv mentése (JSON)",
  "bone.title": "Csontminőség",
  "scan.import": "Scan importálása",
  "scan.importTitle": "Felszíni scan importálása (STL / OBJ / PLY)",
  "reg.start": "Regisztráció",
  "crown.plan": "Tervezés koronából",
  "crown.planHint": "Implantátum javaslata ebből a fogfelállítás-hálóból — a hossztengelye lesz a csavartengely (utána szerkeszthető).",
  "crown.needArch": "Előbb rajzold meg a fogívet (nyisd meg a panoráma nézetet), majd tervezz a koronából.",
  "crown.failed": "Ebből a hálóból nem sikerült implantátumot levezetni.",
  "reg.title": "Scan regisztráció",
  "reg.hint": "Jelölj ki egy CBCT-pontot az axiális szeleten vagy közvetlenül a 3D képen, majd ugyanazt a pontot a 3D scanen. A három pár a minimum — több pár kiátlagolja a kattintási hibát. A csücsökcsúcsok a legjobbak.",
  "reg.addPair": "Pont",
  "reg.addPairHint": "Még egy pontpár. Több pár kiátlagolja a kattintási hibát — a három a minimum, nem a cél.",
  "reg.removePair": "Pár törlése",
  "reg.fid.detect": "Markerek keresése",
  "reg.fid.busy": "Keresés…",
  "reg.fid.hint": "Röntgenopak markerek keresése a CT-ben. A 3D nézetben megjelennek; a közelükbe kattintva a középpontjukat veszi át, ami sokkal pontosabb, mint egy fogfelszínre kattintani.",
  "reg.fid.found": "{n} jelölt — kattintással erősítsd meg őket",
  "reg.fid.none": "Nem talált markert. Volt markeres sablon a felvétel alatt?",
  "reg.metal.found": "{mm3} mm³ fém {n} helyen.",
  "reg.metal.severe": "A tömések körüli csíkartefaktok az egész fogíven elmozdítják a fogfelszínek látszólagos helyét, ezért a scan felületre illesztése itt nem megbízható. Regisztrálj markerekkel, vagy mindkét adathalmazon azonosítható pontokkal.",
  "reg.metal.minor": "Kerüld a tömésekhez közeli pontokat — a csíkartefaktok ott elmozdítják a felszínt.",
  "reg.fixOrder": "A markerek párosítása hibásnak tűnik — sorrend javítása",
  "jaw.both": "Mindkét állcsont",
  "jaw.upper": "Felső állcsont",
  "jaw.lower": "Alsó állcsont",
  "jaw.hint": "Egyszerre csak az egyik állcsont, az okklúziós síknál elvágva — csak akkor érhető el, ha a felvétel mindkettőt tartalmazza.",
  "reg.cbctPoint": "CBCT",
  "reg.scanPoint": "Scan",
  "reg.align": "Illesztés",
  "scan.invalid": "A mesh-fájl nem olvasható (STL / OBJ / PLY).",
  "layers.scans": "Scanek",
  "scan.oral": "Orális scan",
  "scan.upperJaw": "Felső állcsont",
  "scan.lowerJaw": "Alsó állcsont",
  "scan.bite": "Harapás",
  "scan.antagonist": "Antagonista",
  "scan.toothSetup": "Fogfelállítás",
  "scanAdjust.button": "Korrekció",
  "scanAdjust.hint": "A scan helyzetének kézi korrekciója a regisztráció után.",
  "scanAdjust.move": "Mozgatás",
  "scanAdjust.rotate": "Forgatás",
  "scanAdjust.reset": "Helyzet visszaállítása",
  "scanAdjust.resetHint": "Vissza arra a helyzetre, amellyel a scan betöltődött.",
  "plan.load": "Terv betöltése",
  "plan.invalid": "Érvénytelen vagy olvashatatlan terv-fájl.",
  "plan.mismatch": "Ez a terv másik felvételhez készült. Így is betöltöd?",
  "pdf.patient": "Páciens",
  "pdf.date": "Dátum",
  "pdf.implantsTitle": "Tervezett implantátumok",
  "pdf.viewsTitle": "Nézetek",
  "pdf.measurementsTitle": "Mérések",
  "pdf.description": "Implantátum-tervezési riport — DenCT.",
  "pdf.guidedLine": "Vezetett: persely Ø{sleeve} mm, offset {offset} mm, fúró {drill} mm",
  "pdf.age": "Kor",
  "pdf.quote": "Árajánlat száma",
  "pdf.status": "Státusz",
  // Klinikai biztonsági nyilatkozatok (review-kiegészítések)
  "safety.nerveCaveat": "Távolság a panorámán berajzolt középvonalhoz — a buccolingualis pozíció nem ellenőrzött.",
  "safety.notChecked": "Nem ellenőrzött: fogak/gyökerek közelsége, corticalis perforáció, az ideg buccolingualis helyzete.",
  "settings.safetyHint": "Az alapértékek a szokásos klinikai irányelveket követik (ideg 2 mm, arcüreg 1 mm, implantátum 3 mm).",
  "bone.uncalibrated": "kalibrálatlan CBCT szürkeértékek — a Misch-osztály csak tájékoztató",
  "measure.panoCaveat": "A vízszintes távolságok az ívgörbe mentén értendők; a görbétől távol eső struktúrák torzulhatnak.",
  "reg.rms": "Illesztési hiba (RMS): {rms} mm",
  "reg.rmsHigh": "Nagy illesztési hiba — ellenőrizd a jelölőpont-párokat.",
  "reg.tre.atImplant": "Várható hiba az implantnál",
  "reg.tre.atScan": "Várható hiba a scan teljes kiterjedésén",
  "reg.tre.short": "Várható hiba a célponton",
  "reg.tre.worst": "legrosszabb: {name}",
  "reg.tre.collinear": "A markerek egy egyenesbe esnek. Az e körüli elfordulást az illesztés nem határozza meg, így a vonaltól távol a scan semmi nem rögzíti — tegyél egy markert a vonalon kívülre.",
  "reg.tre.spread": "A reziduum kicsi, de a markerek túl közel vannak egymáshoz ahhoz, hogy az ív túlsó végét megtartsák. Többet segít szétteríteni őket, mint pontosabban kattintani.",
  "guide.warnDisconnected": "Egy perselyház nem kapcsolódik a bázisívhez — nyomtatás előtt ellenőrizd az implantátumok helyzetét.",
  "guide.confirmNoScan": "Nincs betöltött regisztrált intraorális/scan felület — az exportált sablon NEM illeszkedik semmilyen szövetfelszínre. Nyomtatott modellen ellenőrizd az illeszkedést és a fúróütközőt használat előtt. Folytatod?",
  "guideCheck.thinWall": "A persely fala 1 mm-nél vékonyabb — törékeny lehet nyomtatáshoz",
  "guideCheck.narrowChannel": "A fúrócsatorna 1,8 mm-nél szűkebb — a vezetett fúró nem biztos, hogy befér",
  "guideCheck.boresClose": "Két fúrócsatorna nagyon közel van — a köztük lévő fal törékeny",
  "guideCheck.drillNerve": "A fúrási pálya túl közel halad a megjelölt ideghez",
  "guideCheck.drillSinus": "A fúrási pálya túl közel halad a megjelölt arcüreghez",
  "guideCheck.errorIntro": "A sablonterv olyan hibákat tartalmaz, amelyek veszélyessé vagy nyomtathatatlanná tehetik:",
  "guideCheck.warnIntro": "Kérlek, nézd át a sablonterv figyelmeztetéseit:",
  "guideCheck.proceed": "Mégis exportálod a sablont?",
  "pdf.guideNote": "Fúrósablon (STL): nincs beépített fúróütköző és fémpersely; klinikai használat előtt ellenőrizd az illeszkedést kinyomtatott modellen.",
  "pdf.reportOverride": "riport: {value}",
  "pdf.boneCaveat": "A CBCT szürkeértékek (GV) kalibrálatlanok — a Misch-osztály csak tájékoztató jellegű."
}, ge = { en: yt, de: bt, es: vt, hu: kt }, je = "rdcv-lang", Be = fe(null);
function wt() {
  const e = localStorage.getItem(je);
  return e && e in ge ? e : "en";
}
function zt({ children: e }) {
  const [t, n] = P(wt), r = O((i) => {
    n(i), localStorage.setItem(je, i);
  }, []), l = O((i, p) => {
    let c = ge[t][i] ?? ge.en[i] ?? i;
    if (p)
      for (const [f, y] of Object.entries(p))
        c = c.replace(`{${f}}`, String(y));
    return c;
  }, [t]);
  return /* @__PURE__ */ a(Be.Provider, { value: { lang: t, setLang: r, t: l }, children: e });
}
function M() {
  const e = ye(Be);
  if (!e) throw new Error("useI18n must be used within I18nProvider");
  return e;
}
const Re = "rdcv-theme", _e = fe(null);
function xt() {
  return localStorage.getItem(Re) === "light" ? "light" : "dark";
}
function St({ children: e }) {
  const [t, n] = P(xt);
  L(() => {
    localStorage.setItem(Re, t);
  }, [t]);
  const r = O(() => {
    n((l) => l === "dark" ? "light" : "dark");
  }, []);
  return /* @__PURE__ */ a(_e.Provider, { value: { theme: t, toggleTheme: r }, children: e });
}
function Ge() {
  const e = ye(_e);
  if (!e) throw new Error("useTheme must be used within ThemeProvider");
  return e;
}
let se = null;
function be() {
  return se || (se = import("./init-CAh5dDeW.js").then((e) => e.initCornerstone())), se;
}
function Ve() {
  const { state: e, dispatch: t } = R(), { t: n } = M(), r = j(0);
  return {
    loadFiles: O(
      async (i) => {
        const p = ++r.current, c = () => r.current !== p;
        t({ type: "SET_LOADING", payload: !0 });
        try {
          await be();
          const [{ parseDicomFiles: f }, { importNativeVolume: y }] = await Promise.all([
            import("./dicomLoader-B8VFrwB8.js"),
            import("./index-DK0IJiaM.js")
          ]);
          if (c()) return;
          const z = await y(i, (v) => {
            c() || t({ type: "SET_LOAD_PROGRESS", payload: { loaded: v, total: 100 } });
          });
          if (c()) return;
          if (z) {
            t({ type: "SET_STUDY", payload: z.study }), t({ type: "SET_WINDOW_LEVEL", payload: z.windowLevel }), t({ type: "SET_VOLUME_ID", payload: z.volumeId });
            return;
          }
          const k = i.filter((v) => {
            const d = v.name.toLowerCase();
            return d.endsWith(".dcm") || d.endsWith(".dicom") || !d.includes(".");
          });
          if (k.length === 0) {
            t({ type: "SET_ERROR", payload: n("error.noDicom") });
            return;
          }
          const g = await f(k, (v, d) => {
            c() || t({ type: "SET_LOAD_PROGRESS", payload: { loaded: v, total: d } });
          });
          if (c()) return;
          t(g ? { type: "ADD_STUDIES", payload: [g] } : {
            type: "SET_ERROR",
            payload: n("error.loadError", {
              msg: `no readable DICOM files (${k.length} skipped)`
            })
          });
        } catch (f) {
          if (c()) return;
          t({
            type: "SET_ERROR",
            payload: n("error.loadError", { msg: f instanceof Error ? f.message : String(f) })
          });
        }
      },
      [t, n]
    ),
    isLoading: e.isLoading,
    loadProgress: e.loadProgress,
    error: e.error,
    study: e.study
  };
}
function It() {
  const { loadFiles: e, isLoading: t, loadProgress: n, error: r } = Ve(), { dispatch: l } = R(), { t: i } = M(), [p, c] = P(!1), f = j(null), y = j(null), z = O((b) => {
    b.preventDefault(), c(!0);
  }, []), k = O((b) => {
    b.preventDefault(), c(!1);
  }, []), g = async (b) => {
    const u = [];
    async function o(S) {
      if (S.isFile) {
        const x = await new Promise((h, T) => {
          S.file(h, T);
        });
        u.push(x);
      } else if (S.isDirectory) {
        const x = S.createReader();
        let h;
        do {
          h = await new Promise((T, B) => {
            x.readEntries(T, B);
          });
          for (const T of h)
            await o(T);
        } while (h.length > 0);
      }
    }
    for (const S of b)
      await o(S);
    return u;
  }, v = O(
    async (b) => {
      b.preventDefault(), c(!1);
      try {
        const u = [], o = b.dataTransfer.items;
        if (o && o.length > 0 && typeof o[0].webkitGetAsEntry == "function")
          for (let x = 0; x < o.length; x++) {
            const h = o[x].webkitGetAsEntry();
            h && u.push(h);
          }
        const S = u.length > 0 ? await g(u) : Array.from(b.dataTransfer.files ?? []);
        S.length > 0 && e(S);
      } catch (u) {
        l({
          type: "SET_ERROR",
          payload: i("error.loadError", { msg: u instanceof Error ? u.message : String(u) })
        });
      }
    },
    [e, l, i]
  ), d = O(
    (b) => {
      const u = b.target.files;
      u && u.length > 0 && e(Array.from(u));
    },
    [e]
  ), w = n && n.total > 0 ? Math.round(n.loaded / n.total * 100) : 0;
  return /* @__PURE__ */ a("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ s(
    "div",
    {
      onDragOver: z,
      onDragLeave: k,
      onDrop: v,
      className: `
          relative flex flex-col items-center justify-center
          w-full h-80
          border-2 border-dashed rounded-2xl
          transition-all duration-200 cursor-pointer
          ${p ? "border-dental-400 bg-dental-100/50 dark:bg-dental-900/30 scale-[1.02]" : "border-gray-400 bg-white/60 hover:border-gray-500 hover:bg-white dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-gray-500 dark:hover:bg-gray-800/70"}
        `,
      children: [
        /* @__PURE__ */ a(
          "input",
          {
            ref: f,
            type: "file",
            multiple: !0,
            onChange: d,
            className: "hidden",
            accept: ".dcm,.dicom,application/dicom"
          }
        ),
        /* @__PURE__ */ a(
          "input",
          {
            ref: y,
            type: "file",
            onChange: d,
            className: "hidden",
            multiple: !0,
            webkitdirectory: "",
            directory: ""
          }
        ),
        t ? /* @__PURE__ */ s("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ a("div", { className: "w-12 h-12 border-4 border-dental-400 border-t-transparent rounded-full animate-spin mb-4" }),
          /* @__PURE__ */ a("p", { className: "text-lg text-gray-700 dark:text-gray-300", children: i("drop.processing") }),
          n && /* @__PURE__ */ s("div", { className: "mt-3 w-64", children: [
            /* @__PURE__ */ s("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
              /* @__PURE__ */ a("span", { children: i("drop.files", { loaded: n.loaded, total: n.total }) }),
              /* @__PURE__ */ s("span", { children: [
                w,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ a("div", { className: "w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ a(
              "div",
              {
                className: "bg-dental-500 h-2 rounded-full transition-all duration-150",
                style: { width: `${w}%` }
              }
            ) })
          ] })
        ] }) : /* @__PURE__ */ s(U, { children: [
          /* @__PURE__ */ a(
            "svg",
            {
              className: "w-16 h-16 text-gray-500 mb-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ a(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                }
              )
            }
          ),
          /* @__PURE__ */ a("p", { className: "text-lg text-gray-700 dark:text-gray-300 mb-1 text-center", children: i("drop.title") }),
          /* @__PURE__ */ a("p", { className: "text-sm text-gray-500 mb-4 text-center max-w-xs", children: i("drop.hint") }),
          /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => f.current?.click(),
                className: "px-4 py-2 text-sm rounded-lg bg-dental-600 text-white hover:bg-dental-700 transition-colors",
                children: i("drop.chooseFiles")
              }
            ),
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => y.current?.click(),
                className: "px-4 py-2 text-sm rounded-lg border border-dental-500 text-dental-700 hover:bg-dental-100 dark:text-dental-300 dark:hover:bg-dental-900/30 transition-colors flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ a("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ a(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 1.6,
                      d: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    }
                  ) }),
                  i("drop.chooseFolder")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a("p", { className: "text-xs text-gray-500 dark:text-gray-600 mt-3 text-center max-w-xs", children: i("drop.format") })
        ] }),
        r && /* @__PURE__ */ a("div", { className: "absolute bottom-4 left-4 right-4 bg-red-900/80 border border-red-700 rounded-lg p-3 text-sm text-red-200", children: r })
      ]
    }
  ) });
}
const Ct = "ZoliQua/Dental-CBCT-Viewer";
function Tt() {
  const { t: e } = M();
  return /* @__PURE__ */ s(
    "a",
    {
      href: `https://github.com/${Ct}`,
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Open the source repository on GitHub",
      title: e("landing.starOnGithub"),
      className: "inline-flex items-center justify-center gap-1.5 rounded border motion-safe:transition-colors border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 text-sm [&_svg]:shrink-0",
      children: [
        /* @__PURE__ */ a("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "currentColor", className: "h-4 w-4 text-slate-400", children: /* @__PURE__ */ a("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" }) }),
        /* @__PURE__ */ a("span", { children: e("landing.starOnGithub") })
      ]
    }
  );
}
function Dt({ items: e }) {
  return /* @__PURE__ */ a("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: e.map((t, n) => /* @__PURE__ */ s(
    "div",
    {
      className: "rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/50 backdrop-blur-md p-4 text-center",
      children: [
        /* @__PURE__ */ a("div", { className: "text-2xl font-bold text-dental-600 dark:text-dental-400", children: t.value }),
        /* @__PURE__ */ a("div", { className: "mt-0.5 text-xs text-gray-600 dark:text-gray-400", children: t.label })
      ]
    },
    n
  )) });
}
const Ce = {
  code: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 9l-3 3 3 3m8-6l3 3-3 3M13 5l-2 14" }),
  shield: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" }),
  target: /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "7" }),
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "2.5" }),
    /* @__PURE__ */ a("path", { strokeLinecap: "round", d: "M12 2v3M12 19v3M2 12h3M19 12h3" })
  ] }),
  printer: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 9V4h12v5M6 18H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-1M8 14h8v6H8z" }),
  doc: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5M9 13h6M9 17h6" }),
  tooth: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 3c2 0 2.5 1.5 5 1.5S15 3 17 3s4 2 4 6c0 3-1 4-1.5 7s-1 5-2.5 5-1.5-4-3-4-1.5 4-3 4-2-2-2.5-5S3 12 3 9c0-4 2-6 4-6z" }),
  cube: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 3v18M4 7.5l8 4.5 8-4.5" }),
  grid: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" }),
  wave: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 12c3 0 3-5 6-5s3 10 6 10 3-5 6-5" }),
  ruler: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 14l6-10 10 6-6 10zM8 8l1.5 1M11 6.5l1.5 1M6 11.5l1.5 1" }),
  layers: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5" }),
  bone: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 17a2.2 2.2 0 11-2-2 2.2 2.2 0 11 2-2l8-8a2.2 2.2 0 112-2 2.2 2.2 0 112 2 2.2 2.2 0 11-2 2l-8 8z" }),
  sun: /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ a("path", { strokeLinecap: "round", d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" })
  ] }),
  contrast: /* @__PURE__ */ s(U, { children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4a8 8 0 010 16z", fill: "currentColor", stroke: "none" })
  ] }),
  opacity: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3s6 6 6 10a6 6 0 11-12 0c0-4 6-10 6-10z" }),
  plane: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7-4 11 4-7 4zM3 8v8l7 4M17 12v8l-7 -4" }),
  crop: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 2v14a2 2 0 002 2h14M18 22V8a2 2 0 00-2-2H2" }),
  check: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 12l4 4 10-10" })
};
function Te({ name: e, className: t = "w-6 h-6" }) {
  return /* @__PURE__ */ a("svg", { className: t, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": !0, children: Ce[e] ?? Ce.check });
}
function oe({
  items: e,
  variant: t = "card"
}) {
  return t === "chip" ? /* @__PURE__ */ a("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: e.map((n, r) => /* @__PURE__ */ s(
    "div",
    {
      className: "flex items-center gap-3 rounded-xl border border-gray-200/80 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-3",
      children: [
        /* @__PURE__ */ a("span", { className: "shrink-0 w-8 h-8 rounded-lg bg-dental-100 dark:bg-dental-900/40 text-dental-600 dark:text-dental-300 flex items-center justify-center", children: /* @__PURE__ */ a(Te, { name: n.icon, className: "w-4 h-4" }) }),
        /* @__PURE__ */ a("span", { className: "text-sm text-gray-800 dark:text-gray-200 leading-snug", children: n.title })
      ]
    },
    r
  )) }) : /* @__PURE__ */ a("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: e.map((n, r) => /* @__PURE__ */ s(
    "div",
    {
      className: "rounded-2xl border border-gray-200/80 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md p-5 shadow-sm hover:border-dental-400 dark:hover:border-dental-500 transition-colors",
      children: [
        /* @__PURE__ */ a("div", { className: "w-10 h-10 rounded-xl bg-dental-100 dark:bg-dental-900/40 text-dental-600 dark:text-dental-300 flex items-center justify-center mb-3", children: /* @__PURE__ */ a(Te, { name: n.icon, className: "w-5 h-5" }) }),
        /* @__PURE__ */ a("h4", { className: "text-sm font-semibold text-gray-900 dark:text-gray-100", children: n.title }),
        n.desc && /* @__PURE__ */ a("p", { className: "mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed", children: n.desc })
      ]
    },
    r
  )) });
}
function F(e) {
  return `/${e.replace(/^\/+/, "")}`;
}
const At = [
  { img: F("shots/view-3d.jpg"), tk: "landing.view3dt", dk: "landing.view3dd" },
  { img: F("shots/view-panoramic.jpg"), tk: "landing.viewPanot", dk: "landing.viewPanod" },
  { img: F("shots/view-2d.jpg"), tk: "landing.view2dt", dk: "landing.view2dd" }
];
function Pt() {
  const { t: e } = M();
  return /* @__PURE__ */ a("div", { className: "flex flex-col gap-6", children: At.map((t, n) => /* @__PURE__ */ s("div", { className: "grid md:grid-cols-2 gap-5 items-center", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: `rounded-2xl overflow-hidden border border-gray-200/70 dark:border-gray-700/60 shadow-lg bg-black ${n % 2 ? "md:order-2" : ""}`,
        children: /* @__PURE__ */ a("img", { src: t.img, alt: e(t.tk), loading: "lazy", className: "w-full h-auto object-cover" })
      }
    ),
    /* @__PURE__ */ s("div", { className: n % 2 ? "md:order-1" : "", children: [
      /* @__PURE__ */ a("h4", { className: "text-lg font-bold text-dental-600 dark:text-dental-400 mb-1", children: e(t.tk) }),
      /* @__PURE__ */ a("p", { className: "text-sm text-gray-600 dark:text-gray-300 leading-relaxed", children: e(t.dk) })
    ] })
  ] }, t.img)) });
}
function te({ id: e, kicker: t, title: n }) {
  return /* @__PURE__ */ s("div", { id: e, className: "scroll-mt-24 text-center mb-6", children: [
    t && /* @__PURE__ */ a("p", { className: "text-xs font-semibold uppercase tracking-wider text-dental-500 dark:text-dental-400 mb-1", children: t }),
    /* @__PURE__ */ a("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100", children: n })
  ] });
}
const Mt = [
  {
    name: "React Advanced Odontogram",
    url: "https://github.com/ZoliQua/React-Odontogram-Modul",
    desc: "Interactive odontogram & periodontal charting for React — FHIR R4, ICDAS, 11 languages."
  },
  {
    name: "Dental CAD Designer",
    url: "https://github.com/ZoliQua/Dental-CAD-Designer",
    desc: "Design crowns, inlays/onlays & bridges from intraoral scans — React + Three.js."
  }
];
function Et() {
  return /* @__PURE__ */ a("div", { className: "grid sm:grid-cols-2 gap-2.5", children: Mt.map((e) => /* @__PURE__ */ s(
    "a",
    {
      href: e.url,
      target: "_blank",
      rel: "noreferrer",
      className: "group block rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 hover:border-dental-400 dark:hover:border-dental-500 hover:bg-white dark:hover:bg-gray-800 transition-colors p-3",
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 text-sm font-semibold text-dental-600 dark:text-dental-400", children: [
          /* @__PURE__ */ a("svg", { className: "w-4 h-4 shrink-0", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ a("path", { d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" }) }),
          /* @__PURE__ */ a("span", { className: "truncate", children: e.name }),
          /* @__PURE__ */ a("span", { className: "ml-auto text-gray-400 group-hover:text-dental-500 transition-colors", children: "↗" })
        ] }),
        /* @__PURE__ */ a("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400 leading-snug", children: e.desc })
      ]
    },
    e.url
  )) });
}
const Nt = { ct: "sample", ctIo: "sample-io" };
function ve() {
  const { dispatch: e } = R(), { t } = M();
  return O(async (n, r) => {
    const l = F(Nt[n]);
    try {
      await be();
      const { loadSample: i } = await import("./sampleLoader-oSWzPOW8.js"), p = n === "ctIo" ? 0.88 : 1, { study: c, volumeId: f, windowLevel: y } = await i(l, (z) => r?.(Math.round(z * p)));
      if (e({ type: "SET_STUDY", payload: c }), e({ type: "SET_WINDOW_LEVEL", payload: y }), e({ type: "SET_VOLUME_ID", payload: f }), n === "ctIo") {
        const { loadSampleScans: z } = await import("./sampleScans-BhxHmsgl.js"), k = await z(
          (g) => t(g),
          l,
          (g) => r?.(Math.round(88 + g * 12))
        );
        for (const g of k) e({ type: "ADD_SCAN", payload: g });
        k.length && e({ type: "SET_LAYOUT_MODE", payload: "IO3D" });
      }
      return r?.(100), !0;
    } catch (i) {
      return console.error(`[sample] ${n} load failed`, i), window.alert(t("newload.sampleError")), !1;
    }
  }, [e, t]);
}
const Lt = "https://github.com/ZoliQua/Dental-CBCT-Viewer";
function Ot() {
  const { t: e } = M(), t = ve(), [n, r] = P(null), l = async (z) => {
    r(0), await t(z, r) || r(null);
  }, i = () => document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth", block: "start" }), p = [
    { value: "6", label: e("landing.metricViews") },
    { value: "MIT", label: e("landing.metricFree") },
    { value: "0s", label: e("landing.metricInstall") },
    { value: "100%", label: e("landing.metricPrivate") }
  ], c = [
    { icon: "code", title: e("landing.why1t"), desc: e("landing.why1d") },
    { icon: "shield", title: e("landing.why2t"), desc: e("landing.why2d") },
    { icon: "target", title: e("landing.why3t"), desc: e("landing.why3d") },
    { icon: "printer", title: e("landing.why4t"), desc: e("landing.why4d") },
    { icon: "doc", title: e("landing.why5t"), desc: e("landing.why5d") },
    { icon: "tooth", title: e("landing.why6t"), desc: e("landing.why6d") }
  ], f = [
    { icon: "ruler", title: e("landing.tool1") },
    { icon: "layers", title: e("landing.tool2") },
    { icon: "target", title: e("landing.tool3") },
    { icon: "shield", title: e("landing.tool4") },
    { icon: "bone", title: e("landing.tool5") },
    { icon: "printer", title: e("landing.tool6") },
    { icon: "doc", title: e("landing.tool7") },
    { icon: "wave", title: e("landing.tool8") }
  ], y = [
    { icon: "sun", title: e("landing.preset1") },
    { icon: "contrast", title: e("landing.preset2") },
    { icon: "opacity", title: e("landing.preset3") },
    { icon: "plane", title: e("landing.preset4") },
    { icon: "crop", title: e("landing.preset5") }
  ];
  return /* @__PURE__ */ s("div", { className: "relative h-full overflow-y-auto", children: [
    /* @__PURE__ */ s("div", { "aria-hidden": !0, className: "pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ a("div", { style: { perspective: "1200px" }, children: /* @__PURE__ */ a(
        "div",
        {
          className: "relative w-[560px] h-[560px] max-w-[85vw] max-h-[85vw]",
          style: { transformStyle: "preserve-3d", animation: "dcvSpin3d 30s linear infinite", filter: "blur(0.5px)" },
          children: [-3, -2, -1, 0, 1, 2, 3].map((z) => /* @__PURE__ */ a(
            "img",
            {
              src: F("cbct-icon.png"),
              alt: "",
              "aria-hidden": !0,
              draggable: !1,
              className: "absolute inset-0 w-full h-full object-contain select-none",
              style: { transform: `translateZ(${z * 16}px)`, opacity: 0.07 }
            },
            z
          ))
        }
      ) }),
      /* @__PURE__ */ a("style", { children: "@keyframes dcvSpin3d{from{transform:rotateY(0deg) rotateX(14deg)}to{transform:rotateY(360deg) rotateX(14deg)}}" })
    ] }),
    /* @__PURE__ */ s("div", { className: "relative z-10 max-w-5xl mx-auto px-6 py-8 flex flex-col gap-12", children: [
      /* @__PURE__ */ s("section", { id: "get-started", className: "scroll-mt-24 flex flex-col items-center text-center gap-4 pt-2", children: [
        /* @__PURE__ */ a("img", { src: F("cbct-icon.png"), alt: "DenCT", className: "w-24 h-24 rounded-2xl shadow-md object-contain" }),
        /* @__PURE__ */ a("h1", { className: "text-3xl sm:text-4xl font-bold text-dental-600 dark:text-dental-400", children: e("landing.title") }),
        /* @__PURE__ */ a("p", { className: "max-w-2xl text-base text-gray-700 dark:text-gray-300 leading-relaxed", children: e("landing.heroSub") }),
        /* @__PURE__ */ a(Tt, {}),
        /* @__PURE__ */ s("div", { className: "w-full grid md:grid-cols-2 gap-4 mt-3 text-left", children: [
          /* @__PURE__ */ s("div", { className: "h-80 flex flex-col items-center justify-center text-center gap-3 rounded-2xl border-2 border-dental-400 bg-dental-50/80 dark:bg-dental-900/20 px-6 backdrop-blur-md", children: [
            /* @__PURE__ */ a("svg", { className: "w-14 h-14 text-dental-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ a("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
            /* @__PURE__ */ a("h3", { className: "text-lg font-bold text-dental-700 dark:text-dental-300", children: e("landing.sampleTitle") }),
            /* @__PURE__ */ a("p", { className: "text-sm text-gray-600 dark:text-gray-400 max-w-xs", children: e("landing.sampleDesc") }),
            /* @__PURE__ */ s(
              "button",
              {
                onClick: () => l("ct"),
                disabled: n !== null,
                "data-testid": "load-sample",
                className: "mt-1 w-full max-w-xs px-4 py-2 text-sm rounded-lg bg-dental-600 text-white hover:bg-dental-700 transition-colors disabled:opacity-60",
                children: [
                  e("newload.loadCtSample"),
                  " · ~16 MB"
                ]
              }
            ),
            /* @__PURE__ */ s(
              "button",
              {
                onClick: () => l("ctIo"),
                disabled: n !== null,
                "data-testid": "load-sample-io",
                className: "w-full max-w-xs px-4 py-2 text-sm rounded-lg border border-dental-500 text-dental-700 hover:bg-dental-100 dark:text-dental-300 dark:hover:bg-dental-900/40 transition-colors disabled:opacity-60",
                children: [
                  e("newload.loadCtIoSample"),
                  " · ~19 MB"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "flex flex-col", children: /* @__PURE__ */ a(It, {}) })
        ] }),
        /* @__PURE__ */ s("div", { className: "w-full flex items-start gap-2 rounded-xl border border-amber-400/60 bg-amber-50/90 dark:bg-amber-900/20 dark:border-amber-700/50 px-4 py-3 text-xs text-amber-800 dark:text-amber-200 text-left", children: [
          /* @__PURE__ */ a("span", { className: "shrink-0", children: "⚠️" }),
          /* @__PURE__ */ a("span", { children: e("landing.disclaimerShort") })
        ] })
      ] }),
      /* @__PURE__ */ a(Dt, { items: p }),
      /* @__PURE__ */ s("section", { children: [
        /* @__PURE__ */ a(te, { id: "why", title: e("landing.why.title") }),
        /* @__PURE__ */ a(oe, { items: c })
      ] }),
      /* @__PURE__ */ s("section", { children: [
        /* @__PURE__ */ a(te, { id: "views", title: e("landing.views.title") }),
        /* @__PURE__ */ a(Pt, {})
      ] }),
      /* @__PURE__ */ s("section", { children: [
        /* @__PURE__ */ a(te, { id: "tools", title: e("landing.tools.title") }),
        /* @__PURE__ */ a(oe, { variant: "chip", items: f })
      ] }),
      /* @__PURE__ */ s("section", { children: [
        /* @__PURE__ */ a(te, { id: "presets", title: e("landing.presets.title") }),
        /* @__PURE__ */ a(oe, { variant: "chip", items: y })
      ] }),
      /* @__PURE__ */ s(
        "section",
        {
          id: "privacy",
          className: "scroll-mt-24 bg-white/80 border border-gray-300 dark:bg-gray-800/75 dark:border-gray-700 rounded-2xl p-6 shadow-sm backdrop-blur-md",
          children: [
            /* @__PURE__ */ a("h3", { className: "text-lg font-bold text-dental-600 dark:text-dental-400 mb-2", children: e("landing.privacy.title") }),
            /* @__PURE__ */ a("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed", children: e("landing.privacy.body") }),
            /* @__PURE__ */ s("p", { className: "mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3", children: [
              "📁 ",
              e("landing.fileTypes")
            ] })
          ]
        }
      ),
      /* @__PURE__ */ s("section", { className: "text-center flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ a("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100", children: e("landing.cta.title") }),
        /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => l("ct"),
              disabled: n !== null,
              className: "px-5 py-2.5 text-sm font-semibold rounded-lg bg-dental-600 text-white hover:bg-dental-700 transition-colors disabled:opacity-60",
              children: e("newload.loadCtSample")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => l("ctIo"),
              disabled: n !== null,
              className: "px-5 py-2.5 text-sm font-semibold rounded-lg bg-dental-600 text-white hover:bg-dental-700 transition-colors disabled:opacity-60",
              children: e("newload.loadCtIoSample")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: i,
              className: "px-5 py-2.5 text-sm font-semibold rounded-lg border border-dental-500 text-dental-700 hover:bg-dental-100 dark:text-dental-300 dark:hover:bg-dental-900/30 transition-colors",
              children: e("landing.cta.upload")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s("section", { className: "bg-white/80 border border-gray-300 dark:bg-gray-800/75 dark:border-gray-700 rounded-2xl p-6 shadow-sm backdrop-blur-md", children: [
        /* @__PURE__ */ s("h2", { className: "text-lg font-bold text-dental-600 dark:text-dental-400 mb-2", children: [
          "👋 ",
          e("landing.aboutTitle")
        ] }),
        /* @__PURE__ */ a("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed", children: e("landing.aboutBody") }),
        /* @__PURE__ */ s("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-2", children: [
          e("landing.contribute"),
          " ",
          /* @__PURE__ */ a("a", { href: Lt, target: "_blank", rel: "noreferrer", className: "text-dental-600 dark:text-dental-400 hover:underline", children: "GitHub ↗" })
        ] }),
        /* @__PURE__ */ s("div", { className: "mt-4 border-t border-gray-200 dark:border-gray-700 pt-4", children: [
          /* @__PURE__ */ a("p", { className: "text-sm text-gray-700 dark:text-gray-300 mb-2.5", children: e("about.otherProjects") }),
          /* @__PURE__ */ a(Et, {})
        ] }),
        /* @__PURE__ */ a("p", { className: "text-xs text-gray-500 mt-4", children: e("landing.aboutBuilt") })
      ] })
    ] }),
    n !== null && /* @__PURE__ */ a("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center", children: /* @__PURE__ */ s("div", { className: "w-72 text-center", children: [
      /* @__PURE__ */ a("p", { className: "text-white/90 text-sm mb-3", children: e("sample.loading") }),
      /* @__PURE__ */ a("div", { className: "w-full h-2 rounded-full bg-white/20 overflow-hidden", children: /* @__PURE__ */ a("div", { className: "h-2 rounded-full bg-dental-500 transition-all duration-150", style: { width: `${n}%` } }) }),
      /* @__PURE__ */ s("p", { className: "text-white text-2xl font-semibold mt-3 tabular-nums", children: [
        n,
        "%"
      ] })
    ] }) })
  ] });
}
const De = "disclaimer-agreed";
function jt() {
  const { t: e } = M(), [t, n] = P(() => localStorage.getItem(De) === "1"), [r, l] = P(!1);
  if (L(() => {
    if (t) return;
    const p = requestAnimationFrame(() => l(!0));
    return () => cancelAnimationFrame(p);
  }, [t]), t) return null;
  const i = () => {
    localStorage.setItem(De, "1"), l(!1), window.setTimeout(() => n(!0), 300);
  };
  return /* @__PURE__ */ a(
    "div",
    {
      role: "dialog",
      "aria-modal": "false",
      "aria-label": e("disclaimer.title"),
      className: `fixed inset-x-0 bottom-0 z-[70] transition-transform duration-300 ease-out ${r ? "translate-y-0" : "translate-y-full"}`,
      children: /* @__PURE__ */ s("div", { className: "mx-auto max-w-4xl m-3 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-white dark:bg-gray-800 shadow-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3", children: [
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ s("p", { className: "text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1", children: [
            "⚠ ",
            e("disclaimer.title")
          ] }),
          /* @__PURE__ */ a("p", { className: "text-xs leading-relaxed text-gray-600 dark:text-gray-300", children: e("disclaimer.text") })
        ] }),
        /* @__PURE__ */ a(
          "button",
          {
            onClick: i,
            className: "shrink-0 self-end sm:self-auto px-5 py-2 rounded-lg bg-dental-600 text-white text-sm font-semibold hover:bg-dental-700 transition-colors",
            children: e("disclaimer.agree")
          }
        )
      ] })
    }
  );
}
const de = ["s1", "s2", "s3", "s4", "s5", "s6"], Bt = ["🦷", "📂", "🗂️", "🧰", "🦿", "📄"];
function Rt() {
  const { state: e, dispatch: t } = R(), { t: n } = M(), [r, l] = P(0);
  if (e.activePanel !== "intro") return null;
  const i = () => {
    l(0), t({ type: "SET_ACTIVE_PANEL", payload: null });
  }, p = de.length - 1, c = de[r];
  return /* @__PURE__ */ s("div", { className: "fixed inset-0 z-[65] flex items-center justify-center p-4", onMouseDown: i, children: [
    /* @__PURE__ */ a("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-[2px]" }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900",
        onMouseDown: (f) => f.stopPropagation(),
        children: [
          /* @__PURE__ */ s("div", { className: "p-6 text-center space-y-3", children: [
            /* @__PURE__ */ a("div", { className: "text-4xl", children: Bt[r] }),
            /* @__PURE__ */ a("h2", { className: "text-lg font-semibold text-dental-600 dark:text-dental-400", children: n(`intro.${c}t`) }),
            /* @__PURE__ */ a("p", { className: "text-sm leading-relaxed text-slate-600 dark:text-slate-300", children: n(`intro.${c}b`) })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex justify-center gap-1.5 pb-4", children: de.map((f, y) => /* @__PURE__ */ a(
            "button",
            {
              onClick: () => l(y),
              className: `h-1.5 rounded-full transition-all ${y === r ? "w-5 bg-dental-500" : "w-1.5 bg-slate-300 dark:bg-slate-600"}`,
              "aria-label": `Step ${y + 1}`
            },
            y
          )) }),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-700/60", children: [
            /* @__PURE__ */ a("button", { onClick: i, className: "text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors", children: n("intro.skip") }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
              r > 0 && /* @__PURE__ */ a("button", { onClick: () => l(r - 1), className: "px-3 py-1.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors", children: n("intro.back") }),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => r === p ? i() : l(r + 1),
                  className: "px-4 py-1.5 rounded-md text-xs font-semibold bg-dental-600 text-white hover:bg-dental-700 transition-colors",
                  children: n(r === p ? "intro.done" : "intro.next")
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function _t({ open: e, title: t, onClose: n, closeTitle: r, children: l }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: `
        fixed top-0 right-0 bottom-0 w-80 z-40
        bg-white/95 border-l border-slate-200 shadow-2xl backdrop-blur-sm
        dark:bg-slate-900/95 dark:border-slate-700
        transform transition-transform duration-200
        ${e ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-700", children: [
          /* @__PURE__ */ a("span", { className: "text-sm font-bold text-dental-600 dark:text-dental-400 select-none", children: t }),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: n,
              className: "w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 rounded",
              title: r,
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto p-3", children: l })
      ]
    }
  );
}
const Gt = [
  ["help.loadTitle", "help.loadBody"],
  ["help.panelsTitle", "help.panelsBody"],
  ["help.toolsTitle", "help.toolsBody"],
  ["help.layoutsTitle", "help.layoutsBody"],
  ["help.panoramicTitle", "help.panoramicBody"],
  ["help.crossTitle", "help.crossBody"],
  ["help.implantTitle", "help.implantBody"],
  ["help.layersTitle", "help.layersBody"],
  ["help.view3dTitle", "help.view3dBody"],
  ["help.exportTitle", "help.exportBody"],
  ["help.shortcutsTitle", "help.shortcutsBody"]
];
function Vt() {
  const { state: e, dispatch: t } = R(), { t: n } = M();
  return /* @__PURE__ */ a(
    _t,
    {
      open: e.activePanel === "help",
      title: n("help.title"),
      onClose: () => t({ type: "SET_ACTIVE_PANEL", payload: null }),
      closeTitle: n("layers.close"),
      children: /* @__PURE__ */ a("div", { className: "space-y-4", children: Gt.map(([r, l]) => /* @__PURE__ */ s("section", { children: [
        /* @__PURE__ */ a("h3", { className: "text-xs font-bold text-dental-600 dark:text-dental-400 mb-1 select-none", children: n(r) }),
        /* @__PURE__ */ a("p", { className: "text-xs leading-relaxed text-gray-700 dark:text-gray-300", children: n(l) })
      ] }, r)) })
    }
  );
}
function Ft() {
  const { state: e, dispatch: t } = R();
  return O(async (n) => {
    if (t({ type: "SET_LAYOUT_MODE", payload: n }), n === "OPG2+1") {
      if (!e.archCurveControlPoints && e.volumeId) {
        const { cache: r } = await import("@cornerstonejs/core"), l = r.getVolume(e.volumeId);
        if (l) {
          const i = l.origin, p = l.dimensions, c = l.spacing, f = [
            i[0] + p[0] * c[0] / 2,
            i[1] + p[1] * c[1] / 2
          ], y = [p[0] * c[0], p[1] * c[1]];
          t({ type: "SET_ARCH_CURVE", payload: Xe(f, y) });
        }
      }
      (await import("./toolManager-DUPAU9IU.js")).setActiveTool("windowLevel"), t({ type: "SET_ACTIVE_TOOL", payload: "windowLevel" });
    } else if (n === "2x2" || n === "1+3") {
      const { setActiveTool: r } = await import("./toolManager-DUPAU9IU.js");
      setTimeout(() => {
        r("crosshairs"), t({ type: "SET_ACTIVE_TOOL", payload: "crosshairs" });
      }, 150);
    } else e.activeTool === "crosshairs" && ((await import("./toolManager-DUPAU9IU.js")).setActiveTool("windowLevel"), t({ type: "SET_ACTIVE_TOOL", payload: "windowLevel" }));
  }, [e.archCurveControlPoints, e.volumeId, e.activeTool, t]);
}
function Ht() {
  return /* @__PURE__ */ s("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ a("rect", { x: "3", y: "3", width: "10", height: "18", rx: "1", strokeWidth: 1.6 }),
    /* @__PURE__ */ a("rect", { x: "15", y: "3", width: "6", height: "5.5", rx: "1", strokeWidth: 1.6 }),
    /* @__PURE__ */ a("rect", { x: "15", y: "9.25", width: "6", height: "5.5", rx: "1", strokeWidth: 1.6 }),
    /* @__PURE__ */ a("rect", { x: "15", y: "15.5", width: "6", height: "5.5", rx: "1", strokeWidth: 1.6 })
  ] });
}
const Ut = {
  AXIAL: "view.axial",
  SAGITTAL: "view.sagittal",
  CORONAL: "view.coronal",
  "3D": "view.3d"
};
function qt() {
  const { state: e, dispatch: t } = R(), { t: n } = M(), [r, l] = P(!1), i = j(null);
  L(() => {
    if (!r) return;
    const d = (w) => {
      i.current && !i.current.contains(w.target) && l(!1);
    };
    return window.addEventListener("mousedown", d), () => window.removeEventListener("mousedown", d);
  }, [r]);
  const { big: p, small: c, arrangement: f, grid: y, panoArrangement: z } = e.panel, k = e.layoutMode === "OPG2+1", g = (d, w) => {
    const b = [p, ...c], u = b[d];
    if (u === w) return;
    b[d] = w;
    const o = b.findIndex((S, x) => x !== d && S === w);
    o >= 0 && (b[o] = u), t({ type: "SET_PANEL", payload: { big: b[0], small: [b[1], b[2], b[3]] } });
  }, v = ({ label: d, value: w, onChange: b }) => /* @__PURE__ */ s("label", { className: "flex items-center justify-between gap-2", children: [
    /* @__PURE__ */ a("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: d }),
    /* @__PURE__ */ a(
      "select",
      {
        value: w,
        onChange: (u) => b(u.target.value),
        className: "text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 px-1.5 py-1",
        children: et.map((u) => /* @__PURE__ */ a("option", { value: u, children: n(Ut[u]) }, u))
      }
    )
  ] });
  return /* @__PURE__ */ s("div", { className: "relative", ref: i, children: [
    /* @__PURE__ */ a(
      "button",
      {
        onClick: () => l((d) => !d),
        title: n("layout.configure"),
        className: `h-7 px-1.5 flex items-center rounded transition-colors ${r ? "bg-dental-600 text-white" : "bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"}`,
        children: /* @__PURE__ */ a(Ht, {})
      }
    ),
    r && /* @__PURE__ */ a("div", { className: "absolute left-1/2 -translate-x-1/2 top-9 z-50 w-56 bg-white/95 border border-slate-200 rounded-lg shadow-xl p-3 space-y-3 dark:bg-slate-800/95 dark:border-slate-700 backdrop-blur-sm", children: k ? /* @__PURE__ */ s("div", { className: "space-y-1", children: [
      /* @__PURE__ */ a("span", { className: "block text-[11px] font-semibold text-gray-500 dark:text-gray-400", children: n("layout.arrangement") }),
      /* @__PURE__ */ a("div", { className: "flex gap-1", children: ["top", "left"].map((d) => /* @__PURE__ */ a(
        "button",
        {
          onClick: () => t({ type: "SET_PANEL", payload: { panoArrangement: d } }),
          className: `flex-1 px-2 py-1 text-xs rounded transition-colors ${z === d ? "bg-dental-600 text-white" : "bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"}`,
          children: n(d === "top" ? "layout.arrangeTop" : "layout.arrangeLeft")
        },
        d
      )) })
    ] }) : /* @__PURE__ */ s(U, { children: [
      /* @__PURE__ */ s("div", { className: "space-y-1", children: [
        /* @__PURE__ */ a("span", { className: "block text-[11px] font-semibold text-gray-500 dark:text-gray-400", children: n("layout.grid") }),
        /* @__PURE__ */ a("div", { className: "flex gap-1", children: ["1+3", "2x2"].map((d) => /* @__PURE__ */ a(
          "button",
          {
            onClick: () => t({ type: "SET_PANEL", payload: { grid: d } }),
            className: `flex-1 px-2 py-1 text-xs rounded font-mono transition-colors ${y === d ? "bg-dental-600 text-white" : "bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"}`,
            children: d === "1+3" ? "1+3" : "2×2"
          },
          d
        )) })
      ] }),
      y === "1+3" && /* @__PURE__ */ s("div", { className: "space-y-1", children: [
        /* @__PURE__ */ a("span", { className: "block text-[11px] font-semibold text-gray-500 dark:text-gray-400", children: n("layout.arrangement") }),
        /* @__PURE__ */ a("div", { className: "flex gap-1", children: ["left", "top"].map((d) => /* @__PURE__ */ a(
          "button",
          {
            onClick: () => t({ type: "SET_PANEL", payload: { arrangement: d } }),
            className: `flex-1 px-2 py-1 text-xs rounded transition-colors ${f === d ? "bg-dental-600 text-white" : "bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"}`,
            children: n(d === "left" ? "layout.arrangeLeft" : "layout.arrangeTop")
          },
          d
        )) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ a(v, { label: n("layout.big"), value: p, onChange: (d) => g(0, d) }),
        /* @__PURE__ */ a(v, { label: `${n("layout.small")} 1`, value: c[0], onChange: (d) => g(1, d) }),
        /* @__PURE__ */ a(v, { label: `${n("layout.small")} 2`, value: c[1], onChange: (d) => g(2, d) }),
        /* @__PURE__ */ a(v, { label: `${n("layout.small")} 3`, value: c[2], onChange: (d) => g(3, d) })
      ] })
    ] }) })
  ] });
}
const Wt = [
  { id: "why", key: "landing.nav.why" },
  { id: "views", key: "landing.nav.views" },
  { id: "tools", key: "landing.nav.tools" },
  { id: "presets", key: "landing.nav.presets" },
  { id: "privacy", key: "landing.nav.privacy" }
];
function Kt() {
  const { t: e } = M(), t = (n) => document.getElementById(n)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return /* @__PURE__ */ a("nav", { className: "hidden sm:flex items-center justify-center gap-1 flex-wrap", children: Wt.map((n) => /* @__PURE__ */ a(
    "button",
    {
      onClick: () => t(n.id),
      className: "px-3 py-1.5 text-xs font-medium rounded-full text-gray-600 hover:text-dental-600 hover:bg-dental-50 dark:text-gray-300 dark:hover:text-dental-300 dark:hover:bg-dental-900/30 transition-colors",
      children: e(n.key)
    },
    n.id
  )) });
}
const Zt = 1;
function Jt(e) {
  return {
    implants: e.implants,
    anatomy: e.anatomy,
    measurements: e.measurements,
    archCurveControlPoints: e.archCurveControlPoints,
    crossSectionPosition: e.crossSectionPosition,
    crossSectionTiltDeg: e.crossSectionTiltDeg,
    panoramicSlabWidth: e.panoramicSlabWidth,
    panoramicProjection: e.panoramicProjection,
    panoramicResolution: e.panoramicResolution,
    safety: e.safety,
    guide: e.guide,
    windowLevel: e.windowLevel,
    report: e.report,
    display: e.display,
    scans: e.scans
  };
}
function he(e, t) {
  return { version: Zt, ...t, ...Jt(e) };
}
const I = (e, t) => typeof e == "number" && Number.isFinite(e) ? e : t, N = (e, t) => typeof e == "string" ? e : t, V = (e, t) => typeof e == "boolean" ? e : t, Yt = 100, $t = 500, Qt = 50, Xt = 2e3, ea = 200, ta = 20, aa = 512, ie = (e) => !!e && typeof e == "object" && !Array.isArray(e), Z = (e) => typeof e == "number" && Number.isFinite(e), Y = (e, t) => Array.isArray(e) && e.length === t && e.every(Z);
function na(e) {
  return Array.isArray(e) ? e.filter((t) => ie(t) && typeof t.id == "string" && Y(t.position, 3) && Z(t.diameter) && Z(t.length)).slice(0, Yt) : [];
}
function ra(e) {
  return Array.isArray(e) ? e.filter((t) => ie(t) && typeof t.id == "string" && Z(t.radius) && Array.isArray(t.points) && t.points.length <= Xt && t.points.every((n) => Y(n, 3))).slice(0, Qt) : [];
}
function ia(e) {
  return Array.isArray(e) ? e.filter(
    (t) => ie(t) && typeof t.id == "string" && (t.points === void 0 || Array.isArray(t.points) && t.points.every((n) => Y(n, 2))) && (t.profile === void 0 || Array.isArray(t.profile) && t.profile.length <= aa && t.profile.every(Z))
  ).slice(0, $t) : [];
}
function la(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!ie(n) || typeof n.id != "string" || !n.id || !Y(n.transform, 16)) continue;
    const r = tt.includes(n.type) ? n.type : "oral", l = typeof n.color == "string" && /^#[0-9a-fA-F]{6}$/.test(n.color) ? n.color : me[r].color;
    if (t.push({
      id: n.id,
      name: N(n.name, r),
      type: r,
      color: l,
      opacity: Math.min(1, Math.max(0, I(n.opacity, me[r].opacity))),
      visible: V(n.visible, !0),
      transform: n.transform.slice(),
      fileName: N(n.fileName, "")
    }), t.length >= ta) break;
  }
  return t;
}
function sa(e) {
  return Array.isArray(e) ? e.filter((t) => Y(t, 2)).slice(0, ea) : null;
}
function oa(e) {
  if (!e || typeof e != "object" || typeof e.version != "number") return null;
  const t = e.safety ?? {}, n = e.guide ?? {}, r = e.windowLevel ?? {}, l = e.report ?? {}, i = e.display ?? {};
  return {
    studyInstanceUID: typeof e.studyInstanceUID == "string" ? e.studyInstanceUID : null,
    implants: na(e.implants),
    scans: la(e.scans),
    anatomy: ra(e.anatomy),
    measurements: ia(e.measurements),
    archCurveControlPoints: sa(e.archCurveControlPoints),
    crossSectionPosition: I(e.crossSectionPosition, 0.5),
    crossSectionTiltDeg: I(e.crossSectionTiltDeg, 0),
    panoramicSlabWidth: I(e.panoramicSlabWidth, 20),
    panoramicProjection: e.panoramicProjection === "MIP" ? "MIP" : "AVG",
    panoramicResolution: I(e.panoramicResolution, 0.3),
    safety: {
      marginMm: I(t.marginMm, 1),
      color: N(t.color, "#ff3c3c"),
      nerveMm: I(t.nerveMm, 2),
      sinusMm: I(t.sinusMm, 1),
      neighborMm: I(t.neighborMm, 3)
    },
    guide: {
      wallMm: I(n.wallMm, G.wallMm),
      baseWidthMm: I(n.baseWidthMm, G.baseWidthMm),
      baseHeightMm: I(n.baseHeightMm, G.baseHeightMm),
      channelTolMm: I(n.channelTolMm, G.channelTolMm),
      segments: I(n.segments, G.segments),
      sleeveSeat: typeof n.sleeveSeat == "boolean" ? n.sleeveSeat : G.sleeveSeat,
      seatClearanceMm: I(n.seatClearanceMm, G.seatClearanceMm),
      sleeveWallMm: I(n.sleeveWallMm, G.sleeveWallMm)
    },
    windowLevel: { wc: I(r.wc, 300), ww: I(r.ww, 2500) },
    report: {
      patientName: N(l.patientName, ""),
      patientAge: N(l.patientAge, ""),
      patientBirthDate: N(l.patientBirthDate, ""),
      quoteNumber: N(l.quoteNumber, ""),
      statusDescription: N(l.statusDescription, ""),
      clinic: N(l.clinic, ""),
      studyDate: N(l.studyDate, ""),
      seriesName: N(l.seriesName, "")
    },
    display: {
      showName: V(i.showName, D.showName),
      showBirth: V(i.showBirth, D.showBirth),
      showDate: V(i.showDate, D.showDate),
      showClinic: V(i.showClinic, D.showClinic),
      labelColor: N(i.labelColor, D.labelColor),
      labelSizeMain: I(i.labelSizeMain, I(i.labelSize, D.labelSizeMain)),
      labelSizeSide: I(i.labelSizeSide, D.labelSizeSide),
      labelAlign: i.labelAlign === "left" || i.labelAlign === "right" ? i.labelAlign : "center",
      showSeries: V(i.showSeries, D.showSeries),
      showModality: V(i.showModality, D.showModality),
      showSlice: V(i.showSlice, D.showSlice),
      scope: i.scope === "main" ? "main" : "all",
      sliceOpacity: I(i.sliceOpacity, D.sliceOpacity),
      preset3d: N(i.preset3d, D.preset3d),
      quality3d: i.quality3d === "low" || i.quality3d === "high" ? i.quality3d : D.quality3d,
      colormap3d: ["grayscale", "cool", "warm", "spectral", "inverted"].includes(i.colormap3d) ? i.colormap3d : D.colormap3d
    }
  };
}
function Fe() {
  const { state: e, dispatch: t } = R(), { t: n } = M();
  return O(async (r) => {
    const [{ loadScanPolyData: l, setScanPolyData: i, setScanBaseTransform: p, polyDataCenter: c, translation16: f, IDENTITY16: y, hasScanPolyData: z }, { getVolumeData: k }] = await Promise.all([import("./scanMesh-NquU4Ro1.js"), import("./cprEngine-XRs08qxT.js")]), g = e.volumeId ? k(e.volumeId) : null, v = g ? [
      g.origin[0] + (g.dims[0] - 1) / g.invSx / 2,
      g.origin[1] + (g.dims[1] - 1) / g.invSy / 2,
      g.origin[2] + (g.dims[2] - 1) / g.invSz / 2
    ] : null, d = [], w = [];
    for (const b of r) {
      const u = await l(b);
      if (!u) {
        w.push(b.name);
        continue;
      }
      const o = e.scans.find(
        (E) => E.fileName === b.name && !z(E.id)
      );
      if (o) {
        i(o.id, u), p(o.id, o.transform), t({ type: "UPDATE_SCAN", payload: { ...o, visible: !0 } }), d.push(o);
        continue;
      }
      const S = `scan_${Date.now()}_${d.length}`;
      i(S, u);
      let x = y;
      if (v) {
        const E = c(u);
        x = f(v[0] - E[0], v[1] - E[1], v[2] - E[2]);
      }
      const h = at(b.name), T = me[h], B = {
        id: S,
        name: b.name.replace(/\.[^.]+$/, ""),
        type: h,
        color: T.color,
        opacity: T.opacity,
        visible: !0,
        transform: x,
        fileName: b.name
      };
      p(S, x), t({ type: "ADD_SCAN", payload: B }), d.push(B);
    }
    return w.length && window.alert(`${n("scan.invalid")}

${w.join(`
`)}`), { added: d, failed: w };
  }, [e.volumeId, e.scans, t, n]);
}
const da = J(() => import("./ImageExportModal-CdSTtWSn.js").then((e) => ({ default: e.ImageExportModal }))), ca = J(() => import("./PdfExportModal-BXQged11.js").then((e) => ({ default: e.PdfExportModal }))), pa = [
  { id: "1x1", labelKey: "layout.view2d" },
  { id: "1+3", labelKey: "layout.view3d" },
  { id: "IO3D", labelKey: "layout.viewIo3d", needsIoScan: !0 },
  { id: "OPG2+1", labelKey: "layout.panoramic" }
];
function ma() {
  return /* @__PURE__ */ s("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ a("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
    /* @__PURE__ */ a("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
  ] });
}
function ua() {
  return /* @__PURE__ */ s("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "5" }),
    /* @__PURE__ */ a("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
    /* @__PURE__ */ a("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
    /* @__PURE__ */ a("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
    /* @__PURE__ */ a("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
    /* @__PURE__ */ a("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
    /* @__PURE__ */ a("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
    /* @__PURE__ */ a("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
    /* @__PURE__ */ a("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
  ] });
}
function ga() {
  return /* @__PURE__ */ a("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ a("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }) });
}
function ha() {
  return /* @__PURE__ */ s("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ a("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
  ] });
}
function fa() {
  return /* @__PURE__ */ s("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("path", { d: "M12 3l1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3z" }),
    /* @__PURE__ */ a("path", { d: "M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" })
  ] });
}
function ya() {
  return /* @__PURE__ */ s("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ a("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
    /* @__PURE__ */ a("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
  ] });
}
function ba() {
  return /* @__PURE__ */ s("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ a("polyline", { points: "7 10 12 15 17 10" }),
    /* @__PURE__ */ a("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
  ] });
}
function va() {
  return /* @__PURE__ */ s("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ a("polyline", { points: "17 8 12 3 7 8" }),
    /* @__PURE__ */ a("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
  ] });
}
function ka() {
  return /* @__PURE__ */ s("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ a("path", { d: "M12 2 2 7l10 5 10-5-10-5z" }),
    /* @__PURE__ */ a("path", { d: "M2 17l10 5 10-5" }),
    /* @__PURE__ */ a("path", { d: "M2 12l10 5 10-5" })
  ] });
}
function ae({
  title: e,
  active: t = !1,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ a(
    "button",
    {
      onClick: n,
      title: e,
      className: `
        w-8 h-8 flex items-center justify-center rounded transition-colors
        ${t ? "bg-dental-600 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}
      `,
      children: r
    }
  );
}
function wa({ embedded: e } = {}) {
  const { state: t, dispatch: n } = R(), { lang: r, setLang: l, t: i } = M(), { theme: p, toggleTheme: c } = Ge(), f = Ft(), [y, z] = P(!1), k = j(null), [g, v] = P(!1), [d, w] = P(!1), [b, u] = P(!1), o = j(null), [S, x] = P(!1), h = j(null), T = j(null), B = Fe(), E = ve(), q = t.scans.some((m) => Me(m.type)), $ = pa.filter((m) => !m.needsIoScan || q), He = () => {
    const m = he(t, {
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      studyInstanceUID: t.study?.studyInstanceUID ?? null,
      patientId: t.study?.patientId ?? null
    }), C = new Blob([JSON.stringify(m, null, 2)], { type: "application/json" }), _ = URL.createObjectURL(C), A = document.createElement("a");
    A.download = `dental_plan_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, A.href = _, A.click(), URL.revokeObjectURL(_), v(!1);
  }, ke = j(null), [Ue, we] = P(!1), ze = t.implants.some((m) => m.guided?.enabled), qe = async () => {
    if (v(!1), !t.scans.some((A) => A.visible) && !window.confirm(i("guide.confirmNoScan"))) return;
    const { checkGuide: m, exportDrillGuideStl: C } = await import("./viewerExports-B33A0LLc.js"), _ = m(t);
    if (_.length > 0) {
      const A = _.map((H) => `${H.severity === "error" ? "⛔" : "⚠️"} ${i(`guideCheck.${H.code}`)}${H.detail ? ` (${H.detail})` : ""}`), Q = _.some((H) => H.severity === "error"), Ze = `${i(Q ? "guideCheck.errorIntro" : "guideCheck.warnIntro")}

${A.join(`
`)}

${i("guideCheck.proceed")}`;
      if (!window.confirm(Ze)) return;
    }
    we(!0);
    try {
      const { ok: A, warnings: Q } = await C(t);
      if (!A) {
        window.alert(i("guide.noImplants"));
        return;
      }
      Q.includes("scan-not-watertight") && window.alert(i("guide.warnScan")), Q.includes("housing-disconnected") && window.alert(i("guide.warnDisconnected"));
    } catch (A) {
      console.error("[guide] export failed", A), window.alert(i("guide.error"));
    } finally {
      we(!1);
    }
  }, We = async (m) => {
    try {
      const C = JSON.parse(await m.text()), _ = oa(C);
      if (!_) {
        window.alert(i("plan.invalid"));
        return;
      }
      const A = C.studyInstanceUID;
      if (A && t.study && A !== t.study.studyInstanceUID && !window.confirm(i("plan.mismatch")))
        return;
      n({ type: "LOAD_PLAN", payload: _ });
    } catch {
      window.alert(i("plan.invalid"));
    }
  };
  L(() => {
    if (!g) return;
    const m = (C) => {
      o.current && !o.current.contains(C.target) && v(!1);
    };
    return window.addEventListener("mousedown", m), () => window.removeEventListener("mousedown", m);
  }, [g]), L(() => {
    if (!S) return;
    const m = (C) => {
      h.current && !h.current.contains(C.target) && x(!1);
    };
    return window.addEventListener("mousedown", m), () => window.removeEventListener("mousedown", m);
  }, [S]), L(() => {
    if (!y) return;
    const m = (C) => {
      k.current && !k.current.contains(C.target) && z(!1);
    };
    return window.addEventListener("mousedown", m), () => window.removeEventListener("mousedown", m);
  }, [y]);
  const Ke = Ie.find((m) => m.id === r);
  return /* @__PURE__ */ s("div", { className: "relative z-40 flex items-center justify-between px-4 py-1.5 bg-white/95 border-b border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 backdrop-blur-sm", children: [
    Ue && /* @__PURE__ */ s("div", { className: "fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-black/60 select-none", children: [
      /* @__PURE__ */ a("div", { className: "w-12 h-12 border-4 border-dental-400 border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ a("span", { className: "text-dental-200 text-xl font-semibold [text-shadow:_0_1px_4px_rgb(0_0_0)]", children: i("guide.building") })
    ] }),
    e ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 select-none px-1 py-0.5", children: [
      /* @__PURE__ */ a("img", { src: F("denct-ikon.png"), alt: "", "aria-hidden": !0, className: "w-6 h-6 rounded-md object-contain" }),
      /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-dental-600 dark:text-dental-400", children: i("app.title") })
    ] }) : /* @__PURE__ */ s(
      "button",
      {
        onClick: () => {
          t.study && n({ type: "RESET" });
        },
        title: t.study ? i("topbar.newLoad") : i("app.title"),
        className: "flex items-center gap-2 select-none rounded px-1 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
        children: [
          /* @__PURE__ */ a("img", { src: F("denct-ikon.png"), alt: "", "aria-hidden": !0, className: "w-6 h-6 rounded-md object-contain" }),
          /* @__PURE__ */ a("span", { className: "text-sm font-semibold text-dental-600 dark:text-dental-400", children: i("app.title") })
        ]
      }
    ),
    t.study && /* @__PURE__ */ s("div", { className: "flex items-center gap-1", children: [
      $.map((m) => /* @__PURE__ */ a(
        "button",
        {
          onClick: () => f(m.id),
          className: `
                px-2 py-1 text-xs rounded font-mono transition-colors
                ${t.layoutMode === m.id ? "bg-dental-600 text-white" : "bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700"}
              `,
          title: i("toolbar.layout", { label: i(m.labelKey) }),
          children: i(m.labelKey)
        },
        m.id
      )),
      (t.layoutMode === "1+3" || t.layoutMode === "OPG2+1") && /* @__PURE__ */ a(qt, {})
    ] }),
    !t.study && !e && /* @__PURE__ */ a(Kt, {}),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1", children: [
      t.study && !e && /* @__PURE__ */ s("div", { className: "relative", ref: h, children: [
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => x((m) => !m),
            title: i("topbar.newLoad"),
            className: "h-8 px-2 flex items-center gap-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ a(va, {}),
              /* @__PURE__ */ a("span", { className: "text-xs", children: i("topbar.newLoad") })
            ]
          }
        ),
        S && /* @__PURE__ */ s("div", { className: "absolute right-0 top-9 z-50 w-44 bg-white/95 border border-slate-200 rounded-lg shadow-xl py-1 dark:bg-slate-800/95 dark:border-slate-700 backdrop-blur-sm", children: [
          /* @__PURE__ */ s(
            "button",
            {
              onClick: () => {
                x(!1), ke.current?.click();
              },
              className: "w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: [
                /* @__PURE__ */ a(ka, {}),
                i("scan.import")
              ]
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                x(!1), E("ct");
              },
              className: "w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("newload.loadCtSample")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                x(!1), E("ctIo");
              },
              className: "w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("newload.loadCtIoSample")
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "input",
          {
            ref: ke,
            type: "file",
            accept: ".stl,.obj,.ply,model/stl,model/obj",
            className: "hidden",
            multiple: !0,
            onChange: (m) => {
              const C = m.target.files;
              C?.length && B(Array.from(C)), m.target.value = "";
            }
          }
        )
      ] }),
      t.study && /* @__PURE__ */ s("div", { className: "relative", ref: o, children: [
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => v((m) => !m),
            title: i("export.button"),
            className: "h-8 px-2 flex items-center gap-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ a(ba, {}),
              /* @__PURE__ */ a("span", { className: "text-xs", children: i("export.button") })
            ]
          }
        ),
        g && /* @__PURE__ */ s("div", { className: "absolute right-0 top-9 z-50 w-44 bg-white/95 border border-slate-200 rounded-lg shadow-xl py-1 dark:bg-slate-800/95 dark:border-slate-700 backdrop-blur-sm", children: [
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                v(!1), w(!0);
              },
              className: "w-full px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("export.saveImage")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                v(!1), u(!0);
              },
              className: "w-full px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("export.savePdf")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: qe,
              disabled: !ze,
              title: ze ? void 0 : i("guide.noImplants"),
              className: "w-full px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors",
              children: i("guide.export")
            }
          ),
          /* @__PURE__ */ a("div", { className: "my-1 border-t border-gray-200 dark:border-gray-700" }),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: He,
              className: "w-full px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("plan.save")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                v(!1), T.current?.click();
              },
              className: "w-full px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors",
              children: i("plan.load")
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "input",
          {
            ref: T,
            type: "file",
            accept: "application/json,.json",
            className: "hidden",
            onChange: (m) => {
              const C = m.target.files?.[0];
              C && We(C), m.target.value = "";
            }
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "relative", ref: k, style: e ? { display: "none" } : void 0, children: [
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => z((m) => !m),
            title: i("topbar.language"),
            className: "h-8 px-2 flex items-center gap-1.5 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ a(ma, {}),
              /* @__PURE__ */ a("span", { className: "text-xs font-mono uppercase", children: Ke.id })
            ]
          }
        ),
        y && /* @__PURE__ */ a("div", { className: "absolute right-0 top-9 z-50 w-36 bg-white/95 border border-slate-200 rounded-lg shadow-xl py-1 dark:bg-slate-800/95 dark:border-slate-700 backdrop-blur-sm", children: Ie.map((m) => /* @__PURE__ */ s(
          "button",
          {
            onClick: () => {
              l(m.id), z(!1);
            },
            className: `
                    w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors
                    ${m.id === r ? "text-dental-600 dark:text-dental-400 font-semibold" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"}
                  `,
            children: [
              /* @__PURE__ */ a("span", { children: m.flag }),
              /* @__PURE__ */ a("span", { children: m.label })
            ]
          },
          m.id
        )) })
      ] }),
      !e && /* @__PURE__ */ a(ae, { title: i("topbar.theme"), onClick: c, children: p === "dark" ? /* @__PURE__ */ a(ua, {}) : /* @__PURE__ */ a(ga, {}) }),
      t.study && /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ a(
          ae,
          {
            title: i("topbar.settings"),
            active: t.activePanel === "settings",
            onClick: () => n({ type: "TOGGLE_PANEL", payload: "settings" }),
            children: /* @__PURE__ */ a(ha, {})
          }
        ),
        /* @__PURE__ */ a(
          ae,
          {
            title: i("topbar.intro"),
            active: t.activePanel === "intro",
            onClick: () => n({ type: "TOGGLE_PANEL", payload: "intro" }),
            children: /* @__PURE__ */ a(fa, {})
          }
        ),
        /* @__PURE__ */ a(
          ae,
          {
            title: i("topbar.help"),
            active: t.activePanel === "help",
            onClick: () => n({ type: "TOGGLE_PANEL", payload: "help" }),
            children: /* @__PURE__ */ a(ya, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s(pe, { fallback: null, children: [
      d && /* @__PURE__ */ a(da, { open: !0, onClose: () => w(!1) }),
      b && /* @__PURE__ */ a(ca, { open: !0, onClose: () => u(!1) })
    ] })
  ] });
}
const za = J(() => import("./ViewerShell-BS1WMwfj.js").then((e) => ({ default: e.ViewerShell }))), xa = J(() => import("./StatusBar-CElKMH5m.js").then((e) => ({ default: e.StatusBar }))), Sa = J(() => import("./SettingsPanel--HO3wp6Z.js").then((e) => ({ default: e.SettingsPanel })));
function ce({ label: e }) {
  return /* @__PURE__ */ a("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ s("div", { className: "text-center", children: [
    /* @__PURE__ */ a("div", { className: "w-12 h-12 border-4 border-dental-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
    /* @__PURE__ */ a("p", { className: "text-gray-600 dark:text-gray-400", children: e })
  ] }) });
}
const Ia = {
  w: "windowLevel",
  p: "pan",
  z: "zoom",
  s: "scroll",
  l: "length",
  a: "angle",
  e: "ellipticalRoi",
  c: "circleRoi",
  r: "rectangleRoi",
  f: "freehandRoi",
  b: "bidirectional",
  h: "probe",
  n: "arrowAnnotate",
  x: "crosshairs"
};
function Ca({
  props: e,
  handleRef: t
}) {
  const { state: n, dispatch: r } = R(), { t: l, lang: i, setLang: p } = M(), { theme: c } = Ge(), { loadFiles: f } = Ve(), y = j(n);
  y.current = n;
  const z = () => ({
    savedAt: (/* @__PURE__ */ new Date()).toISOString(),
    studyInstanceUID: y.current.study?.studyInstanceUID ?? null,
    patientId: y.current.study?.patientId ?? null
  }), k = ve(), g = Fe();
  $e(t, () => ({
    getImplants: () => y.current.implants,
    addImplant: (o) => r({ type: "ADD_IMPLANT", payload: o }),
    updateImplant: (o) => r({ type: "UPDATE_IMPLANT", payload: o }),
    removeImplant: (o) => r({ type: "REMOVE_IMPLANT", payload: o }),
    getPlan: () => he(y.current, z()),
    loadPlan: (o) => r({ type: "LOAD_PLAN", payload: o }),
    loadStudy: (o) => f(o),
    loadScans: (o) => g(o).then(() => {
    }),
    loadSample: (o = "ct") => k(o).then(() => {
    }),
    setLayout: (o) => r({ type: "SET_LAYOUT_MODE", payload: o }),
    setActiveView: (o) => r({ type: "SET_VIEW_MODE", payload: o }),
    exportPdf: () => import("./viewerExports-B33A0LLc.js").then((o) => o.exportPlanPdf(y.current, l, i)),
    exportGuideStl: () => import("./viewerExports-B33A0LLc.js").then((o) => o.exportDrillGuideStl(y.current)).then((o) => o.ok)
  }), [r, f, g, k, l, i]);
  const v = j(!1);
  L(() => {
    v.current || !n.isInitialized || (v.current = !0, e.initialLayout && r({ type: "SET_LAYOUT_MODE", payload: e.initialLayout }), e.initialPlan && r({ type: "LOAD_PLAN", payload: e.initialPlan }));
  }, [n.isInitialized, e.initialLayout, e.initialPlan, r]), L(() => {
    e.lang && e.lang !== i && p(e.lang);
  }, [e.lang, i, p]);
  const d = e.onImplantsChange;
  L(() => {
    d?.(n.implants);
  }, [n.implants, d]);
  const w = e.onPlanChange;
  L(() => {
    if (!w) return;
    const o = setTimeout(() => w(he(y.current, z())), 500);
    return () => clearTimeout(o);
  }, [
    w,
    n.implants,
    n.anatomy,
    n.measurements,
    n.archCurveControlPoints,
    n.crossSectionPosition,
    n.crossSectionTiltDeg,
    n.safety,
    n.report,
    n.guide
  ]);
  const b = O(
    (o) => {
      if (o.target instanceof HTMLInputElement || o.target instanceof HTMLTextAreaElement) return;
      const S = Ia[o.key.toLowerCase()];
      S && (import("./toolManager-DUPAU9IU.js").then((x) => x.setActiveTool(S)), r({ type: "SET_ACTIVE_TOOL", payload: S }));
    },
    [r]
  );
  L(() => (window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b)), [b]), L(() => {
    !n.study || n.isInitialized || be().then(() => {
      r({ type: "SET_INITIALIZED" });
    }).catch((o) => {
      r({
        type: "SET_ERROR",
        payload: l("app.initError", { msg: o instanceof Error ? o.message : String(o) })
      });
    });
  }, [n.study, n.isInitialized, r, l]);
  let u;
  return n.error && !n.study ? u = /* @__PURE__ */ a("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ s("div", { className: "text-center max-w-md", children: [
    /* @__PURE__ */ a("p", { className: "text-red-500 dark:text-red-400 mb-4", children: n.error }),
    /* @__PURE__ */ a(
      "button",
      {
        onClick: () => r({ type: "SET_ERROR", payload: null }),
        className: "px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded transition-colors",
        children: l("app.retry")
      }
    )
  ] }) }) : n.study ? n.isInitialized ? u = /* @__PURE__ */ a(pe, { fallback: /* @__PURE__ */ a(ce, { label: l("app.initializing") }), children: /* @__PURE__ */ a(za, { embedded: e.embedded }) }) : u = /* @__PURE__ */ a(ce, { label: l("app.initializing") }) : u = e.embedded ? /* @__PURE__ */ a(ce, { label: l("app.initializing") }) : /* @__PURE__ */ a(Ot, {}), /* @__PURE__ */ a("div", { className: `dcv-root ${c === "dark" ? "dark" : ""} ${e.className ?? ""} h-full w-full`, children: /* @__PURE__ */ s("div", { className: "flex flex-col h-full w-full overflow-hidden bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ a(wa, { embedded: e.embedded }),
    /* @__PURE__ */ a("div", { className: "flex-1 overflow-hidden", children: u }),
    /* @__PURE__ */ s(pe, { fallback: null, children: [
      n.study && /* @__PURE__ */ a(xa, {}),
      n.activePanel === "settings" && /* @__PURE__ */ a(Sa, {})
    ] }),
    !e.embedded && /* @__PURE__ */ a(Rt, {}),
    /* @__PURE__ */ a(Vt, {}),
    !e.embedded && /* @__PURE__ */ a(jt, {})
  ] }) });
}
const Ta = Ye((e, t) => /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ a(St, { children: /* @__PURE__ */ a(ft, { children: /* @__PURE__ */ a(Ca, { props: e, handleRef: t }) }) }) }));
Ta.displayName = "DicomViewer";
export {
  Ta as D,
  nt as J,
  xe as M,
  ne as N,
  Et as O,
  M as a,
  Ge as b,
  Ve as c,
  Fe as d,
  Na as e,
  Ea as f,
  mt as g,
  oa as h,
  he as i,
  La as j,
  Ne as l,
  F as p,
  pt as s,
  R as u
};
//# sourceMappingURL=index-Bc8SPET-.js.map
