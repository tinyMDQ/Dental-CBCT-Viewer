import { ReactNode } from 'react';
type Theme = 'dark' | 'light';
interface ThemeValue {
    theme: Theme;
    toggleTheme: () => void;
}
export declare function ThemeProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeValue;
export {};
