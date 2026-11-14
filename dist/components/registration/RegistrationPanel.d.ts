/**
 * 3-point landmark registration UI + click picking. Active while
 * state.registration is set. The user picks, per slot, a point on the CBCT and
 * the matching point on the scan surface; three complete pairs let Kabsch align
 * the scan, and a surface fit then polishes the result.
 *
 * CBCT landmarks can be picked either on the Axial slice (canvasToWorld) or
 * straight on the 3D rendering, which ray-casts into the volume and stops at
 * the first bone/enamel it meets. The 3D route is what cusp tips want: finding
 * a tip on a slice means scrubbing until it happens to lie in the plane,
 * whereas on the rendering it is simply the point you can see. Picking honours
 * the jaw filter, so a clipped-away arch can never be clicked by accident.
 *
 * The panel reports the predicted error at the planned implants, not only
 * the residual at the landmarks: the residual says how well the pairs agree
 * with each other, which is not the same question as how well the scan is
 * held where the implant goes. See core/registrationError.
 *
 * Best used in the 2×2 layout, where both the Axial and 3D panes are visible.
 */
export declare function RegistrationPanel(): import("react/jsx-runtime").JSX.Element | null;
