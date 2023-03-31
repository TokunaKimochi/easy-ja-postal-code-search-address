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
    constructor({ baseUrl, fallback }: {
        baseUrl: string;
        fallback?: () => void;
    });
    fetchAbort(): void;
    search({ zipInput }: {
        zipInput: string;
    }): Promise<ReturnDataType>;
}
