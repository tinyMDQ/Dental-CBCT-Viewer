import { getRenderingEngine as b } from "@cornerstonejs/core";
import { R as y, b as A } from "./constants-DMHmwL7Y.js";
function M(t, s, n) {
  const i = t.cloneNode(!0);
  i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i.setAttribute("width", String(s)), i.setAttribute("height", String(n));
  const o = new XMLSerializer().serializeToString(i), a = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(o)}`;
  return new Promise((e) => {
    const c = new Image(), r = setTimeout(() => e(null), 2500);
    c.onload = () => {
      clearTimeout(r), e(c);
    }, c.onerror = () => {
      clearTimeout(r), e(null);
    }, c.src = a;
  });
}
async function T(t, s = 2) {
  const n = t.querySelector("canvas");
  if (!n || !n.width || !n.height) return null;
  const i = n.width, o = n.height, a = t.clientWidth, e = t.clientHeight;
  if (!a || !e) return null;
  const c = Math.min(a / i, e / o), r = i * c, l = o * c, m = (a - r) / 2, d = (e - l) / 2, h = document.createElement("canvas");
  h.width = Math.round(i * s), h.height = Math.round(o * s);
  const f = h.getContext("2d");
  if (!f) return null;
  if (f.drawImage(n, 0, 0, h.width, h.height), t.getAttribute("data-vp") !== "3D")
    for (const p of Array.from(t.querySelectorAll("svg"))) {
      const u = await M(p, a, e);
      u && f.drawImage(u, m, d, r, l, 0, 0, h.width, h.height);
    }
  return h;
}
async function E() {
  const t = b(y)?.getViewport(A);
  if (!t?.getActors) return [];
  const s = [];
  try {
    for (const n of t.getActors())
      typeof n.uid == "string" && n.uid.startsWith("slice3d:") && n.actor?.getVisibility?.() && (n.actor.setVisibility(!1), s.push(n.actor));
    t.render(), await new Promise((n) => {
      let i = !1;
      const o = () => {
        i || (i = !0, n(null));
      };
      requestAnimationFrame(() => requestAnimationFrame(o)), setTimeout(o, 1500);
    });
  } catch {
  }
  return s;
}
function C(t) {
  if (t.length)
    try {
      for (const s of t) s.setVisibility?.(!0);
      b(y)?.getViewport(A)?.render();
    } catch {
    }
}
const S = {
  AXIAL: { top: "A", bottom: "P", left: "R", right: "L" },
  SAGITTAL: { top: "S", bottom: "I", left: "A", right: "P" },
  CORONAL: { top: "S", bottom: "I", left: "R", right: "L" }
};
function g(t, s, n, i, o, a, e, c, r = !1) {
  s && (t.font = `${r ? "bold " : ""}${e}px ui-monospace, "SF Mono", Menlo, monospace`, t.textAlign = o, t.textBaseline = a, t.lineJoin = "round", t.lineWidth = Math.max(2, e / 6), t.strokeStyle = "rgba(0,0,0,0.85)", t.strokeText(s, n, i), t.fillStyle = c, t.fillText(s, n, i));
}
function I(t) {
  for (const s of Array.from(t.querySelectorAll("div, span"))) {
    const n = s.textContent?.trim() ?? "";
    if (/^\d+\s*\/\s*\d+$/.test(n)) return n;
  }
  return "";
}
function L(t, s, n, i, o, a) {
  const e = t.getContext("2d");
  if (!e) return;
  const c = t.width, r = t.height, l = Math.round(r * 0.02), m = Math.max(11, Math.round(r * 0.028)), d = m * 1.25, h = "#ffffff";
  let f = l;
  i.name && o.name && (g(e, o.name, l, f, "left", "top", m, h, !0), f += d), i.birth && o.birth && (g(e, o.birth, l, f, "left", "top", m, h), f += d), f = l, i.date && o.date && (g(e, o.date, c - l, f, "right", "top", m, h), f += d), i.clinic && o.clinic && (g(e, o.clinic, c - l, f, "right", "top", m, h), f += d);
  let p = r - l;
  if (i.modality && o.modality && (g(e, o.modality, l, p, "left", "bottom", m, h), p -= d), i.series && o.series && (g(e, o.series, l, p, "left", "bottom", m, h), p -= d), i.slice) {
    const u = I(s);
    u && g(e, u, c - l, r - l, "right", "bottom", m, h);
  }
  if (i.viewTitle && a && g(e, a, c / 2, l, "center", "top", m, o.color, !0), i.orientation) {
    const u = S[n];
    if (u) {
      const w = Math.max(10, Math.round(r * 0.026));
      g(e, u.top, c / 2, l + m * 1.5, "center", "top", w, o.color), g(e, u.bottom, c / 2, r - l, "center", "bottom", w, o.color), g(e, u.left, l, r / 2, "left", "middle", w, o.color), g(e, u.right, c - l, r / 2, "right", "middle", w, o.color);
    }
  }
}
function P(t, s) {
  const i = Math.max(...t.map((r) => r.width)), o = Math.max(...t.map((r) => r.height)), a = Math.ceil(t.length / s), e = document.createElement("canvas");
  e.width = s * i + (s - 1) * 8, e.height = a * o + (a - 1) * 8;
  const c = e.getContext("2d");
  return c.fillStyle = "#000", c.fillRect(0, 0, e.width, e.height), t.forEach((r, l) => {
    const m = l % s * (i + 8), d = Math.floor(l / s) * (o + 8), h = Math.min(i / r.width, o / r.height), f = r.width * h, p = r.height * h;
    c.drawImage(r, m + (i - f) / 2, d + (o - p) / 2, f, p);
  }), e;
}
function D(t, s, n, i) {
  const o = n === "jpg" ? "image/jpeg" : "image/png", a = t.toDataURL(o, n === "jpg" ? i : void 0), e = document.createElement("a");
  e.download = s, e.href = a, e.click();
}
export {
  P as a,
  L as b,
  T as c,
  D as d,
  E as h,
  C as r
};
//# sourceMappingURL=viewCapture-CEyQDR5u.js.map
