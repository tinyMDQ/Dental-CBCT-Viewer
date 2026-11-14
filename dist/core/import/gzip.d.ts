/**
 * Gunzip a buffer if it is gzip (1f 8b), else return it unchanged.
 * `maxBytes` is a mandatory budget for the decompressed size: the output is
 * streamed and aborted as soon as it exceeds the budget, so a hostile or
 * corrupt "gzip bomb" payload cannot exhaust memory.
 */
export declare function gunzip(data: Uint8Array, maxBytes: number): Promise<Uint8Array>;
/** File name without any directory prefix (webkitRelativePath or plain name). */
export declare function baseName(f: File): string;
