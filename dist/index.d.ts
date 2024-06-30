import { ReturnDataType } from './type';
export declare class SearchAddress {
    #private;
    private isReady;
    private isLoading;
    private controller;
    private baseUrl;
    private fallback?;
    private zipCache;
    private zipIndex;
    private constructor();
    static init({ baseUrl, fallback }: {
        baseUrl: string;
        fallback?: () => void;
    }): Promise<SearchAddress | undefined>;
    fetchAbort(): void;
    search({ zipInput }: {
        zipInput: string;
    }): Promise<ReturnDataType>;
}
