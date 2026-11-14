import { init as i, getWebWorkerManager as m, volumeLoader as s, cornerstoneStreamingImageVolumeLoader as g } from "@cornerstonejs/core";
import { init as c } from "@cornerstonejs/tools";
import * as e from "@cornerstonejs/dicom-image-loader";
let o = !1;
async function k() {
  if (o) return;
  console.log("[DQ-DICOM] Initializing..."), i(), c(), e.wadouri.register(), e.wadors.register();
  const a = () => {
    const r = new Worker(
      new URL(
        /* @vite-ignore */
        "/assets/decodeImageFrameWorker-AH7Pp-7b.js",
        import.meta.url
      ),
      { type: "module" }
    );
    return r.onerror = (t) => console.error("[DQ-DICOM] Worker load error:", t), r;
  }, n = navigator.hardwareConcurrency ? Math.max(1, Math.floor(navigator.hardwareConcurrency / 2)) : 1;
  m().registerWorker("dicomImageLoader", a, {
    maxWorkerInstances: n
  }), s.registerVolumeLoader(
    "cornerstoneStreamingImageVolume",
    g
  ), o = !0, console.log("[DQ-DICOM] Ready");
}
export {
  k as initCornerstone
};
//# sourceMappingURL=init-CAh5dDeW.js.map
