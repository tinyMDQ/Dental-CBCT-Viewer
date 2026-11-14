export declare function useDicomLoader(): {
    loadFiles: (files: File[]) => Promise<void>;
    isLoading: boolean;
    loadProgress: {
        loaded: number;
        total: number;
    } | null;
    error: string | null;
    study: import('../core').DicomStudyInfo | null;
};
