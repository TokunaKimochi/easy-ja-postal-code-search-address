export type ZipIndex = string[];
export type ZipData = {
    zip: string;
    prefectures: string;
    city: string;
    other: string;
};
export type ZipAllData = {
    [key: string]: ZipData[];
};
export type SucceessDataType = {
    address: ZipData;
    error: null;
};
export type ErrorDataType = {
    address: null;
    error: {
        loading?: true;
        notReady?: true;
        inValid?: true;
        noFirstThreeDigits?: true;
        notFound?: true;
    };
};
export type ReturnDataType = SucceessDataType | ErrorDataType;
