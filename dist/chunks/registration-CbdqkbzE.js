function K(o, t) {
  const n = new Array(16).fill(0);
  for (let s = 0; s < 4; s++)
    for (let c = 0; c < 4; c++) {
      let f = 0;
      for (let e = 0; e < 4; e++) f += o[e * 4 + c] * t[s * 4 + e];
      n[s * 4 + c] = f;
    }
  return n;
}
function B(o, t) {
  return [
    o[0] * t[0] + o[4] * t[1] + o[8] * t[2] + o[12],
    o[1] * t[0] + o[5] * t[1] + o[9] * t[2] + o[13],
    o[2] * t[0] + o[6] * t[1] + o[10] * t[2] + o[14]
  ];
}
function C(o, t) {
  return [
    o[0][0],
    o[1][0],
    o[2][0],
    0,
    o[0][1],
    o[1][1],
    o[2][1],
    0,
    o[0][2],
    o[1][2],
    o[2][2],
    0,
    t[0],
    t[1],
    t[2],
    1
  ];
}
function D(o, t) {
  const n = o.map((f) => f.slice()), s = Array.from(
    { length: t },
    (f, e) => Array.from({ length: t }, (r, i) => e === i ? 1 : 0)
  );
  for (let f = 0; f < 100; f++) {
    let e = 0, r = 1, i = 0;
    for (let l = 0; l < t; l++)
      for (let a = l + 1; a < t; a++)
        Math.abs(n[l][a]) > i && (i = Math.abs(n[l][a]), e = l, r = a);
    if (i < 1e-12) break;
    const z = n[e][e], k = n[r][r], x = n[e][r], h = 0.5 * Math.atan2(2 * x, k - z), y = Math.cos(h), p = Math.sin(h);
    for (let l = 0; l < t; l++) {
      const a = n[l][e], u = n[l][r];
      n[l][e] = y * a - p * u, n[l][r] = p * a + y * u;
    }
    for (let l = 0; l < t; l++) {
      const a = n[e][l], u = n[r][l];
      n[e][l] = y * a - p * u, n[r][l] = p * a + y * u;
    }
    for (let l = 0; l < t; l++) {
      const a = s[l][e], u = s[l][r];
      s[l][e] = y * a - p * u, s[l][r] = p * a + y * u;
    }
  }
  return { values: n.map((f, e) => f[e]), vectors: s };
}
function F(o) {
  const t = [0, 0, 0];
  for (const n of o)
    t[0] += n[0], t[1] += n[1], t[2] += n[2];
  return [t[0] / o.length, t[1] / o.length, t[2] / o.length];
}
function G(o, t) {
  if (o.length < 3 || o.length !== t.length) return null;
  const n = F(o), s = F(t), c = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let q = 0; q < o.length; q++) {
    const I = [o[q][0] - n[0], o[q][1] - n[1], o[q][2] - n[2]], W = [t[q][0] - s[0], t[q][1] - s[1], t[q][2] - s[2]];
    for (let j = 0; j < 3; j++) for (let A = 0; A < 3; A++) c[j][A] += I[j] * W[A];
  }
  const [f, e, r] = c[0], [i, z, k] = c[1], [x, h, y] = c[2], p = [
    [f + z + y, k - h, x - r, e - i],
    [k - h, f - z - y, e + i, x + r],
    [x - r, e + i, -f + z - y, k + h],
    [e - i, x + r, k + h, -f - z + y]
  ], { values: l, vectors: a } = D(p, 4);
  let u = 0;
  for (let q = 1; q < 4; q++) l[q] > l[u] && (u = q);
  const T = a[0][u], N = a[1][u], _ = a[2][u], E = a[3][u], g = Math.hypot(T, N, _, E) || 1, m = T / g, S = N / g, v = _ / g, M = E / g, b = [
    [1 - 2 * (v * v + M * M), 2 * (S * v - m * M), 2 * (S * M + m * v)],
    [2 * (S * v + m * M), 1 - 2 * (S * S + M * M), 2 * (v * M - m * S)],
    [2 * (S * M - m * v), 2 * (v * M + m * S), 1 - 2 * (S * S + v * v)]
  ], w = [
    b[0][0] * n[0] + b[0][1] * n[1] + b[0][2] * n[2],
    b[1][0] * n[0] + b[1][1] * n[1] + b[1][2] * n[2],
    b[2][0] * n[0] + b[2][1] * n[1] + b[2][2] * n[2]
  ], H = [s[0] - w[0], s[1] - w[1], s[2] - w[2]];
  return C(b, H);
}
function L(o, t) {
  const n = G(o, t);
  if (!n) return null;
  let s = 0;
  for (let c = 0; c < o.length; c++) {
    const f = B(n, o[c]);
    s += (f[0] - t[c][0]) ** 2 + (f[1] - t[c][1]) ** 2 + (f[2] - t[c][2]) ** 2;
  }
  return { matrix: n, rmsMm: Math.sqrt(s / o.length) };
}
function J(o, t, n, s, c) {
  const f = [s[0] - n[0], s[1] - n[1], s[2] - n[2]], e = [c[0] - n[0], c[1] - n[1], c[2] - n[2]], r = t[1] * e[2] - t[2] * e[1], i = t[2] * e[0] - t[0] * e[2], z = t[0] * e[1] - t[1] * e[0], k = f[0] * r + f[1] * i + f[2] * z;
  if (Math.abs(k) < 1e-9) return null;
  const x = 1 / k, h = [o[0] - n[0], o[1] - n[1], o[2] - n[2]], y = (h[0] * r + h[1] * i + h[2] * z) * x;
  if (y < 0 || y > 1) return null;
  const p = h[1] * f[2] - h[2] * f[1], l = h[2] * f[0] - h[0] * f[2], a = h[0] * f[1] - h[1] * f[0], u = (t[0] * p + t[1] * l + t[2] * a) * x;
  if (u < 0 || y + u > 1) return null;
  const T = (e[0] * p + e[1] * l + e[2] * a) * x;
  return T > 1e-6 ? T : null;
}
function O(o, t, n) {
  let s = 1 / 0;
  for (let c = 0; c + 8 < n.length; c += 9) {
    const f = [n[c], n[c + 1], n[c + 2]], e = [n[c + 3], n[c + 4], n[c + 5]], r = [n[c + 6], n[c + 7], n[c + 8]], i = J(o, t, f, e, r);
    i !== null && i < s && (s = i);
  }
  return Number.isFinite(s) ? [o[0] + t[0] * s, o[1] + t[1] * s, o[2] + t[2] * s] : null;
}
export {
  B as a,
  D as j,
  L as k,
  K as m,
  O as p
};
//# sourceMappingURL=registration-CbdqkbzE.js.map
