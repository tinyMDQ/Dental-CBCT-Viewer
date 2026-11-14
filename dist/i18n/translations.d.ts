/**
 * UI translations. Default language: English.
 * Keys are flat; {param} placeholders are replaced by t(key, params).
 */
export type Language = 'en' | 'de' | 'es' | 'hu';
export declare const LANGUAGES: {
    id: Language;
    label: string;
    flag: string;
}[];
type Dict = Record<string, string>;
export declare const translations: Record<Language, Dict>;
export {};
