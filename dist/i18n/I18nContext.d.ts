import { ReactNode } from 'react';
import { Language } from './translations';
interface I18nValue {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}
export declare function I18nProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useI18n(): I18nValue;
export {};
