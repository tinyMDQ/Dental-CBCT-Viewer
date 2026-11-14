import { ToolGroupManager as s, CrosshairsTool as T, ProbeTool as m, ArrowAnnotateTool as c, BidirectionalTool as N, PlanarFreehandROITool as g, RectangleROITool as p, CircleROITool as f, EllipticalROITool as R, AngleTool as A, LengthTool as b, StackScrollTool as r, ZoomTool as n, PanTool as i, WindowLevelTool as O, Enums as a, addTool as t, TrackballRotateTool as u } from "@cornerstonejs/tools";
import { T as v, a as L } from "./constants-DMHmwL7Y.js";
const w = "rgb(255, 214, 60)", I = "rgb(74, 163, 255)";
function M(o) {
  return o.includes("AXIAL") ? w : I;
}
let B = !1;
function S() {
  if (B) return;
  t(O), t(i), t(n), t(r), t(u), t(b), t(A), t(R), t(f), t(p), t(g), t(N), t(c), t(m), t(T);
  const o = s.createToolGroup(L);
  if (!o) return;
  o.addTool(O.toolName), o.addTool(i.toolName), o.addTool(n.toolName), o.addTool(r.toolName), o.addTool(b.toolName), o.addTool(A.toolName), o.addTool(R.toolName), o.addTool(f.toolName), o.addTool(p.toolName), o.addTool(g.toolName), o.addTool(N.toolName), o.addTool(c.toolName), o.addTool(m.toolName), o.addTool(T.toolName, {
    // CrosshairsTool calls this with a SINGLE arg — the id of the viewport whose
    // plane the line represents (not two args, as it may look).
    getReferenceLineColor: (l) => M(l),
    getReferenceLineControllable: () => !0,
    getReferenceLineDraggableRotatable: () => !0,
    getReferenceLineSlabThicknessControlsOn: () => !1
  }), o.setToolActive(r.toolName, {
    bindings: [{ mouseButton: a.MouseBindings.Wheel }]
  }), C("windowLevel");
  const e = s.createToolGroup(v);
  e && (e.addTool(u.toolName), e.addTool(i.toolName), e.addTool(n.toolName), e.setToolActive(u.toolName, {
    bindings: [{ mouseButton: a.MouseBindings.Primary }]
  }), e.setToolActive(i.toolName, {
    bindings: [{ mouseButton: a.MouseBindings.Auxiliary }]
  }), e.setToolActive(n.toolName, {
    bindings: [{ mouseButton: a.MouseBindings.Secondary }]
  })), B = !0;
}
const G = {
  windowLevel: O.toolName,
  pan: i.toolName,
  zoom: n.toolName,
  scroll: r.toolName,
  length: b.toolName,
  angle: A.toolName,
  ellipticalRoi: R.toolName,
  circleRoi: f.toolName,
  rectangleRoi: p.toolName,
  freehandRoi: g.toolName,
  bidirectional: N.toolName,
  arrowAnnotate: c.toolName,
  probe: m.toolName,
  crosshairs: T.toolName
}, h = Object.values(G);
function C(o) {
  const e = s.getToolGroup(L);
  if (!e) return;
  for (const d of h)
    d === T.toolName ? e.setToolDisabled(d) : e.setToolPassive(d);
  const l = G[o];
  if (l) {
    if (o === "crosshairs" && e.getViewportIds().length < 2) {
      console.warn("[DQ-DICOM] Crosshairs requires MPR layout (2+ viewports)");
      return;
    }
    e.setToolActive(l, {
      bindings: [{ mouseButton: a.MouseBindings.Primary }]
    }), e.setToolActive(i.toolName, {
      bindings: [{ mouseButton: a.MouseBindings.Auxiliary }]
    }), e.setToolActive(n.toolName, {
      bindings: [{ mouseButton: a.MouseBindings.Secondary }]
    }), e.setToolActive(r.toolName, {
      bindings: [{ mouseButton: a.MouseBindings.Wheel }]
    });
  }
}
function D(o, e) {
  const l = s.getToolGroup(L);
  l && l.addViewport(o, e);
}
function y(o, e) {
  const l = s.getToolGroup(v);
  l && l.addViewport(o, e);
}
export {
  y as addViewportTo3DToolGroup,
  D as addViewportToToolGroup,
  C as setActiveTool,
  S as setupTools
};
//# sourceMappingURL=toolManager-DUPAU9IU.js.map
