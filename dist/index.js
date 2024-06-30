"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAddress = void 0;
class SearchAddress {
    isReady = false;
    isLoading = false;
    controller = new AbortController();
    baseUrl = '';
    fallback;
    zipCache = {};
    zipIndex = [];
    constructor() { }
    static async init({ baseUrl, fallback }) {
        const my = new this();
        my.baseUrl = baseUrl;
        my.fallback = fallback;
        const result = await my.#fetchData(my.baseUrl, 'index.json');
        if (!result) {
            console.log('index.json fetch failed');
            my.fallback?.();
            return;
        }
        my.isReady = true;
        my.zipIndex = result;
        return my;
    }
    fetchAbort() {
        this.controller.abort();
    }
    async #fetchData(baseUrl, url) {
        this.isLoading = true;
        const result = await fetch(baseUrl + url, {
            signal: this.controller.signal,
        })
            .then((response) => {
            if (response.ok || response.status === 304) {
                return response.json();
            }
            throw new Error('response error');
        })
            .catch((err) => {
            console.error(err);
            return null;
        })
            .finally(() => {
            this.isLoading = false;
        });
        return result;
    }
    #isValidInputValue(val) {
        return /^[0-9]{7}$/.test(val);
    }
    #isExistFirstThreeDigits(zipIndex, firstThreeDigits) {
        return zipIndex.includes(firstThreeDigits);
    }
    #isExistCache(firstThreeDigits) {
        return this.zipCache[firstThreeDigits];
    }
    async search({ zipInput }) {
        if (!this.isReady)
            return { address: null, error: { notReady: true } };
        if (this.isLoading)
            return { address: null, error: { loading: true } };
        if (!this.#isValidInputValue(zipInput))
            return { address: null, error: { inValid: true } };
        const firstThreeDigits = zipInput.slice(0, 3);
        if (!this.#isExistFirstThreeDigits(this.zipIndex, firstThreeDigits)) {
            return { address: null, error: { noFirstThreeDigits: true } };
        }
        if (!this.#isExistCache(firstThreeDigits)) {
            const targetJsonData = await this.#fetchData(this.baseUrl, `${firstThreeDigits}.json`);
            if (!targetJsonData)
                return { address: null, error: { notFound: true } };
            this.zipCache[firstThreeDigits] = targetJsonData;
        }
        const address = this.zipCache[firstThreeDigits].find((z) => z.zip === zipInput);
        if (!address)
            return { address: null, error: { notFound: true } };
        return { address, error: null };
    }
}
exports.SearchAddress = SearchAddress;
