/**
 * Custom decode worker that avoids static WASM codec imports.
 *
 * The library's original worker eagerly imports WASM-based codecs
 * (openjpeg, openjph, charls, libjpeg-turbo) whose JS loaders use
 * CommonJS `module.exports` — incompatible with Worker ES modules.
 *
 * This file imports only pure-JS decoders statically and lazy-loads
 * WASM codecs on demand via dynamic import().
 */
export {};
